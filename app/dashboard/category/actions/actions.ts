"use server"
import { ReadCategoryInput, ReadCategoryOutput, CreateCategoryInput, CategoryModel, IdInput, UpdateCategoryInput } from "@/api/Api"
import { takeApi } from "@/lib/take-api"
import { Response } from "@/types/types"
import { revalidatePath } from "next/cache"

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
        revalidatePath("/dashboard/category", "page")
        return { data }
    } catch (error: any) {
        return { error: error.error }
    }
}

export async function deleteCategory(input: IdInput): Promise<Response<CategoryModel>> {
    const api = await takeApi()
    try {
        const { data } = await api.category.deleteCategory(input)
        revalidatePath("/dashboard/category", "page")
        return { data }
    } catch (error: any) {
        return { error: error.error }
    }
}

export async function updateCategory(input: UpdateCategoryInput): Promise<Response<CategoryModel>> {
    const api = await takeApi()
    try {
        const { data } = await api.category.updateCategory(input)
        revalidatePath("/dashboard/category", "page")
        return { data }
    } catch (error: any) {
        return { error: error.error }
    }
}