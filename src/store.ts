/*
 * @Author: your name
 * @Date: 2021-09-26 13:44:35
 * @LastEditTime: 2021-09-27 12:43:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /zheye/src/store.ts
 */
import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps, PostProps } from './testData'
export { ColumnProps, PostProps } from './testData'
interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId?: number;
}
export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}
const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: { isLogin: false, columnId: 1, name: 'viking' }
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, name: 'viking' }
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    }
  },
  getters: {
    getColumnById: (state) => (id: number) => {
      return state.columns.find(c => c.id === id)
    },
    getPostsByCid: (state) => (cid: number) => {
      return state.posts.filter(post => post.columnId === cid)
    }
  }
})

export default store
