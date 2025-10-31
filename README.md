<<<<<<< HEAD
# Halowahaha
=======
## Hallowahahahahaha — Farcaster Mini App

This is a Farcaster-compatible Mini App implementing the flow:

Connect Wallet → Trick or Treat → Lore → NFT Details → Mint → Success (Start Over / Share)

### Tech
- React + Vite + TypeScript
- wagmi + viem with Farcaster Mini App connector
- Farcaster Mini App SDK for environment detection + composeCast

### Quick Start
1. Install deps:
   ```bash
   pnpm i # or npm i / yarn
   ```
2. Run dev:
   ```bash
   pnpm dev
   ```
3. Build:
   ```bash
   pnpm build && pnpm preview
   ```

### Farcaster Mini App Initialization
- The SDK is created in `src/lib/farcaster.ts` and `sdk.actions.ready()` is called on app load.
- We detect Mini App context with `sdk.isInMiniApp()` and show a banner in `App.tsx`.

### Wallet Config (wagmi)
- Config lives in `src/wagmi/config.ts` using Arbitrum (42161) and `@farcaster/miniapp-wagmi-connector`.
- Auto-connect via Farcaster wallet when run inside a Mini App.

### Flow Components
- `ConnectWallet`: Connect using wagmi connectors (Farcaster connector in-app).
- `TrickOrTreatSelector`: Store choice in global state.
- `LorePage`: Shows themed image/text per choice.
- `NftMintPage`: Fetches metadata, enforces Arbitrum chain, selects Trick/Treat contract, executes mint, handles states.
- `SuccessPage`: Allows restarting and sharing via `sdk.actions.composeCast`.

### Mint Backend (Highlight or Equivalent) — Single Contract with Choice Args
Replace the stub in `src/lib/highlight.ts` to fetch per-choice:
- `image`, `name`, `description`
- `feeWei` (mint fee in wei)
- `contractAddress` (same contract on Arbitrum)
- `functionName`, `abi`, `args`

If Trick and Treat share the same contract, use choice-specific args (e.g., `saleId` or `optionId`) to differentiate which path to mint. Update `functionName` and `args` to exactly match your ABI.

If calling Highlight directly, add an API route or serverless function to keep secrets off the client, then have the client call your route. Use `useWriteContract` with the provided config to perform the on-chain write.

### Chain Enforcement
- `NftMintPage` checks current `chainId` and disables Mint if not on Arbitrum (42161). A quick-switch button calls `useSwitchChain`.

### Farcaster Manifest
Host `/.well-known/farcaster.json` at your domain root with fields:
- `version`, `name`, `homeUrl`, `iconUrl`, `accountAssociation`

Update placeholders:
- Replace `https://your-domain.example` with your real domain.
- Generate `accountAssociation` EIP-712 signature per Mini Apps docs and update the `address`, `timestamp`, and `signature` fields.
- `frame.requiredChains` is set to Arbitrum (eip155:42161); adjust if needed.

### Deploy
Any static host works (e.g., Vercel, Netlify, Cloudflare Pages). Ensure:
- The app is served at your domain root
- `/.well-known/farcaster.json` is publicly reachable
- `icon.png` and any images (`public/` or external) resolve

### Register & Test in Farcaster
1. Visit the Farcaster Mini Apps docs to register the app and verify the manifest.
2. Open your app inside a Farcaster client supporting Mini Apps.
3. Confirm wallet auto-connect, flow progression, chain enforcement, mint works, and Share opens compose UI.

### Environment Notes
- Local dev runs in browser; some Farcaster actions may no-op outside the Mini App.
- Use Base testnet or a dev collection for testing; then switch to Base mainnet.


>>>>>>> e650f15 (Initial commit: Hallowahahaha miniapp)
