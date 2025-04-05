"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createTypeProduct } from "@/api/type_product";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeyEnum } from "@/api/queryKey.enum";

const formSchema = z.object({
  name: z.string(),
});
type FormSchemaType = z.infer<typeof formSchema>;

export const FormCreateTypeProduct = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createTypeProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.TypesProduct] });
      router.back();
    },
    onError: async (result) => {
      if ("message" in result) {
        form.setError("name", { message: result.message });
        toast.error(result.message);
      }
    },
  });

  const router = useRouter();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = ({ name }: FormSchemaType) => {
    mutate({ name });
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Создание средства</CardTitle>
            <CardDescription>Введите тип средства, которое хотите создать</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Наименование средства</FormLabel>
                    <FormControl>
                      <Input placeholder="Пример: крем" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isPending}>
              Создать
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
