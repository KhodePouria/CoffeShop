import { ThemeToggle } from "@/components/theme-toggle"
import { HomePageClient } from "@/components/home-page-client"
import { readCategories, readItems } from "../dashboard/items/actions/actions"
import { Coffee } from "lucide-react"

export default async function HomePage() {
    const catResults = await readCategories({})
    const menuResults = await readItems({})
    const isEmpty = menuResults.data?.count === 0

    return (
        <div className="min-h-screen pb-20 animate-fade-in">
            <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                    <div className="flex items-center justify-between gap-3">
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight text-balance">
                            کافه دا
                        </h1>
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            {isEmpty ? (
                <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
                    {/* Icon */}
                    <div className="relative mb-6">
                        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                            <Coffee className="w-10 h-10 text-muted-foreground" strokeWidth={1.5} />
                        </div>
                        {/* Subtle glow ring */}
                        <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl -z-10 scale-150" />
                    </div>

                    {/* Text */}
                    <h2 className="text-xl font-semibold text-foreground mb-2">
                        منو در حال آماده‌سازی است
                    </h2>
                    <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                        به زودی آیتم‌های خوشمزه‌ای اینجا خواهند بود.
                        <br />
                        لطفاً کمی صبر کنید.
                    </p>

                    {/* Decorative dots */}
                    <div className="flex gap-1.5 mt-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:0ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:150ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:300ms]" />
                    </div>
                </div>
            ) : (
                <HomePageClient
                    categories={catResults.data?.data || []}
                    menuItems={menuResults.data?.data || []}
                />
            )}
        </div>
    )
}
