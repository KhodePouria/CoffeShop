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
import { ProductModel } from "@/api/Api"
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
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Plus, X } from "lucide-react"
import SelectImages from "@/components/SelectImages"
import Image from "next/image"
import { serveImage } from "@/lib/utils"

interface CreateUpdateItemDialogProps {
  item?: ProductModel
  triggerLabel: string
  triggerVariant?: "default" | "outline" | "secondary" | "destructive"
  onSubmit?: (values: ItemFormValues, itemId?: string) => Promise<void> | void
}

export function CreateUpdateItemDialog({
  item,
  triggerLabel,
  triggerVariant = "default",
  onSubmit,
}: CreateUpdateItemDialogProps) {
  const schema = item ? updateItemSchema : createItemSchema
  const defaultValues = useMemo<ItemFormInput>(
    () => ({
      name: item?.title ?? "",
      price: item?.price ?? 0,
      category: item?.categoryId ?? "",
      description: item?.description ?? "",
      image: [],
    }),
    [item],
  )

  const form = useForm<ItemFormInput>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const handleSubmit = async (values: ItemFormInput) => {
    const parsed = schema.parse(values)
    await onSubmit?.(parsed, item?.id)
  }

  return (
    <Dialog >
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
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Row 2: Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">دسته‌بندی</FormLabel>
                  <FormControl>
                    <Input placeholder="مثال: نوشیدنی‌ها" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            {/* Row 4: Images */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">تصاویر محصول</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-3 items-start p-3 rounded-xl border border-dashed border-border bg-muted/30 min-h-24">
                      {/* Uploaded thumbnails */}
                      {field.value?.map((imgId: string) => (
                        <div
                          key={imgId}
                          className="relative w-16 h-16 rounded-lg overflow-hidden border border-border shadow-sm group"
                        >
                          <Image
                            src={serveImage(imgId)}
                            alt="تصویر انتخاب‌شده"
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                          {/* Remove button on hover */}
                          <button
                            type="button"
                            onClick={() =>
                              field.onChange(field.value?.filter((i: string) => i !== imgId))
                            }
                            className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition rounded-lg"
                          >
                            <X className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      ))}

                      {/* Add button */}
                      <SelectImages
                        selectedImages={field.value || []}
                        setSelectedImages={(updated) => field.onChange(updated)}
                      >
                        <button
                          type="button"
                          className="flex flex-col items-center justify-center w-16 h-16 bg-background border border-dashed border-border rounded-lg hover:bg-muted hover:border-primary/50 transition gap-1"
                        >
                          <Plus className="w-4 h-4 text-muted-foreground" />
                          <span className="text-[10px] text-muted-foreground">افزودن</span>
                        </button>
                      </SelectImages>
                    </div>
                  </FormControl>
                  {item && (
                    <p className="text-xs text-muted-foreground mt-1">
                      در صورت نیاز، تصویر جدید انتخاب کنید.
                    </p>
                  )}
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
