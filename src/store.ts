import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    colors: [
      '#ff00e7',
      '#ff8100',
      '#e3ff00',
      '#00ff57',
      '#00c5ff',
      '#a300ff'
    ]
  },
  getters: {
    colors(state) {
      return state.colors
    }
  },
  mutations: {},
  actions: {}
})
