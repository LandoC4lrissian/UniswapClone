# UniswapClone Project

This project is a clone of Uniswap, a decentralized exchange (DEX) built on the Ethereum blockchain. The following steps will guide you through setting up and deploying the project.

## 1. Deploy UniswapV2 Contracts

Deploy the UniswapV2 contracts on the blockchain network of your choice. Make sure to keep the ABI files and contract addresses, as you will need them for interaction in later steps.

## 2. Create a Next.js Project

Use the following command to create a new Next.js project:

```bash
yarn create next-app
```

## 3. Install Necessary Dependencies

Install the necessary packages for wallet connection and contract interaction using the following command:

```bash
yarn add @rainbow-me/rainbowkit wagmi viem@2.x @tanstack/react-query
```

- RainbowKit: A tool for connecting to your wallet.
- Wagmi: A collection of React hooks for interacting with Ethereum contracts.
- Viem: A TypeScript library for interacting with the Ethereum blockchain.

## 4. Documentation References

Refer to the official documentation for RainbowKit and Wagmi for further guidance:

- [RainbowKit Documentation](https://www.rainbowkit.com/docs/installation)
- [Wagmi Documentation](https://wagmi.sh/react/getting-started)

## 5. Create a Pool with the Factory Contract

First, call the CreatePair function of the factory contract to create a pool. After that, call the approve function for the tokens you wish to add to the pool.

## 6. Interact with the Contracts
You can then call the following functions as needed:

- swap: To swap tokens.
- addLiquidity: To add liquidity to the pool.
- removeLiquidity (optional): To remove liquidity from the pool.

All these contract interactions and data reading operations are performed using Wagmi.

## 7. Test Your Code

Finally, run the following command to start the development server and test your code:

```bash
yarn run dev
```

Happy coding!

```python
Feel free to adjust any sections as needed!
```
