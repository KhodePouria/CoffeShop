
import { ImageUploadControls } from "./image-upload-controls"
import { GalleryImageCard } from "./gallery-image-card"
import { ObjectModel } from "@/api/Api"
import { serveImage } from "@/lib/utils"

interface GalleryShowProps {
    data: ObjectModel[]
}

export default function GalleryShow({ data }: GalleryShowProps) {

    return (
        <div className="w-full py-6" dir="rtl">
            <ImageUploadControls />

            {data.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground bg-secondary/10 rounded-3xl border border-dashed">
                    <p>هیچ تصویری در گالری یافت نشد.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {data.map((item) => (
                        <GalleryImageCard key={item.id} id={item.id} image={serveImage(item.id)} />
                    ))}
                </div>
            )}
        </div>
    )
}
