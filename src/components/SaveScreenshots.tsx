import { Box, Button, Grid, Space, Title } from '@mantine/core'
import { useEffect, useState } from 'react'
import { PlayerStop, Viewfinder } from 'tabler-icons-react'
import { Table } from '../../electron/utils/saveThumbnail'
import { TableCard } from './TableCard'

export function SaveScreenshots() {
  const [running, setRunning] = useState(false)
  const [tables, setTables] = useState<Table[]>([])

  useEffect(() => {
    window.Main.on('pokerTables', (tables: Table[]) => {
      setTables(tables)
    })
  }, [])

  const handleStart = () => {
    setRunning(true)
    window.Main.findPokerTables()
  }

  const handleStop = () => {
    setRunning(false)
    window.Main.stopTablesLookup()
  }

  return (
    <Box>
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Button
          variant="light"
          disabled={running}
          onClick={handleStart}
          leftIcon={<Viewfinder />}
        >
          Start
        </Button>
        <Space w="md" />
        <Button
          color="red"
          leftIcon={<PlayerStop />}
          disabled={!running}
          onClick={handleStop}
        >
          Stop
        </Button>
      </Box>
      <Grid grow>
        {tables.map(table => (
          <Grid.Col span={4} key={table.name}>
            <TableCard data={table} />
          </Grid.Col>
        ))}

        {tables.length === 0 && (
          <Box
            style={{
              height: 'calc(100vh - 115px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Title order={4} align="center">
              No active tables found
            </Title>
          </Box>
        )}
      </Grid>
    </Box>
  )
}
