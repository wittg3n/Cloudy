"use client";
import { useState } from "react";
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

const Form = () => {
  const [isActivated, setIsActivated] = useState<boolean>(false); // Track activation state
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const [dnsName, setDnsName] = useState<string>(""); // Track selected DNS name
  const [interfaceName] = useState<string>("Ethernet"); // Static interface name

  const handleDnsChange = (value: string) => {
    setDnsName(value);
  };

  const handleToggle = async () => {
    if (!dnsName && !isActivated) {
      toast.error("Please select a DNS name.");
      return;
    }

    setLoading(true);
    try {
      const action = isActivated ? "deactivate_dns" : "change_dns";
      const response = await invoke<string>(action, {
        dnsName: isActivated ? null : dnsName,
        interfaceName,
      });

      // Update states based on the response
      setIsActivated(!isActivated);
      toast.success(
        isActivated ? "Deactivated Successfully" : "Activated Successfully"
      );
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-[40px]">
      <Select onValueChange={handleDnsChange}>
        <SelectTrigger className="w-[300px] h-[40px] text-[17px] ring-0">
          <SelectValue placeholder="Choose your DNS" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Radar" className="text-[16px]">
            Radar Game DNS
          </SelectItem>
          <SelectItem value="Electro" className="text-[16px]">
            Electro DNS
          </SelectItem>
          <SelectItem value="Google" className="text-[16px]">
            Google Public DNS
          </SelectItem>
          <SelectItem value="Shecan" className="text-[16px]">
            Shecan DNS
          </SelectItem>
          <SelectItem value="Yandex" className="text-[16px]">
            Yandex DNS
          </SelectItem>
          <SelectItem value="cloudflare" className="text-[16px]">
            CloudFlare DNS
          </SelectItem>
        </SelectContent>
      </Select>

      <Button
        onClick={handleToggle}
        className={`transition-all duration-300 w-full rounded-md mt-6 text-[18px] ${
          isActivated
            ? "bg-[#D44D5C] text-black hover:bg-[#D44D5C]"
            : "bg-[#171717] text-white hover:bg-gray-700"
        } disabled:bg-gray-500`}
        disabled={loading}
      >
        {loading ? (
          <div
            className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-black border-t-transparent align-middle"
            role="status"
          ></div>
        ) : isActivated ? (
          "Deactivate"
        ) : (
          "Activate"
        )}
      </Button>
    </div>
  );
};

export default Form;
