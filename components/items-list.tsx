"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CreateUpdateItemDialog } from "./dashboard/createUpdateItem"
import { ItemDetailDrawer } from "@/components/item-detail-drawer"
import moment from "jalali-moment"
import type { CategoryModel, ProductModel } from "@/api/Api"
import { formatPersianPrice, serveImage } from "@/lib/utils"
import Image from "next/image"
import { deleteItem } from "../app/dashboard/items/actions/actions"
import { toast } from "sonner"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Trash2 } from "lucide-react"

export function DashboardItemsList({ items, categories }: { items: ProductModel[], categories: CategoryModel[] }) {
  const [selectedItem, setSelectedItem] = useState<ProductModel | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleView = (item: ProductModel) => {
    setSelectedItem(item)
    setDrawerOpen(true)
  }
  const handleDelete = async (id: string) => {
    setDeletingId(id)
    const result = await deleteItem({ id })

    if (!result.error) {
      toast.success("آیتم مورد نظر با موفقیت حذف شد")

    } else {
      toast.error("مشکلی در حذف آیتم مورد نظر پیش آمد")
    }
    setDeletingId(null)
  }
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item) => {
          const jalaliDate = moment(item.createdAt, "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD")

          return (
            <Card key={item.id} className="overflow-hidden shadow-sm flex flex-col group transition-all hover:shadow-md h-60 relative border-0">
              <div className="absolute inset-0 bg-muted">
                {item.imageUrl ? (
                  <Image src={serveImage(item.imageUrl)} width={125} height={125} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-secondary/30">
                    <span className="text-muted-foreground opacity-50 text-sm">بدون تصویر</span>
                  </div>
                )}
              </div>

              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10 p-4 flex flex-col justify-end">
                <div className="absolute top-3 right-3 flex flex-col gap-2 ">
                  <Badge
                    variant={item.isActive ? "default" : "secondary"}
                    className="bg-background/90 backdrop-blur-sm text-foreground shadow-sm hover:bg-background/90"
                  >
                    {item.isActive ? "فعال" : "غیرفعال"}
                  </Badge>
                  <span className="text-xs bg-background/90 text-foreground px-2 py-1 rounded-md backdrop-blur-sm shadow-sm">{categories.find(i => i.id === item.categoryId)?.name}</span>
                </div>

                <div className="absolute top-3 left-3 text-xs bg-background/90 text-foreground px-2 py-1 rounded-md backdrop-blur-sm shadow-sm" dir="ltr">
                  {jalaliDate}
                </div>

                <div className="mt-auto">
                  <div className="flex items-end justify-between gap-3 mb-4 min-w-0">
                    <h3 className="font-semibold text-lg text-white leading-tight line-clamp-1 min-w-0 drop-shadow-md">
                      {item.title}
                    </h3>
                    <span className="text-white font-bold text-lg whitespace-nowrap  drop-shadow-md" dir="rtl">
                      {formatPersianPrice(item.price)}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <CreateUpdateItemDialog
                      className="flex-2"
                      item={item}
                      triggerLabel="ویرایش"
                      triggerVariant="secondary"
                      categories={categories}
                    />
                    <Button className="flex-2" variant="secondary" onClick={() => handleView(item)}>مشاهده</Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className=" text-destructive hover:text-destructive hover:bg-destructive/10"
                          disabled={deletingId === item.id}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent dir="rtl">
                        <AlertDialogHeader>
                          <AlertDialogTitle>حذف آیتم</AlertDialogTitle>
                          <AlertDialogDescription>
                            آیا مطمئن هستید که می‌خواهید  «{item.title}» را حذف کنید؟
                            این عمل قابل بازگشت نیست.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex-row-reverse gap-2">
                          <AlertDialogCancel>انصراف</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={() => handleDelete(item.id)}
                          >
                            حذف
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
