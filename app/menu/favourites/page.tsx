import { readItems } from '@/app/dashboard/items/actions/actions'
import FavsComponent from '@/components/favsComponent'
import React from 'react'

async function FavoritesPage() {
  const Items = await readItems({})
  return (
    <div>
      <FavsComponent menuItems={Items.data?.data || []} />
    </div>
  )
}

export default FavoritesPage
