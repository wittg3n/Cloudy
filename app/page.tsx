"use client";
import Image from "next/image";

// import DnsSwitcher from "../components/DnsSwitcher";
import { useState } from "react";
import { Plus } from "lucide-react";
import { julius_Sans_One, k2d } from "@/lib/fonts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Form from "@/components/Form";
export default function Home() {
  // Type the state variable selectedDns as a string
  const [selectedDns, setSelectedDns] = useState<string>("");

  // Add types for the event handler argument
  const handleDnsChange = (value: string) => {
    setSelectedDns(value); // Update the selected DNS
  };

  return (
    <div className="transition-all duration-300 flex justify-center  overflow-hidden">
      <div className="transition-all duration-300 flex flex-col mb-[80px] items-center justify-center w-[300px] mt-[100px] select-none">
        <Image
          src={"/logo.svg"}
          alt={"logo"}
          height={110}
          width={166}
          draggable={false}
          className="select-none justify-center"
        />
        <h2
          className={`transition-all duration-300 selection:bg-selection-purple text-center text-[48px] font-bold text-gray-800 mb-2 ${k2d.className}`}
        >
          Cloudy
        </h2>
        <p
          className={`transition-all duration-300 selection:bg-selection-purple text-center font-semibold text-sm text-black mb-6 ${julius_Sans_One.className}`}
        >
          Your gateway to faster, safer, and unrestricted internet
        </p>
        <Form></Form>
        {/* <DnsSwitcher selectedDns={selectedDns} /> */}
      </div>
    </div>
  );
}
