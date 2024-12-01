"use client";
import Image from "next/image";
import { useState } from "react";
import { julius_Sans_One, k2d } from "@/lib/fonts";
import useCurrentDNS from "@/hooks/use-current-DNS";
import Form from "@/components/Form";

import dynamic from "next/dynamic";
const Spinner = dynamic(() => import("@/components/Spinner"), { ssr: false });

export default function Home() {
  const [selectedDns, setSelectedDns] = useState<string>("");
  const { dns, error, interfaces, dnsNotfound } = useCurrentDNS();

  const handleDnsChange = (value: string) => {
    setSelectedDns(value);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {dns === null ? (
        <div className="flex justify-center mt-[270px]">
          <Spinner />
        </div>
      ) : (
        <div className=" flex justify-center overflow-hidden">
          <div className="transition-all duration-300 flex flex-col mb-[80px] items-center justify-center w-[300px] mt-[100px]">
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
              className={`select-none transition-all duration-300 selection:bg-selection-purple text-center font-semibold text-sm text-black mb-6 ${julius_Sans_One.className}`}
            >
              improve your internet performance with customizable DNS settings.
            </p>
            <Form dns={dns} interfaces={interfaces} dnsNotfound={dnsNotfound} />
          </div>
        </div>
      )}
    </>
  );
}
