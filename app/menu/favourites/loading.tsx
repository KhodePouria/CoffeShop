import { Skeleton } from "@/components/ui/skeleton"

const SK = ({ className }: { className?: string }) => (
    <Skeleton className={`bg-muted dark:bg-muted ${className}`} />
)

export default function FavsLoading() {
    return (
        <div className="min-h-screen pb-20">
            <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between gap-3 mb-2">
                        <SK className="h-7 w-40 rounded-lg" />
                        <SK className="h-9 w-9 rounded-full" />
                    </div>
                    <SK className="h-4 w-32 rounded-md mx-auto" />
                </div>
            </header>

            <main className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
                </div>
            </main>
        </div>
    )
}

function CardSkeleton() {
    return (
        <div className="p-2.5 rounded-[2.5rem] bg-background/40 dark:bg-background/10 border border-white/20 dark:border-white/5">
            <div className="relative aspect-square sm:aspect-4/3 w-full overflow-hidden rounded-[2rem]">
                <SK className="absolute inset-0 rounded-[2rem]" />
                <SK className="absolute top-3 left-3 h-10 w-10 rounded-full" />
            </div>
            <div className="p-4 pt-5 pb-3 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                    <SK className="h-5 w-28 rounded-md" />
                    <SK className="h-5 w-20 rounded-md" />
                </div>
                <div className="flex flex-col gap-1.5">
                    <SK className="h-3.5 w-full rounded-md" />
                    <SK className="h-3.5 w-3/4 rounded-md" />
                </div>
            </div>
        </div>
    )
}
