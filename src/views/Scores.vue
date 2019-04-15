<template lang="pug">
  #scores
    .score(v-for='score in scores' :key='score.id')
      .player {{ score.player }}
      board(:board='score.board' :size='score.size')
      .moves moves: {{ score.moves }}
      button.btn-play play
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import Board from '@/components/Board.vue'

@Component({
  components: { Board }
})
export default class Scores extends Vue {
  public scores: IScore[] = []

  private async created() {
    const res = await this.$api.get('/scores')

    this.scores = res.data
  }
}
</script>

<style lang="scss" scoped>
#scores {
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;

  .score {
    display: inline-block;
    border: 1px solid gray;
    padding: 1rem;
    margin-bottom: 1rem;

    .player {
      margin-bottom: 0.5rem;
    }

    .moves {
      margin-top: 0.5rem;
    }

    .btn-play {
      margin-top: 1rem;
    }
  }
}
</style>
