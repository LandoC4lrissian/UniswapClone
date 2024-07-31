"use client";
import React, { useState } from "react";
import { writeContract, readContract } from "@wagmi/core";
import { config } from "../utils/config";
import { factoryABI } from "../utils/factoryABI.json";

const CreatePair = () => {
  const [token1Address, setToken1Address] = useState("");
  const [token2Address, setToken2Address] = useState("");

  async function handleCreatePair() {
    try {
      const createPair = await writeContract(config, {
        abi: factoryABI,
        address: "0x99d68Edca6959a9a8E65F1A5B7F8295f1946c35e",
        functionName: "createPair",
        args: [token1Address, token2Address],
      });
      console.log(createPair);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-8 text-3xl">Create Pair</h1>
      <input
        type="text"
        className="text-black p-3 rounded-lg w-full mb-4"
        placeholder="Token 1 Address"
        value={token1Address}
        onChange={(e) => setToken1Address(e.target.value)}
      />
      <input
        type="text"
        className="text-black p-3 rounded-lg w-full mb-4"
        placeholder="Token 2 Address"
        value={token2Address}
        onChange={(e) => setToken2Address(e.target.value)}
      />
      <button
        className="w-full p-3 bg-purple-700 text-white rounded-lg"
        onClick={handleCreatePair}
      >
        Create Pair
      </button>
    </div>
  );
};

export default CreatePair;
