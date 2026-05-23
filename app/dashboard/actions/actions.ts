export type DashboardApiConfig = {
  baseUrl: string
  apiKey?: string
}

export type ProductPayload = {
  id?: string
  name: string
  price: number
  category: string
  image?: string
  description?: string
}

export type ItemRow = {
  id: string
  name: string
  category: string
  price: number
  status: "active" | "draft"
  updatedAt: string
  description?: string
}

export type OrderRow = {
  id: string
  customer: string
  total: number
  status: "pending" | "paid" | "cancelled"
  createdAt: string
}

export async function createProduct(_config: DashboardApiConfig, _payload: ProductPayload) {
  throw new Error("Not implemented. Connect this to the NestJS Swagger SDK.")
}

export async function updateProduct(_config: DashboardApiConfig, _payload: ProductPayload) {
  throw new Error("Not implemented. Connect this to the NestJS Swagger SDK.")
}

export async function deleteProduct(_config: DashboardApiConfig, _productId: string) {
  throw new Error("Not implemented. Connect this to the NestJS Swagger SDK.")
}

export async function listProducts(_config: DashboardApiConfig) {
  return {
    items: [
      {
        id: "itm-001",
        name: "آیس لاته وانیلی",
        category: "نوشیدنی‌ها",
        price: 4.8,
        status: "active",
        updatedAt: "2026-05-20",
        description: "قهوه ملایم با طعم وانیل و شیر تازه",
      },
      {
        id: "itm-002",
        name: "چیزکیک شکلات",
        category: "دسرها",
        price: 5.4,
        status: "draft",
        updatedAt: "2026-05-18",
        description: "دسر شکلاتی با لایه خامه‌ای لطیف",
      },
    ] satisfies ItemRow[],
  }
}

export async function listOrders(_config: DashboardApiConfig) {
  return {
    orders: [
      {
        id: "ord-210",
        customer: "سارا شریفی",
        total: 18.2,
        status: "paid",
        createdAt: "2026-05-21",
      },
      {
        id: "ord-209",
        customer: "محمد رضایی",
        total: 12.6,
        status: "pending",
        createdAt: "2026-05-20",
      },
    ] satisfies OrderRow[],
  }
}
