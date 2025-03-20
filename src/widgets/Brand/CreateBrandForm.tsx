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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { upload } from "@/api/image";
import { createBrand } from "@/api/brand/createBrand";

const formSchema = z.object({
  name: z.string().trim(),
  file_string: z.string().optional(),
  file_blob: z.any().optional(),
});
type FormSchemaType = z.infer<typeof formSchema>;

export default function CreateBrandForm() {
  const router = useRouter();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = async ({ name, file_blob, file_string }: FormSchemaType) => {
    if (file_string) {
      const { id } = await createBrand({ name, image: file_string });

      console.log(id);

      if (id) router.push("/admin/brand");
    }
    if (file_blob) {
      const link = await upload(file_blob[0]);
      const { id } = await createBrand({ name, image: link });

      if (id) router.push("/admin/brand");
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
        <Tabs defaultValue="link" className="w-full flex flex-col gap-4" onChange={console.log}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="link">Link</TabsTrigger>
            <TabsTrigger value="file">File</TabsTrigger>
          </TabsList>
          <TabsContent value="link">
            <FormField
              control={form.control}
              name="file_string"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Изображение</FormLabel>
                  <FormControl>
                    <Input placeholder="https://some-site.com/image.png" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          <TabsContent value="file" className="w-full">
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="picture">Picture</Label>
              <Input id="picture" type="file" {...form.register("file_blob")} />
            </div>
          </TabsContent>
        </Tabs>
        <Button type="submit">Отправить</Button>
      </form>
    </Form>
  );
}
