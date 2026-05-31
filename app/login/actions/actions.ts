"use server"

import { LoginInput, TokenModel } from "@/api/Api"
import { takeApi } from "@/lib/take-api"
import { Response } from "@/lib/types";

export async function login(input: LoginInput): Promise<Response<TokenModel>> {
    const api = await takeApi()

    try {

        const { data } = await api.user.login(input)

        return { data: JSON.parse(JSON.stringify(data)) }
    } catch (error: any) {

        return {
            error: JSON.parse(
                JSON.stringify(error?.error || { message: "خطایی رخ داد", translation: "An error occurred" })
            ),
        }
    }
}