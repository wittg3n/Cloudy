"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { invoke } from "@tauri-apps/api/core";
import { toast } from "sonner";
import { Unplug, Plug } from "lucide-react"; // Import icons

// Import the dnsMap from the lib/dnsMap.ts file
import { dnsMap } from "@/lib/dnsMap";

interface FormProps {
  dns: string;
  interfaces: string | null;
  dnsNotfound: string | null;
}

const Form = ({ dns, interfaces, dnsNotfound }: FormProps) => {
  const [isActivated, setIsActivated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [dnsName, setDnsName] = useState<string>("");

  const isGoogleDns = dns === "Google";
  const isNonGoogleDns =
    Object.values(dnsMap).some((addresses) => addresses.includes(dns)) &&
    !isGoogleDns;

  // Show error if DNS not found
  if (dnsNotfound) {
    toast(dnsNotfound);
  }

  const handleDnsChange = (value: string) => {
    setDnsName(value);
  };

  const handleToggle = async () => {
    setLoading(true);
    try {
      if (!interfaces) {
        toast.error("Network interface not detected.");
        return;
      }

      if (isActivated) {
        // Deactivate DNS and set to Google
        const response = await invoke<string>("change_dns", {
          dnsName: "Google", // Change DNS to Google
          interfaceName: interfaces,
        });
        console.log("Response:", response); // Log the response for debugging
        toast.success("Deactivated and DNS changed to Google DNS.");
      } else {
        if (!dnsName) {
          toast.error("Please select a DNS name.");
          return;
        }

        // If using a DNS other than Google, deactivate it first
        if (!isGoogleDns) {
          const response = await invoke<string>("change_dns", {
            dnsName: "Google", // Change to Google DNS first
            interfaceName: interfaces,
          });
          console.log("Response:", response); // Log the response for debugging
          toast.success("Deactivated and DNS changed to Google DNS.");
        }

        // Now activate the selected DNS
        const response = await invoke<string>("change_dns", {
          dnsName: dnsName, // Set the selected DNS
          interfaceName: interfaces,
        });
        console.log("Response:", response); // Log the response for debugging
        toast.success("Activated with DNS: " + dnsName);
      }

      // Toggle the activation state
      setIsActivated(!isActivated);
    } catch (error) {
      console.error("Error invoking change_dns:", error);
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  // Set the initial state based on the DNS on component mount
  useEffect(() => {
    if (dns && !isGoogleDns && Object.keys(dnsMap).includes(dns)) {
      setIsActivated(true);
      setDnsName(dns);
    }
  }, [dns]);

  return (
    <div className="mt-[40px]">
      <Select
        onValueChange={handleDnsChange}
        disabled={isNonGoogleDns || isActivated} // Disable Select if DNS is not Google or if activated
      >
        <SelectTrigger className="w-[300px] h-[40px] text-[17px] ring-0">
          <SelectValue
            placeholder={
              isGoogleDns ? "Choose your DNS" : dns || "Choose your DNS"
            }
          />
        </SelectTrigger>
        <SelectContent className="max-h-[200px] overflow-y-auto">
          {/* Fixed size with scroll */}
          {Object.keys(dnsMap).map((dnsKey) => (
            <SelectItem key={dnsKey} value={dnsKey} className="text-[16px]">
              {dnsKey} DNS
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        onClick={handleToggle}
        className={`transition-all duration-300 w-full rounded-md mt-6 text-[18px] ${
          isActivated
            ? "bg-[#FF4000] text-black hover:bg-[#D44D5C]"
            : "bg-[#171717] text-white hover:bg-gray-700"
        } disabled:bg-gray-500`}
        disabled={loading || isNonGoogleDns} // Disable button if loading or if DNS is not Google
      >
        {loading ? (
          <div
            className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-white border-t-transparent align-middle"
            role="status"
          ></div>
        ) : isActivated ? (
          <>
            Deactivate <Unplug className="inline-block ml-2" />
          </>
        ) : (
          <>
            Activate <Plug className="inline-block ml-2" />
          </>
        )}
      </Button>
    </div>
  );
};

export default Form;
