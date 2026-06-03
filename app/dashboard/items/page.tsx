import { readCategories } from "../category/actions/actions"
import { CreateUpdateItemDialog } from "../../../components/dashboard/createUpdateItem"
import { readItems } from "./actions/actions"
import { DashboardItemsList } from "../../../components/items-list"
import PaginationSSR from "@/components/PaginationSSR"

export default async function DashboardItemsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams
  const page = Number(params?.page) || 1
  const take = 10
  const skip = (page - 1) * take

  const items = await readItems({
    pagination: {
      take,
      skip
    }
  })
  const categories = await readCategories({})
  const itemsList = items.data?.data || []
  const categoriesList = categories.data?.data || []

  return (
    <div className="space-y-6">
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">آیتم‌های منو</h2>
          <p className="text-sm text-muted-foreground">لیست آیتم‌ها را مدیریت کنید.</p>
        </div>
        {itemsList.length > 0 && (
          <CreateUpdateItemDialog categories={categoriesList} triggerLabel="افزودن آیتم جدید" />
        )}
      </section>

      {itemsList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-muted-foreground bg-secondary/10 rounded-3xl border border-dashed border-border/50 text-center space-y-4 gap-4">
          <p>هیچ آیتمی یافت نشد. می‌توانید اولین آیتم را اضافه کنید.</p>
          <CreateUpdateItemDialog categories={categoriesList} triggerLabel="افزودن آیتم جدید" />
        </div>
      ) : (
        <>
          <DashboardItemsList items={itemsList} categories={categoriesList} />
          <PaginationSSR itemsPerPage={take} totalItems={items.data?.count || 0} searchParams={searchParams} />
        </>
      )}
    </div>
  )
}
