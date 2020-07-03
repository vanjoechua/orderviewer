import api from 'axios'
import { getField, updateField } from 'vuex-map-fields'

const namespaced = {
    namespaced: true,
}

const state = {
  Orders: [],
  totalOrders: 0,
}

const getters = {
  getField,
}

const mutations = {
    setOrders (state, payload) {
      state.Orders = payload?.Orders
      state.totalOrders = payload?.TotalOrders
    },
  updateField,
}

const actions = {
    getAllOrders ({ commit }) {
        return new Promise((resolve, reject) => {
            api.get('/orders').then((response) => {
                    commit('setOrders',response.data)
                    resolve('done')
                }).catch((error) => {
                    reject(error)
                }).finally(() => {

                })
        })
    },
}

export const orders = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
}
