<!--
 * @Author: your name
 * @Date: 2021-09-24 16:07:31
 * @LastEditTime: 2021-10-04 23:16:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /zheye/src/components/ColumnDetail.vue
-->
<template>
   <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-3 text-center">
        <img :src="column.avatar && column.avatar.url" :alt="column.title" class="rounded-circle border w-100">
      </div>
      <div class="col-9">
        <h4>{{column.title}}</h4>
        <p class="text-muted">{{column.description}}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
  </div>
</template>

<script lang="ts">

import { defineComponent, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { GlobalDataProps, ColumnProps } from '../store'
import { useStore } from 'vuex'
import PostList from '../components/PostList.vue'
import { addColumnAvatar } from '../helper'

export default defineComponent({
  name: 'ColumnDetail',
  components: {
    PostList
  },
  setup () {
    const route = useRoute()
    const store = useStore<GlobalDataProps>()
    const currentId = route.params.id
    onMounted(() => {
      store.dispatch('fetchColumn', currentId)
      store.dispatch('fetchPosts', currentId)
    })
    const column = computed(() => {
      const selectColumn = store.getters.getColumnById(currentId) as ColumnProps | undefined
      if (selectColumn) {
        addColumnAvatar(selectColumn, 100, 100)
      }
      return selectColumn
    })
    const list = computed(() => {
      return store.getters.getPostsByCid(currentId)
    })
    return {
      column,
      list
    }
  }
})
</script>
