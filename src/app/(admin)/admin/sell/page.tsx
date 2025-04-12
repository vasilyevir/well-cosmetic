import { getSells } from "@/api/sell";

import { TableContent } from "@/components/AdminSellContent/TableContent";
import { SellRequest } from "@/api/sell/type";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function AdminSellPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const limit = searchParams.limit;
  const offset = searchParams.offset;
  const status = searchParams.status;

  let sells: SellRequest[] = [];

  try {
    sells = await getSells({
      limit,
      offset,
      status,
    });
  } catch (e) {
    console.log(e);
  }

  return (
    <div className="w-full overflow-auto">
      <TableContent sells={sells} />
    </div>
  );
}
