"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CardProduct } from "@/components/cards/CardProduct";
import { getProducts, ProductMutatedType } from "@/api";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";

interface PageCategoryProps {
  brand_name: string;
  id_brand: string;
  category_name: string;
  results: ProductMutatedType[];
  isEditable?: boolean;
}

export const PageCategory = ({
  id_brand,
  brand_name,
  category_name,
  results,
  isEditable,
}: PageCategoryProps) => {
  const { id } = useParams<{ id: string }>();
  const [categories, setCategories] = useState(results);
  const prefix = isEditable ? "admin/" : "";
  const root = isEditable ? "/admin/brand" : "/";

  const updateCategories = async () => {
    const data = await getProducts({ idCategory: id });

    setCategories(data.results);
  };

  return (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex w-full justify-between items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={root}>Главная</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${prefix}brand/${id_brand}`}>{brand_name}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{category_name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button asChild>
          <Link href="/admin/product/create">Создать</Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-8">
        {categories.map((product) => (
          <CardProduct
            {...product}
            key={product.id}
            isEditable={isEditable}
            revalidate={updateCategories}
          />
        ))}
      </div>
    </div>
  );
};
