import PageTitle from '../components/PageTitle/PageTitle'
import { motion } from 'framer-motion'
import { JSX } from 'react'

const UploadFirmwarePage = (): JSX.Element => {
  return (
    <motion.div
      initial={{ opacity: 0 }} // ✅ Start invisible
      animate={{ opacity: 1 }} // ✅ Fade in
      exit={{ opacity: 0 }} // ✅ Fade out when navigating away
      transition={{ duration: 0.5 }} // ✅ Smooth 0.5s transition
    >
      <PageTitle title='Upload Firmware' />{' '}
    </motion.div>
  )
}

export default UploadFirmwarePage
