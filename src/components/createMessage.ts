/*
 * @Author: your name
 * @Date: 2021-10-03 11:52:09
 * @LastEditTime: 2021-10-03 12:05:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /zheye/src/components/createMessage.ts
 */
import { createApp } from 'vue'
import Message from './Message.vue'
export type MessageType = 'success' | 'error' | 'default'

const createMessage = (message: string, type: MessageType, timeout = 2000) => {
  const messageInstance = createApp(Message, {
    message,
    type
  })
  const mountNode = document.createElement('div')
  messageInstance.mount(mountNode)
  setTimeout(() => {
    messageInstance.unmount()
  }, timeout)
}

export default createMessage
