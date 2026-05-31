"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

export default function WelcomePage() {
  return (
    <main className="relative min-h-screen w-full flex flex-col justify-end pb-24 items-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Image
          src="/welcome_bg.jpg"
          alt="Cafe Welcome Background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-x-0 bottom-0 h-[60vh] bg-linear-to-t from-black/95 directly-to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-sm px-6 flex flex-col items-center space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center space-y-3"
        >
          <h1 className="text-6xl font-bold text-white drop-shadow-sm">
            کافه <span className="text-primary">دا</span>
          </h1>
          <p className="text-lg text-white/80 font-medium tracking-wide">
            لحظاتی ناب در انتظار شماست
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full flex flex-col gap-4"
        >
          <Link href="/menu" className="w-full block">
            <div className="w-full flex items-center justify-center py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-lg shadow-lg hover:bg-primary/90 transition-all active:scale-[0.98]">
              مشاهده منو
            </div>
          </Link>

          <Link href="tel:+982100000000" className="w-full block">
            <div className="w-full flex items-center justify-center py-4 bg-transparent border-2 border-primary/50 text-white rounded-2xl font-bold text-lg hover:bg-primary/20 transition-all active:scale-[0.98] backdrop-blur-[2px]">
              تماس مستقیم
            </div>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}