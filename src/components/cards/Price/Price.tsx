import { TypographyLarge } from "@/ui/Text";

export const Price = ({ price }: { price: number }) => {
  return (
    <div className="flex px-2 backdrop-blur-xs bg-green-400/50 rounded-lg w-min">
      <TypographyLarge>{price + "₽"}</TypographyLarge>
    </div>
  );
};
