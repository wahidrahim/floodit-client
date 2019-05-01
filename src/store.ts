import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const defaultState: IFlooditState = {
  // all the possible colors
  colors: ['#ff00e7', '#ff8100', '#e3ff00', '#00ff57', '#00c5ff', '#a300ff'],
  // numeric (color index) representation of the board
  initialBoard: [NaN],
  currentBoard: [NaN],
  moves: 0,
  // color (color index) to change the top-left corner cell to
  colorChange: NaN
}

export default new Vuex.Store({
  state: defaultState,
  getters: {
    colors: (state) => {
      return state.colors
    },
    initialBoard: (state) => state.initialBoard,
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
    setInitialBoard(state, board) {
      state.initialBoard = board
      state.currentBoard = [...state.initialBoard]
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

interface IFlooditState {
  colors: string[]
  initialBoard: number[]
  currentBoard: number[]
  moves: number
  colorChange: number
}
