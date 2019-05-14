import { Module } from 'vuex'
import { IRootState, IFlooditGameState } from '@store/types'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export const FlooditGame: Module<IFlooditGameState, IRootState> = {
  state: {
    themeColors: [
      '#ff00e7',
      '#ff8100',
      '#e3ff00',
      '#00ff57',
      '#00c5ff',
      '#a300ff'
    ],
    boardSize: 3,
    initialBoard: [],
    currentBoard: [],
    moves: 0,
    changeColor: NaN
  },
  getters,
  mutations,
  actions
}
