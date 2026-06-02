"use client"

import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  createItemSchema,
  updateItemSchema,
  type ItemFormInput,
  type ItemFormValues,
} from "../validations"
import { CategoryModel, ProductModel } from "@/api/Api"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Pencil, Plus, X } from "lucide-react"
import SelectImages from "@/components/SelectImages"
import Image from "next/image"
import { serveImage } from "@/lib/utils"
import { addItem } from "../items/actions/actions"
import { toast } from "sonner"

interface CreateUpdateItemDialogProps {
  item?: ProductModel
  triggerLabel: string
  triggerVariant?: "default" | "outline" | "secondary" | "destructive"
  onSubmit?: (values: ItemFormValues, itemId?: string) => Promise<void> | void
  categories: CategoryModel[]
}

export function CreateUpdateItemDialog({
  item,
  triggerLabel,
  triggerVariant = "default",
  onSubmit,
  categories,
}: CreateUpdateItemDialogProps) {
  const schema = item ? updateItemSchema : createItemSchema
  const defaultValues = useMemo<ItemFormInput>(
    () => ({
      name: item?.title ?? "",
      price: item?.price ?? 0,
      category: item?.categoryId ?? "",
      description: item?.description ?? "",
      image: "",
      isActive: item?.isActive ?? true,
    }),
    [item],
  )

  const form = useForm<ItemFormInput>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const handleSubmit = async (values: ItemFormInput) => {

    const results = await addItem({
      imageUrl: values.image,
      categoryId: values.category,
      isActive: values.isActive,
      price: values.price,
      title: values.name,
      description: values.description
    })
    if (!results.error) {
      toast.success("آیتم با موفقیت اضافه شد")
      return
    } else {
      toast.error("مشکلی در اضافه کردن آیتم پیش آمد")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={triggerVariant}>{triggerLabel}</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl mx-auto sm:mx-auto max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-xl">
            {item ? "ویرایش آیتم" : "افزودن آیتم جدید"}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {item
              ? "اطلاعات آیتم انتخاب‌شده را به‌روزرسانی کنید."
              : "اطلاعات آیتم جدید را وارد کنید تا به منو اضافه شود."}
          </DialogDescription>
        </DialogHeader>

        <div className="h-px bg-border my-1" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5 pt-1">

            {/* Row 1: Name + Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">نام محصول</FormLabel>
                    <FormControl>
                      <Input placeholder="مثال: آیس‌لاته کاراملی" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">قیمت</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="مثال: 4.80"
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const value = e.target.value
                          field.onChange(value === "" ? 0 : Number(value))
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Row 2: Category dropdown + isActive checkbox */}
            <div className="flex gap-4 items-end ">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">دسته‌بندی</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="یک دسته‌بندی انتخاب کنید" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.length === 0 ? (
                          <div dir="rtl" className="px-3 py-4 text-center text-sm text-muted-foreground">
                            دسته‌بندی‌ای وجود ندارد.
                            <br />
                            <span className="text-xs">ابتدا یک دسته‌بندی ایجاد کنید.</span>
                          </div>
                        ) : (
                          categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex items-center grow rounded-lg border border-border px-3 py-[0.6rem] text-center text-sm text-muted-foreground">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-medium cursor-pointer mb-0 leading-none">
                      فعال
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>

            {/* Row 3: Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">توضیحات</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="توضیح کوتاه درباره محصول"
                      className="min-h-24 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">تصویر محصول</FormLabel>
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
                              alt="تصویر محصول"
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center"><Pencil className="w-5 h-5 text-white" />
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-muted/30">
                            <Plus className="w-8 h-8 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">انتخاب تصویر</span>
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
                {item ? "به‌روزرسانی آیتم" : "ثبت آیتم"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
