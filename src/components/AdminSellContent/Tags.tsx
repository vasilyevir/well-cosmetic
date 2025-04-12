import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNotesSell, deleteNoteSell } from "@/api/notes";
import { TypographyP } from "@/ui/Text";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { QueryKeyEnum } from "@/api/queryKey.enum";
import { X } from "lucide-react";

interface TagsProps {
  notes: { id: string; description: string; sell_id: string }[] | null;
  sell_id: string | number;
}

const formSchema = z.object({
  description: z.string().nonempty(),
});
type FormSchemaType = z.infer<typeof formSchema>;

export const Tags = ({ notes, sell_id }: TagsProps) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createNotesSell,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.Sell] });
    },
  });

  const { mutate: deleteTag } = useMutation({
    mutationFn: deleteNoteSell,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.Sell] });
    },
  });

  const onSubmit = async (data: FormSchemaType) => {
    mutate({
      description: data.description,
      sell_id: `${sell_id}`,
    });
  };

  const onDelete = (id: string) => {
    deleteTag({ id });
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {notes?.map(({ id, sell_id, description }) => (
        <div
          key={`${sell_id}_${id}`}
          className="flex gap-2 items-center border-2 rounded-lg py-0 px-2"
        >
          <TypographyP>{description}</TypographyP>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" asChild>
                <div className="p-1">
                  <X />
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Удаление заметки</DialogTitle>
                <DialogDescription>Вы действительно хотите удалить</DialogDescription>
              </DialogHeader>

              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Закрыть
                  </Button>
                </DialogClose>
                <Button type="button" variant="destructive" onClick={() => onDelete(id)}>
                  Удалить
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ))}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Создать заметку</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormItem>
                      <FormLabel>Цена со скидкой</FormLabel>
                      <FormControl>
                        <Input placeholder="Доставка только до 21:00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormItem>
                )}
              />
              <Button type="submit">Сохранить</Button>
            </form>
          </Form>
        </PopoverContent>
      </Popover>
    </div>
  );
};
