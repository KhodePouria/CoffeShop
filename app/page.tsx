"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ChevronLeft, Phone } from "lucide-react";

export default function WelcomePage() {
  return (
    <main className="relative min-h-screen w-full flex flex-col justify-end pb-16 items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/welcome_bg.jpg"
          alt="Cafe Welcome Background"
          fill
          priority
          className="object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute top-12 z-10 flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md"
      >
        <span className="text-white/80 text-xs tracking-widest font-medium">
          خوش آمدید
        </span>
      </motion.div>

      <div className="relative z-10 w-full max-w-sm px-6 flex flex-col items-center gap-10">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center gap-4"
        >
          <div className="relative">
            <h1 className="text-7xl font-extrabold text-white tracking-tight leading-none">
              کافه{" "}
              <span className="relative inline-block text-primary">
                دا
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-primary/60 blur-sm" />
              </span>
            </h1></div>

          <div className="flex items-center gap-3 w-40">
            <div className="flex-1 h-px bg-white/20" />
            <div className="w-1 h-1 rounded-full bg-primary/70" />
            <div className="flex-1 h-px bg-white/20" />
          </div><p className="text-base text-white/60 tracking-widest font-light">
            لحظاتی ناب در انتظار شماست
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
          className="w-full flex flex-col gap-3"
        >
          <Link href="/menu" className="w-full block group">
            <div className="w-full flex items-center justify-between px-6 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold text-lg shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:bg-primary/90 transition-all active:scale-[0.98] group-hover:shadow-primary/30 group-hover:shadow-lg">
              <span>مشاهده منو</span>
              <ChevronLeft className="w-5 h-5 opacity-70 -translate-x-1 group-hover:-translate-x-0 transition-transform" />
            </div>
          </Link>

          <Link href="tel:+982100000000" className="w-full block group">
            <div className="w-full flex items-center justify-between px-6 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-medium text-lg hover:bg-white/15 transition-all active:scale-[0.98] backdrop-blur-sm">
              <span>تماس مستقیم</span>
              <Phone className="w-4 h-4 opacity-60" />
            </div>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-white/30 text-xs tracking-widest"
        >
          ساعت کاری ۹ صبح تا ۸ شب
        </motion.p>
      </div>
    </main>
  );
}
