/*
 * @Author: your name
 * @Date: 2021-10-08 09:45:20
 * @LastEditTime: 2021-10-08 10:32:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /zheye/src/hooks/useLoadMore.ts
 */
import { useStore } from 'vuex'
import { ref, computed, ComputedRef } from 'vue'

interface loadParams {
  currentPage: number;
  pageSize: number;
}
const useLoadMore = (actionName: string, total: ComputedRef<number>, params: loadParams = { currentPage: 2, pageSize: 5 }) => {
  const store = useStore()
  const currentPage = ref(params.currentPage)
  const requestParams = computed(() => ({
    currentPage: currentPage.value,
    pageSize: params.pageSize
  }))
  const loadMorePage = () => {
    store.dispatch(actionName, requestParams.value)
      .then(() => {
        currentPage.value++
      })
  }
  const isLastPage = computed(() => {
    return Math.ceil(total.value / params.pageSize) < currentPage.value
  })
  return {
    loadMorePage,
    isLastPage,
    currentPage
  }
}

export default useLoadMore
