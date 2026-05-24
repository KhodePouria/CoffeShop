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

export interface GalleryImage {
  id: string | number;
  url: string;
  alt?: string;
}
