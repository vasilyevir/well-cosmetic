"use client";

import { ProductType } from "@/api";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { TypographyLarge } from "@/ui/Text";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/providers/cart-store-provider";
import { PriceWithSale } from "@/components/cards/Price/PriceWithSale";
import { Price } from "@/components/cards/Price/Price";
import Link from "next/link";
import { AmountController } from "@/components/AmountController";

export const CardProduct = (productType: ProductType) => {
  const { name, price, price_with_sale, image, id } = productType;
  const { addCartItem, sellCartItem, cart } = useCartStore((state) => state);

  const onBuy = () => {
    addCartItem(productType);
  };
  const onSell = () => {
    sellCartItem(id);
  };

  const productInCart = cart.find((el) => el.id === productType.id);

  return (
    <Card className="justify-stretch pt-0">
      <CardHeader className="relative aspect-square w-full overflow-hidden">
        <Image src={image || ""} alt={name} fill className="rounded-lg" />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex">
          {price_with_sale ? (
            <PriceWithSale price={price} price_with_sale={price_with_sale} />
          ) : (
            <Price price={price} />
          )}
        </div>
        <TypographyLarge>{name}</TypographyLarge>
      </CardContent>
      <CardFooter>
        <div className="flex gap-4 align-middle justify-between w-full">
          <Button variant="secondary" size="lg" asChild>
            <Link href={`/product/${productType.id}`}>Подробнее</Link>
          </Button>
          {productInCart ? (
            <AmountController
              value={productInCart.amountSelected}
              onDecrement={onSell}
              onIncrement={onBuy}
            />
          ) : (
            <Button size="lg" onClick={onBuy}>
              Купить
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
