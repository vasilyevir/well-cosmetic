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
import { useEffect, useState } from "react";
import { CategoryType, getCategories } from "@/api/category";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { upload } from "@/api/image";
import { createProduct, editProduct } from "@/api/product/createProduct";

const formSchema = z.object({
  name: z.string(),
  file_string: z.string(),
  file_blob: z.any().optional(),
  price: z.number().positive(),
  price_with_sale: z.string().optional(),
  description: z.string(),
  amount: z.number(),
  id_brand: z.string(),
  id_category: z.string(),
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
    },
  });
  const [categories, setCategories] = useState<CategoryType[] | null>(null);

  const id_brand = useWatch({
    control: form.control,
    name: "id_brand",
  });
  const router = useRouter();

  useEffect(() => {
    const getAllCategories = async () => {
      if (!id_brand) return null;

      const categories = await getCategories({ id: id_brand });
      setCategories(categories);
    };

    getAllCategories();
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
    let link;
    if (file_blob) {
      link = await upload(file_blob[0]);
    }

    if (!defaultValues) {
      results = await createProduct({
        name,
        id_category,
        image: link ? link : file_string,
        description,
        price,
        price_with_sale: price_with_sale ? Number(price_with_sale) : 0,
        amount,
      });
    } else {
      results = await editProduct({
        name,
        id_category,
        image: link ? link : file_string,
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
                      {categories?.map(({ id, name }) => (
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
          <Button type="submit">Отправить</Button>
        </form>
      </Form>
    </div>
  );
};
