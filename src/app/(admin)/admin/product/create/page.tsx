import { CreateProductForm } from "@/widgets/Product/CreateProductForm";
import { TypographyH1 } from "@/ui/Text";
import { Card, CardContent } from "@/components/ui/card";
import { getAllBrands } from "@/api";

export default async function () {
  const brands = await getAllBrands();

  return (
    <div className="gap-4 min-h-[calc(100vh-70px)] grid grid-rows-[min-content_1fr]">
      <TypographyH1>Создание бренда</TypographyH1>
      <div className="h-full w-full self-center justify-self-center flex items-center">
        <Card className="max-w-[480px] m-auto w-full">
          <CardContent>
            <CreateProductForm brands={brands} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
