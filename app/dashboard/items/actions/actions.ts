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

export async function readCategories(input: ReadCategoryInput): Promise<Response<ReadCategoryOutput>> {
    const api = await takeApi()
    try {
        const { data } = await api.category.readCategory(input)
        return { data }
    } catch (error: any) {
        return { error: error.error }
    }
}

export async function createCategory(input: CreateCategoryInput): Promise<Response<CategoryModel>> {
    const api = await takeApi()
    try {
        const { data } = await api.category.createCategory(input)
        return { data }
    } catch (error: any) {
        return { error: error.error }
    }
}

export async function deleteCategory(input: IdInput): Promise<Response<CategoryModel>> {
    const api = await takeApi()
    try {
        const { data } = await api.category.deleteCategory(input)
        return { data }
    } catch (error: any) {
        return { error: error.error }
    }
}

export async function updateCategory(input: UpdateCategoryInput): Promise<Response<CategoryModel>> {
    const api = await takeApi()
    try {
        const { data } = await api.category.updateCategory(input)
        return { data }
    } catch (error: any) {
        return { error: error.error }
    }
}