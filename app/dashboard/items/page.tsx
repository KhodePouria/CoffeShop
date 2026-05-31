import { CreateUpdateItemDialog } from "../components/createUpdateItem"
import { readItems } from "./actions/actions"
import { DashboardItemsList } from "./items-list"
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

  return (
    <div className="space-y-6">
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">آیتم‌های منو</h2>
          <p className="text-sm text-muted-foreground">لیست آیتم‌ها را مدیریت کنید.</p>
        </div>
        <CreateUpdateItemDialog triggerLabel="افزودن آیتم جدید" />
      </section>

      <DashboardItemsList items={items.data?.data || []} />

      <PaginationSSR itemsPerPage={take} totalItems={items.data?.count || 0} searchParams={searchParams} />
    </div>
  )
}
