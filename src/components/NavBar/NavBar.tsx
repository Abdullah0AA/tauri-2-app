import { NavLink } from '@mantine/core'
import { JSX } from 'react'
import { Link, useLocation } from 'react-router-dom'
import classes from './NavBar.module.css'
import { IconLogout } from '@tabler/icons-react'
import { notify } from '../../utlis/notify'

interface NavBarProps {
  close: () => void
}
const pages = [
  { link: '/homepage', label: 'Home' },
  { link: '/autotest', label: 'Autotest' },
  { link: '/kunden-programm', label: 'Kundenprogramm' },
  { link: '/custom-update', label: 'Custom Update' },
  { link: '/upload-firmware', label: 'Upload Firmware' },
]

const NavBar = ({ close }: NavBarProps): JSX.Element => {
  const location = useLocation()
  const navLinks = pages.map((page) => (
    <NavLink
      variant="filled"
      key={page.label}
      className={classes.link}
      component={Link}
      to={page.link}
      label={page.label}
      onClick={close}
      active={location.pathname === page.link}
    />
  ))
  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{navLinks}</div>
      <div className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => {
            event.preventDefault()
            notify('success', 'Logged out successfully', 'Logout')
          }}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  )
}

export default NavBar
