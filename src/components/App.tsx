import { FunctionComponent } from 'react'
import { useFieldPlugin } from '@storyblok/field-plugin/react'
import { useIconIds } from '../hooks/useIconIds'
import Modal from './Modal'
import Stage from './Stage'
import './app.css'

const fieldPluginOptions = {
  validateContent: (content: unknown) => ({
    content: typeof content === 'string' ? content : undefined,
  }),
}

const App: FunctionComponent = () => {
  const plugin = useFieldPlugin(fieldPluginOptions)
  const { type, data, actions } = plugin
  const iconIds = useIconIds(data?.options.icons)

  if (type !== 'loaded') {
    return null
  }

  if (!iconIds) {
    return (
      <input
        type="text"
        value={data.content}
        onChange={(event) => actions.setContent(event.target.value)}
      />
    )
  }

  return data.isModalOpen ? (
    <Modal
      ids={iconIds}
      setModalOpen={actions.setModalOpen}
      setContent={actions.setContent}
      currentId={data.content}
    />
  ) : (
    <Stage
      setModalOpen={actions.setModalOpen}
      setContent={actions.setContent}
      currentId={data.content}
    />
  )
}

export default App
