"use client";
import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { writeContract } from "@wagmi/core";
import { V2Router02ABI } from "./utils/V2Router02ABI.json";
import { config } from "./utils/config";
import { getAccount } from "@wagmi/core";
import { parseEther } from 'viem'

const ETH_ADDRESS = "0x7557ddCfb5A0A0F7B19676c7e1D51e6BB01b413D";
const USDC_ADDRESS = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
const USDT_ADDRESS = "0x0000000000000000000000000000000000000000";

export default function Home() {
  const [amountIn, setAmountIn] = useState(0);
  const [token1, setToken1] = useState("ETH");
  const [token2, setToken2] = useState("USDC");

  const deadline = Number(Math.floor(new Date().getTime() / 1000.0)+ "0");
  console.log(deadline);

  const account = getAccount(config);
  const accountAddress = account?.address || "";
  console.log(accountAddress);

  const getAddress = (token) => {
    switch (token) {
      case "ETH":
        return ETH_ADDRESS;
      case "USDC":
        return USDC_ADDRESS;
      case "USDT":
        return USDT_ADDRESS;
      default:
        return "";
    }
  };

  async function swapExactETHForTokens() {
    const path = [getAddress(token1), getAddress(token2)];
    const swapExactETHForTokens = await writeContract(config, {
      abi: V2Router02ABI,
      address: "0x63656d7917FcBaAd1A4A75a048da32778C695eD3",
      functionName: "swapExactETHForTokens",
      value: parseEther("0.01"),
      args: [10000, ["0x7557ddCfb5A0A0F7B19676c7e1D51e6BB01b413D", "0x036CbD53842c5426634e7929541eC2318f3dCF7e"], account.address, deadline],
    });
    console.log(swapExactETHForTokens);
  }

  async function swapExactTokensForETH() {
    const path = [getAddress(token1), getAddress(token2)];
    const swapExactTokensForETH = await writeContract(config, {
      abi: V2Router02ABI,
      address: "0x63656d7917FcBaAd1A4A75a048da32778C695eD3",
      functionName: "swapExactTokensForETH",
      value: parseEther("0.01"), // farklı olacak usdc mantığı
      args: [10000, ["0x7557ddCfb5A0A0F7B19676c7e1D51e6BB01b413D", "0x036CbD53842c5426634e7929541eC2318f3dCF7e"], account.address, deadline],
    });
    console.log(swapExactTokensForETH);
  }

  const handleSwap = () => {
    if (token1 === "ETH") {
      swapExactETHForTokens();
    } else {
      swapExactTokensForETH();
    }
  };

  return (
    <main className="flex justify-center items-center bg-indigo-600 min-h-screen">
      <div className="container">
        <div className="header">
          <ConnectButton />
        </div>
        <div className="swapContainer">
          <div className="row">
            <input 
              type="number" 
              className="text-black" 
              placeholder="0" 
              value={amountIn} 
              onChange={(e) => setAmountIn(e.target.value)} 
            />
            <select value={token1} onChange={(e) => setToken1(e.target.value)}>
              <option value="ETH">ETH</option>
              <option value="USDT">USDT</option>
              <option value="USDC">USDC</option>
              {/* Diğer token seçenekleri buraya eklenebilir */}
            </select>
          </div>
          <div className="arrow">⬇️</div>
          <div className="row">
            <input 
              type="number" 
              className="text-black" 
              placeholder="0" 
              value={10000} 
              disabled 
            />
            <select value={token2} onChange={(e) => setToken2(e.target.value)}>
              <option value="ETH">ETH</option>
              <option value="USDT">USDT</option>
              <option value="USDC">USDC</option>
              {/* Diğer token seçenekleri buraya eklenebilir */}
            </select>
          </div>
          <button className="connectWallet" onClick={handleSwap}>Swap</button>
        </div>
      </div>
    </main>
  );
}
