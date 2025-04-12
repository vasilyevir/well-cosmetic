"use client";

import { useQuery } from "@tanstack/react-query";
import { getSellID } from "@/api/sell";
import { useParams } from "next/navigation";
import { QueryKeyEnum } from "@/api/queryKey.enum";
import { SellRequest } from "@/api/sell/type";
import { TypographyLarge, TypographyP } from "@/ui/Text";
import { DeliveryDescription, PaymentDescription } from "@/constants/descriprion";
import { CardCart } from "@/components/cards/CardCart";
import { Tags } from "@/components/AdminSellContent/Tags";

interface SellProps {
  sell: SellRequest;
}

export const Sell = ({ sell }: SellProps) => {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery({
    queryFn: () => getSellID({ id }),
    queryKey: [QueryKeyEnum.Sell, `sell_${id}`],
    initialData: sell,
  });

  const leftCol = [
    {
      title: "Заказчик",
      data: `${data.name} ${data.second_name}`,
    },
    {
      title: "Телефон",
      data: `${data.phone}`,
    },
    {
      title: "Оплата",
      data: `${PaymentDescription[data.payment]}`,
    },
    {
      title: "Способ доставки",
      data: `${DeliveryDescription[data.delivery]}`,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-8">
        <TypographyLarge>Информация о заказе</TypographyLarge>
        <div className="flex flex-col gap-4">
          {leftCol.map(({ title, data }, id) => (
            <div className="grid grid-cols-2" key={id}>
              <TypographyP className="text-gray-400">{title}</TypographyP>
              <TypographyP>{data}</TypographyP>
            </div>
          ))}
        </div>
        <div>
          <TypographyLarge>Метки</TypographyLarge>
          <Tags notes={data.notes} sell_id={id} />
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <TypographyLarge>Состав заказ</TypographyLarge>
        <div className="flex flex-col gap-4">
          {data.products.map((product) => (
            <CardCart {...product} key={product.id} isReadOnly />
          ))}
        </div>
      </div>
    </div>
  );
};
