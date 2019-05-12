<template lang="pug">
#game
  board(:boardId='$route.query.board')
  colors
  h1.moves {{ moves || '' }}

  // TODO: game over actions
  .game-over-actions(v-if='gameOver')
    .action(@click='sendChallenge') Send Challenge
  
  .challenge-url(v-if='showChallengeUrl')
    input(value='link to challenge')
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
  private showChallengeUrl = false

  get moves() {
    return this.$store.getters.moves
  }

  get gameOver() {
    return this.$store.getters.gameOver
  }

  get size() {
    return this.$store.getters.boardSize
  }

  get initialBoard() {
    return this.$store.getters.initialBoard
  }

  private created() {
  }

  private async sendChallenge() {
    const score = {
      moves: this.moves
    }

    const board = {
      size: this.size,
      cells: this.initialBoard
    }

    const res = await this.$api.post('/scores', { score, board })

    console.log(res)
    this.showChallengeUrl = true
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

