import { Text, Title } from '@mantine/core'
import * as cvstfjs from '@microsoft/customvision-tfjs'
import { useEffect, useState } from 'react'

const loadModel = async () => {
  const model = new cvstfjs.ObjectDetectionModel()
  await model.loadModelAsync('./models/objects/model.json')
  return model
}

const TestModels = () => {
  const [model, setModel] = useState()

  useEffect(() => {
    loadModel().then(setModel)
  }, [])

  return (
    <div>
      <Title order={3}>Test Models</Title>

      {model && <Text>Model loaded</Text>}
    </div>
  )
}

export default TestModels
