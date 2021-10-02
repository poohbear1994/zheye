<!--
 * @Author: your name
 * @Date: 2021-09-17 15:05:47
 * @LastEditTime: 2021-10-02 21:22:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /zheye/src/App.vue
-->
<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <loader v-if="isLoading" text="拼命加载中" background="rgba(0, 0, 0, 0.8)"></loader>
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
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import { GlobalDataProps } from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from './components/GlobalHeader.vue'
import Loader from './components/Loader.vue'
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Loader
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    const token = computed(() => store.state.token)
    onMounted(() => {
      if (!currentUser.value.isLogin && token.value) {
        axios.defaults.headers.common.Authorization = `Bearer ${token.value}`
        store.dispatch('fetchCurrentUser')
      }
    })
    return {
      currentUser,
      isLoading
    }
  }
})
</script>
