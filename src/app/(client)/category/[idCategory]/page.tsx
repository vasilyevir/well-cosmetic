import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getProducts } from "@/api";
import { CardProduct } from "@/components/cards/CardProduct";

export default async function PageBrand({ params }: { params: Promise<{ idCategory: string }> }) {
  const { idCategory } = await params;
  const categories = await getProducts({ idCategory });

  const { id_brand, brand_name, category_name } = categories;

  return (
    <div className="flex flex-col gap-4 p-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Главная</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/brand/${id_brand}`}>{brand_name}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{category_name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-3 gap-8">
        {categories.results.map((product) => (
          <CardProduct {...product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
