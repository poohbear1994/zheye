/*
 * @Author: your name
 * @Date: 2021-09-19 16:04:25
 * @LastEditTime: 2021-09-19 16:13:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /zheye/src/hooks/useClickOutside.ts
 */
import { onMounted, onUnmounted, Ref, ref } from 'vue'

const useClickOutside = (elementRef :Ref<null | HTMLElement>) => {
  const isClickOutside = ref(false)
  const handler = (e: MouseEvent) => {
    if (elementRef.value) {
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
  return isClickOutside
}

export default useClickOutside
