import { join } from "path"
import { generateApi } from "swagger-typescript-api"

async function generateSwagger() {
	const url = `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}${process.env.NEXT_PUBLIC_SWAGGER_API_DOC_PATH}`
	const outputPath = join(process.cwd(), "api/")
	await generateApi({
		name: "api.ts",
		output: outputPath,
		toJS: true,
		cleanOutput: true,
		url: url,
		extractEnums: true
	})
}

generateSwagger()
