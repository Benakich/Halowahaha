import React, { useEffect, useState } from "react";
import { initMiniApp, getWalletAddress, getChainId } from "./lib/farcaster";
import { useFlow } from "./state/flow";
import { TrickOrTreatSelector } from "./components/TrickOrTreatSelector";
import { LorePage } from "./components/LorePage";
import { NftMintPage } from "./components/NftMintPage";
import { SuccessPage } from "./components/SuccessPage";

export default function App(): JSX.Element {
  const { step, reset } = useFlow();
  const [inMiniApp, setInMiniApp] = useState<boolean | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [chainId, setChainId] = useState<number | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { inMiniApp } = await initMiniApp();
      setInMiniApp(inMiniApp);
      // Check wallet connection
      const addr = await getWalletAddress();
      const cid = await getChainId();
      setIsConnected(!!addr);
      setAddress(addr);
      setChainId(cid);
    })();
  }, []);

  useEffect(() => {
    if (isConnected && step === "connect") {
      reset();
    }
  }, [isConnected, step, reset]);

  // Poll wallet state periodically (or use provider events if available)
  useEffect(() => {
    const interval = setInterval(async () => {
      const addr = await getWalletAddress();
      const cid = await getChainId();
      setIsConnected(!!addr);
      setAddress(addr);
      setChainId(cid);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  if (inMiniApp === null) return <div style={{ padding: 16 }}>Loading…</div>;

  // In dev mode (outside Farcaster), show a message or allow testing
  const isDevMode = !inMiniApp;

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: 16, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\"" }}>
      <h1 style={{ textAlign: "center" }}>Hallowahahahahaha</h1>
      {isDevMode ? (
        <div style={{ padding: 20, background: "#f0f0f0", borderRadius: 8, marginBottom: 20 }}>
          <p style={{ marginBottom: 12 }}><strong>Dev Mode</strong></p>
          <p style={{ fontSize: 14, marginBottom: 8 }}>This Mini App runs best inside a Farcaster client.</p>
          <p style={{ fontSize: 14, marginBottom: 12 }}>For testing, you can proceed with the flow:</p>
          <button
            onClick={() => {
              setIsConnected(true);
              reset();
            }}
            style={{ padding: "10px 20px", borderRadius: 8, backgroundColor: "#000", color: "white", border: "none", cursor: "pointer" }}
          >
            Start Flow (Dev Mode)
          </button>
        </div>
      ) : null}
      {isConnected ? (
        step === "select" ? (
          <TrickOrTreatSelector />
        ) : step === "lore" ? (
          <LorePage />
        ) : step === "mint" ? (
          <NftMintPage expectedChainId={42161} />
        ) : (
          <SuccessPage />
        )
      ) : !isDevMode ? (
        <div>Please open this Mini App inside a Farcaster client to auto-connect your wallet.</div>
      ) : null}
      <div style={{ marginTop: 24, opacity: 0.7, fontSize: 12, textAlign: "center" }}>
        {inMiniApp ? "Running in Farcaster Mini App" : "Running in browser (dev)"} · Chain ID: {chainId ?? "-"}
        {address && <div>Address: {address.slice(0, 6)}...{address.slice(-4)}</div>}
      </div>
    </div>
  );
}


