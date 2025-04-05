"use server";

import { getSellID } from "@/api/sell";
import { Sell } from "@/app/(admin)/admin/sell/[id]/sell";

export default async function ({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sell = await getSellID({ id });

  return (
    <div className="flex flex-col">
      <Sell sell={sell} />
    </div>
  );
}
