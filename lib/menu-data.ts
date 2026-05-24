
import type { MenuItem, Category } from "./types"

export const categories: Category[] = [
  { id: "foods", name: "غذاها", image: "/grilled-salmon-dish.jpg" },
  { id: "cold-drinks", name: "نوشیدنی‌های سرد", image: "/fresh-lemonade-glass.jpg" },
  { id: "hot-drinks", name: "نوشیدنی‌های گرم", image: "/hot-chocolate-mug.jpg" },
  { id: "desserts", name: "دسرها", image: "/chocolate-lava-cake.png" },
  { id: "coffee", name: "قهوه", image: "/latte-art.jpg" },
  { id: "cold-coffee", name: "قهوه سرد", image: "/iced-latte.png" },
  { id: "specials", name: "ویژه", image: "/gourmet-chef-special.jpg" },
]

// menuItems remain the same...


export const menuItems: MenuItem[] = [
  // Foods
  {
    id: "1",
    name: "ماهی سالمون کبابی",
    description: "ماهی سالمون تازه اقیانوس اطلس با سبزیجات فصلی و سس کره لیمو",
    price: 24.99,
    image: "/grilled-salmon-dish.jpg",
    category: "foods",
  },
  {
    id: "2",
    name: "برگر گوشت",
    description: "گوشت آنگوس با پنیر چدار، کاهو، گوجه و سس مخصوص روی نان بریوش",
    price: 16.99,
    image: "/gourmet-beef-burger.png",
    category: "foods",
  },
  {
    id: "3",
    name: "سالاد سزار",
    description: "کاهو رومن تازه، پنیر پارمزان، نان سرخ شده و سس سزار کلاسیک",
    price: 12.99,
    image: "/caesar-salad.png",
    category: "foods",
  },
  {
    id: "4",
    name: "پیتزا مارگاریتا",
    description: "موزارلا تازه، سس گوجه، ریحان و روغن زیتون بکر روی خمیر نازک",
    price: 14.99,
    image: "/margherita-pizza.png",
    category: "foods",
  },
  // Cold Drinks
  {
    id: "5",
    name: "لیموناد تازه",
    description: "لیموی تازه با نعناع و آب گازدار",
    price: 4.99,
    image: "/fresh-lemonade-glass.jpg",
    category: "cold-drinks",
  },
  {
    id: "6",
    name: "چای سرد",
    description: "چای سیاه خنک با لیمو",
    price: 3.99,
    image: "/iced-tea-glass.png",
    category: "cold-drinks",
  },
  {
    id: "7",
    name: "اسموتی میوه",
    description: "ترکیبی از توت‌های تازه، موز و ماست",
    price: 6.99,
    image: "/berry-smoothie.png",
    category: "cold-drinks",
  },
  // Hot Drinks
  {
    id: "8",
    name: "چای سبز",
    description: "چای سبز ژاپنی درجه یک با طعم ملایم",
    price: 3.99,
    image: "/green-tea-cup.jpg",
    category: "hot-drinks",
  },
  {
    id: "9",
    name: "هات چاکلت",
    description: "شکلات بلژیکی غنی با خامه",
    price: 5.99,
    image: "/hot-chocolate-mug.jpg",
    category: "hot-drinks",
  },
  // Desserts
  {
    id: "10",
    name: "کیک لاوا شکلاتی",
    description: "کیک شکلاتی گرم با مرکز مذاب، همراه با بستنی وانیلی",
    price: 8.99,
    image: "/chocolate-lava-cake.png",
    category: "desserts",
  },
  {
    id: "11",
    name: "تیرامیسو",
    description: "دسر کلاسیک ایتالیایی با بیسکویت آغشته به قهوه و ماسکارپونه",
    price: 7.99,
    image: "/classic-tiramisu.png",
    category: "desserts",
  },
  {
    id: "12",
    name: "چیزکیک",
    description: "چیزکیک به سبک نیویورک با کمپوت توت",
    price: 7.99,
    image: "/cheesecake-slice.png",
    category: "desserts",
  },
  // Coffee
  {
    id: "13",
    name: "اسپرسو",
    description: "اسپرسوی ایتالیایی غنی و پرطعم",
    price: 3.99,
    image: "/espresso-cup.jpg",
    category: "coffee",
  },
  {
    id: "14",
    name: "کاپوچینو",
    description: "اسپرسو با شیر بخار شده و فوم",
    price: 4.99,
    image: "/cappuccino-cup.jpg",
    category: "coffee",
  },
  {
    id: "15",
    name: "لاته",
    description: "اسپرسوی ملایم با شیر بخار شده و فوم سبک",
    price: 4.99,
    image: "/latte-art.jpg",
    category: "coffee",
  },
  // Cold Coffee
  {
    id: "16",
    name: "لاته سرد",
    description: "اسپرسو با شیر سرد روی یخ",
    price: 5.99,
    image: "/iced-latte.png",
    category: "cold-coffee",
  },
  {
    id: "17",
    name: "کلد برو",
    description: "قهوه دم سرد ملایم روی یخ",
    price: 5.49,
    image: "/cold-brew-coffee.png",
    category: "cold-coffee",
  },
  {
    id: "18",
    name: "فراپوچینو",
    description: "قهوه مخلوط شده با یخ و خامه",
    price: 6.99,
    image: "/iced-coffee-blend.png",
    category: "cold-coffee",
  },
  // Specials
  {
    id: "19",
    name: "غذای ویژه سرآشپز",
    description: "غذای ویژه روزانه تهیه شده توسط سرآشپز با مواد فصلی",
    price: 29.99,
    image: "/gourmet-chef-special.jpg",
    category: "specials",
  },
  {
    id: "20",
    name: "کوکتل امضا",
    description: "کوکتل ویژه خانه با مشروبات درجه یک و مواد تازه",
    price: 12.99,
    image: "/signature-cocktail.png",
    category: "specials",
  },
]
