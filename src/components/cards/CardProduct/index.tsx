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
import { CopyIcon, PencilIcon, TrashIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteProduct } from "@/api/product/createProduct";

export const CardProduct = (
  productType: ProductType & {
    isEditable?: boolean;
    revalidate: () => Promise<void>;
  },
) => {
  const { name, price, price_with_sale, image, id, revalidate } = productType;
  const { addCartItem, sellCartItem, cart } = useCartStore((state) => state);

  const onBuy = () => {
    addCartItem(productType);
  };
  const onSell = () => {
    sellCartItem(id);
  };

  const productInCart = cart.find((el) => el.id === productType.id);

  const onDelete = async () => {
    await deleteProduct({ id });
    await revalidate();
  };

  return (
    <Card className="justify-stretch pt-0">
      <CardHeader className="relative aspect-square w-full overflow-hidden">
        <Image src={image || ""} alt={name} fill className="rounded-lg" />
        {productType.isEditable && (
          <div className="absolute right-3 top-3 flex gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                  <TrashIcon />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Вы уверенны?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Это действие приведет к удалению продукта
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Отмена</AlertDialogCancel>
                  <AlertDialogAction onClick={onDelete}>Продолжить</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button asChild size="icon" variant="secondary">
              <Link href={`/admin/product/${id}/edit`}>
                <PencilIcon />
              </Link>
            </Button>
            <Button asChild size="icon" variant="secondary">
              <Link href={`/admin/product/${id}/copy`}>
                <CopyIcon />
              </Link>
            </Button>
          </div>
        )}
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
