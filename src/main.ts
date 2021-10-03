/*
 * @Author: your name
 * @Date: 2021-09-17 15:05:47
 * @LastEditTime: 2021-10-03 11:37:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /zheye/src/main.ts
 */
import App from './App.vue'
import { createApp } from 'vue'
import store from './store'
import router from './router'
import axios from 'axios'
axios.defaults.baseURL = 'http://apis.imooc.com/api/'
axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  config.params = {
    ...config.params,
    icode: '046210061C9D5DAC'
  }
  config.data = {
    ...config.data,
    icode: '046210061C9D5DAC'
  }
  return config
})
axios.interceptors.response.use(config => {
  store.commit('setLoading', false)
  return config
}, e => {
  const { error } = e.response.data
  store.commit('setError', { status: true, message: error })
  store.commit('setLoading', false)
  return Promise.reject(error)
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
