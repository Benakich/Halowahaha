import React, { useMemo } from "react";
import { useFlow } from "../state/flow";

export function LorePage(): JSX.Element {
  const { choice, next } = useFlow();

  const lore = useMemo(() => {
    if (choice === "trick") {
      return {
        title: "The Cackling Candle",
        text: "In the shadow of the full moon, the candle flickers with mischief, luring the brave to a night of delightful frights.",
        image: "/trick.png"
      };
    }
    return {
      title: "The Kindred Cauldron",
      text: "Sweet whispers rise from the cauldron, promising a treat for the pure of heart—and a smile for all who dare.",
      image: "/treat.png"
    };
  }, [choice]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <img src={lore.image} alt="lore" style={{ width: "100%", borderRadius: 12 }} />
      <h2>{lore.title}</h2>
      <p>{lore.text}</p>
      <button onClick={next} style={{ padding: "10px 14px", borderRadius: 8 }}>Next</button>
    </div>
  );
}



