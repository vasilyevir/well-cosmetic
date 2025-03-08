import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {sql} from "@vercel/postgres";
import {notFound} from "next/navigation";

export default async function PageBrand({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const {id} = await params;
  const data = await sql<{
    brand_name: string;
  }>`
      SELECT c.*, b.name AS brand_name FROM category c JOIN brand b ON c.id_brand = b.id WHERE c.id_brand = ${id}
    `;
  const categories = data.rows;
  if (!categories.length) {
    notFound()
  }

  const brand = categories[0].brand_name;

  return (
    <div className="flex flex-col gap-4 p-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Главная</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{brand}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}