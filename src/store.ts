import Vue from 'vue'
import Vuex, { GetterTree, MutationTree } from 'vuex'

Vue.use(Vuex)

const state: IRootState = {
  colors: ['#ff00e7', '#ff8100', '#e3ff00', '#00ff57', '#00c5ff', '#a300ff'],
  currentBoard: []
}

const getters: GetterTree<IRootState, IRootState> = {
  colors: ({ colors }) => colors
}

const mutations: MutationTree<IRootState> = {
  setCurrentBoard({ currentBoard }, board) {
    currentBoard = board
  },
  updateCurrentBoard(
    { currentBoard },
    { index, colorIndex }: { index: number; colorIndex: number }
  ) {
    currentBoard[index] = colorIndex
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions: {}
})

interface IRootState {
  colors: string[]
  currentBoard: number[]
}
