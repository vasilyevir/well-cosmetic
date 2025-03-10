import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {notFound} from "next/navigation";
import {getCategories} from "@/api/category";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import Image from "next/image";
import {TypographyLarge} from "@/ui/Text";
import Link from "next/link";

export default async function PageBrand({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const {id} = await params;
  const categories = await getCategories({id});

  if (!categories.length) {
    notFound()
  }

  const {brand_name, id_brand} = categories[0];

  return (
    <div className="flex flex-col gap-4 p-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Главная</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{brand_name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-4 gap-8">
        {categories.map(({id, image, name }) => (
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