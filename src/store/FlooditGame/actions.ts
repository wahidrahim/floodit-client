import { ActionTree } from 'vuex'
import { IFlooditGameState, IRootState } from '@store/types'

const actions: ActionTree<IFlooditGameState, IRootState> = {
  changeColor(context, colorIndex: number) {
    context.state.changeColor = colorIndex
  }
}

export default actions
