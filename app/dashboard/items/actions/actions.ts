"use server"

import { CategoryModel, CreateCategoryInput, CreateProductInput, IdInput, ProductModel, ReadCategoryInput, ReadCategoryOutput, ReadProductInput, ReadProductOutput, UpdateCategoryInput, UpdateProductInput } from "@/api/Api"
import { takeApi } from "@/lib/take-api"
import { Response } from "@/lib/types";


export async function addItem(input: CreateProductInput): Promise<Response<ProductModel>> {

    const api = await takeApi()
    try {

        const { data } = await api.product.createProduct(input)

        return { data }
    } catch (error: any) {
        return { error: error.error }
    }
}

export async function updateItem(input: UpdateProductInput): Promise<Response<ProductModel>> {
    const api = await takeApi()
    try {
        const { data } = await api.product.updateProduct(input)
        return { data }
    } catch (error: any) {
        return { error: error.error }
    }
}

export async function deleteItem(id: IdInput): Promise<Response<ProductModel>> {
    const api = await takeApi()
    try {
        const { data } = await api.product.deleteProduct(id)
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

