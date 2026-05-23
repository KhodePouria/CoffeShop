import { z } from "zod"

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"]

const baseItemSchema = z.object({
  name: z.string().min(2, "نام محصول حداقل باید ۲ کاراکتر باشد"),
  price: z.number().positive("قیمت باید بیشتر از صفر باشد"),
  category: z.string().min(2, "دسته‌بندی را وارد کنید"),
  description: z.string().min(10, "توضیحات باید حداقل ۱۰ کاراکتر باشد"),
})

const requiredImageSchema = z
  .custom<FileList>((val) => val instanceof FileList)
  .refine((files) => files.length > 0, "تصویر محصول الزامی است")
  .refine((files) => files[0]?.size <= MAX_FILE_SIZE, "حجم تصویر باید کمتر از ۵ مگابایت باشد")
  .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files[0]?.type), "فرمت تصویر باید PNG یا JPG یا WebP باشد")

const optionalImageSchema = z
  .custom<FileList>((val) => val instanceof FileList)
  .optional()
  .refine((files) => !files || files.length === 0 || files[0]?.size <= MAX_FILE_SIZE, "حجم تصویر باید کمتر از ۵ مگابایت باشد")
  .refine((files) => !files || files.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files[0]?.type), "فرمت تصویر باید PNG یا JPG یا WebP باشد")

export const createItemSchema = baseItemSchema.extend({
  image: requiredImageSchema,
})

export const updateItemSchema = baseItemSchema.extend({
  image: optionalImageSchema,
})

export type ItemFormInput = z.input<typeof updateItemSchema>
export type ItemFormValues = z.output<typeof updateItemSchema>
