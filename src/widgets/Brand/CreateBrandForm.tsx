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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeyEnum } from "@/api/queryKey.enum";

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
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name || "",
      file_string: file || "",
    },
  });

  const { mutate: editMutate } = useMutation({
    mutationFn: editBrand,
    mutationKey: [QueryKeyEnum.Brand],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.Brand] });

      router.push("/admin/brand");
    },
  });

  const { mutate: createMutate } = useMutation({
    mutationFn: createBrand,
    mutationKey: [QueryKeyEnum.Brand],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.Brand] });

      router.push("/admin/brand");
    },
  });

  const handleSubmit = async ({ name, file_blob, file_string }: FormSchemaType) => {
    let image;

    if (file_string) {
      image = file_string;
    } else {
      image = await upload(file_blob[0]);
    }

    if (isEditable) {
      editMutate({ name, image, id });
    } else {
      createMutate({ name, image });
    }
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
