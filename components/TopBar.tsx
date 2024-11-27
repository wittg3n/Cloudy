"use client";

import { X, Minus, Circle } from "lucide-react";
import React from "react";
import { core } from "@tauri-apps/api";

const TopBar = () => {
  const onClose = React.useCallback(async () => {
    try {
      await core.invoke("close_window");
    } catch (error) {
      console.error("Failed to close window:", error);
    }
  }, []);

  const onMinimize = React.useCallback(async () => {
    try {
      await core.invoke("minimize_window");
    } catch (error) {
      console.error("Failed to minimize window:", error);
    }
  }, []);

  return (
    <div
      data-tauri-drag-region
      className="flex w-full  justify-end items-center p-4 text-black"
    >
      <div className=" flex  ">
        <Minus onClick={onMinimize} className="cursor-pointer mr-2" />
        <X onClick={onClose} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default TopBar;
