import { Title } from '@mantine/core'
import classes from './PageTitle.module.css'
import { JSX } from 'react'

interface PageTitleProps {
  title: string
}
const PageTitle = ({ title }: PageTitleProps): JSX.Element => {
  return (
    <Title
      className={classes.title}
      ta='center'
      mt={100}
    >
      {title}
    </Title>
  )
}

export default PageTitle
