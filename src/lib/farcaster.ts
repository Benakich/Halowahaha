import { sdk } from "@farcaster/frame-sdk";
export { sdk };
import type { Address } from "viem";

export async function initMiniApp(): Promise<{ inMiniApp: boolean }> {
  try {
    // Frame SDK only works in Farcaster clients
    await sdk.actions.ready();
    return { inMiniApp: true };
  } catch (e) {
    // In dev mode (regular browser), SDK won't work - return false
    // eslint-disable-next-line no-console
    console.log("Not in Farcaster client - dev mode");
    return { inMiniApp: false };
  }
}

// Get wallet provider from Farcaster SDK
export async function getWalletProvider() {
  try {
    return await sdk.wallet.getEthereumProvider();
  } catch (e) {
    return null;
  }
}

// Get wallet address from provider
export async function getWalletAddress(): Promise<Address | null> {
  const provider = await getWalletProvider();
  if (!provider) return null;
  try {
    const accounts = await provider.request({ method: "eth_accounts" });
    return (accounts?.[0] as Address) || null;
  } catch {
    return null;
  }
}

// Get current chain ID
export async function getChainId(): Promise<number | null> {
  // Prefer the wallet's reported chain
  if (typeof window !== "undefined" && (window as any).ethereum?.request) {
    const hex = await (window as any).ethereum.request({ method: "eth_chainId" });
    return typeof hex === "string" ? parseInt(hex, 16) : null;
  }

  // Fallback to SDK context (cast to avoid TS complaint)
  try {
    const ctx = await sdk.context;
    return (ctx as any)?.client?.chainId ?? null; // <-- cast silences TS
  } catch {
    return null;
  }
}

// Switch chain
export async function ensureChain(chainId: number) {
  // e.g., Arbitrum One => 42161 -> "0xa4b1"
  const hex = "0x" + chainId.toString(16);
  // Guard for environments without an injected provider
  if (typeof window !== "undefined" && (window as any).ethereum) {
    await (window as any).ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: hex }],
    });
  }
}




