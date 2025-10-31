import React from "react";
import { useFlow } from "../state/flow";

export function TrickOrTreatSelector(): JSX.Element {
  const { setChoice } = useFlow();

  return (
    <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
      <button onClick={() => setChoice("trick")} style={{ padding: "12px 16px", borderRadius: 10 }}>🎃 Trick</button>
      <button onClick={() => setChoice("treat")} style={{ padding: "12px 16px", borderRadius: 10 }}>🍬 Treat</button>
    </div>
  );
}



