import { GetBrand } from "@/api";
import { MainPageContent } from "@/components/MainPage/Content";

export default async function Page() {
  const brands = await GetBrand();

  return (
    <div>
      <MainPageContent brands={brands} isEditable />
    </div>
  );
}
