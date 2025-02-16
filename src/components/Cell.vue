<template lang="pug">
  .cell(
    @click="$emit('changeColor', color)",
    :style="{\
      'background-color': colorString,\
      'width': `${width}px`,\
      'height': `${width}px`\
    }")
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

const COLORS = [
  '#ff00e7',
  '#ff8100',
  '#e3ff00',
  '#00ff57',
  '#00c5ff',
  '#a300ff'
]

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min // [min, max)
}

const getRandomColor = () => {
  return getRandomInt(0, COLORS.length)
}

@Component
export default class Cell extends Vue {
  @Prop()
  private row!: number
  @Prop()
  private col!: number
  @Prop()
  private size!: number
  @Prop()
  private containerWidth!: number

  private color = 0
  private neighbors = []
  private notified = false

  private width = 0

  public setNeighbors(neighbors: any) {
    this.neighbors = neighbors
  }

  private get colorString() {
    return COLORS[this.color]
  }

  private changeColor(color: number) {
    this.notified = true

    // notifying neighbors
    this.neighbors.forEach((neighbor: any) => {
      if (neighbor && neighbor.color === this.color && !neighbor.notified) {
        neighbor.changeColor(color)
      }
    })

    this.color = color
    this.notified = false
  }

  private created() {
    this.color = getRandomColor()
  }

  private mounted() {
    // portrait
    this.width = this.containerWidth / this.size
  }
}
</script>

<style lang="scss" scoped>
.cell {
  display: inline-block;
  vertical-align: top;
}
</style>
