import { getProducts } from "@/api";
import { PageCategory } from "@/widgets/Category/PageCategory";

export default async function ({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let categories = await getProducts({ idCategory: id });

  return <PageCategory {...categories} isEditable />;
}
