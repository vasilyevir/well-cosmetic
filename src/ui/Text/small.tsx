import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface TypographySmallProps {
  className?: string;
}

export function TypographySmall({ children, className }: PropsWithChildren<TypographySmallProps>) {
  return <small className={cn("text-sm font-medium leading-none", className)}>{children}</small>;
}
