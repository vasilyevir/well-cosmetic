import {MainPageContent} from "@/components/MainPage/Content";
import {GetBrand} from "@/api";

export default async function Home() {
  const brands = await GetBrand();
  console.log(brands);
  return (
    <div>
      <MainPageContent brands={brands} />
    </div>
  );
}
