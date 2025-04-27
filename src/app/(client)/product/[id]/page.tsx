import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getProductID } from "@/api";
import Image from "next/image";
import { TypographyLarge, TypographyP } from "@/ui/Text";
import { Sidebar } from "@/app/(client)/product/[id]/Sidebar";

export default async function PageBrand({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { brand, product, category } = await getProductID({ id });

  return (
    <div className="flex flex-col gap-4 md:gap-16">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Главная</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/brand/${brand.id}`}>{brand.name}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/category/${category.id}`}>{category.name}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-2 md:grid-cols-3 w-full h-full gap-8">
        <div className="col-span-2 row-span-2 relative w-full aspect-square overflow-hidden rounded-lg">
          <Image src={product?.image || ""} alt={product?.name} fill />
        </div>
        <div className="w-full h-full flex flex-col bg-gray-400/30 p-8 rounded-lg row-start-3 md:row-start-1 col-start-1 col-span-2 md:col-span-1 md:col-start-3">
          <Sidebar product={product} />
        </div>
        <div className="md:col-span-3 col-span-2 grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4  bg-gray-800/60 rounded-2xl p-4">
          <div className="flex w-full justify-between">
            <TypographyP>Код товара</TypographyP>
            <TypographyP>{product?.article || ""}</TypographyP>
          </div>
          <div className="flex w-full justify-between">
            <TypographyP>Страна</TypographyP>
            <TypographyP>{product?.country || ""}</TypographyP>
          </div>
          <div className="flex w-full justify-between">
            <TypographyP>Объем</TypographyP>
            <TypographyP>{product?.volume || ""}</TypographyP>
          </div>
          <div className="flex w-full justify-between">
            <TypographyP>Средства</TypographyP>
            <TypographyP>{product?.type_product || ""}</TypographyP>
          </div>
        </div>
        <div className="md:col-span-3 col-span-2">
          <TypographyLarge>{product?.description}</TypographyLarge>
        </div>
      </div>
    </div>
  );
}
