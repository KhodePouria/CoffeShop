"use server"

import { CreateProductInput, IdInput, ObjectModel, ProductModel, ReadImageInput, ReadImageOutput, ReadProductInput, ReadProductOutput, UpdateProductInput, UploadImageInput, UploadImageOutput } from "@/api/Api"
import { takeApi } from "@/lib/take-api"
import { Response } from "@/lib/types";


export async function uploadImage(input: UploadImageInput): Promise<Response<UploadImageOutput>> {
    const api = await takeApi()

    try {

        const { data } = await api.gallery.uploadImage(input)

        return { data }
    } catch (error: any) {
        return { error: error.error }
    }
}

export async function deleteImage(input: IdInput): Promise<Response<ObjectModel>> {
    const api = await takeApi()
    try {
        const { data } = await api.gallery.deleteImage(input)
        return { data }
    } catch (error: any) {
        return { error: error.error }
    }
}
export async function readImages(input: ReadImageInput): Promise<Response<ReadImageOutput>> {
    const api = await takeApi()
    try {
        const { data } = await api.gallery.readImages(input)
        return { data }
    } catch (error: any) {
        return { error: error.error }
    }
}