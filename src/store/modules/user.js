import { login, logout, getInfo, signup } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

// const fn = function() {
//   return 
// }

// function() {
//   return 
// }

// const fn =  () => {
//   return
// }


const actions = {
  // user login
  login({ commit }, loginForm) {
    const username = loginForm.username
    const password = loginForm.password
    // const { username, password } = loginForm
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(
        (response) => {
          const { data } = response
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve()
        }
      ).catch(error => {
        reject(error)
      })
    })
  },
  // signup
  signup({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      signup({ username: username.trim(), password: password })
        .then(response => {
          const { data } = response
          // 设置state中的token
          commit('SET_TOKEN', data.token)
          // 将token保存到浏览器中
          setToken(data.token)
          // 结果为成功
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 像后端发送token
      getInfo(state.token).then(response => {
        const { data } = response
        console.log(data)
        if (data) {
          // 从data中获取name, avatar
          const { name, avatar } = data
          console.log(data)
          // 设置全局变量
          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          resolve(data)
        }

        else {
          return reject('Verification failed, please Login again.')
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

