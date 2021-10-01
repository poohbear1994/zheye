<!--
 * @Author: your name
 * @Date: 2021-09-17 15:05:47
 * @LastEditTime: 2021-10-01 22:06:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /zheye/src/App.vue
-->
<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <h1 v-if="isLoading">正在读取数据。。。</h1>
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">@ 2021 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    return {
      currentUser,
      isLoading
    }
  }
})
</script>
