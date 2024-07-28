"use client";
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <div className="fixed top-0 w-full bg-transparent">
      <div className="flex justify-end pt-4 pr-4">
        <ConnectButton />
      </div>
    </div>
  );
};

export default Header;
