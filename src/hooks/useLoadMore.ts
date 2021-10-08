/*
 * @Author: your name
 * @Date: 2021-10-08 09:45:20
 * @LastEditTime: 2021-10-08 15:00:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /zheye/src/hooks/useLoadMore.ts
 */
import { useStore } from 'vuex'
import { ref, computed, ComputedRef } from 'vue'

interface loadParams {
  currentPage?: number;
  pageSize?: number;
  [key: string]: any;
}
const useLoadMore = (actionName: string, total: ComputedRef<number>, params: loadParams = {}, pageSize = 5) => {
  const store = useStore()
  const currentPage = ref((params && params.currentPage) || 1)
  console.log(params)
  const requestParams = computed(() => ({
    ...params,
    currentPage: currentPage.value + 1
  }))
  console.log(requestParams.value)
  const loadMorePage = () => {
    store.dispatch(actionName, requestParams.value)
      .then(() => {
        currentPage.value++
      })
  }
  const isLastPage = computed(() => {
    console.log(currentPage.value, Math.ceil((total.value || 1) / pageSize))
    return Math.ceil((total.value || 1) / pageSize) === currentPage.value
  })
  return {
    loadMorePage,
    isLastPage,
    currentPage
  }
}

export default useLoadMore
