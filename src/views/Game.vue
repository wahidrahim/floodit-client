<template lang="pug">
#game
  board
  colors
  h1.moves {{ moves || '' }}

  // TODO: game over actions
  .game-over-actions(v-if='gameOver')
    .action Send Challenge
    .action(@click='saveScore') Save Score
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

  get initialBoard() {
    return this.$store.getters.initialBoard
  }

  private async saveScore() {
    const score = {
      moves: this.moves
    }

    const board = {
      size: this.initialBoard
    }

    console.log(score, board)
    // const res = await this.$api.get('/scores')
    // console.log(res);
  }
}
</script>

<style lang="scss" scoped>
#game {
  position: relative;
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

    .action {
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>

