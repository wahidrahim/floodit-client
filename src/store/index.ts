import { StoreOptions } from 'vuex'

interface IRootState {
  version: string
}

const store: StoreOptions<IRootState> = {
  state: {
    version: '0.0.1'
  },
  modules: {
    FlooditGame
  }
}
