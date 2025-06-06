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
    <div className="flex flex-col gap-4">
      <div className="flex w-full justify-between items-center flex-wrap gap-4">
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
        {isEditable && (
          <Button asChild>
            <Link href="/admin/product/create" className="w-full md:w-max">
              Создать
            </Link>
          </Button>
        )}
      </div>
      <div className="cards-container gap-2">
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
