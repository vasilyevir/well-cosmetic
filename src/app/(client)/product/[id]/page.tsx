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
import { Separator } from "@/components/ui/separator";

export default async function PageBrand({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { brand, product, category } = await getProductID({ id });

  return (
    <div className="flex flex-col p-8 gap-16">
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
      <div className="grid grid-cols-3 w-full h-full gap-8">
        <div className="col-span-2 row-span-2 relative w-full aspect-square overflow-hidden rounded-lg">
          <Image src={product?.image || ""} alt={product?.name} fill />
        </div>
        <div className="w-full h-full flex flex-col bg-gray-400/30 p-8 rounded-lg">
          <Sidebar product={product} />
        </div>
        <div className="col-span-3 grid grid-cols-[1fr_min-content_1fr] gap-4  bg-gray-800/60 rounded-2xl p-4">
          <div className="flex w-full justify-between">
            <TypographyP>Код товара</TypographyP>
            <TypographyP>{product?.article || ""}</TypographyP>
          </div>
          <Separator orientation="vertical" />
          <div className="flex w-full justify-between">
            <TypographyP>Страна</TypographyP>
            <TypographyP>{product?.country || ""}</TypographyP>
          </div>
          <div className="flex w-full justify-between">
            <TypographyP>Объем</TypographyP>
            <TypographyP>{product?.volume || ""}</TypographyP>
          </div>
          <Separator orientation="vertical" />
          <div className="flex w-full justify-between">
            <TypographyP>Средства</TypographyP>
            <TypographyP>{product?.type_product || ""}</TypographyP>
          </div>
        </div>
        <div className="col-span-3">
          <TypographyLarge>{product?.description}</TypographyLarge>
        </div>
      </div>
    </div>
  );
}
