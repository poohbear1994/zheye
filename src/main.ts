/*
 * @Author: your name
 * @Date: 2021-09-17 15:05:47
 * @LastEditTime: 2021-09-26 14:01:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /zheye/src/main.ts
 */
import App from './App.vue'
import { createApp } from 'vue'
import store from './store'
import router from './router'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
