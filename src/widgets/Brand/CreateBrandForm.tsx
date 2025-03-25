"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { upload } from "@/api/image";
import { createBrand, editBrand } from "@/api/brand/createBrand";
import { FileLoader } from "@/components/FileLoader";

const formSchema = z.object({
  name: z.string().trim(),
  file_string: z.string().optional(),
  file_blob: z.any().optional(),
});
type FormSchemaType = z.infer<typeof formSchema>;

interface CreateBrandFormProps {
  name?: string;
  file?: string;
  isEditable?: boolean;
}

export default function CreateBrandForm({ name, file, isEditable }: CreateBrandFormProps) {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name || "",
      file_string: file || "",
    },
  });

  const handleSubmit = async ({ name, file_blob, file_string }: FormSchemaType) => {
    let result;

    if (file_string) {
      if (isEditable) {
        result = await editBrand({ name, image: file_string, id });
      } else {
        result = await createBrand({ name, image: file_string });
      }
    }

    if (file_blob) {
      const link = await upload(file_blob[0], `/product/`);

      if (isEditable) {
        result = await editBrand({ name, image: link, id });
      } else {
        result = await createBrand({ name, image: link });
      }
    }

    if (result) router.push("/admin/brand");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-8">
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
        <FileLoader />
        <Button type="submit">Отправить</Button>
      </form>
    </Form>
  );
}
