"use client";

import { DataTable } from "@/app/(client)/cart/data-table";
import { columns } from "@/components/Sell/columns";
import { SellRequest, StatusEnum } from "@/api/sell/type";
import { useQuery } from "@tanstack/react-query";
import { getSells } from "@/api/sell";
import { useRouter } from "next/navigation";
import { QueryKeyEnum } from "@/api/queryKey.enum";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusOptions } from "@/constants/options";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParamsSellContent } from "@/components/AdminSellContent/useSearchParamsSellContent";

interface TableContentProps {
  sells: SellRequest[];
}

const FormSchema = z.object({
  date: z
    .object({
      from: z.date({
        required_error: "A date of birth is required.",
      }),
      to: z
        .date({
          required_error: "A date of birth is required.",
        })
        .optional(),
    })
    .optional(),
  status: z.enum([
    StatusEnum.NEW,
    StatusEnum.DONE,
    StatusEnum.RETURN,
    StatusEnum.IN_DELIVERY,
    StatusEnum.WAIT_DELIVERY,
    StatusEnum.WAIT_PAYMENT,
    StatusEnum.CANCELED,
    StatusEnum.PROCESSING,
    StatusEnum.READY_TO_RECEIVE,
  ]),
});

export const TableContent = ({ sells }: TableContentProps) => {
  const router = useRouter();

  const { pathname, createQueryString, searchValues } = useSearchParamsSellContent();
  const { limit, offset, status, date_to, date_from } = searchValues;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: date_from
        ? date_to
          ? {
              from: new Date(date_from),
              to: new Date(date_to),
            }
          : {
              from: new Date(date_from),
            }
        : undefined,
      status: (status as StatusEnum) || undefined,
    },
  });

  const formValues = useWatch({
    control: form.control,
  });

  useEffect(() => {
    let queryString = "";
    if (formValues.status) {
      queryString += createQueryString("status", formValues.status) + "&";
    }

    if (formValues.date?.from) {
      queryString += createQueryString("date_from", formValues.date.from.toISOString()) + "&";
    }

    if (formValues.date?.to) {
      queryString += createQueryString("date_to", formValues.date.to.toISOString()) + "&";
    }

    if (queryString.length) {
      router.push(pathname + "?" + queryString);
    }
  }, [formValues]);

  const { data } = useQuery({
    queryFn: () => getSells({ limit, offset, status, date_to, date_from }),
    queryKey: [QueryKeyEnum.Sell],
    initialData: sells,
  });

  const isFiltered = status || date_from || date_to;

  const clearForm = () => {
    form.reset();
    router.push(pathname);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full gap-4">
        <Form {...form}>
          <form className=" flex items-end gap-4">
            {isFiltered && <Button onClick={clearForm}>Очистить фильтры</Button>}

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Статус</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Статус" />
                    </SelectTrigger>
                    <SelectContent>
                      {StatusOptions.map((el) => (
                        <SelectItem value={el.value} key={el.value}>
                          {el.key}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Период</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[320px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value?.to ? (
                            `${format(field.value.from, "PPP")} - ${format(field.value.to, "PPP")}`
                          ) : field.value?.from ? (
                            format(field.value.from, "PPP")
                          ) : (
                            <span>Выберите период</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
};
