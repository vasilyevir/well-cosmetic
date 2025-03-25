import { getCategories } from "@/api/category";
import { notFound } from "next/navigation";
import BrandPage from "@/widgets/Brand/BrandPage";

export default async function ({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const categories = await getCategories({ id });

  if (!categories.length) {
    notFound();
  }

  const { brand_name } = categories[0];

  return <BrandPage brand_name={brand_name} categories={categories} isEditable />;
}
