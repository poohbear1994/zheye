<!--
 * @Author: your name
 * @Date: 2021-09-18 19:20:53
 * @LastEditTime: 2021-10-06 15:03:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /zheye/src/components/GlobalHeader.vue
-->
<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <router-link to="/" class="navbar-brand" href="#">者也专栏</router-link>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item"><router-link to="/login" class="btn btn-outline-light my-2">登陆</router-link></li>
      <li class="list-inline-item"><router-link to="/signup" class="btn btn-outline-light my-2">注册</router-link></li>
    </ul>
    <ul v-else>
      <li class="list-inline-item">
        <dropdown :title="`你好 ${user.nickName}`">
          <dropdown-item closeAfterClick><router-link to="/create" class="dropdown-item">新建文章</router-link></dropdown-item>
          <dropdown-item closeAfterClick><router-link :to="`/column/${user.column}`" class="dropdown-item">我的专栏</router-link></dropdown-item>
          <dropdown-item closeAfterClick><a href="#" class="dropdown-item">编辑资料</a></dropdown-item>
          <dropdown-item closeAfterClick><a href="#" class="dropdown-item" @click="handleLogout">退出登陆</a></dropdown-item>
        </dropdown>
      </li>
    </ul>
  </nav>
</template>

<script lang = 'ts'>
import { defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
import store, { UserProps } from '../store'
import createMessage from '../components/createMessage'

export default defineComponent({
  name: 'GlobalHeader',
  components: {
    Dropdown,
    DropdownItem
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup () {
    const router = useRouter()
    const handleLogout = () => {
      store.dispatch('logout')
      createMessage('退出登录成功，2秒后跳转到首页', 'success', 2000)
      setTimeout(() => {
        router.push('/')
      }, 2000)
    }
    return {
      handleLogout
    }
  }
})
</script>
