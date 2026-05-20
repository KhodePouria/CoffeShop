"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface FavouritesStore {
  favourites: string[]
  addFavourite: (id: string) => void
  removeFavourite: (id: string) => void
  isFavourite: (id: string) => boolean
}

export const useFavourites = create<FavouritesStore>()(
  persist(
    (set, get) => ({
      favourites: [],
      addFavourite: (id) =>
        set((state) => ({
          favourites: [...state.favourites, id],
        })),
      removeFavourite: (id) =>
        set((state) => ({
          favourites: state.favourites.filter((fav) => fav !== id),
        })),
      isFavourite: (id) => get().favourites.includes(id),
    }),
    {
      name: "restaurant-favourites",
    },
  ),
)
