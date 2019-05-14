import { GetterTree } from 'vuex'
import { IFlooditGameState, IRootState } from '@store/types'

const getters: GetterTree<IFlooditGameState, IRootState> = {
  themeColors: ({ themeColors }) => themeColors,
  initialBoard: ({ initialBoard }) => initialBoard,
  currentBoard: ({ currentBoard }) => currentBoard,
  moves: ({ moves }) => moves
}

export default getters
