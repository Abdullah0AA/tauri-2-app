import { Group, Text } from '@mantine/core'
import { JSX, useEffect, useState } from 'react'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import { fetchAppVersion } from '../../updateChecker'

const HeaderContent = (): JSX.Element => {
  const [appVersion, setAppVersion] = useState('')

  useEffect(() => {
    const fetchVersion = async (): Promise<void> => {
      try {
        const version = await fetchAppVersion()
        setAppVersion(version)
      } catch (error) {
        console.error('Failed to fetch app version:', error)
      }
    }

    fetchVersion() // Call the async function inside useEffect
  }, [])

  return (
    <Group h="100%" px="md" justify="space-between">
      {/* Left Side: App Info */}
      <Text fw={700} size="lg">
        Speicher Updater v{appVersion}
      </Text>

      {/* Middle: Theme Toggle & Quick Actions */}

      <ThemeToggle />
    </Group>
  )
}

export default HeaderContent
