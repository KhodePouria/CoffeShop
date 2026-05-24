"use server"
/* import {  IdInput, ObjectModel,ReadImageInput, ReadImageOutput, UploadImageInput, UploadImageOutput } from "@/api/Api";
import { takeApi } from "@/lib/take-api";
import { Response } from "@/types";
import { revalidatePath } from "next/cache";
 */
export async function readImages()/* input: ReadImageInput): Promise<ReadImageOutput> */ {
    /* const api = await takeApi()
    try {
        const {data}  = await api.gallery.readImages(input)
        return data
    } catch (error: any) {
        return error
    } */
}

/* export async function uploadImage(input : UploadImageInput): Promise<Response<UploadImageOutput>> {
    const api = await takeApi()
    try {
        const { data } = await api.gallery.uploadImage(input)
        return { data }
    } catch (error: any) {
        return { error: error.error }
    }
}

export async function deleteImage(id : IdInput): Promise<Response<ObjectModel>> {
    const api = await takeApi()
    try {
        const { data } = await api.gallery.deleteImage({id: id.id})
        return { data }
    } catch (error: any) {
        return { error: error.error }
    }
}

export async function revalidateImages() {
    revalidatePath("/dashboard/gallery", "page")
} */
