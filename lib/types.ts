export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

export interface Category {
  id: string
  name: string
  image: string
}

export interface ErrorOutput {
  message: string,
  translation: string
}

export type Response<T> = {
  data?: T,
  error?: ErrorOutput
}