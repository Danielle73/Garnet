export type FlowType = "light" | "medium" | "heavy";

export type FlowOption = {
  value: FlowType;
  label: string;
  droplets: number;
};

export const flows: FlowOption[] = [
  { value: "light", label: "Light", droplets: 1 },
  { value: "medium", label: "Medium", droplets: 2 },
  { value: "heavy", label: "Heavy", droplets: 3 },
];