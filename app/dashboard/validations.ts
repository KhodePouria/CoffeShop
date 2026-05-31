import { z } from "zod";

const baseItemSchema = z.object({
  name: z.string().min(2, "نام محصول حداقل باید ۲ کاراکتر باشد"),
  price: z.number().positive("قیمت باید بیشتر از صفر باشد"),
  category: z.string().min(2, "دسته‌بندی را وارد کنید"),
  description: z.string().min(10, "توضیحات باید حداقل ۱۰ کاراکتر باشد"),
});

const requiredImagesSchema = z
  .array(z.string())

const optionalImagesSchema = z.array(z.string()).optional();

export const createItemSchema = baseItemSchema.extend({
  image: requiredImagesSchema,
});

export const updateItemSchema = baseItemSchema.extend({
  image: optionalImagesSchema,
});

export type CreateItemInput = z.input<typeof createItemSchema>;
export type UpdateItemInput = z.input<typeof updateItemSchema>;

export type CreateItemValues = z.output<typeof createItemSchema>;
export type UpdateItemValues = z.output<typeof updateItemSchema>;

// If you want a single type for the form:
export type ItemFormInput = z.input<typeof updateItemSchema>;
export type ItemFormValues = z.output<typeof updateItemSchema>;