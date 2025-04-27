"use client";

import { Separator } from "@/components/ui/separator";
import { TypographyP } from "@/ui/Text";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="flex w-full flex-col bg-gray-800/60">
      <Separator />
      <div className="flex flex-col w-full gap-4 p-4">
        <TypographyP>Интернет-магазин "Well-cosmetics"</TypographyP>
        <TypographyP>Россия, Санкт-Петербург, Коломяжский проспект</TypographyP>
        <TypographyP className="text-blue-400">
          <Link href="tel:+7 (921) 710-55-11">+7 (921) 710-55-11</Link>
        </TypographyP>
        <div className="flex flex-col gap-1">
          <TypographyP>Пн-Пт 10:00 - 18:00 без перерывов;</TypographyP>
          <TypographyP>Сб, Вс выходные</TypographyP>
        </div>
      </div>
    </div>
  );
};
