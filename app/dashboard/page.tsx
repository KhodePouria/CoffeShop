import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Coffee, GalleryHorizontal, GalleryHorizontalEndIcon, Milk } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 rounded-2xl border border-border bg-card/40 p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold">مدیریت سفارش‌ها و آیتم‌ها</h2>
            <p className="text-sm text-muted-foreground">
              به بخش موردنظر بروید تا سفارش‌ها و آیتم‌های منو را مدیریت کنید.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <div>
                <Link href="/dashboard/items">مدیریت آیتم‌ها</Link>
                <Coffee />
              </div>
            </Button>
            <Button asChild className="w-full sm:w-auto">
              <div>
                <Link href="/dashboard/gallery">گالری</Link>
                <GalleryHorizontalEndIcon />
              </div>
            </Button>

          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">گالری</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>نمایش لیست عکس ها.</p>
            <Badge variant="secondary">به‌زودی متصل به API</Badge>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">آیتم‌ها</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>مدیریت آیتم‌های منو با امکان ایجاد، مشاهده و ویرایش.</p>
            <Badge variant="secondary">به‌زودی متصل به API</Badge>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
