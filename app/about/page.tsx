"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Clock, Mail } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-20 animate-fade-in">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold">درباره ما</h1>
            <ThemeToggle />
          </div>
          <p className="text-sm text-muted-foreground text-center">امروز از ما دیدن کنید</p>
        </div>
      </header>

      <main className="max-w-md mx-auto py-6 px-4">
        {/* Restaurant Info */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">رستوران خوشمزه</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            به رستوران خوشمزه خوش آمدید، جایی که تعالی آشپزی با مهمان‌نوازی گرم ملاقات می‌کند. ما به ارائه مواد تازه و
            محلی که با اشتیاق و خلاقیت تهیه شده‌اند، افتخار می‌کنیم. منوی ما شامل انتخاب متنوعی از غذاهای طراحی شده برای
            لذت بردن هر سلیقه‌ای است.
          </p>
        </div>

        {/* Map */}
        <Card className="mb-6 overflow-hidden">
          <div className="relative aspect-video bg-muted">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9476519598093!2d-73.99185492346445!3d40.74844097138558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />
          </div>
        </Card>

        {/* Contact Information */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">آدرس</h3>
                  <p className="text-sm text-muted-foreground">خیابان آشپزی ۱۲۳، منطقه غذا، نیویورک، NY 10001</p>
                  <Button variant="link" className="h-auto p-0 mt-2 text-primary" asChild>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Empire+State+Building"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      مسیریابی
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">تلفن</h3>
                  <p className="text-sm text-muted-foreground mb-2" dir="ltr">
                    +1 (555) 123-4567
                  </p>
                  <Button variant="link" className="h-auto p-0 text-primary" asChild>
                    <a href="tel:+15551234567">تماس</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">ایمیل</h3>
                  <p className="text-sm text-muted-foreground mb-2" dir="ltr">
                    info@deliciousrestaurant.com
                  </p>
                  <Button variant="link" className="h-auto p-0 text-primary" asChild>
                    <a href="mailto:info@deliciousrestaurant.com">ارسال ایمیل</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">ساعات کاری</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">دوشنبه - جمعه</span>
                      <span className="font-medium" dir="ltr">
                        11:00 - 22:00
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">شنبه</span>
                      <span className="font-medium" dir="ltr">
                        10:00 - 23:00
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">یکشنبه</span>
                      <span className="font-medium" dir="ltr">
                        10:00 - 21:00
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
