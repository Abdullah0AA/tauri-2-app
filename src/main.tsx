import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { HashRouter } from 'react-router-dom'
import { theme } from './theme/theme'
import { Notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <MantineProvider theme={theme}>
    <Notifications />
    <React.StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </React.StrictMode>
  </MantineProvider>
)
