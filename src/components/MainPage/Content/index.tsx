"use client";

import Link from "next/link";
import { TypographyH1 } from "@/ui/Text";
import { TypographyH2 } from "@/ui/Text/h2";
import { TypographyList } from "@/ui/Text/list";
import Image from "next/image";
import { GetBrand, MutatedBrandType } from "@/api/brand";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
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
import { deleteBrand } from "@/api/brand/createBrand";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryKeyEnum } from "@/api/queryKey.enum";

interface MainPageContentProps {
  brands: Array<MutatedBrandType>;
  isEditable?: boolean;
}

export const MainPageContent = ({ brands, isEditable }: MainPageContentProps) => {
  const prefix = isEditable ? "admin/" : "";
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryFn: GetBrand,
    queryKey: [QueryKeyEnum.Brand],
    initialData: brands,
  });

  const { mutate } = useMutation({
    mutationFn: deleteBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.Brand] });
    },
  });
  const onDelete = async (id: string) => {
    mutate(id);
  };

  return (
    <div className="p-8 flex flex-col gap-16 --font-sans">
      <div className="flex w-full items-center justify-between">
        <TypographyH1>Выбор бренда</TypographyH1>
        {isEditable && (
          <Button asChild>
            <Link href={`/${prefix}brand/create`}>Создать</Link>
          </Button>
        )}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {data?.map((brand) => (
          <div className="flex flex-col gap-4" key={`brand_${brand.id}`}>
            <div className="flex flex-col gap-4">
              <div className="w-full aspect-square relative">
                <Image src={brand.image} alt={brand.name} fill className="rounded-lg" />
                {isEditable && (
                  <div className="absolute top-3 right-3 flex gap-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon" className="cursor-pointer">
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
                          <AlertDialogAction onClick={() => onDelete(brand.id)}>
                            Продолжить
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Button variant="secondary" size="icon" asChild>
                      <Link href={`/${prefix}brand/edit/${brand.id}`}>
                        <PencilIcon className="text-white" />
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
              <Link href={`/${prefix}brand/${brand.id}`} className="hover:text-gray-500">
                <TypographyH2>
                  {brand.name} <sup>{brand.amount}</sup>
                </TypographyH2>
              </Link>
            </div>
            <TypographyList>
              {brand.categories?.map((category) => (
                <li key={`category_${category.id}`}>
                  <Link href={`/${prefix}category/${category.id}`} className="hover:text-gray-500">
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
