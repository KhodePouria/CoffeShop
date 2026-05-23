import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { listOrders } from "../actions/actions"

export default async function DashboardOrdersPage() {
  const { orders } = await listOrders({ baseUrl: "" })

  return (
    <div className="space-y-6">
      <section className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">سفارش‌ها</h2>
          <p className="text-sm text-muted-foreground">لیست سفارش‌ها و وضعیت پرداخت را ببینید.</p>
        </div>
        <Badge variant="secondary">به‌روزرسانی لحظه‌ای</Badge>
      </section>

      <Card className="shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>شناسه</TableHead>
                <TableHead>مشتری</TableHead>
                <TableHead>مبلغ</TableHead>
                <TableHead>وضعیت</TableHead>
                <TableHead>تاریخ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell dir="ltr">${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={order.status === "paid" ? "default" : "secondary"}>
                      {order.status === "paid"
                        ? "پرداخت شده"
                        : order.status === "pending"
                          ? "در انتظار"
                          : "لغو شده"}
                    </Badge>
                  </TableCell>
                  <TableCell dir="ltr">{order.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
