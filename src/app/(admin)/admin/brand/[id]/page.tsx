import { getCategories } from "@/api/category";
import BrandPage from "@/widgets/Brand/BrandPage";

export default async function ({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const categories = await getCategories({ id });

  const brand = categories.brand[0];

  return <BrandPage brand_name={brand.name} categories={categories.results} isEditable />;
}
