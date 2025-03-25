import { getProducts } from "@/api";
import { PageCategory } from "@/widgets/Category/PageCategory";

export default async function PageBrand({ params }: { params: Promise<{ idCategory: string }> }) {
  const { idCategory } = await params;
  const categories = await getProducts({ idCategory });

  return <PageCategory {...categories} />;
}
