"use client"

import { Loader2Icon, UploadCloud, X, Camera } from "lucide-react"
import Image from "next/image"
import React, { useState, useTransition, useRef } from "react"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { useBase64 } from "@/lib/use-base64"
import { uploadImage } from "@/app/dashboard/gallery/actions/action"

export default function UploadImageDialog({
  children,
  onUploadComplete,
}: {
  children: React.ReactNode
  onUploadComplete?: () => void
}) {
  const [open, setOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [cameraOpen, setCameraOpen] = useState(false)
  const [pending, startTransition] = useTransition()
  const { base64, handleImageChange, setBase64 } = useBase64()
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      streamRef.current = stream
      setCameraOpen(true)
      setTimeout(() => {
        if (videoRef.current) videoRef.current.srcObject = stream
      }, 100)
    } catch {
      toast.error("دسترسی به دوربین ممکن نیست.")
    }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    setCameraOpen(false)
  }

  function capturePhoto() {
    const video = videoRef.current
    if (!video) return
    const canvas = document.createElement("canvas")
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext("2d")?.drawImage(video, 0, 0)
    canvas.toBlob((blob) => {
      if (!blob) return
      const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" })
      setSelectedFile(file)
      setBase64(canvas.toDataURL("image/jpeg"))
      stopCamera()
    }, "image/jpeg", 0.9)
  }

  async function handleUpload() {
    if (!selectedFile) { toast("لطفاً یک تصویر انتخاب کنید."); return }
    if (selectedFile.size >= 800 * 1080) { toast.error("حجم فایل انتخابی نباید بیش از 800kb باشد!"); return }
    startTransition(async () => {
      const data = await uploadImage({ image: selectedFile })
      if (data?.data) {
        toast.success("با موفقیت آپلود شد.")
        setOpen(false)
        setSelectedFile(null)
        onUploadComplete?.()
      } else {
        toast.error("مشکلی پیش آمد!")
      }
    })
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    setSelectedFile(file)
    handleImageChange(e)
  }

  function handleClear() {
    setSelectedFile(null)
    setBase64(undefined)
  }

  function handleOpenChange(val: boolean) {
    if (!val) { stopCamera(); setSelectedFile(null); setBase64(undefined) }
    setOpen(val)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-sm mx-auto sm:mx-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <DialogHeader>
          <DialogTitle>آپلود تصویر</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Camera view */}
          {cameraOpen && (
            <div className="relative rounded-xl overflow-hidden border bg-black aspect-video">
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              <div className="absolute bottom-3 inset-x-0 flex justify-center gap-3">
                <Button type="button" size="sm" onClick={capturePhoto} className="gap-2">
                  <Camera className="size-4" /> عکس بگیر
                </Button>
                <Button type="button" size="sm" variant="outline" onClick={stopCamera}>
                  لغو
                </Button>
              </div>
            </div>
          )}

          {/* Preview */}
          {!cameraOpen && base64 && (
            <div className="relative group rounded-xl overflow-hidden border bg-muted aspect-video flex items-center justify-center">
              <Image src={base64} alt="پیش‌نمایش" width={400} height={300} className="object-contain max-h-48 w-auto" />
              <button
                type="button"
                onClick={handleClear}
                className="absolute top-2 right-2 flex items-center justify-center w-7 h-7 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition hover:bg-black/80"
              >
                <X className="size-3.5" />
              </button>
              {selectedFile && (
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="bg-black/60 text-white text-xs rounded-lg px-2 py-1 truncate text-center">
                    {selectedFile.name}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Drop zone — only when no preview and no camera */}
          {!cameraOpen && !base64 && (
            <label className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border p-8 cursor-pointer hover:bg-muted/50 hover:border-primary/40 transition-all group">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-muted group-hover:bg-primary/10 transition-colors">
                <UploadCloud className="size-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="text-center space-y-1">
                <p className="text-sm font-medium">برای انتخاب کلیک کنید</p>
                <p className="text-xs text-muted-foreground">JPG، PNG — حداکثر 800kb</p>
              </div>
              <Input type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={handleFileChange} />
            </label>
          )}

          {/* Actions */}
          {!cameraOpen && (
            <div className="flex gap-2">
              {/* Camera button */}
              <Button type="button" variant="outline" size="icon" onClick={startCamera} title="استفاده از دوربین">
                <Camera className="size-4" />
              </Button>

              {selectedFile && (
                <label className="flex-1 cursor-pointer">
                  <Button type="button" variant="outline" className="w-full" asChild>
                    <span>تغییر تصویر</span>
                  </Button>
                  <Input type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={handleFileChange} />
                </label>
              )}

              <Button
                className="flex-1 gap-2"
                onClick={handleUpload}
                disabled={pending || !selectedFile}
              >
                {pending ? (<><Loader2Icon className="size-4 animate-spin" />در حال آپلود...</>
                ) : (
                  <><UploadCloud className="size-4" />آپلود</>
                )}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
