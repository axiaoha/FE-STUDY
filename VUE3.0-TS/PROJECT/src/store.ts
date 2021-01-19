import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps, PostProps } from './testData'
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
    user: {
      isLogin: true,
      name: 'axiaoha',
      columnId: 1
    },
    columns: testData,
    posts: testPosts
  },
  getters: {
    getColumnById: state => (id: number) => {
      return state.columns.find(c => c.id === id)
    },
    getPostsByCid: state => (cid: number) => {
      return state.posts.filter(post => post.columnId === cid)
    }
  },
  mutations: {
    login (state) {
      state.user = {
        ...state.user,
        isLogin: true,
        name: 'axiaoha',
        columnId: 1
      }
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    }
  }
})
// store.commit()

export default store
