"use client";

import { useForm, useWatch } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FileLoader } from "@/components/FileLoader";
import { BrandType, ProductType } from "@/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { getCategories } from "@/api/category";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { createProduct, editProduct } from "@/api/product/createProduct";

import { getTypeProducts } from "@/api/type_product";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { QueryKeyEnum } from "@/api/queryKey.enum";
import { useDownloadImage } from "@/hooks/useDownloadImage";

const formSchema = z.object({
  name: z.string().nonempty("Введите название"),
  file_string: z.string(),
  file_blob: z.any().optional(),
  price: z.number().positive(),
  price_with_sale: z.string().optional(),
  description: z.string().nonempty(),
  amount: z.number(),
  id_brand: z.string().nonempty("Выберите бренд"),
  id_category: z.string().nonempty("Выберите категорию"),
  article: z.string().nonempty(""),
  type_product: z.string().nonempty("Выберите средство"),
  country: z.string().nonempty("Введите страну производства"),
  volume: z.string().nonempty("Введите объем"),
});
type FormSchemaType = z.infer<typeof formSchema>;

interface CreateProductForm {
  defaultValues?: ProductType & {
    id_brand: string;
  };
  brands: BrandType[];
}

export const CreateProductForm = ({ defaultValues, brands }: CreateProductForm) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id_brand: `${defaultValues?.id_brand || ""}`,
      id_category: `${defaultValues?.id_category || ""}`,
      name: defaultValues?.name || "",
      price: defaultValues?.price,
      file_string: defaultValues?.image || "",
      price_with_sale: defaultValues?.price_with_sale ? `${defaultValues?.price_with_sale}` : "0",
      description: defaultValues?.description || "",
      amount: defaultValues?.amount || 0,
      article: defaultValues?.article || "",
      type_product: `${defaultValues?.type_product || ""}`,
      volume: defaultValues?.volume || "",
      country: defaultValues?.country || "",
    },
  });

  const id_brand = useWatch({
    control: form.control,
    name: "id_brand",
  });

  const { data: typeProducts } = useQuery({
    queryFn: getTypeProducts,
    queryKey: [QueryKeyEnum.TypesProduct],
  });

  const { data: categories } = useQuery({
    queryFn: () => getCategories({ id: id_brand }),
    queryKey: [QueryKeyEnum.Category, id_brand],
    enabled: !!id_brand,
  });

  const { download } = useDownloadImage();

  const router = useRouter();

  useEffect(() => {
    form.resetField("id_category");
  }, [id_brand]);

  const onSubmit = async (data: FormSchemaType) => {
    const {
      name,
      amount,
      price_with_sale,
      price,
      description,
      id_category,
      file_string,
      file_blob,
    } = data;
    let results;
    const image = await download({ file_blob: file_blob, file_string });

    if (!defaultValues) {
      results = await createProduct({
        name,
        id_category,
        image,
        description,
        price,
        price_with_sale: price_with_sale ? Number(price_with_sale) : 0,
        amount,
      });
    } else {
      results = await editProduct({
        name,
        id_category,
        image,
        description,
        price,
        price_with_sale: price_with_sale ? Number(price_with_sale) : 0,
        amount,
        id: defaultValues.id,
      });
    }

    if (results) router.push(`/admin/category/${id_category}`);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <FormField
            control={form.control}
            name="id_brand"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Бренд</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {brands.map(({ id, name }) => (
                      <SelectItem value={`${id}`} key={id}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {categories && (
            <FormField
              control={form.control}
              name="id_category"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Категория</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="ВЫбери категорию" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.results.map(({ id, name }) => (
                        <SelectItem value={`${id}`} key={id}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя бренда</FormLabel>
                <FormControl>
                  <Input placeholder="Имя бренда" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Описание продукта</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Расскажите нам о вашем продукте"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ResizablePanelGroup direction="horizontal" className="gap-4">
            <ResizablePanel defaultSize={50}>
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Цена</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Цена продукта"
                        type="number"
                        {...field}
                        onChange={(el) => {
                          const value = el.target.value;
                          if (value === "") {
                            field.onChange(el.target.value);
                            return;
                          }
                          field.onChange(Number(el.target.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </ResizablePanel>
            <ResizablePanel defaultSize={50}>
              <FormField
                control={form.control}
                name="price_with_sale"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Цена со скидкой</FormLabel>
                    <FormControl>
                      <Input placeholder="Цена продукта" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
          <FileLoader />
          <div className="flex gap-4 items-end">
            <FormField
              control={form.control}
              name="type_product"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Средство</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {typeProducts?.data?.map(({ id, name }) => (
                        <SelectItem value={`${id}`} key={id}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button asChild>
              <Link href="/admin/type-product/create">
                <PlusIcon />
              </Link>
            </Button>
          </div>
          <FormField
            control={form.control}
            name="article"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Артикул</FormLabel>
                <FormControl>
                  <Input placeholder="Введите артикул" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Страна</FormLabel>
                <FormControl></FormControl>
                <Input placeholder="Пример: Россия" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="volume"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Объем</FormLabel>
                <FormControl></FormControl>
                <Input placeholder="Пример: 500мл" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Отправить</Button>
        </form>
      </Form>
    </div>
  );
};
