// app/dashboard/category/components/CreateUpdateCategoryDialog.tsx
"use client"

import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    createCategorySchema,
    type CategoryFormInput,
} from "@/app/dashboard/category/schema"
import { CategoryModel } from "@/api/Api"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Pencil, Plus } from "lucide-react"
import SelectImages from "@/components/SelectImages"
import Image from "next/image"
import { serveImage } from "@/lib/utils"
import { createCategory, updateCategory } from "@/app/dashboard/category/actions/actions"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface CreateUpdateCategoryDialogProps {
    category?: CategoryModel
    triggerLabel: string
    triggerVariant?: "default" | "outline" | "secondary" | "destructive" | "ghost"
    /** Render the trigger as an icon-only button (Pencil icon). Used in table rows. */
    iconOnly?: boolean
}

export function CreateUpdateCategoryDialog({
    category,
    triggerLabel,
    triggerVariant = "default",
    iconOnly = false,
}: CreateUpdateCategoryDialogProps) {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const defaultValues = useMemo<CategoryFormInput>(
        () => ({
            name: category?.name ?? "",
            slug: category?.slug ?? "",
            icon: category?.icon ?? "",
        }),
        [category],
    )

    const form = useForm<CategoryFormInput>({
        resolver: zodResolver(createCategorySchema),
        defaultValues,
    })

    const handleSubmit = async (values: CategoryFormInput) => {
        if (category?.id) {
            const result = await updateCategory({
                where: { id: category.id },
                data: {
                    name: values.name,
                    slug: values.slug,
                    icon: values.icon,
                }
            })
            console.log({
                where: { id: category.id },
                data: {
                    name: values.name,
                    slug: values.slug,
                    icon: values.icon,
                }
            })
            if (!result.error) {
                toast.success("دسته بندی با موفقیت تغییر یافت")
                return
            } else {
                toast.error("مشکلی در تغییر دسته بندی پیش آمد")
            }
        } else {
            const result = await createCategory(values)
            if (!result.error) {
                toast.success("دسته بندی با موفقیت اضافه شد")
                return
            } else {
                toast.error("مشکلی در افزودن دسته بندی پیش آمد")
            }
        }

        setOpen(false)
        form.reset(defaultValues)
        router.refresh()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {iconOnly ? (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-foreground"
                        aria-label={triggerLabel}
                    >
                        <Pencil className="w-4 h-4" />
                    </Button>
                ) : (
                    <Button variant={triggerVariant}>{triggerLabel}</Button>
                )}
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg mx-auto sm:mx-auto max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <DialogHeader className="pb-2">
                    <DialogTitle className="text-xl">
                        {category ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی جدید"}
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                        {category
                            ? "اطلاعات دسته‌بندی انتخاب‌شده را به‌روزرسانی کنید."
                            : "اطلاعات دسته‌بندی جدید را وارد کنید."}
                    </DialogDescription>
                </DialogHeader>

                <div className="h-px bg-border my-1" />

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5 pt-1">

                        {/* Name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">نام دسته‌بندی</FormLabel>
                                    <FormControl>
                                        <Input placeholder="مثال: نوشیدنی‌ها" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Slug */}
                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">شناسه (Slug)</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="مثال: beverages"
                                            dir="ltr"
                                            className="text-left"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Icon image upload — same pattern as CreateUpdateItemDialog */}
                        <FormField
                            control={form.control}
                            name="icon"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">آیکون دسته‌بندی</FormLabel>
                                    <FormControl>
                                        <SelectImages
                                            singleSelect
                                            selectedImages={field.value ? [field.value] : []}
                                            setSelectedImages={(updated) =>
                                                field.onChange(updated[updated.length - 1] ?? "")
                                            }
                                        >
                                            <div className="relative w-full h-32 rounded-lg overflow-hidden border-2 border-dashed border-border hover:border-primary/50 transition cursor-pointer group">
                                                {field.value ? (
                                                    <>
                                                        <Image
                                                            src={serveImage(field.value)}
                                                            alt="آیکون دسته‌بندی"
                                                            fill
                                                            className="object-cover"
                                                        />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                                            <Pencil className="w-5 h-5 text-white" />
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-muted/30">
                                                        <Plus className="w-8 h-8 text-muted-foreground" />
                                                        <span className="text-xs text-muted-foreground">انتخاب آیکون</span>
                                                    </div>
                                                )}
                                            </div>
                                        </SelectImages>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="h-px bg-border" />

                        {/* Actions */}
                        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-1">
                            <Button
                                type="button"
                                variant="outline"
                                className="sm:w-32"
                                onClick={() => form.reset(defaultValues)}
                            >
                                پاک کردن
                            </Button>
                            <Button type="submit" className="flex-1">
                                {category ? "به‌روزرسانی دسته‌بندی" : "ثبت دسته‌بندی"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}