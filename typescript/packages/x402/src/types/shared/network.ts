import { z } from "zod";

export const NetworkSchema = z.enum([
  "arbitrum",
  "astar",
  "avalanche-fuji",
  "avalanche",
  "base-sepolia",
  "base",
  "bsc",
  "bsc-testnet",
  "blast",
  "celo",
  "chiliz",
  "iotex",
  "mainnet",
  "linea",
  "optimism",
  "solana-devnet",
  "solana",
  "sei",
  "sei-testnet",
  "polygon",
  "polygon-amoy",
  "peaq",
  "unichain",
  "worldchain",
  "x-layer",
  "x-layer-testnet",
]);
export type Network = z.infer<typeof NetworkSchema>;

// evm
export const SupportedEVMNetworks: Network[] = [
  "arbitrum",
  "astar",
  "avalanche-fuji",
  "avalanche",
  "base-sepolia",
  "base",
  "bsc",
  "bsc-testnet",
  "blast",
  "celo",
  "chiliz",
  "iotex",
  "mainnet",
  "linea",
  "optimism",
  "sei",
  "sei-testnet",
  "polygon",
  "polygon-amoy",
  "peaq",
  "unichain",
  "worldchain",
  "x-layer",
  "x-layer-testnet",
];
export const EvmNetworkToChainId = new Map<Network, number>([
  ["arbitrum", 42161],
  ["astar", 592],
  ["avalanche-fuji", 43113],
  ["avalanche", 43114],
  ["base-sepolia", 84532],
  ["base", 8453],
  ["bsc", 56],
  ["bsc-testnet", 97],
  ["blast", 81457],
  ["celo", 42220],
  ["chiliz", 88888],
  ["iotex", 4689],
  ["mainnet", 1],
  ["linea", 59140],
  ["optimism", 10],
  ["sei", 1329],
  ["sei-testnet", 1328],
  ["polygon", 137],
  ["polygon-amoy", 80002],
  ["peaq", 3338],
  ["unichain", 130],
  ["worldchain", 480],
  ["x-layer", 1952],
  ["x-layer-testnet", 196],
]);

// svm
export const SupportedSVMNetworks: Network[] = ["solana-devnet", "solana"];
export const SvmNetworkToChainId = new Map<Network, number>([
  ["solana-devnet", 103],
  ["solana", 101],
]);

export const ChainIdToNetwork = Object.fromEntries(
  [...SupportedEVMNetworks, ...SupportedSVMNetworks].map(network => [
    EvmNetworkToChainId.get(network),
    network,
  ]),
) as Record<number, Network>;
