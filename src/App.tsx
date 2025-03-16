import { JSX, useEffect } from 'react'
import Router from './Router'
import { checkForUpdates } from './updateChecker'

const App = (): JSX.Element => {
  useEffect(() => {
    checkForUpdates()
  }, [])
  return <Router />
}

export default App
