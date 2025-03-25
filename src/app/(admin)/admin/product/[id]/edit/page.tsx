import { getAllBrands, getProductID } from "@/api";
import { TypographyH1 } from "@/ui/Text";
import { Card, CardContent } from "@/components/ui/card";
import { CreateProductForm } from "@/widgets/Product/CreateProductForm";

export default async function ({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const brands = await getAllBrands();
  const { product, brand, category } = await getProductID({ id });

  return (
    <div className="gap-4 h-[calc(100vh-70px)] grid grid-rows-[min-content_1fr]">
      <TypographyH1>Редакторивание продукта</TypographyH1>
      <div className="h-full w-full self-center justify-self-center flex items-center">
        <Card className="max-w-[480px] m-auto w-full">
          <CardContent>
            <CreateProductForm
              brands={brands}
              defaultValues={{
                ...product,
                id,
                id_brand: `${brand.id}`,
                id_category: `${category.id}`,
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
