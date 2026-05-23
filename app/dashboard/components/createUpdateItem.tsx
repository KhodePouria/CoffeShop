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
import type { ItemRow } from "../actions/actions"
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

interface CreateUpdateItemDialogProps {
  item?: ItemRow
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
      name: item?.name ?? "",
      price: item?.price ?? 0,
      category: item?.category ?? "",
      description: item?.description ?? "",
      image: undefined,
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={triggerVariant}>{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{item ? "ویرایش آیتم" : "افزودن آیتم جدید"}</DialogTitle>
          <DialogDescription>
            {item
              ? "اطلاعات آیتم انتخاب‌شده را به‌روزرسانی کنید."
              : "اطلاعات آیتم جدید را وارد کنید تا به منو اضافه شود."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام محصول</FormLabel>
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
                    <FormLabel>قیمت</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="مثال: 4.80"
                        value={field.value ?? ""}
                        onChange={(event) => field.onChange(event.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>دسته‌بندی</FormLabel>
                    <FormControl>
                      <Input placeholder="مثال: نوشیدنی‌ها" {...field} />
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
                    <FormLabel>تصویر محصول</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={(event) => field.onChange(event.target.files)}
                      />
                    </FormControl>
                    {item ? (
                      <p className="text-xs text-muted-foreground">در صورت نیاز، تصویر جدید انتخاب کنید.</p>
                    ) : null}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>توضیحات</FormLabel>
                  <FormControl>
                    <Textarea placeholder="توضیح کوتاه درباره محصول" className="min-h-28" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <Button type="submit" className="sm:flex-1">
                {item ? "به‌روزرسانی آیتم" : "ثبت آیتم"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="sm:flex-1"
                onClick={() => form.reset(defaultValues)}
              >
                پاک کردن فرم
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
