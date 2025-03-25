import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface TypographyPProps {
  className?: string;
}
export function TypographyP({ children, className }: PropsWithChildren<TypographyPProps>) {
  return <p className={cn("leading-7", className)}>{children}</p>;
}
