import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowRight, Search, X } from "lucide-react";
import { useState } from "react";

import { cancelOrder } from "@/api/cancel-order";
import type { GetOrdersResponse } from "@/api/get-orders";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";

import { OrderDetails } from "@/pages/app/oders/order-details";
import { OrderStatus } from "@/pages/app/oders/order-status";
import { toast } from "sonner";

interface OrderTableRowProps {
  order: {
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  };
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutateAsync: cancelOrderFn, isPending: isCanceling } = useMutation({
    mutationFn: cancelOrder,
    async onSuccess(_, { orderId }) {
      const ordersListCached = queryClient.getQueriesData<GetOrdersResponse>({
        queryKey: ["orders"],
      });

      ordersListCached.forEach(([cachedKey, cachedData]) => {
        if (!cachedData) {
          return;
        }

        queryClient.setQueryData<GetOrdersResponse>(cachedKey, {
          ...cachedData,
          orders: cachedData.orders.map((order) => {
            if (order.orderId === orderId) {
              return { ...order, status: "canceled" };
            }

            return order;
          }),
        });
      });

      toast.success("Pedido cancelado com sucesso!");
    },
    onError: () => {
      toast.error(
        "Ops! Houver um erro ao tentar cancelar o pedido, tente novamente mais tarde.",
      );
    },
  });

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails open={isDetailsOpen} orderId={order.orderId} />
        </Dialog>
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>

      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(new Date(order.createdAt), {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>

      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>

      <TableCell className="font-medium">{order.customerName}</TableCell>

      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </TableCell>

      <TableCell>
        <Button variant="outline" size="xs">
          <ArrowRight className="mr-2 h-2 w-2" />
          Aprovar
        </Button>
      </TableCell>

      <TableCell>
        <Button
          variant="ghost"
          size="xs"
          disabled={
            !["pending", "processing"].includes(order.status) || isCanceling
          }
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
        >
          <X className="mr-2 h-2 w-2" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
