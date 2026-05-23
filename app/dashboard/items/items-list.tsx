"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CreateUpdateItemDialog } from "../components/createUpdateItem"
import { ItemDetailDrawer } from "@/components/item-detail-drawer"
import type { ItemRow } from "../actions/actions"
import moment from "jalali-moment"
import type { MenuItem } from "@/lib/types"

export function DashboardItemsList({ items }: { items: ItemRow[] }) {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleView = (item: ItemRow) => {
    setSelectedItem({
      id: item.id,
      name: item.name,
      description: item.description || "توضیحاتی برای این محصول ثبت نشده است.",
      price: item.price,
      image: "", // placeholder
      category: item.category,
    })
    setDrawerOpen(true)
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item) => {
          const jalaliDate = moment(item.updatedAt, "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD")

          return (
            <Card key={item.id} className="overflow-hidden shadow-sm flex flex-col group transition-all hover:shadow-md h-60 relative border-0">
              <div className="absolute inset-0 bg-muted">
                {/* Placeholder for item image */}
                <div className="absolute inset-0 flex items-center justify-center bg-secondary/30">
                  <span className="text-muted-foreground opacity-50 text-sm">بدون تصویر</span>
                </div>
              </div>

              {/* Overlay with details */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10 p-4 flex flex-col justify-end">
                <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                  <Badge
                    variant={item.status === "active" ? "default" : "secondary"}
                    className="bg-background/90 backdrop-blur-sm text-foreground shadow-sm hover:bg-background/90"
                  >
                    {item.status === "active" ? "فعال" : "پیش‌نویس"}
                  </Badge>
                  <span className="text-xs bg-background/90 text-foreground px-2 py-1 rounded-md backdrop-blur-sm shadow-sm">{item.category}</span>
                </div>

                <div className="absolute top-3 left-3 text-xs bg-background/90 text-foreground px-2 py-1 rounded-md backdrop-blur-sm shadow-sm" dir="ltr">
                  {jalaliDate}
                </div>

                <div className="mt-auto">
                  <div className="flex items-end justify-between gap-3 mb-4 min-w-0">
                    <h3 className="font-semibold text-lg text-white leading-tight line-clamp-1 min-w-0 drop-shadow-md">
                      {item.name}
                    </h3>
                    <span className="text-white font-bold text-lg whitespace-nowrap drop-shadow-md" dir="ltr">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <CreateUpdateItemDialog
                      item={item}
                      triggerLabel="ویرایش"
                      triggerVariant="secondary"
                    />
                    <Button variant="secondary" onClick={() => handleView(item)}>مشاهده</Button>
                    <Button variant="destructive">حذف</Button>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
      <ItemDetailDrawer item={selectedItem} open={drawerOpen} onOpenChange={setDrawerOpen} />
    </>
  )
}
