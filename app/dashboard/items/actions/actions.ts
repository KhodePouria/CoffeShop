"use server"

import { CategoryModel, CreateCategoryInput, CreateProductInput, IdInput, ProductModel, ReadCategoryInput, ReadCategoryOutput, ReadProductInput, ReadProductOutput, UpdateCategoryInput, UpdateProductInput } from "@/api/Api"
import { takeApi } from "@/lib/take-api"
import { Response } from "@/types/types";
import { revalidatePath } from "next/cache";


export async function addItem(input: CreateProductInput): Promise<Response<ProductModel>> {

    const api = await takeApi()
    try {
        const { data } = await api.product.createProduct(input)
        revalidatePath("/dashboard/items", "page")
        return { data }
    } catch (error: any) {
        return { error: error.error }
    }
}

export async function updateItem(input: UpdateProductInput): Promise<Response<ProductModel>> {
    const api = await takeApi()
    try {
        const { data } = await api.product.updateProduct(input)
        revalidatePath("/dashboard/items", "page")
        return { data }
    } catch (error: any) {
        return { error: error.error }
    }
}

export async function deleteItem(id: IdInput): Promise<Response<ProductModel>> {
    const api = await takeApi()
    try {
        const { data } = await api.product.deleteProduct(id)
        revalidatePath("/dashboard/items", "page")
        return { data }
    } catch (error: any) {
        return { error: error.error }
    }
}

export async function readItems(input: ReadProductInput): Promise<Response<ReadProductOutput>> {
    const api = await takeApi()
    try {
        const { data } = await api.product.readProduct(input)
        return { data }
    } catch (error: any) {
        return { error: error.error }
    }
}

