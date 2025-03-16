import { Button } from '@mantine/core'
import { JSX, useState } from 'react'

const UpdateTable = (): JSX.Element => {
  const [updateData, setUpdateData] = useState(0)

  return (
    <div>
      <Button onClick={() => setUpdateData(updateData + 1)}>Update Data</Button>
      <p>{updateData}</p>
    </div>
  )
}

export default UpdateTable
