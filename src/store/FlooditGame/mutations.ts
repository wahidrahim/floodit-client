import { MutationTree } from 'vuex'
import { IFlooditGameState } from '@store/types'

const mutations: MutationTree<IFlooditGameState> = {
  setBoard(state, { board, size }) {
    state.boardSize = size
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
}
