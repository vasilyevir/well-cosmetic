import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FaShoppingCart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/providers/cart-store-provider";
import { CardCart } from "@/components/cards/CardCart";
import { TypographyLarge } from "@/ui/Text";
import { Price } from "@/components/cards/Price/Price";

const EmptyList = () => {
  return (
    <div className="flex justify-center p-8 border-2 rounded-lg">
      <TypographyLarge>Пустая карзина</TypographyLarge>
    </div>
  );
};

export const Cart = () => {
  const { cart, priceTotal, clearCart } = useCartStore((state) => state);

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
        <div className="flex flex-col gap-4">
          {cart.length ? cart.map((item) => <CardCart {...item} key={item.id} />) : <EmptyList />}
        </div>
        <div className="flex items-center w-full justify-between">
          <Price price={priceTotal} />
          <Button disabled={!priceTotal}>Оформить</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
