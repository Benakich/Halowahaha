// Placeholder for integrating Highlight (or equivalent) backend.
// Replace the URLs and response parsing with your actual backend/contract details.

export interface NftMetadata {
  image: string;
  name: string;
  description: string;
  collectionId: string;
}

export async function fetchNftMetadata(choice: "trick" | "treat"): Promise<NftMetadata> {
  // Example (recommended): call your backend
  // const res = await fetch(`/api/metadata?choice=${choice}`);
  // return await res.json();

  if (choice === "trick") {
    return {
      image: "/trick-nft.png",
      name: "Trick Spirit",
      description: "A mischievous on-chain wisp.",
      collectionId: "6904685fac91df60bf5dd8a9"
    };
  }
  return {
    image: "/treat.png",
    name: "Treat",
    description: "A delightful on-chain companion.",
    collectionId: "69046d34ac91df60bf5dd8ac"
  };
}


