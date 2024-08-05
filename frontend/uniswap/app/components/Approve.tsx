"use client";
import React, { useState } from "react";
import { writeContract } from "@wagmi/core";
import { config } from "../utils/config";
import { WETHABI } from "../utils/WETHABI.json";

const V2RouterAddress = "0x63656d7917FcBaAd1A4A75a048da32778C695eD3";
const uintMax = 200000000000000000;

export default function Approve() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function isValidAddress(address) {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  }

  async function handleApprove() {
    if (!isValidAddress(tokenAddress)) {
      setErrorMessage(
        "Geçersiz adres formatı. Lütfen geçerli bir adres girin."
      );
      return;
    }

    setErrorMessage("");

    try {
      const approve = await writeContract(config, {
        abi: WETHABI,
        address: tokenAddress,
        functionName: "approve",
        args: [V2RouterAddress, uintMax],
      });
      console.log(approve);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg w-[460px] h-[500px] flex flex-col items-center space-y-4">
      <h2 className="text-3xl mb-4">Approve</h2>
      <input
        type="text"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
        placeholder="Token Address"
        className="text-black p-3 rounded-lg w-3/4"
      />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <button
        onClick={handleApprove}
        className="bg-pink-600 text-white p-3 rounded-lg w-1/2 text-center"
      >
        Approve
      </button>
    </div>
  );
}
