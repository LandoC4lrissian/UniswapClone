"use client";
import React, { useState } from "react";
import { writeContract } from "@wagmi/core";
import { V2Router02ABI } from "../utils/V2Router02ABI.json";
import { config } from "../utils/config";
import { getAccount } from "@wagmi/core";
import { parseEther } from "viem";

const ETH_ADDRESS = "0x7557ddCfb5A0A0F7B19676c7e1D51e6BB01b413D";
const USDC_ADDRESS = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";

const Swap = () => {
  const [amountIn, setAmountIn] = useState("");
  const [token1, setToken1] = useState("ETH");
  const [token2, setToken2] = useState("USDC");

  const deadline = Number(Math.floor(new Date().getTime() / 1000.0) + "0");
  const account = getAccount(config);
  const accountAddress = account?.address || "";

  async function swapExactETHForTokens() {
    try {
      const swapExactETHForTokens = await writeContract(config, {
        abi: V2Router02ABI,
        address: "0x63656d7917FcBaAd1A4A75a048da32778C695eD3",
        functionName: "swapExactETHForTokens",
        value: parseEther(amountIn),
        args: [0, [ETH_ADDRESS, USDC_ADDRESS], accountAddress, deadline],
      });
      console.log(swapExactETHForTokens);
    } catch (error) {
      console.error(error);
    }
  }

  async function swapExactTokensForETH() {
    try {
      const swapExactTokensForETH = await writeContract(config, {
        abi: V2Router02ABI,
        address: "0x63656d7917FcBaAd1A4A75a048da32778C695eD3",
        functionName: "swapExactTokensForETH",
        args: [
          (Number(amountIn) * 10) ^ 6,
          0,
          [USDC_ADDRESS, ETH_ADDRESS],
          accountAddress,
          deadline,
        ],
      });
      console.log(swapExactTokensForETH);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSwap = () => {
    if (token1 === "ETH") {
      swapExactETHForTokens();
    } else {
      swapExactTokensForETH();
    }
  };

  return (
    <div className="bg-gray-800 p-5 rounded-lg">
      <div className="flex justify-between mb-3">
        <input
          type="number"
          className="text-black p-2 rounded-lg w-2/3"
          placeholder="0"
          value={amountIn}
          onChange={(e) => setAmountIn(e.target.value)}
        />
        <select
          className="bg-pink-600 text-white p-2 rounded-lg w-1/4"
          value={token1}
          onChange={(e) => setToken1(e.target.value)}
        >
          <option value="ETH">ETH</option>
          <option value="USDC">USDC</option>
        </select>
      </div>
      <div className="text-center my-3">⬇️</div>
      <div className="flex justify-center mb-3">
        <select
          className="bg-pink-600 text-white p-2 rounded-lg w-44 text-center"
          value={token2}
          onChange={(e) => setToken2(e.target.value)}
        >
          <option value="ETH">ETH</option>
          <option value="USDC">USDC</option>
        </select>
      </div>
      <button
        className="w-full p-2 bg-purple-700 text-white rounded-lg"
        onClick={handleSwap}
      >
        Swap
      </button>
    </div>
  );
};

export default Swap;
