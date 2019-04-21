import Vue from 'vue'
import Vuex, { GetterTree, MutationTree } from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    colors: ['#ff00e7', '#ff8100', '#e3ff00', '#00ff57', '#00c5ff', '#a300ff'],
    currentBoard: [NaN],
    uniqueColorsInBoard: []
  },
  getters: {
    colors: (state) => {
      return state.colors
    },
    currentBoard: (state) => state.currentBoard,
    gameOver: (state) => {
      for (const color of state.currentBoard) {
        if (!state.uniqueColorsInBoard.includes(color)) {
          state.uniqueColorsInBoard.push(color)
          console.log(state.uniqueColorsInBoard);
          return false
        }
      }

      return true
    }
  },
  mutations: {
    setCurrentBoard(state, board) {
      state.currentBoard = board
    },
    updateCurrentBoard(
      state,
      { index, colorIndex }: { index: number; colorIndex: number }
    ) {
      state.currentBoard.splice(index, 1, colorIndex)
    }
  },
  actions: {}
})
