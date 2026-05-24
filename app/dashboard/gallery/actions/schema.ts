import { z } from "zod"
import { zfd } from "zod-form-data"

export const uploadImageSchema = z.object({
	image: zfd
		.file()
		.refine(
			(file: any) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
			{
				message: "فرمت فایل باید jpeg, png یا jpg باشد.",
			},
		),
})
