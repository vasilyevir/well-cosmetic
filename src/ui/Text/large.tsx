import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface TypographyLargeProps {
  className?: string;
}

export function TypographyLarge({ children, className }: PropsWithChildren<TypographyLargeProps>) {
  console.log(children);
  return <div className={cn("text-lg font-semibold", className)}>{children}</div>;
}
