import {
  defineComponent,
  computed,
} from 'vue'
import { View, Text } from '@tarojs/components'

import {
  createNamespace,
} from '../utils'
import { highlightProps } from './types'

import './index.less'

const [name, bem] = createNamespace('highlight')

export default defineComponent({
  name,

  props: highlightProps,

  setup(props) {
    const highlightChunks = computed(() => {
      const { autoEscape, caseSensitive, keywords, sourceString } = props
      const flags = caseSensitive ? 'g' : 'gi'
      const _keywords = Array.isArray(keywords) ? keywords : [keywords]

      // generate chunks
      let chunks = _keywords
        .filter((keyword) => keyword)
        .reduce<Array<{ start: number; end: number; highlight: boolean }>>(
          (chunks, keyword) => {
            if (autoEscape) {
              keyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            }

            const regex = new RegExp(keyword, flags)

            let match
            while ((match = regex.exec(sourceString))) {
              const start = match.index
              const end = regex.lastIndex

              if (start >= end) {
                regex.lastIndex++
                continue
              }

              chunks.push({
                start,
                end,
                highlight: true,
              })
            }

            return chunks
          },
          [],
        )

      // merge chunks
      chunks = chunks
        .sort((a, b) => a.start - b.start)
        .reduce<typeof chunks>((chunks, currentChunk) => {
          const prevChunk = chunks[chunks.length - 1]

          if (!prevChunk || currentChunk.start > prevChunk.end) {
            const unhighlightStart = prevChunk ? prevChunk.end : 0
            const unhighlightEnd = currentChunk.start

            if (unhighlightStart !== unhighlightEnd) {
              chunks.push({
                start: unhighlightStart,
                end: unhighlightEnd,
                highlight: false,
              })
            }

            chunks.push(currentChunk)
          } else {
            prevChunk.end = Math.max(prevChunk.end, currentChunk.end)
          }

          return chunks
        }, [])

      const lastChunk = chunks[chunks.length - 1]

      if (!lastChunk) {
        chunks.push({
          start: 0,
          end: sourceString.length,
          highlight: false,
        })
      }

      if (lastChunk && lastChunk.end < sourceString.length) {
        chunks.push({
          start: lastChunk.end,
          end: sourceString.length,
          highlight: false,
        })
      }

      return chunks
    })

    const renderContent = () => {
      const {
        sourceString,
        highlightClass,
        unhighlightClass,
      } = props

      return highlightChunks.value.map((chunk) => {
        const { start, end, highlight } = chunk
        const text = sourceString.slice(start, end)

        if (highlight) {
          return (
            <Text class={[bem('tag'), highlightClass]}>
              {text}
            </Text>
          )
        }

        return <Text class={unhighlightClass}>{text}</Text>
      })
    }

    return () => <View class={bem()}>{renderContent()}</View>
  },
})
