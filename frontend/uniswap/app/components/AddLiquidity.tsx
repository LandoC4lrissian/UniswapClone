"use client";
import React, { useState, useEffect } from "react";
import { writeContract, readContract } from "@wagmi/core";
import { V2Router02ABI } from "../utils/V2Router02ABI.json";
import { WETHABI } from "../utils/WETHABI.json";
import { config } from "../utils/config";
import { parseUnits, formatUnits } from "viem";
import { getAccount } from "@wagmi/core";

const AddLiquidity = () => {
  const [token1Address, setToken1Address] = useState("");
  const [token2Address, setToken2Address] = useState("");
  const [amountToken1, setAmountToken1] = useState("");
  const [amountToken2, setAmountToken2] = useState("");
  const [price, setPrice] = useState(0);
  const [token1Balance, setToken1Balance] = useState(0);
  const [token2Balance, setToken2Balance] = useState(0);
  const [poolAddress, setPoolAddress] = useState("");
  const [token1Decimals, setToken1Decimals] = useState(18);
  const [token2Decimals, setToken2Decimals] = useState(18);

  const deadline = Number(Math.floor(new Date().getTime() / 1000.0) + "0");
  const account = getAccount(config);
  const accountAddress = account?.address || "";

  console.log("token1Balance ", token1Balance);
  console.log("token2Balance ", token2Balance);
  console.log("price ", price);
  console.log("deadline ", deadline);

  useEffect(() => {
    if (token1Address && token2Address && poolAddress) {
      getTokenDecimals(token1Address, setToken1Decimals);
      getTokenDecimals(token2Address, setToken2Decimals);
    }
  }, [token1Address, token2Address, poolAddress]);

  useEffect(() => {
    if (token1Decimals && token2Decimals) {
      getBalance(token1Address, setToken1Balance, token1Decimals);
      getBalance(token2Address, setToken2Balance, token2Decimals);
    }
  }, [token1Decimals, token2Decimals]);

  async function getTokenDecimals(address, setDecimals) {
    try {
      const decimals = await readContract(config, {
        abi: WETHABI,
        address: address,
        functionName: "decimals",
      });
      console.log("Decimals: ", decimals);
      setDecimals(Number(decimals));
    } catch (error) {
      console.error(error);
    }
  }

  async function getBalance(address, setBalance, decimals) {
    try {
      const balance = await readContract(config, {
        abi: WETHABI,
        address: address,
        functionName: "balanceOf",
        args: [poolAddress],
      });
      setBalance(Number(formatUnits(balance as bigint, decimals)));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (token1Balance && token2Balance) {
      setPrice(token2Balance / token1Balance);
    }
  }, [token1Balance, token2Balance]);

  useEffect(() => {
    if (price && amountToken1) {
      setAmountToken2((Number(amountToken1) * price).toString());
    }
  }, [price, amountToken1]);

  async function addLiquidity() {
    try {
      const addLiquidity = await writeContract(config, {
        abi: V2Router02ABI,
        address: "0x63656d7917FcBaAd1A4A75a048da32778C695eD3",
        functionName: "addLiquidity",
        args: [
          token1Address,
          token2Address,
          parseUnits(amountToken1, token1Decimals),
          parseUnits(amountToken2, token2Decimals),
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
    <div className="bg-gray-800 p-6 rounded-lg w-[460px] h-[500px]">
      <div className="flex flex-col space-y-4 mb-4">
        <input
          type="text"
          className="text-black p-3 rounded-lg w-full"
          placeholder="Token 1 Address"
          value={token1Address}
          onChange={(e) => setToken1Address(e.target.value)}
        />
        <input
          type="text"
          className="text-black p-3 rounded-lg w-full"
          placeholder="Token 2 Address"
          value={token2Address}
          onChange={(e) => setToken2Address(e.target.value)}
        />
        <input
          type="text"
          className="text-black p-3 rounded-lg w-full"
          placeholder="Pool Address"
          value={poolAddress}
          onChange={(e) => setPoolAddress(e.target.value)}
        />
        <input
          type="number"
          className="text-black p-3 rounded-lg w-full"
          placeholder="Token 1 Amount"
          value={amountToken1}
          onChange={(e) => setAmountToken1(e.target.value)}
        />
        <input
          type="number"
          className="text-black p-3 rounded-lg w-full"
          placeholder="Token 2 Amount"
          value={amountToken2}
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
