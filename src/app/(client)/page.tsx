import {MainPageContent} from "@/components/MainPage/Content";
import {GetBrand} from "@/api";

export default async function Home() {
  const brands = await GetBrand();

  return (
    <div>
      <MainPageContent brands={brands} />
    </div>
  );
}
