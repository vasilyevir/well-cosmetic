"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

export const FileLoader = () => {
  const form = useFormContext();

  const onChangeTab = (value: string) => {
    console.log(value, form.getValues("file_string"), form.getValues("file_blob"));
    if (value === "link") {
      form.resetField("file_blob");
    } else {
      form.resetField("file_string");
    }
  };

  return (
    <Tabs defaultValue="link" className="w-full flex flex-col gap-4" onValueChange={onChangeTab}>
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
  );
};
