<!--
 * @Author: your name
 * @Date: 2021-09-24 12:48:06
 * @LastEditTime: 2021-10-08 14:15:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /zheye/src/views/Home.vue
-->
<template>
  <div class="home-page">
    <section class="text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50"/>
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <router-link to="/create" class="btn btn-primary my-2">开始写文章</router-link>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center mb-4">发现精彩</h4>
    <column-list :list="list"></column-list>
    <button
      class="btn d-block btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25"
      @click="loadMorePage"
      v-if="!isLastPage"
    >
      加载更多
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
import ColumnList from '../components/ColumnList.vue'
import { objToArr } from '../helper'
import useLoadMore from '../hooks/useLoadMore'

export default defineComponent({
  name: 'Home',
  components: {
    ColumnList
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const totalColumns = computed(() => store.state.columns.total || 0)
    const currentPage = computed(() => store.state.columns.currentPage || 0)
    const list = computed(() => objToArr(store.state.columns.data))
    const { loadMorePage, isLastPage } = useLoadMore('fetchColumns', totalColumns, { currentPage: currentPage.value })
    onMounted(() => {
      store.dispatch('fetchColumns')
    })
    return {
      list,
      loadMorePage,
      isLastPage
    }
  }
})
</script>
