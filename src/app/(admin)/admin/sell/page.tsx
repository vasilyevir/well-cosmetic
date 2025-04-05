import { getSells } from "@/api/sell";
import { DataTable } from "@/app/(client)/cart/data-table";
import { columns } from "@/components/Sell/columns";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function AdminSellPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const limit = searchParams.limit;
  const offset = searchParams.offset;

  const sells = await getSells({
    limit,
    offset,
  });

  return (
    <div className="w-full overflow-auto">
      <DataTable data={sells} columns={columns} />
    </div>
  );
}
