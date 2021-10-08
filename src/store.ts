/*
 * @Author: your name
 * @Date: 2021-09-26 13:44:35
 * @LastEditTime: 2021-10-08 10:21:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /zheye/src/store.ts
 */
import { createStore, Commit } from 'vuex'
import axios, { AxiosRequestConfig } from 'axios'
import { arrToObj, objToArr } from './helper'

export interface ResponseType<P=Record<string, unknown>> {
  code: number;
  msg: string;
  data: P;
}

export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
  fitUrl?: string;
}
export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
  avatar?: ImageProps;
  description?: string;
}

export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}
export interface PostProps {
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps | string;
  createdAt?: string;
  column: string;
  author?: string | UserProps
}
interface ListProps<P> {
  [id: string]: P;
}
export interface GlobalErrorProps {
  status: boolean;
  message?: string;
}
export interface GlobalColumnsProps {
  data: ListProps<ColumnProps>;
  total: number;
}
export interface GlobalPostsProps {
  data: ListProps<PostProps>;
  loadedColumns: string[];
  loadedDetails: string[];
}
export interface GlobalDataProps {
  error: GlobalErrorProps;
  token: string;
  loading: boolean;
  columns: GlobalColumnsProps;
  posts: GlobalPostsProps;
  user: UserProps;
}

const asyncAndCommit = async (url: string, mutationName: string, commit: Commit, config: AxiosRequestConfig = { method: 'get' }, extraData?: any) => {
  const { data } = await axios(url, {
    method: config.method,
    data: config.data
  })
  if (extraData) {
    commit(mutationName, { data, extraData })
  } else {
    commit(mutationName, data)
  }
  commit(mutationName, data)
  return data
}

const store = createStore<GlobalDataProps>({
  state: {
    error: { status: false },
    token: localStorage.getItem('token') || '',
    loading: false,
    columns: { data: {}, total: 0 },
    posts: { data: {}, loadedColumns: [], loadedDetails: [] },
    user: { isLogin: false }
  },
  mutations: {
    createPost (state, { data }) {
      state.posts.data[data._id] = data
    },
    fetchColumns (state, rawData) {
      const { data } = state.columns
      const { list, count } = rawData.data
      state.columns = {
        data: { ...data, ...arrToObj(list) },
        total: count
      }
    },
    fetchColumn (state, { data }) {
      state.columns.data[data._id] = data
    },
    fetchPosts (state, { data: rawData, extraData }) {
      const { data, loadedColumns } = state.posts
      if (rawData.data) {
        const listData = rawData.data.list as PostProps[]
        state.posts.data = { ...data, ...arrToObj(listData) }
      }
      state.posts.loadedColumns = [...loadedColumns, extraData]
    },
    fetchPost (state, { data }) {
      state.posts.data[data._id] = data
    },
    deletePost (state, { data }) {
      delete state.posts.data[data._id]
    },
    updatePost (state, { data }) {
      state.posts.data[data._id] = data
    },
    setLoading (state, status) {
      state.loading = status
    },
    setError (state, e: GlobalErrorProps) {
      state.error = e
    },
    fetchCurrentUser (state, rawData) {
      state.user = {
        isLogin: true,
        ...rawData.data
      }
    },
    logout (state) {
      state.token = ''
      localStorage.removeItem('token')
      delete axios.defaults.headers.common.Authorization
      state.user = { isLogin: false }
    },
    login (state, rawData) {
      const { token } = rawData.data
      state.token = token
      localStorage.setItem('token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    }
  },
  actions: {
    fetchColumns ({ commit, state }, params = {}) {
      const { currentPage = 1, pageSize = 6 } = params
      return asyncAndCommit(`/columns?currentPage=${currentPage}&pageSize=${pageSize}`, 'fetchColumns', commit)
    },
    fetchColumn ({ commit, state }, cid) {
      const cIdArr = Object.keys(state.columns.data)
      if (!cIdArr.includes(cid)) {
        return asyncAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
      }
    },
    fetchPosts ({ commit, state }, cid) {
      const { loadedColumns } = state.posts
      if (!loadedColumns.includes(cid)) {
        return asyncAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit, { method: 'get' }, cid)
      }
    },
    fetchPost ({ commit, state }, id) {
      const { data } = state.posts
      const certainPost = data[id]
      if (!certainPost || !certainPost.content) {
        return asyncAndCommit(`/posts/${id}`, 'fetchPost', commit)
      } else {
        return Promise.resolve({ data: certainPost })
      }
    },
    fetchCurrentUser ({ commit }) {
      return asyncAndCommit('/user/current', 'fetchCurrentUser', commit)
    },
    createPost ({ commit }, payload) {
      return asyncAndCommit('/posts', 'createPost', commit, { method: 'post', data: payload })
    },
    updatePost ({ commit }, { id, payload }) {
      return asyncAndCommit(`/posts/${id}`, 'updatePost', commit, { method: 'patch', data: payload })
    },
    deletePost ({ commit }, id) {
      return asyncAndCommit(`/posts/${id}`, 'deletePost', commit, { method: 'delete' })
    },
    login ({ commit }, payload) {
      return asyncAndCommit('/user/login', 'login', commit, { method: 'post', data: payload })
    },
    logout ({ commit }) {
      commit('logout')
    },
    loginAndFetch ({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    }
  },
  getters: {
    getColumnById: (state) => (id: string) => {
      return state.columns.data[id]
    },
    getPostsByCid: (state) => (cid: string) => {
      return objToArr(state.posts.data).filter(post => post.column === cid).sort((a, b) => {
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      })
    },
    getCurrentPost: (state) => (id: string) => {
      return state.posts.data[id]
    }
  }
})

export default store
