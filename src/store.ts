/*
 * @Author: your name
 * @Date: 2021-09-26 13:44:35
 * @LastEditTime: 2021-10-01 22:11:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /zheye/src/store.ts
 */
import { createStore, Commit } from 'vuex'
import axios from 'axios'
interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId?: number;
}

interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
}

export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}
export interface PostProps {
  _id: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps;
  createdAt: string;
  column: string;
}

export interface GlobalDataProps {
  loading: boolean;
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
}

const store = createStore<GlobalDataProps>({
  state: {
    loading: false,
    columns: [],
    posts: [],
    user: { isLogin: true, name: 'viking', columnId: 1 }
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, columnId: 1, isLogin: true, name: 'viking' }
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns (state, rawData) {
      state.columns = rawData.data.list
    },
    fetchColumn (state, rawData) {
      console.log(rawData.data)
      state.columns = [rawData.data]
    },
    fetchPosts (state, rawData) {
      console.log(rawData.data.list)
      state.posts = rawData.data.list
    },
    setLoading (state, status) {
      state.loading = status
    }
  },
  actions: {
    fetchColumns ({ commit }) {
      getAndCommit('/columns', 'fetchColumns', commit)
    },
    fetchColumn ({ commit }, cid) {
      getAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
    },
    fetchPosts ({ commit }, cid) {
      getAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit)
    }
  },
  getters: {
    getColumnById: (state) => (id: string) => {
      return state.columns.find(c => c._id === id)
    },
    getPostsByCid: (state) => (cid: string) => {
      return state.posts.filter(post => post.column === cid)
    }
  }
})

export default store
