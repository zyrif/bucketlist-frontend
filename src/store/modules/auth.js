import axios from '@/axiosConf'

const state = () => ({
  user: {
    id: '',
    email: '',
    auth_token: ''
  }
});

const getters = {
  getUserId: function(state) {
    return state.user.id
  },

  getUserEmail: function(state) {
    return state.user.email
  }
}

const mutations = {
  setUser: function(state, data) {
    state.user.id = data.id
    state.user.email = data.email
  },

  setUserAuthToken: function(state, auth_token) {
    state.user.auth_token = auth_token
  },

  unsetUser: function(state) {
    for (let key of Object.keys(state.user)) {
      state.user[key] = ''
    }
  }
}

const actions = {
  authenticate: function({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('/auth/token/login/', {
          email: payload.email,
          password: payload.password
        })
        .then((resp) => {
          if (resp.status === 200) {
            commit('setUserAuthToken', resp.data.auth_token)
            resolve(resp)
          } else {
            reject(resp)
          }
        }).catch((error) => {
          reject(error)
        }).finally(() => {
          //
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

