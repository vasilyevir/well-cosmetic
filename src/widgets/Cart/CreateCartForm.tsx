"use client";

import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useCartStore } from "@/providers/cart-store-provider";
import { CardCart } from "@/components/cards/CardCart";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { DeliveryCart, PaymentCart } from "@/widgets/Cart/type";
import { Button } from "@/components/ui/button";
import { TypographyLarge } from "@/ui/Text";
import { createSell } from "@/api/sell";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  payment: z.enum([PaymentCart.COURIER, PaymentCart.SBER, PaymentCart.PICKUP]),
  delivery: z.enum([
    DeliveryCart.SDEK,
    DeliveryCart.PICKUP,
    DeliveryCart.BOXBERRY,
    DeliveryCart.PICKUP,
  ]),
  phone: z.string(),
  name: z.string(),
  second_name: z.string(),
});
type FormSchemaType = z.infer<typeof formSchema>;

export const CreateCartForm = () => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      second_name: "",
      phone: "",
    },
  });
  const router = useRouter();
  const { cart, priceTotal, clearCart } = useCartStore((store) => store);
  const onSubmit = async ({ name, second_name, payment, delivery, phone }: FormSchemaType) => {
    const result = await createSell({
      name,
      second_name,
      payment,
      delivery,
      phone,
      products: cart,
    });

    if (result.id) {
      router.push("/");
      clearCart();
      return;
    }
  };

  return (
    <div className="grid grid-cols-[1fr_1fr] gap-4">
      <Card className="h-min">
        <CardContent className="w-full flex">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
              <FormField
                control={form.control}
                name="payment"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Выбор оплаты</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={PaymentCart.PICKUP} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Оплата при самовывозе по г. Санкт-Петербург (Наличными)
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={PaymentCart.SBER} />
                          </FormControl>
                          <FormLabel className="font-normal">Оплата на карту «Сбербанк»</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={PaymentCart.COURIER} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Оплата курьеру по г. Санкт-Петербург (Наличными)
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator />
              <FormField
                control={form.control}
                name="delivery"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Выбор доставки</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={DeliveryCart.SDEK} />
                          </FormControl>
                          <FormLabel className="font-normal">Сдэк (1-15 дней)</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={DeliveryCart.PICKUP} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Самовывоз в г. Санкт-Петербург, ст. метро "Пионерская", аллея
                            Поликарпова д.2
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={DeliveryCart.BOXBERRY} />
                          </FormControl>
                          <FormLabel className="font-normal">Boxberry</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={DeliveryCart.COURIER} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Курьер компании в г. Санкт-Петербург
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имя</FormLabel>
                    <FormControl>
                      <Input placeholder="Имя" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="second_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Фамилия</FormLabel>
                    <FormControl>
                      <Input placeholder="Фамилия" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Номер телефона</FormLabel>
                    <FormControl>
                      <Input placeholder="Номер телефона" type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator />
              <TypographyLarge className="text-2xl">{priceTotal} ₽</TypographyLarge>
              <Button>Оформить заказ</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="h-full">
        <ScrollArea className="h-[655px]">
          <div className="w-full flex flex-col gap-4">
            {cart.map((el) => (
              <CardCart {...el} key={el.id} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
