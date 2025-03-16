import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Layout from './components/Layout/Layout'
import { JSX } from 'react'
import AutotestPage from './pages/AutotestPage'
import KundenprogrammPage from './pages/KundenprogrammPage'
import { AnimatePresence } from 'framer-motion'
import CustomUpdatePage from './pages/CustomUpdatePage'
import UploadFirmwarePage from './pages/UploadFirmwarePage'

const Router = (): JSX.Element => {
  return (
    <AnimatePresence>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/homepage" />} />
          <Route path="homepage" element={<HomePage />} />
          <Route path="autotest" element={<AutotestPage />} />
          <Route path="kunden-programm" element={<KundenprogrammPage />} />
          <Route path="custom-update" element={<CustomUpdatePage />} />
          <Route path="upload-firmware" element={<UploadFirmwarePage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default Router
