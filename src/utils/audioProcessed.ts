import { has } from 'lodash-es'
import { Episode } from '@/types'

export default function audioProcessed(episode: Episode): boolean {
  return has(episode, 'audio.mp3') && has(episode, 'audio.aac')
}
