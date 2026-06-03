import { z } from "zod"

export const createCategorySchema = z.object({
    name: z.string().min(2, "نام دسته‌بندی حداقل باید ۲ کاراکتر باشد"),
    slug: z
        .string()
        .min(2, "شناسه باید حداقل ۲ کاراکتر باشد")
        .regex(/^[a-z0-9-]+$/, "شناسه فقط می‌تواند شامل حروف انگلیسی کوچک، اعداد و خط تیره باشد"),
    icon: z.string().optional(),
})

export type CategoryFormInput = z.input<typeof createCategorySchema>
export type CategoryFormValues = z.output<typeof createCategorySchema>
