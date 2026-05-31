import { z } from "zod";

export const loginSchema = z.object({
    username: z.string().min(1, "نام کاربری الزامی است").max(50),
    password: z
        .string()
        .min(1, "رمز عبور الزامی است")
        .min(6, "رمز عبور باید حداقل 6 کاراکتر باشد"),
})

export type LoginSchemaType = z.infer<typeof loginSchema>
