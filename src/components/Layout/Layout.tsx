import { AppShell, Burger, Group } from '@mantine/core'
import { JSX } from 'react'
import { Outlet } from 'react-router-dom'
import { useDisclosure } from '@mantine/hooks'
import NavBar from '../NavBar/NavBar'
import HeaderContent from './HeaderContent'
import UpdateTable from '../UpdateTable/UpdateTable'

const Layout = (): JSX.Element => {
  const [opened, { toggle, close }] = useDisclosure()

  return (
    <div>
      <AppShell
        zIndex={1000}
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding='md'
      >
        <AppShell.Header>
          <HeaderContent />
          <Group
            h='100%'
            px='md'
          >
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom='sm'
              size='sm'
            />
          </Group>
        </AppShell.Header>
        <AppShell.Navbar>
          <NavBar close={close} />
        </AppShell.Navbar>
        <AppShell.Main>
          <Outlet />
          <UpdateTable />
        </AppShell.Main>
      </AppShell>
    </div>
  )
}

export default Layout
