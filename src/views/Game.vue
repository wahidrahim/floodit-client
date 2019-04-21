<template lang="pug">
  #game
    board

    //- TODO: make separate component
    .actions(v-if='gameOver')
      .action(@click="")
        i.mdi.mdi-sword-cross
        |  Send Challenge
      .action(@click="showSaveScoreModal = true")
        i.mdi.mdi-content-save-outline
        |  Save

    colors(@changeColor='changeColor')

    h1.moves {{ moves || '' }}

    //- TODO: get these states from vuex store
    save-score-modal(v-if='showSaveScoreModal' :moves='moves', :size='size' :board='board' @close='showSaveScoreModal = false')
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

import Board from '@/components/Board/Board.vue'
import Colors from '@/components/Colors.vue'
import SaveScoreModal from '@/components/SaveScoreModal.vue'

@Component({
  components: {
    Colors,
    SaveScoreModal,
    Board
  }
})
export default class Home extends Vue {
  public $refs!: {
    container: HTMLElement
    [key: string]: any // r1c1, r1c2, r1c3, ... ,r(SIZE)c(SIZE)
  }

  // TODO: Store them in vuex store
  private size = 14
  private moves = 0
  private board: number[] = []
  private gameOver = false
  private showSaveScoreModal = false
  private containerWidth = 0

}
</script>

<style lang="scss" scoped>
#game {
  width: 100%;
  height: 100%;
  max-width: 480px;
  margin: 0 auto;
  text-align: center;
}

.container {
  position: relative;
  display: inline-flex;
  flex-wrap: wrap;
  box-shadow: 0 2px 32px rgba(black, 0.2);
  border-radius: 0.5rem;
  margin-top: 1rem;
  overflow: hidden;
  white-space: nowrap;
}

.moves {
  color: white;
  font-family: 'Exo 2';
  font-style: italic;
  font-size: 4rem;
  margin: 1rem 0 0;
}

.actions {
  position: absolute;
  font-size: 2rem;
  align-self: center;
  left: 0;
  right: 0;
  color: #000;

  .action {
    margin: 1rem;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>

