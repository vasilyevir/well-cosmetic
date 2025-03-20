"use client";

import { useCartStore } from "@/providers/cart-store-provider";
import { ProductMutatedType } from "@/api";
import { AmountController } from "@/components/AmountController";
import { Button } from "@/components/ui/button";
import { TypographyLarge } from "@/ui/Text";

interface SidebarProps {
  product: ProductMutatedType;
}

export const Sidebar = ({ product }: SidebarProps) => {
  const { cart, sellCartItem, addCartItem } = useCartStore((store) => store);

  const ProductInCart = cart.find((el) => el.id === product?.id);
  const onBuy = () => {
    addCartItem(product);
  };
  const onSell = () => {
    sellCartItem(product.id);
  };

  return (
    <div className="flex flex-col gap-4">
      <TypographyLarge className="text-4xl">{product?.price} ₽</TypographyLarge>
      <div>
        {ProductInCart ? (
          <AmountController
            value={ProductInCart.amountSelected}
            onDecrement={onSell}
            onIncrement={onBuy}
            className="justify-between"
          />
        ) : (
          <Button onClick={onBuy}>Купить</Button>
        )}
      </div>
    </div>
  );
};
