"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Clock, Mail } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-20 animate-fade-in" dir="rtl">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-3 mb-2">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight text-balance">درباره ما</h1>
            <ThemeToggle />
          </div>
          <p className="text-sm sm:text-base text-muted-foreground text-center text-balance">منتظر دیدار شما هستیم</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Cafe Info */}
        <div className="mb-8">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4">کافه دا</h2>
          <p className="text-muted-foreground leading-relaxed mb-6 text-balance text-justify">
            به کافه دا خوش آمدید؛ فضایی دنج و آرام در قلب شیراز و بلوار زند. ما با بهره‌گیری از دانه‌های قهوه باکیفیت و تخصصی، نوشیدنی‌های تازه و دسرهای دست‌ساز، در تلاشیم تا تجربه‌ای متفاوت و خاطره‌انگیز از دورهمی‌ها، قرارهای کاری و لحظات استراحت شما بسازیم.
          </p>
        </div>

        {/* Map */}
        <Card className="mb-6 overflow-hidden">
          <div className="relative aspect-video bg-muted">
            <iframe
              /* این یک موقعیت تقریبی از بلوار زند شیراز است، می‌توانید آن را با لینک Embed دقیق کافه جایگزین کنید */
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13904.708892706325!2d52.540113!3d29.626645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fb2120000000001%3A0x1!2sZand%20Blvd%2C%20Shiraz%2C%20Fars%20Province%2C%20Iran!5e0!3m2!1sen!2s!4v1710000000000!5m2!1sen!2s"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">آدرس</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">شیراز، بلوار زند، جنب بانک سامان، مجتمع پزشکی آراد</p>
                  <Button variant="link" className="h-auto p-0 mt-2 text-primary" asChild>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Zand+Boulevard+Shiraz"
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
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">تلفن</h3>
                  <p className="text-sm text-muted-foreground mb-2" dir="ltr">
                    071 3230 0000
                  </p>
                  <Button variant="link" className="h-auto p-0 text-primary" asChild>
                    <a href="tel:07132300000">تماس با کافه</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">ایمیل</h3>
                  <p className="text-sm text-muted-foreground mb-2" dir="ltr">
                    info@cafeda.ir
                  </p>
                  <Button variant="link" className="h-auto p-0 text-primary" asChild>
                    <a href="mailto:info@cafeda.ir">ارسال پیام</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">ساعات کاری</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">شنبه - چهارشنبه</span>
                      <span className="font-medium" dir="ltr">
                        09:00 - 20:00
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">پنج‌شنبه و جمعه</span>
                      <span className="font-medium" dir="ltr">
                        09:00 - 14:00
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
