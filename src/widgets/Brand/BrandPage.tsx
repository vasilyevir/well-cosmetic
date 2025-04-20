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
import { useState } from "react";
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

interface BrandPageProps {
  brand_name: string;
  categories: CategoryMutatedType[];
  isEditable?: boolean;
}

export default function BrandPage({ categories, brand_name, isEditable }: BrandPageProps) {
  const [categoriesList, setCategories] = useState(categories);
  const prefix = isEditable ? "/admin/brand" : "";
  const { id: idBrand } = useParams<{ id: string }>();

  const onDelete = async (idCategory: string) => {
    await deleteCategory({ id: idCategory });

    const categories = await getCategories({ id: idBrand });

    setCategories(categories.results);
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex w-full justify-between items-center">
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
            <Link href={`/admin/category/create`}>Создать</Link>
          </Button>
        )}
      </div>
      <div className="cards-container grid-cols-4 gap-8">
        {categoriesList.map(({ id, image, name }) => (
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
                          <AlertDialogAction onClick={() => onDelete(id)}>
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
