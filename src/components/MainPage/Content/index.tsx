import Link from "next/link";
import { TypographyH1 } from "@/ui/Text";
import { TypographyH2 } from "@/ui/Text/h2";
import { TypographyList } from "@/ui/Text/list";
import Image from "next/image";
import { MutatedBrandType } from "@/api/brand";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";

interface MainPageContentProps {
  brands: Array<MutatedBrandType>;
  isEditable?: boolean;
}

export const MainPageContent = ({ brands, isEditable }: MainPageContentProps) => {
  return (
    <div className="p-8 flex flex-col gap-16 --font-sans">
      <div className="flex w-full items-center justify-between">
        <TypographyH1>Выбор бренда</TypographyH1>
        {isEditable && (
          <Button asChild>
            <Link href="/admin/brand/create">Создать</Link>
          </Button>
        )}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {brands?.map((brand) => (
          <div className="flex flex-col gap-4" key={`brand_${brand.id}`}>
            <div className="flex flex-col gap-4">
              <div className="w-full aspect-square relative">
                <Image src={brand.image} alt={brand.name} fill className="rounded-lg" />
                {isEditable && (
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-3 right-3"
                    asChild
                  >
                    <Link href={`/admin/edit/${brand.id}`}>
                      <PencilIcon className="text-white" />
                    </Link>
                  </Button>
                )}
              </div>
              <Link href={`/brand/${brand.id}`} className="hover:text-gray-500">
                <TypographyH2>
                  {brand.name} <sup>{brand.amount}</sup>
                </TypographyH2>
              </Link>
            </div>
            <TypographyList>
              {brand.categories?.map((category) => (
                <li key={`category_${category.id}`}>
                  <Link href={`/category/${category.id}`} className="hover:text-gray-500">
                    {category.name}
                  </Link>
                </li>
              ))}
            </TypographyList>
          </div>
        ))}
      </div>
    </div>
  );
};
