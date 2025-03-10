import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {getProducts} from "@/api";
import Link from "next/link";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import Image from "next/image";
import {TypographyLarge} from "@/ui/Text";

export default async function PageBrand({
  params,
}: {
  params: Promise<{ id: string; idCategory: string; }>
}) {
  const {id, idCategory} = await params;
  const categories = await getProducts({idCategory, idBrand: id});
  console.log(categories)
  if (categories.length) {

  }

  const { id_brand, brand_name, category_name } = categories;

  return (
    <div className="flex flex-col gap-4 p-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Главная</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator/>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/brand/${id_brand}`}>{brand_name}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator/>
          <BreadcrumbItem>
            <BreadcrumbPage>{category_name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-4 gap-8">
        {categories.results.map(({id, image, name}) => (
          <Link key={id} href={`/brand/${id_brand}/category/${id}`}>
            <Card>
              <CardHeader>
                <div className="w-full aspect-square relative">
                  <Image src={image || ''} alt={name} fill className="rounded-lg"/>
                </div>
              </CardHeader>
              <CardContent>
                <TypographyLarge>
                  {name}
                </TypographyLarge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}