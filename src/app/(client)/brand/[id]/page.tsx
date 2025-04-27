import { notFound } from "next/navigation";
import { getCategories } from "@/api/category";

import BrandPage from "@/widgets/Brand/BrandPage";

export default async function PageBrand({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const categories = await getCategories({ id });

  if (!categories.results.length) {
    notFound();
  }

  const { name } = categories.brand[0];

  return <BrandPage brand_name={name} categories={categories} />;
}
