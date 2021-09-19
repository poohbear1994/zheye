<!--
 * @Author: your name
 * @Date: 2021-09-17 15:05:47
 * @LastEditTime: 2021-09-18 19:42:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /zheye/src/App.vue
-->
<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'

const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '1111111111111'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '22222222222222'
  }
]
const currentUser: UserProps = {
  isLogin: true,
  name: 'ljx',
  id: 1
}

export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    GlobalHeader
  },
  setup () {
    return {
      list: testData,
      currentUser: currentUser
    }
  }
})
</script>

<style>
</style>
