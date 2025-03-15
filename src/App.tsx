import { useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/core'
import './App.css'
import { checkForUpdates, fetchAppVersion } from './updateChecker'

function App() {
  const [greetMsg, setGreetMsg] = useState('')
  const [name, setName] = useState('')
  const [appVersion, setAppVersion] = useState('')

  useEffect(() => {
    checkForUpdates()

    fetchAppVersion().then(setAppVersion)
  }, [])

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke('greet', { name }))
  }

  return (
    <main className="container">
      <h1>Welcome to Tauri + React</h1>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault()
          greet()
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>
      <p>{appVersion}</p>
    </main>
  )
}

export default App
