<!--
 * @Author: your name
 * @Date: 2021-09-17 15:05:47
 * @LastEditTime: 2021-09-24 16:02:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /zheye/src/App.vue
-->
<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
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
import { defineComponent, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
const currentUser: UserProps = {
  isLogin: false,
  name: 'ljx'
}
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader
    // Home,
    // Login
  },
  setup () {
    const inputRef = ref<any>()
    const onFormSubmit = (result: boolean) => {
      console.log('result', result)
    }
    return {
      onFormSubmit,
      inputRef,
      currentUser
    }
  }
})
</script>
