import { BrowserWindow, desktopCapturer } from 'electron'
import { saveThumbnail, Table } from './saveThumbnail'

export const listSources = async (mode: 'save' | 'parse') => {
  const sources = await desktopCapturer.getSources({
    types: ['window'],
    thumbnailSize: {
      height: 600,
      width: 600,
    },
  })
  const tables = sources
    .map(source => ({
      source,
      match: source.name.match(
        /^(.*) - (\$.*) USD - (.*) - Logged In as (.*)$/
      ),
    }))
    .filter(i => !!i.match)
    .map(i => {
      const t = i.match!
      const table = {
        sourceId: i.source.id,
        thumbnailUrl: i.source.thumbnail.toDataURL(),
        name: t?.[0],
        table: t?.[1],
        blinds: t?.[2],
        game: t?.[3],
        player: t?.[4],
      } as Table
      if (mode === 'save') saveThumbnail(table, i)
      return table
    })
  return tables
}

let interval: any

const TABLE_FETCHING_INTERVAL = 5000

export const fetchTables = async (window: BrowserWindow | null) => {
  interval = setInterval(() => {
    listSources('save').then(tables => {
      // Send tables to the renderer process
      window?.webContents.send('pokerTables', tables)
    })
  }, TABLE_FETCHING_INTERVAL)
}

export const stopFetchingTables = () => clearInterval(interval)
