"use client"

import { Skeleton } from "@/components/ui/skeleton"

const SK = ({ className }: { className?: string }) => (
    <Skeleton className={`bg-muted ${className}`} />
)

function CategorySliderSkeleton() {
    return (
        <div className="sticky top-[3.8rem] z-30">
            <div className="relative w-full bg-background/80 backdrop-blur-md border-b border-border/50">
                <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-8">
                    <div className="flex gap-4 overflow-hidden py-3 justify-start lg:justify-center items-center">
                        {Array.from({ length: 7 }).map((_, i) => (
                            <SK
                                key={i}
                                className="shrink-0 w-18 h-18 sm:w-20 sm:h-20 rounded-2xl"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function CardSkeleton() {
    return (
        <div className="p-2.5 rounded-[2.5rem] bg-background/40 border border-white/20 dark:border-white/5">
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

function MenuSectionSkeleton({ cardCount = 4 }: { cardCount?: number }) {
    return (
        <section className="scroll-mt-32 mb-16">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-7 bg-muted rounded-full" />
                <SK className="h-8 w-40 rounded-md" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {Array.from({ length: cardCount }).map((_, i) => (
                    <CardSkeleton key={i} />
                ))}
            </div>
        </section>
    )
}

export default function HomePageLoading() {
    return (
        <>
            <CategorySliderSkeleton />

            <main className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <MenuSectionSkeleton cardCount={4} />
                <MenuSectionSkeleton cardCount={3} />
                <MenuSectionSkeleton cardCount={4} />
            </main>
        </>
    )
}
