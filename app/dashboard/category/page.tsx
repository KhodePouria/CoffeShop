import { readCategories } from "./actions/actions"
import { CreateUpdateCategoryDialog } from "@/components/CreateUpdateCategory"
import { CategoryTable } from "@/components/CategoryTable"
import { LayoutGrid } from "lucide-react"
import PaginationSSR from "@/components/PaginationSSR"

export default async function CategoryPage({ searchParams }: { searchParams: any }) {
    const params = await searchParams
    if (!params.page)
        params.page = 1
    const itemsPerPage = 6

    const result = await readCategories({
        pagination: {
            take: itemsPerPage,
            skip: (params.page - 1) * itemsPerPage
        }
    })


    return (
        <div className="p-6 space-y-6" dir="rtl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">

                    <div className="flex flex-col items-center">
                        <div className="flex gap-1">
                            <div className="flex items-center p-2 rounded-lg bg-primary/10">
                                <LayoutGrid className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex flex-col ">
                                <h1 className="text-xl font-bold tracking-tight">دسته‌بندی‌ها</h1>
                                <p className="text-xs text-muted-foreground">
                                    مدیریت دسته‌بندی‌های منو
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                <CreateUpdateCategoryDialog triggerLabel="افزودن دسته‌بندی" />
            </div>

            <div className="h-px bg-border" />

            <CategoryTable categories={result.data?.data || []} />
            {((result.data?.count || 0) > itemsPerPage) && <PaginationSSR itemsPerPage={itemsPerPage} totalItems={result.data?.count || 0} searchParams={searchParams} />}
        </div>
    )
}