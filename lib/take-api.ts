"use server"
import { Api } from "@/api/Api"
import { cookies } from "next/headers"

export async function takeApi() {
    // const config = useRuntimeConfig()
    const cookie = await cookies()
    const api = new Api({
        customFetch: createCustomFetch(),
        baseUrl: process.env.NEXT_PUBLIC_SERVER_ADDRESS
    })

    function createCustomFetch() {
        async function customFetch(input: RequestInfo | URL, init: RequestInit | undefined) {
            const tokenValue = cookie.get("token")?.value

            init ??= {}
            init.headers ??= {}

            if (tokenValue) {
                init.headers = {
                    ...init.headers,
                    authorization: tokenValue,
                }
                init.cache = "no-cache"
            }

            const response = await fetch(input, init)
            return response
        }

        return customFetch
    }

    return api
}
