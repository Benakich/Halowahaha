import { create } from "zustand";

export type Choice = "trick" | "treat" | null;
export type Step = "connect" | "select" | "lore" | "mint" | "success";

interface FlowState {
  step: Step;
  choice: Choice;
  setChoice: (choice: Exclude<Choice, null>) => void;
  next: () => void;
  reset: () => void;
}

export const useFlow = create<FlowState>((set, get) => ({
  step: "connect",
  choice: null,
  setChoice: (choice) => set({ choice, step: "lore" }),
  next: () => {
    const step = get().step;
    if (step === "connect") set({ step: "select" });
    else if (step === "select") set({ step: "lore" });
    else if (step === "lore") set({ step: "mint" });
    else if (step === "mint") set({ step: "success" });
  },
  reset: () => set({ step: "select", choice: null })
}));



