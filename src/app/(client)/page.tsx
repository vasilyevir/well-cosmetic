import {MainPageContent} from "@/components/MainPage/Content";

export default async function Home() {
  let brands = [];

  const getData = async () => {
    try {
      const data = await fetch('http://localhost:3000/api/brand')
      const { results } = await data.json();
      return results
    } catch (e) {
      console.log(e)
    }
  }

  brands = await getData();

  return (
    <div>
      <MainPageContent brands={brands} />
    </div>
  );
}
