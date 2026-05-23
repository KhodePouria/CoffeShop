import { listProducts } from "../actions/actions"
import { CreateUpdateItemDialog } from "../components/createUpdateItem"
import { DashboardItemsList } from "./items-list"

export default async function DashboardItemsPage() {
  const { items } = await listProducts({ baseUrl: "" })

  return (
    <div className="space-y-6">
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">آیتم‌های منو</h2>
          <p className="text-sm text-muted-foreground">لیست آیتم‌ها را مدیریت کنید.</p>
        </div>
        <CreateUpdateItemDialog triggerLabel="افزودن آیتم جدید" />
      </section>

      <DashboardItemsList items={items} />
    </div>
  )
}
