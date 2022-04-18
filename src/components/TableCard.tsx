import {
  Text,
  Badge,
  Button,
  Card,
  Group,
  Image,
  useMantineTheme,
} from '@mantine/core'
import type { Table } from '../../electron/utils/saveThumbnail'
import * as cvstfjs from '@microsoft/customvision-tfjs'
import { useEffect } from 'react'

const parseImage = async (image: string) => {
  const model = new cvstfjs.ObjectDetectionModel()
  await model.loadModelAsync('./models/objects/model.json')
  const res = await model.executeAsync(image)
  console.log(res)
}

export const TableCard = ({ data }: { data: Table }) => {
  const theme = useMantineTheme()

  useEffect(() => {
    parseImage(data.thumbnailUrl)
  }, [data.thumbnailUrl])

  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7]

  return (
    <div
      style={{
        width: 340,
        margin: 'auto',
      }}
    >
      <Card shadow="sm" p="lg">
        <Card.Section>
          <Image src={data.thumbnailUrl} height={160} />
        </Card.Section>

        <Group
          position="apart"
          style={{
            marginBottom: 5,
            marginTop: theme.spacing.sm,
          }}
        >
          <Text weight={500}>{data.table}</Text>
          <Badge color="green" variant="light">
            {data.blinds}
          </Badge>
        </Group>

        <Button
          variant="light"
          color="blue"
          fullWidth
          style={{
            marginTop: 14,
          }}
        >
          {data.player || 'Sitting out'}
        </Button>
      </Card>
    </div>
  )
}
