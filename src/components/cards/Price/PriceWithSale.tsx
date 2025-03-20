import { TypographyLarge, TypographyP } from "@/ui/Text";

export const PriceWithSale = ({
  price,
  price_with_sale,
}: {
  price: number;
  price_with_sale: number;
}) => {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex px-2 backdrop-blur-xs bg-red-400/50 rounded-lg  w-min">
        <TypographyLarge className="">{price_with_sale + "₽ "}</TypographyLarge>
      </div>
      <TypographyP className="line-through m-0 ">{price + "₽ "}</TypographyP>
    </div>
  );
};
