import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ProductCartType } from "@/store/cart";
import Image from "next/image";
import { TypographyLarge, TypographyP } from "@/ui/Text";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useCartStore } from "@/providers/cart-store-provider";

interface CardCartProps extends ProductCartType {
  isReadOnly?: boolean;
}

export const CardCart = ({ isReadOnly, ...product }: CardCartProps) => {
  const { image, name, id, price, price_with_sale, amountSelected } = product;
  const { addCartItem, sellCartItem, deleteCartItem } = useCartStore((state) => state);

  const onBuy = () => {
    addCartItem(product);
  };
  const onSell = () => {
    sellCartItem(id);
  };
  const onDelete = () => {
    deleteCartItem(id);
  };

  return (
    <Card className="w-full overflow-hidden relative">
      <CardContent className="grid grid-cols-[80px_1fr] w-full gap-4 overflow-hidden">
        <div className="relative size-10 h-20 w-full rounded-lg">
          <Image src={image || ""} alt={name} fill />
        </div>
        <div className="flex flex-col overflow-hidden w-full justify-between">
          <TypographyLarge className="w-full line-clamp-2 text-ellipsis">{name}</TypographyLarge>
        </div>
      </CardContent>
      {!isReadOnly ? (
        <CardFooter className="flex w-full justify-between gap-4">
          <TypographyLarge className="text-2xl">
            {(price_with_sale ? price_with_sale : price) * amountSelected}₽
          </TypographyLarge>
          <div className="flex gap-4">
            <Button variant="outline" size="icon" onClick={onDelete}>
              <TrashIcon />
            </Button>
            <div className="flex items-center justify-end gap-2 bg-gray-400/30 rounded-lg p-0">
              <Button variant="ghost" onClick={onSell}>
                <MinusIcon />
              </Button>
              <TypographyP className="w-4">{amountSelected}</TypographyP>
              <Button variant="ghost" onClick={onBuy}>
                <PlusIcon />
              </Button>
            </div>
          </div>
        </CardFooter>
      ) : (
        <CardFooter className="flex flex-col gap-4">
          <div className="flex w-full justify-between">
            <TypographyP>Цена:</TypographyP>
            <TypographyP className="font-bold">{product.price_with_sale} ₽/шт.</TypographyP>
          </div>
          <div className="flex w-full justify-between">
            <TypographyP>Колличество:</TypographyP>
            <TypographyP className="font-bold">{product.amountSelected} шт.</TypographyP>
          </div>
          <div className="flex w-full justify-between">
            <TypographyP>Сумма:</TypographyP>
            <TypographyP className="font-bold">
              {(price_with_sale ? price_with_sale : price) * amountSelected} ₽
            </TypographyP>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
