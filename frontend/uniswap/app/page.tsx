"use client";
import React, { useState, useEffect } from "react";
import Swap from "./components/Swap";
import AddLiquidity from "./components/AddLiquidity";
import { readContract } from "@wagmi/core";
import { config } from "./utils/config";
import { factoryABI } from "./utils/factoryABI.json";
import CreatePair from "./components/CreatePair";
import Approve from "./components/Approve";

export default function Home() {
  const [activeComponent, setActiveComponent] = useState("swap");
  const [allPairsLength, setAllPairsLength] = useState(0);
  const [pairs, setPairs] = useState<any[]>([]);
  const [activeCreateComponent, setActiveCreateComponent] = useState(false);

  async function fetchAllPairsLength() {
    try {
      const allPairsLength = await readContract(config, {
        abi: factoryABI,
        address: "0x99d68Edca6959a9a8E65F1A5B7F8295f1946c35e",
        functionName: "allPairsLength",
      });
      setAllPairsLength(Number(allPairsLength));
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchAllPairs(index: number) {
    try {
      const pairAddress = await readContract(config, {
        abi: factoryABI,
        address: "0x99d68Edca6959a9a8E65F1A5B7F8295f1946c35e",
        functionName: "allPairs",
        args: [index],
      });
      setPairs((prevPairs) => [...prevPairs, pairAddress]);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAllPairsLength();
  }, []);

  useEffect(() => {
    if (allPairsLength > 0) {
      for (let i = 0; i < allPairsLength; i++) {
        fetchAllPairs(i);
      }
    }
  }, [allPairsLength]);

  return (
    <main className="flex flex-row justify-center items-center bg-indigo-600 min-h-screen space-x-12">
      <div className="bg-gray-900 text-white p-5 rounded-xl w-[500px] h-[600px] mx-2">
        <div className="flex justify-center space-x-8 mb-5">
          <button
            className={`w-44 p-2 ${
              activeComponent === "swap" ? "bg-purple-700" : "bg-gray-700"
            } text-white rounded-lg`}
            onClick={() => setActiveComponent("swap")}
          >
            Swap
          </button>
          <button
            className={`w-44 p-2 ${
              activeComponent === "liquidity" ? "bg-purple-700" : "bg-gray-700"
            } text-white rounded-lg`}
            onClick={() => setActiveComponent("liquidity")}
          >
            Add Liquidity
          </button>
          <button
            className={`w-44 p-2 ${
              activeComponent === "approve" ? "bg-purple-700" : "bg-gray-700"
            } text-white rounded-lg`}
            onClick={() => setActiveComponent("approve")}
          >
            Approve
          </button>
        </div>
        {activeComponent === "swap" ? (
          <Swap pairs={pairs} />
        ) : activeComponent === "liquidity" ? (
          <AddLiquidity />
        ) : (
          <Approve />
        )}
      </div>
      <div className="bg-gray-900 text-white p-5 rounded-xl w-[500px] h-[600px] mx-2">
        <div className="flex justify-center space-x-8 mb-5">
          <button
            className={`w-44 p-2 ${
              activeCreateComponent === true ? "bg-purple-700" : "bg-gray-700"
            } text-white rounded-lg`}
            onClick={() => setActiveCreateComponent(true)}
          >
            Create Pair
          </button>
          <button
            className={`w-44 p-2 ${
              activeCreateComponent === false ? "bg-purple-700" : "bg-gray-700"
            } text-white rounded-lg`}
            onClick={() => setActiveCreateComponent(false)}
          >
            Pairs List
          </button>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg w-[460px] h-[500px] flex flex-col text-center">
          {activeCreateComponent ? (
            <CreatePair />
          ) : (
            <>
              <h1 className="mb-8 text-3xl">All Pairs</h1>
              <div className="space-y-4 overflow-y-auto h-[350px]">
                {pairs.map((pair) => (
                  <div key={pair}>{pair}</div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
