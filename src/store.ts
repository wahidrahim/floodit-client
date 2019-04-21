import Vue from 'vue'
import Vuex, { GetterTree, MutationTree } from 'vuex'

Vue.use(Vuex)

const state: IRootState = {
  colors: ['#ff00e7', '#ff8100', '#e3ff00', '#00ff57', '#00c5ff', '#a300ff'],
  currentBoard: []
}

const getters = {
  colors: (state) => {
    return state.colors
  },
  currentBoard: (state) => state.currentBoard,
  gameOver: (state) => {
    const colors: number[] = []

    for (const color of state.currentBoard) {
      if (!colors.includes(color)) {
        colors.push(color)
        return false
      }
    }

    return true
  }
}

const mutations: MutationTree<IRootState> = {
  setCurrentBoard({ currentBoard }, board) {
    console.log('here')
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
  state: {
    colors: ['#ff00e7', '#ff8100', '#e3ff00', '#00ff57', '#00c5ff', '#a300ff'],
    currentBoard: [NaN]
  },
  getters: {
    colors: (state) => {
      return state.colors
    },
    currentBoard: (state) => state.currentBoard,
    gameOver: (state) => {
      const colors: number[] = []

      for (const color of state.currentBoard) {
        if (!colors.includes(color)) {
          colors.push(color)
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
      state.currentBoard[index] = colorIndex
    }
  },
  actions: {}
})

interface IRootState {
  colors: string[]
  currentBoard: number[]
}
