"use client";
import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Swap from "./components/Swap";
import AddLiquidity from "./components/AddLiquidity";

export default function Home() {
  const [activeComponent, setActiveComponent] = useState("swap");

  return (
    <main className="flex justify-center items-center bg-indigo-600 min-h-screen">
      <div className="bg-gray-900 text-white p-5 rounded-lg max-w-lg mx-auto">
        <div className="flex justify-between mb-5">
          <ConnectButton />
        </div>
        <div className="flex justify-between mb-5">
          <button
            className={`w-1/2 p-2 ${
              activeComponent === "swap"
                ? "bg-purple-700"
                : "bg-gray-700"
            } text-white rounded-lg`}
            onClick={() => setActiveComponent("swap")}
          >
            Swap
          </button>
          <button
            className={`w-1/2 p-2 ${
              activeComponent === "liquidity"
                ? "bg-purple-700"
                : "bg-gray-700"
            } text-white rounded-lg`}
            onClick={() => setActiveComponent("liquidity")}
          >
            Add Liquidity
          </button>
        </div>
        {activeComponent === "swap" ? <Swap /> : <AddLiquidity />}
      </div>
    </main>
  );
}