import Vue from 'vue'
import Vuex, { GetterTree, MutationTree } from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    colors: ['#ff00e7', '#ff8100', '#e3ff00', '#00ff57', '#00c5ff', '#a300ff'],
    currentBoard: [NaN],
    moves: 0,
    colorChange: NaN
  },
  getters: {
    colors: (state) => {
      return state.colors
    },
    currentBoard: (state) => state.currentBoard,
    /**
     * Detects when the game is over by checking
     * how many unique colors are in the board.
     * If there's only 1 color in the board, then game is over
     */
    gameOver: (state) => {
      const colors: number[] = []

      for (const color of state.currentBoard) {
        if (!colors.includes(color)) {
          colors.push(color)

          // break as early as possible
          if (colors.length > 1) {
            break
          }
        }
      }

      return colors.length > 1 ? false : true
    },
    moves(state) {
      return state.moves
    },
    colorChange(state) {
      return state.colorChange
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
    },
    incrementMoves(state) {
      state.moves++
    }
  },
  actions: {
    changeColor(context, colorIndex: number) {
      context.state.colorChange = colorIndex
    }
  }
})
