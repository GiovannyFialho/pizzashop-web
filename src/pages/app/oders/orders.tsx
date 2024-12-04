import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
} from "@/components/ui/table";

import { Pagination } from "@/components/pagination";

import { OrderTableFilters } from "@/pages/app/oders/order-table-filters";
import { OrderTableRow } from "@/pages/app/oders/order-table-row";

export function Orders() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

        <div className="space-y-2.5">
          <OrderTableFilters />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableHead className="w-[64px]"></TableHead>
                <TableHead className="w-[140px]">Identificador</TableHead>
                <TableHead className="w-[180px]">Realizado há</TableHead>
                <TableHead className="w-[140px]">Status</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="w-[140px]">Total do pedido</TableHead>
                <TableHead className="w-[164px]"></TableHead>
                <TableHead className="w-[132px]"></TableHead>
              </TableHeader>

              <TableBody>
                {Array.from({ length: 10 }).map((_, i) => (
                  <OrderTableRow key={i} />
                ))}
              </TableBody>
            </Table>
          </div>

          <Pagination pageIndex={0} totalCount={105} perPage={10} />
        </div>
      </div>
    </>
  );
}
