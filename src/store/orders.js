import api from 'axios'
import { getField, updateField } from 'vuex-map-fields'

const namespaced = {
    namespaced: true,
}

const state = {
  Orders: [],
  TotalOrders: 0,
}

const getters = {
  getField,
}

const mutations = {
    setOrders (state, payload) {
      state.Orders = payload?.Orders
      state.TotalOrders = payload?.TotalOrders
    },
  updateField,
}

const actions = {
    getAllOrders ({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let offset = (payload.tableOptions.page - 1) * payload.tableOptions.itemsPerPage
			let searchterm = ''
			let fromdate = ''
			let todate = ''

			if(payload.searchTerm != null){
				searchterm = payload.searchTerm
			}

			if(payload.orderDates.length > 0){ //not empty
				if(payload.orderDates[0] != null){
					fromdate = payload.orderDates[0]
				}
				if(payload.orderDates[1] != null){
					todate = payload.orderDates[1]
				}
			}

			api.get('http://localhost:8080/orders',{
            		params: {
            			offset: offset,
						searchterm: searchterm,
						fromdate: fromdate,
						todate: todate,
					}
				}).then((response) => {
                    commit('setOrders', response.data)
                    resolve('done')
                }).catch((error) => {
                    reject(error)
                }).finally(() => {
                    resolve('done')
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
