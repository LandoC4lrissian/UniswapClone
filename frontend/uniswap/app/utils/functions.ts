import { factoryABI } from "../utils/factoryABI.json";
import { config } from "../utils/config";
import { writeContract } from "@wagmi/core";
import { readContract } from "@wagmi/core";

export async function allPairsLenght() {
  try {
    const allPairsLenghT = await readContract(config, {
      abi: factoryABI,
      address: "0x99d68Edca6959a9a8E65F1A5B7F8295f1946c35e",
      functionName: "allPairsLength",
    });
    console.log(Number(allPairsLenghT));
    return Number(allPairsLenghT);
  } catch (error) {
    console.error(error);
  }
}

export async function allPairs(Index: number) {
  try {
    const allPairs = await readContract(config, {
      abi: factoryABI,
      address: "0x99d68Edca6959a9a8E65F1A5B7F8295f1946c35e",
      functionName: "allPairs",
      args: [Index],
    });
    console.log(allPairs);
    return allPairs;
  } catch (error) {
    console.error(error);
  }
}
