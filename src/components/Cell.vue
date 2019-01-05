<template>
  <div
    class="cell"
    :style="{ 'background-color': colorString }"
    @click="$emit('changeColor', color)"
  ></div>
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
  // return COLORS[getRandomInt(0, COLORS.length)]
  return getRandomInt(0, COLORS.length)
}

@Component
export default class Cell extends Vue {
  public color = 0
  public neighbors = []
  public notified = false

  @Prop()
  public row!: number
  @Prop()
  public col!: number

  private newColor = 0

  private get colorString() {
    return COLORS[this.color]
  }

  public changeColor(color: number) {
    this.newColor = color
    this.notified = true

    // notifying neighbors
    this.neighbors.forEach((neighbor: any) => {
      if (neighbor && neighbor.color === this.color && !neighbor.notified) {
        neighbor.changeColor(color)
      }
    })

    this.color = this.newColor
    this.notified = false
  }

  public setNeighbors(neighbors: any) {
    this.neighbors = neighbors
  }

  private created() {
    this.color = getRandomColor()
  }
}
</script>

<style lang="scss" scoped>
.cell {
  display: inline-block;
  vertical-align: top;
  width: 2rem;
  height: 2rem;
}
</style>
