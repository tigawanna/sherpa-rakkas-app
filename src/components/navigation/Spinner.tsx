import clsx from "clsx";
import { cn } from "../shadcn/lib/utils";
import { twMerge } from "tailwind-merge";

interface SpinnerProps {
size?:string
variant?:"loading-dots"|"loading-bars"|"loading-spinner"|"loading-ring"|"loading-ball"|"loading-infinity"
}

export function Spinner({size,variant="loading-infinity"}:SpinnerProps){
return (
  <div className="flex h-full w-full items-center justify-center p-2">
    <span
      style={{ width: size ?? "50px" }}
      className={clsx("loading loading-spinner", variant)}
    ></span>
  </div>
);
}



export function Spinner2({ size }: SpinnerProps) {
  const variant =
    size === "dots"
      ? "loading-dots"
      : size === "bars"
      ? "loading-bars"
      : size === "spinner"
      ? "loading-spinner"
      : size === "ring"
      ? "loading-ring"
      : size === "ball"
      ? "loading-ball"
      : "loading-infinity";

  return (
    <div className="flex h-full w-full items-center justify-center p-2">
      <span
        style={{ width: size ?? "50px" }}
        className={clsx("loading", variant, "text-warning")}
      ></span>
    </div>
  );
}
