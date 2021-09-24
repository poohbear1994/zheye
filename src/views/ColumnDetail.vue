<!--
 * @Author: your name
 * @Date: 2021-09-24 16:07:31
 * @LastEditTime: 2021-09-24 16:51:16
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
import { testData, testPosts } from '../testData'
import PostList from '../components/PostList.vue'

export default defineComponent({
  name: 'ColumnDetail',
  components: {
    PostList
  },
  setup () {
    const route = useRoute()
    const currentId = +route.params.id
    const column = testData.find(c => c.id === currentId)
    const list = testPosts.filter(post => post.columnId === currentId)
    return {
      column,
      list
    }
  }
})
</script>
