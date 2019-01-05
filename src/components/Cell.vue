<template>
  <div class="cell" :style="{ 'background-color': color }"></div>
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
  return COLORS[getRandomInt(0, COLORS.length)]
}

@Component
export default class Cell extends Vue {
  public color: string = '#000'
  public neighbors: any[] = []

  @Prop()
  public row!: number

  @Prop()
  public col!: number

  public created() {
    this.color = getRandomColor()
  }

  public changeColor(color: number) {
    // console.log(`changing color ${this.row},${this.col}: ${color}`)
    this.notifyNeighbors(color)
    this.color = COLORS[color]
  }

  public setNeighbors(neighbor: any) {
    this.neighbors.push(neighbor)
  }

  private notifyNeighbors(color: number) {
    this.neighbors.forEach((neighbor) => {
      if (neighbor.color === this.color) {
        neighbor.changeColor(color)
      }
    })
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
