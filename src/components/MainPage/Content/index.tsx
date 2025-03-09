import Link from "next/link";
import {TypographyH1} from "@/ui/Text";
import {TypographyH2} from "@/ui/Text/h2";
import {TypographyList} from "@/ui/Text/list";
import Image from "next/image";
import {MutatedBrandType} from "@/api/brand";

interface MainPageContentProps {
  brands: Array<MutatedBrandType>
}

export const MainPageContent = ({ brands } : MainPageContentProps) => {
  return (
    <div className="p-8 flex flex-col gap-16 --font-sans">
      <TypographyH1>Выбор бренда</TypographyH1>
      <div className="grid grid-cols-3 gap-4">
        {brands?.map((brand) => (
          <div className="flex flex-col gap-4" key={`brand_${brand.id}`}>
            <Link
              href={`/brand/${brand.id}`}
              className="hover:text-gray-500 flex flex-col gap-4"
            >
              <div className="w-full aspect-square relative">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="rounded-lg"
                />
              </div>
              <TypographyH2>
                {brand.name}
              </TypographyH2>
            </Link>
            <TypographyList>
              {brand.categories?.map((category) => (
                <li key={`category_${category.id}`}>
                  <Link href={`/brand/${brand.id}/category/${category.id}`} className="hover:text-gray-500">
                    {category.name}
                  </Link>
                </li>
              ))}
            </TypographyList>
          </div>
        ))}
      </div>
    </div>
  )
}