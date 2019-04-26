<template lang="pug">
#game
  board
  colors
  h1.moves {{ moves || '' }}

  div(v-if='gameOver') Game Over

  //- TODO: make separate component
  // .actions(v-if='gameOver')
  //   .action(@click="")
  //     i.mdi.mdi-sword-cross
  //     |  Send Challenge
  //   .action(@click="showSaveScoreModal = true")
  //     i.mdi.mdi-content-save-outline
  //     |  Save

  //- TODO: get these states from vuex store
  // save-score-modal(v-if='showSaveScoreModal' :moves='moves', :size='size' :board='board' @close='showSaveScoreModal = false')
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
  get moves() {
    return this.$store.getters.moves
  }

  get gameOver() {
    return this.$store.getters.gameOver
  }
}
</script>

<style lang="scss" scoped>
#game {
  width: 100%;
  height: 100%;
  max-width: 480px;
  margin: 0 auto;
  text-align: center;

  .moves {
    color: white;
    font-family: 'Exo 2';
    font-style: italic;
    font-size: 4rem;
    margin: 1rem 0 0;
  }

  // .actions {
  //   position: absolute;
  //   font-size: 2rem;
  //   align-self: center;
  //   left: 0;
  //   right: 0;
  //   color: #000;

  //   .action {
  //     margin: 1rem;

  //     &:hover {
  //       cursor: pointer;
  //     }
  //   }
  // }
}
</style>

