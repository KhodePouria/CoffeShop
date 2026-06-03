"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Trash2, Maximize2, Loader2, Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { deleteImage } from "@/app/dashboard/gallery/actions/action"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog"

interface GalleryImageCardProps {
    id: string
    image: string
}

export function GalleryImageCard({ id, image }: GalleryImageCardProps) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [open, setOpen] = useState(false)
    const [isCopied, setIsCopied] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        try {
            setIsDeleting(true)
            const response = await deleteImage({ id })

            if (!response.error) {
                toast.success("تصویر با موفقیت حذف شد")
                router.refresh()
                setOpen(false)
            } else {
                toast.error("مشکلی در حذف تصویر پیش آمد")
            }
        } catch (error) {
            toast.error("مشکلی ارتباط با سرور پیش آمد")
        } finally {
            setIsDeleting(false)
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(image)
        setIsCopied(true)
        toast.success("آدرس تصویر کپی شد")
        setTimeout(() => setIsCopied(false), 2000)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="relative overflow-hidden transition-all duration-300 border shadow-sm aspect-square rounded-2xl border-border/50 bg-secondary/30 group hover:shadow-md hover:-translate-y-1 cursor-pointer">
                    <Image
                        src={image}
                        alt="Gallery image"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                        <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white/90">
                            <Maximize2 className="w-6 h-6" />
                        </div>
                    </div>
                </div>
            </DialogTrigger>

            <DialogContent className="max-w-4xl m-auto p-1 bg-transparent border-none shadow-none">
                <div className="relative max-w-4xl h-[80vh] bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden flex flex-col items-center justify-center">
                    <div className="relative w-full h-full flex-1">
                        <Image
                            src={image}
                            alt="Full size gallery image"
                            fill
                            className="object-contain"
                            quality={100}
                        />
                    </div>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 p-2 bg-background/90 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl">

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="rounded-xl gap-2 font-medium"
                                    disabled={isDeleting}
                                >
                                    {isDeleting
                                        ? <Loader2 className="w-4 h-4 animate-spin" />
                                        : <Trash2 className="w-4 h-4" />
                                    }
                                    حذف
                                </Button>
                            </AlertDialogTrigger>

                            <AlertDialogContent dir="rtl" className="text-right">
                                <AlertDialogHeader className="items-start">
                                    <AlertDialogTitle>حذف تصویر</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        آیا مطمئن هستید که می‌خواهید این تصویر را حذف کنید؟
                                        این عمل قابل بازگشت نیست.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="flex-row-reverse gap-2 sm:flex-row-reverse">
                                    <AlertDialogCancel>انصراف</AlertDialogCancel>
                                    {/* ✅ Fix 2: onClick={handleDelete} not onClick={() => handleDelete} */}
                                    <AlertDialogAction
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                        onClick={handleDelete}
                                        disabled={isDeleting}
                                    >
                                        {isDeleting
                                            ? <Loader2 className="w-4 h-4 animate-spin" />
                                            : "حذف"
                                        }
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                        <div className="w-px h-6 bg-border/50" />

                        <Button
                            variant="secondary"
                            size="sm"
                            className="rounded-xl gap-2 text-foreground font-medium"
                            onClick={copyToClipboard}
                        >
                            {isCopied
                                ? <Check className="w-4 h-4 text-green-500" />
                                : <Copy className="w-4 h-4" />
                            }
                            {isCopied ? "کپی شد" : "کپی لینک"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}