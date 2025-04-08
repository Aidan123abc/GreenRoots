import { View, Text } from 'react-native'
import React from 'react'
import GlobalProvider from '@/context/GlobalProvider'
import PagesLayout from './(pages)/_layout'

const MainLayout = () => {
  return (
    <GlobalProvider>
        <PagesLayout />
    </GlobalProvider>
  )
}

export default MainLayout