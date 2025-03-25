import { getBrandFromID } from "@/api";
import CreateBrandForm from "@/widgets/Brand/CreateBrandForm";
import { TypographyH1 } from "@/ui/Text";
import { Card, CardContent } from "@/components/ui/card";

export default async function ({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const brands = await getBrandFromID({ id });
  const { name, image } = brands[0];

  return (
    <div className="gap-4 h-[calc(100vh-70px)] grid grid-rows-[min-content_1fr]">
      <TypographyH1>Редактирование бренда</TypographyH1>
      <div className="h-full w-full self-center justify-self-center flex items-center">
        <Card className="max-w-[480px] m-auto w-full">
          <CardContent>
            <CreateBrandForm name={name} file={image} isEditable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
