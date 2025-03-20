import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { TypographyP } from "@/ui/Text";
import { cn } from "@/lib/utils";

interface AmountControllerProps {
  onDecrement: () => void;
  onIncrement: () => void;
  value: number;
  className?: string;
}

export const AmountController = ({
  onDecrement,
  value,
  onIncrement,
  className,
}: AmountControllerProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-min gap-2 bg-gray-400/30 rounded-lg p-0",
        className,
      )}
    >
      <Button variant="ghost" onClick={onDecrement}>
        <MinusIcon />
      </Button>
      <TypographyP className="w-4">{value}</TypographyP>
      <Button variant="ghost" onClick={onIncrement}>
        <PlusIcon />
      </Button>
    </div>
  );
};
