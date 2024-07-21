"use client";  
import Image from "next/image";
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  //swapExactETHForTokens
  //swapExactTokensForETH
  return (
    <main className="flex justify-center items-center bg-indigo-600 min-h-screen">
      <div className="container">
        <div className="header">
          <ConnectButton />
        </div>
        <div className="swapContainer">
          <div className="row">
            <input type="number" className="text-black" placeholder="0" />
            <select>
              <option>ETH</option>
              <option>USDT</option>
              <option>USDC</option>
              {/* Diğer token seçenekleri buraya eklenebilir */}
            </select>
          </div>
          <div className="arrow">⬇️</div>
          <div className="row">
            <input type="number" className="text-black" placeholder="0" />
            <select>
              <option>ETH</option>
              <option>USDT</option>
              <option>USDC</option>
              {/* Diğer token seçenekleri buraya eklenebilir */}
            </select>
          </div>
          <button className="connectWallet">Swap</button>
        </div>
      </div>
    </main>
  );
}
