<template lang="pug">
#game
  board
  colors
  h1.moves {{ moves || '' }}

  // TODO: game over actions
  div.game-over-actions(v-if='gameOver')
    div Send Challenge
    div Save Score
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
  padding: relative;
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

  .game-over-actions {
    position: absolute;
    text-align: center;
    width: 100%;
    top: 3rem;
  }
}
</style>

