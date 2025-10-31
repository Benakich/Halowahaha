import React, { useEffect, useState } from "react";
import { useFlow } from "../state/flow";
import { fetchNftMetadata } from "../lib/highlight";

interface Props {
  expectedChainId: number; // Arbitrum: 42161
}

// Get Highlight collection ID based on user choice
function getCollectionId(choice: "trick" | "treat"): string {
  return choice === "trick" 
    ? "6904685fac91df60bf5dd8a9" 
    : "69046d34ac91df60bf5dd8ac";
}

export function NftMintPage({ expectedChainId }: Props): JSX.Element {
  const { choice } = useFlow();
  const [showMintWidget, setShowMintWidget] = useState(false);
  const [loading, setLoading] = useState(true);
  const [metaError, setMetaError] = useState<string | null>(null);
  const [meta, setMeta] = useState<Awaited<ReturnType<typeof fetchNftMetadata>> | null>(null);

  useEffect(() => {
    if (!choice) return;
    setLoading(true);
    fetchNftMetadata(choice)
      .then((m) => setMeta(m))
      .catch((e) => setMetaError(e?.message ?? "Failed to load metadata"))
      .finally(() => setLoading(false));
  }, [choice]);

  const handleMintClick = () => {
    if (!choice) return;
    setShowMintWidget(true);
  };

  // Listen for mint success messages from Highlight iframe (optional)
  useEffect(() => {
    if (!showMintWidget) return;

    const handleMessage = (event: MessageEvent) => {
      // Verify origin for security
      if (event.origin !== "https://highlight.xyz") return;
      
      // Check if Highlight sends success messages (format may vary)
      if (event.data?.type === "mint_success" || event.data?.mintSuccess) {
        // eslint-disable-next-line no-console
        console.log("Mint successful from Highlight widget");
        // Optionally close widget or show success message
        // setShowMintWidget(false);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [showMintWidget]);

  if (loading) return <div>Loading NFT…</div>;
  if (metaError) return <div style={{ color: "red" }}>{metaError}</div>;
  if (!meta || !choice) return <div>Metadata unavailable.</div>;

  const collectionId = getCollectionId(choice);
  const mintUrl = `https://highlight.xyz/mint/${collectionId}`;

  return (
    <>
      {showMintWidget ? (
        // Mint Widget Overlay
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "600px",
              height: "100%",
              maxHeight: "80vh",
              backgroundColor: "white",
              borderRadius: "12px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowMintWidget(false)}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                zIndex: 1001,
                background: "rgba(0, 0, 0, 0.6)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                cursor: "pointer",
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
              }}
              aria-label="Close mint widget"
            >
              ×
            </button>

            {/* Highlight Mint Widget Iframe */}
            <iframe
              src={mintUrl}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                borderRadius: "12px",
                flex: 1,
              }}
              allow="payment"
              title="Highlight Mint Widget"
              loading="eager"
            />
          </div>
        </div>
      ) : (
        // Main Content
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <img src={meta.image} alt={meta.name} style={{ width: "100%", borderRadius: 12 }} />
          <h2>{meta.name}</h2>
          <p>{meta.description}</p>
          <button
            onClick={handleMintClick}
            style={{
              padding: "12px 24px",
              borderRadius: 8,
              fontSize: "16px",
              fontWeight: "bold",
              backgroundColor: "#000",
              color: "white",
              border: "none",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Mint Now
          </button>
        </div>
      )}
    </>
  );
}


