import { notFound } from "next/navigation";
import { getCategories } from "@/api/category";

import BrandPage from "@/widgets/Brand/BrandPage";

export default async function PageBrand({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { results, brand } = await getCategories({ id });

  if (!results.length) {
    notFound();
  }

  const { name } = brand[0];

  return <BrandPage brand_name={name} categories={results} />;
}
