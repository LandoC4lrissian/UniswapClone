// components/AddLiquidity.js
"use client";
import React, { useState } from "react";
import { writeContract } from "@wagmi/core";
import { V2Router02ABI } from "../utils/V2Router02ABI.json";
import { config } from "../utils/config";
import { parseEther } from "viem";
import { getAccount } from "@wagmi/core";

const ETH_ADDRESS = "0x7557ddCfb5A0A0F7B19676c7e1D51e6BB01b413D";
const USDC_ADDRESS = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";

const AddLiquidity = () => {
  const [amountETH, setAmountETH] = useState("");
  const [amountUSDC, setAmountUSDC] = useState("");

  const deadline = Number(Math.floor(new Date().getTime() / 1000.0) + "0");
  const account = getAccount(config);
  const accountAddress = account?.address || "";

  async function addLiquidity() {
    try {
      const addLiquidity = await writeContract(config, {
        abi: V2Router02ABI,
        address: "0x63656d7917FcBaAd1A4A75a048da32778C695eD3",
        functionName: "addLiquidity",
        args: [
          USDC_ADDRESS,
          ETH_ADDRESS,
          parseEther(amountUSDC),
          parseEther(amountETH),
          0,
          0,
          accountAddress,
          deadline,
        ],
      });
      console.log(addLiquidity);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg w-[460px] h-[300px]">
      <div className="flex flex-col space-y-4 mb-4">
        <input
          type="number"
          className="text-black p-3 rounded-lg w-full"
          placeholder="USDC Amount"
          value={amountUSDC}
          onChange={(e) => setAmountUSDC(e.target.value)}
        />
        <input
          type="number"
          className="text-black p-3 rounded-lg w-full"
          placeholder="ETH Amount"
          value={amountETH}
          onChange={(e) => setAmountETH(e.target.value)}
        />
      </div>
      <button
        className="w-full p-3 bg-purple-700 text-white rounded-lg"
        onClick={addLiquidity}
      >
        Add Liquidity
      </button>
    </div>
  );
};

export default AddLiquidity;
