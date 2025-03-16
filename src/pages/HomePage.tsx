import { JSX } from 'react'
import { motion } from 'framer-motion'
import PageTitle from '../components/PageTitle/PageTitle'
const HomePage = (): JSX.Element => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }} // ✅ Start invisible
        animate={{ opacity: 1 }} // ✅ Fade in
        exit={{ opacity: 0 }} // ✅ Fade out when navigating away
        transition={{ duration: 0.5 }} // ✅ Smooth 0.5s transition
      >
        <PageTitle title="Home Page" />
      </motion.div>
    </div>
  )
}

export default HomePage
