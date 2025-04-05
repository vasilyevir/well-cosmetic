import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FaShoppingCart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/providers/cart-store-provider";
import { CardCart } from "@/components/cards/CardCart";
import { TypographyLarge, TypographyP } from "@/ui/Text";
import { Price } from "@/components/cards/Price/Price";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const EmptyList = () => {
  return (
    <div className="flex justify-center p-8 border-2 rounded-lg">
      <TypographyLarge>Пустая карзина</TypographyLarge>
    </div>
  );
};
const MinimalTotalPrice = 3000;
export const Cart = () => {
  const { cart, priceTotal, clearCart } = useCartStore((state) => state);
  const [error, setError] = useState(false);
  const router = useRouter();

  const onBuy = () => {
    if (priceTotal >= MinimalTotalPrice) {
      router.push("/cart");
      return;
    }
    setError(true);
  };

  useEffect(() => {
    setError(false);
  }, [priceTotal]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <FaShoppingCart />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-120 flex flex-col gap-4">
        <div className="flex justify-between">
          <TypographyLarge>Корзина</TypographyLarge>
          <Button onClick={clearCart}>Очистить</Button>
        </div>
        <ScrollArea className="h-120">
          <div className="flex flex-col gap-4">
            {cart.length ? cart.map((item) => <CardCart {...item} key={item.id} />) : <EmptyList />}
          </div>
        </ScrollArea>
        {error && (
          <div>
            <TypographyP className="text-red-600">
              Стоимость заказа должна быть больше 3000₽
            </TypographyP>
          </div>
        )}
        <div className="flex items-center w-full justify-between">
          <Price price={priceTotal} />
          <Button disabled={!priceTotal} onClick={onBuy}>
            Оформить
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
