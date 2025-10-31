import React from "react";
import { useFlow } from "../state/flow";
import { sdk } from "../lib/farcaster";

export function SuccessPage(): JSX.Element {
  const { reset } = useFlow();

  const onShare = async () => {
    try {
      await sdk.actions.composeCast({
        text: "I just minted my NFT on Hallowahahahahaha! Try it out: https://your-domain.example"
      });
    } catch (e) {
      // noop: user may cancel or client may not support composeCast in browser dev
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
      <h2>Congratulations, you minted your NFT!</h2>
      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={reset} style={{ padding: "10px 14px", borderRadius: 8 }}>Start Over</button>
        <button onClick={onShare} style={{ padding: "10px 14px", borderRadius: 8 }}>Share</button>
      </div>
    </div>
  );
}



