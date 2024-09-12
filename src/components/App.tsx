import { FunctionComponent } from 'react'
import { useFieldPlugin } from '@storyblok/field-plugin/react'
import { useStory, useStoryblokApi } from '../hooks/useStoryblok'
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
  const storyblokApi = useStoryblokApi(data?.token)
  const iconSpriteHtml: string | undefined = useStory(
    'cdn/stories/settings/global-settings',
    storyblokApi,
  )?.content.iconSprite
  const iconIds = useIconIds(iconSpriteHtml)

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
