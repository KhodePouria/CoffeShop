"use client"

import React, { useRef, useState } from "react"
import { Camera, Upload, Plus, Loader2 } from "lucide-react"
import { uploadImage } from "@/app/dashboard/gallery/actions/action"
import { toast } from "sonner"

export function ImageUploadControls() {
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const cameraInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (!file) return

        try {
            setIsUploading(true)

            const response = await uploadImage({ image: file })

            if (!response.error) {
                toast.success('تصویر آپلود شد')
            } else {

                toast.error('مشکلی در آپلود تصویر پیش آمد')
            }

        } catch (error) {

            toast.error('مشکلی در آپلود تصویر پیش آمد')
        } finally {
            setIsUploading(false)
        }

    }

    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 bg-secondary/20 p-4 rounded-2xl border border-border/50" dir="rtl">
            <div className="flex items-center gap-2 w-full sm:w-auto ml-auto">
                <div className="bg-primary/10 p-2 rounded-full">
                    <Plus className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-semibold text-lg tracking-tight">افزودن به گالری</h2>
            </div>

            <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
            />

            <input
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                ref={cameraInputRef}
                onChange={handleFileChange}
            />

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="flex flex-1 sm:flex-none justify-center items-center gap-2 px-4 py-2 text-sm font-medium transition-colors border shadow-sm rounded-xl hover:bg-secondary disabled:opacity-50"
                >
                    {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    <span>فایل‌ها</span>
                </button>

                <button
                    onClick={() => cameraInputRef.current?.click()}
                    disabled={isUploading}
                    className="flex flex-1 sm:flex-none justify-center items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors shadow-sm bg-primary rounded-xl hover:bg-primary/90 disabled:opacity-50"
                >
                    {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
                    <span>دوربین</span>
                </button>
            </div>
        </div>
    )
}
