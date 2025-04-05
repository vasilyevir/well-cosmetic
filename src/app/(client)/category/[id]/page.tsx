import { getProducts } from "@/api";
import { PageCategory } from "@/widgets/Category/PageCategory";

export default async function PageBrand({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const categories = await getProducts({ idCategory: id });

  return <PageCategory {...categories} />;
}
