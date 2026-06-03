// app/dashboard/category/components/CategoryTable.tsx
"use client"

import { useState } from "react"
import { CategoryModel } from "@/api/Api"
import { deleteCategory } from "@/app/dashboard/category/actions/actions"
import { CreateUpdateCategoryDialog } from "././CreateUpdateCategory"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, ImageOff } from "lucide-react"
import Image from "next/image"
import { serveImage } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface CategoryTableProps {
    categories: CategoryModel[]
}

export function CategoryTable({ categories }: CategoryTableProps) {
    const router = useRouter()
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const handleDelete = async (id: string) => {
        setDeletingId(id)
        const result = await deleteCategory({ id })

        if (!result.error) {
            toast.success("دسته بندی با موفقیت حذف شد")

        } else {
            toast.error("مشکلی در حذف دسته بندی پیش آمد")
        }
        setDeletingId(null)
    }

    if (categories.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-center border border-dashed border-border rounded-xl bg-muted/20">
                <ImageOff className="w-10 h-10 text-muted-foreground/50" />
                <p className="text-muted-foreground text-sm">هیچ دسته‌بندی‌ای وجود ندارد.</p>
                <p className="text-xs text-muted-foreground/60">با کلیک روی «افزودن دسته‌بندی» شروع کنید.</p>
            </div>
        )
    }

    return (
        <div className="rounded-xl border border-border overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/40 hover:bg-muted/40">
                        <TableHead className="text-right font-semibold text-foreground w-16">آیکون</TableHead>
                        <TableHead className="text-right font-semibold text-foreground">نام</TableHead>
                        <TableHead className="text-right font-semibold text-foreground">شناسه</TableHead>
                        <TableHead className="text-right font-semibold text-foreground w-28">عملیات</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {categories.map((cat) => (
                        <TableRow key={cat.id} className="hover:bg-muted/20 transition-colors">

                            {/* Icon */}
                            <TableCell>
                                <div className="w-10 h-10 rounded-lg border border-border overflow-hidden bg-muted/30 flex items-center justify-center">
                                    {cat.icon ? (
                                        <Image
                                            src={serveImage(cat.icon)}
                                            alt={cat.name}
                                            width={40}
                                            height={40}
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <ImageOff className="w-4 h-4 text-muted-foreground/40" />
                                    )}
                                </div>
                            </TableCell>

                            {/* Name */}
                            <TableCell className="font-medium">{cat.name}</TableCell>

                            {/* Slug */}
                            <TableCell>
                                <Badge variant="secondary" className="font-mono text-xs" dir="ltr">
                                    {cat.slug}
                                </Badge>
                            </TableCell>

                            {/* Actions */}
                            <TableCell>
                                <div className="flex items-center gap-1">
                                    {/* Edit */}
                                    <CreateUpdateCategoryDialog
                                        category={cat}
                                        triggerLabel="ویرایش"
                                        triggerVariant="ghost"
                                        iconOnly
                                    />

                                    {/* Delete */}
                                    <AlertDialog >
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:text-destructive hover:bg-destructive/20!"
                                                disabled={deletingId === cat.id}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent dir="rtl">
                                            <AlertDialogHeader className="text-right items-start">
                                                <AlertDialogTitle>حذف دسته‌بندی</AlertDialogTitle>
                                                <AlertDialogDescription className="text-right items-start">
                                                    آیا مطمئن هستید که می‌خواهید دسته‌بندی «{cat.name}» را حذف کنید؟
                                                    این عمل قابل بازگشت نیست.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter className="flex-row-reverse gap-2">
                                                <AlertDialogCancel>انصراف</AlertDialogCancel>
                                                <AlertDialogAction
                                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                    onClick={() => handleDelete(cat.id)}
                                                >
                                                    حذف
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}