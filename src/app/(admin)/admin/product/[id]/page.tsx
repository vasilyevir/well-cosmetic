import { getProducts } from "@/api";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getProducts({ idCategory: id });
  console.log(data);
  return <div />;
}
