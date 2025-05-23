import { CreateCategoryForm } from "@/widgets/Category/CreateCategoryForm";
import { getAllBrands } from "@/api";
import { getCategoryFromBrandID } from "@/api/category/createCategory";
import { TypographyH1 } from "@/ui/Text";
import { Card, CardContent } from "@/components/ui/card";

export default async function ({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const brands = await getAllBrands();
  const data = await getCategoryFromBrandID({ id });

  const { image, id_brand, name } = data[0];

  return (
    <div className="gap-4 h-[calc(100vh-70px)] grid grid-rows-[min-content_1fr]">
      <TypographyH1>Редакторивание категории</TypographyH1>
      <div className="h-full w-full self-center justify-self-center flex items-center">
        <Card className="max-w-[480px] m-auto w-full">
          <CardContent>
            <CreateCategoryForm
              brands={brands}
              id={id}
              id_brand={id_brand}
              name={name}
              image={image}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
