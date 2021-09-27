<!--
 * @Author: your name
 * @Date: 2021-09-24 16:07:31
 * @LastEditTime: 2021-09-27 12:19:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /zheye/src/components/ColumnDetail.vue
-->
<template>
   <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-3 text-center">
        <img :src="column.avatar" :alt="column.title" class="rounded-circle border ">
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

import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { GlobalDataProps } from '../store'
import { useStore } from 'vuex'
import PostList from '../components/PostList.vue'

export default defineComponent({
  name: 'ColumnDetail',
  components: {
    PostList
  },
  setup () {
    const route = useRoute()
    const store = useStore<GlobalDataProps>()
    const currentId = +route.params.id
    const column = store.getters.getColumnById(currentId)
    const list = store.getters.getPostsByCid(currentId)
    return {
      column,
      list
    }
  }
})
</script>
