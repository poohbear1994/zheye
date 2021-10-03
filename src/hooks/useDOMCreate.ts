/*
 * @Author: your name
 * @Date: 2021-10-03 11:13:23
 * @LastEditTime: 2021-10-03 11:16:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /zheye/src/hooks/useDOMCreate.ts
 */
import { onUnmounted } from 'vue'

function useDOMCreate (nodeId: string):any {
  const node = document.createElement('div')
  node.id = nodeId
  document.body.appendChild(node)
  onUnmounted(() => {
    document.body.removeChild(node)
  })
}

export default useDOMCreate
