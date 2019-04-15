<template lang="pug">
  div
    span.size {{ size }}x{{ size }}
    .board
      template(v-for='(color, i) in board')
        .cell(:style='{ backgroundColor: colorString(color) }' :key='i')
        br(v-if='(i + 1) % size === 0')
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

const COLORS = [
  '#ff00e7',
  '#ff8100',
  '#e3ff00',
  '#00ff57',
  '#00c5ff',
  '#a300ff'
]

@Component
export default class Board extends Vue {
  @Prop()
  public board!: number[]

  @Prop()
  public size!: number

  private colorString(color: number) {
    return COLORS[color]
  }
}
</script>

<style lang="scss" scoped>
.board {
  font-size: 0;

  .cell {
    display: inline-block;
    width: 20px;
    height: 20px;
  }
}
</style>


