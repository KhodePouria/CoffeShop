import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Coffee, GalleryHorizontalEndIcon, Layers, ImageIcon, Utensils, LayoutDashboard, ChevronLeft } from "lucide-react"
import { readItems } from "./items/actions/actions"
import { readImages } from "./gallery/actions/action"
import { readCategories } from "./category/actions/actions"

export default async function DashboardPage() {
  const [itemsRes, imagesRes, categoriesRes] = await Promise.all([
    readItems({ pagination: { take: 1, skip: 0 } }),
    readImages({ pagination: { take: 1, skip: 0 } }),
    readCategories({ pagination: { take: 1, skip: 0 } })
  ])

  const itemsCount = itemsRes.data?.count || 0
  const imagesCount = imagesRes.data?.count || 0
  const categoriesCount = categoriesRes.data?.count || 0

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/20 via-background to-secondary/30 border border-primary/10 shadow-sm p-8 sm:p-10">
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-primary mb-2">
              <LayoutDashboard className="w-8 h-8" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">پیشخوان مدیریت</h2>
            </div>
            <p className="text-base text-muted-foreground max-w-lg">
              خوش آمدید! از اینجا می‌توانید تمام بخش‌های کافه شامل منو، گالری و دسته‌بندی‌ها را به سرعت مدیریت کنید.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-xl shadow-md transition-transform hover:scale-105">
              <Link href="/dashboard/items" className="flex items-center gap-2">
                <Coffee className="w-5 h-5" />
                <span>افزودن آیتم جدید</span>
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="rounded-xl shadow-sm transition-transform hover:scale-105">
              <Link href="/dashboard/gallery" className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                <span>گالری تصاویر</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
        <Card className="rounded-2xl border-primary/10 shadow-sm hover:shadow-md transition-shadow group">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">کل آیتم‌های منو</p>
              <p className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">{itemsCount}</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <Utensils className="w-7 h-7" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-accent/20 shadow-sm hover:shadow-md transition-shadow group">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">دسته‌بندی‌ها</p>
              <p className="text-3xl font-bold text-foreground group-hover:text-accent transition-colors">{categoriesCount}</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
              <Layers className="w-7 h-7" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-chart-3/20 shadow-sm hover:shadow-md transition-shadow group">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">تصاویر گالری</p>
              <p className="text-3xl font-bold text-foreground group-hover:text-chart-3 transition-colors">{imagesCount}</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-chart-3/10 flex items-center justify-center text-chart-3 group-hover:scale-110 transition-transform">
              <GalleryHorizontalEndIcon className="w-7 h-7" />
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/dashboard/items" className="block outline-none">
          <Card className="h-full rounded-2xl transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 group bg-card">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  <Coffee className="w-6 h-6" />
                </div>
                <div className="bg-secondary p-1.5 rounded-full text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronLeft className="w-5 h-5" />
                </div>
              </div>
              <CardTitle className="text-xl">مدیریت آیتم‌های منو</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                اضافه کردن غذاهای جدید، ویرایش قیمت‌ها، بروزرسانی اطلاعات محصولات، و غیرفعال کردن آیتم‌های ناموجود در منو.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/gallery" className="block outline-none">
          <Card className="h-full rounded-2xl transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:-translate-y-1 group bg-card">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <div className="p-3 bg-accent/10 rounded-xl text-accent-foreground">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <div className="bg-secondary p-1.5 rounded-full text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronLeft className="w-5 h-5" />
                </div>
              </div>
              <CardTitle className="text-xl">مدیریت رسانه و گالری</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                آپلود عکس‌های خوشمزه و جذاب برای محصولات، تماشای گالری فعلی و مدیریت نماهای بصری در اپلیکیشن.
              </p>
            </CardContent>
          </Card>
        </Link>
      </section>
    </div>
  )
}
