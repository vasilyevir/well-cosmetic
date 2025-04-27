"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { TypographyLarge } from "@/ui/Text";
import { CategoryMutatedType, getCategories } from "@/api/category";
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
import { deleteCategory } from "@/api/category/createCategory";
import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryKeyEnum } from "@/api/queryKey.enum";
import { BrandType } from "@/api";

interface BrandPageProps {
  brand_name: string;
  categories: {
    results: CategoryMutatedType[];
    brand: BrandType[];
  };
  isEditable?: boolean;
}

export default function BrandPage({ categories, brand_name, isEditable }: BrandPageProps) {
  const prefix = isEditable ? "/admin/brand" : "";
  const { id: idBrand } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryFn: async () => getCategories({ id: idBrand }),
    queryKey: [QueryKeyEnum.Category, { id: idBrand }],
    initialData: categories,
  });

  const { mutate } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.Category, { id: idBrand }] });
    },
  });

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex w-full justify-between items-center flex-wrap gap-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={prefix}>Главная</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{brand_name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {isEditable && (
          <Button asChild>
            <Link href={`/admin/category/create`} className="w-full md:w-max">
              Создать
            </Link>
          </Button>
        )}
      </div>
      <div className="cards-container grid-cols-4 gap-8">
        {data.results.map(({ id, image, name }) => (
          <Card className="h-full" key={id}>
            <CardHeader>
              <div className="w-full aspect-square relative">
                <Link key={id} href={isEditable ? `/admin/category/${id}` : `/category/${id}`}>
                  <Image src={image || ""} alt={name} fill className="rounded-lg" />
                </Link>
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
                          <AlertDialogAction onClick={() => mutate({ id })}>
                            Продолжить
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Button asChild variant="secondary" size="icon">
                      <Link href={`/admin/category/${id}/edit`}>
                        <PencilIcon />
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Link href={isEditable ? `/admin/category/${id}` : `/category/${id}`}>
                <TypographyLarge>{name}</TypographyLarge>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
