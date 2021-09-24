<!--
 * @Author: your name
 * @Date: 2021-09-17 15:05:47
 * @LastEditTime: 2021-09-24 13:11:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /zheye/src/App.vue
-->
<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <login></login>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
const currentUser: UserProps = {
  isLogin: true,
  name: 'ljx'
}
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    // Home,
    Login
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
