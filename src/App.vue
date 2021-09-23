<!--
 * @Author: your name
 * @Date: 2021-09-17 15:05:47
 * @LastEditTime: 2021-09-23 13:55:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /zheye/src/App.vue
-->
<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <form action=" ">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">邮箱</label>
        <validate-input
          :rules="emailRules"
          v-model="emailVal"
          placeholder="请输入一个邮箱"
          type="text"
        ></validate-input>
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">密码</label>
        <validate-input
          :rules="emailRules"
          v-model="emailVal"
          placeholder="请输入密码"
          type="text"
        ></validate-input>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
import ValidateInput, { RulesProp } from './components/ValidateInput.vue'
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
    // ColumnList,
    GlobalHeader,
    ValidateInput
  },
  setup () {
    const emailVal = ref('viking')
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const emailRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    return {
      list: testData,
      currentUser: currentUser,
      emailRef,
      emailRules,
      emailVal
    }
  }
})
</script>

<style>
</style>
