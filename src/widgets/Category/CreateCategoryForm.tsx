"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { upload } from "@/api/image";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BrandType } from "@/api";
import { createCategory, editCategory } from "@/api/category/createCategory";
import { CategoryCreateType, CategoryEditType } from "@/api/category";
import { FileLoader } from "@/components/FileLoader";

interface CreateCategoryFormProps {
  id_brand?: string;
  id?: string;
  image?: string;
  name?: string;
  brands: BrandType[];
}

const formSchema = z.object({
  name: z.string().trim(),
  file_string: z.string().optional(),
  file_blob: z.any().optional(),
  id_brand: z.string(),
});
type FormSchemaType = z.infer<typeof formSchema>;

export const CreateCategoryForm = ({
  id_brand,
  name,
  image,
  brands,
  id,
}: CreateCategoryFormProps) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id_brand: `${id_brand}`,
      name: name || "",
      file_string: image || "",
    },
  });
  const router = useRouter();

  const create = async ({ name, id_brand, image }: CategoryCreateType) => {
    const { id } = await createCategory({ name, image, id_brand });
    return id;
  };

  const edit = async ({ name, id_brand, image, id }: CategoryEditType) => {
    return await editCategory({ name, image, id_brand, id });
  };

  const onSubmit = async ({ file_string, file_blob, name, id_brand }: FormSchemaType) => {
    let id_category;

    if (file_string) {
      if (id) {
        id_category = await edit({ name, image: file_string, id_brand, id });
      } else {
        id_category = await create({ name, image: file_string, id_brand });
      }
    }

    if (file_blob) {
      const link = await upload(file_blob[0]);

      if (id) {
        id_category = await edit({ name, image: link, id_brand, id });
      } else {
        id_category = await create({ name, image: link, id_brand });
      }
    }

    if (id_category) router.push(`/admin/brand/${id_brand}`);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="id_brand"
            render={({ field }) => (
              <FormItem>
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

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя бренда</FormLabel>
                <FormControl>
                  <Input placeholder="Имя категории" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FileLoader />

          <Button type="submit">Отправить</Button>
        </form>
      </Form>
    </div>
  );
};
