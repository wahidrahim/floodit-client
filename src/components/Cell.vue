<template lang="pug">
.cell(:style='{ backgroundColor: colorString }', @click='$emit("changeColor", colorIndex)')
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import store from '@/store'

@Component
export default class Cell extends Vue implements ICell {
  public neighbors = []
  public notified = false
  public colorIndex = 0

  /**
   * Get all possible cell colors
   */
  get colors(): string[] {
    return this.$store.getters.colors
  }

  /**
   * Set a random color for this cell
   */
  public created() {
    const min = 0
    const max = this.colors.length
    const randomInt = Math.floor(Math.random() * (max - min)) + min // [min, max)

    this.colorIndex = randomInt
  }

  /**
   * Returns the hex string value of the color specified by colorIndex
   */
  public get colorString() {
    return this.colors[this.colorIndex]
  }

  /**
   * Set this cells neighbors - provided by parent (Board.vue)
   */
  public setNeighbors(neighbors: []) {
    this.neighbors = neighbors
  }

  /**
   * Change this cells color and notify it's neigbors
   */
  public changeColor(colorIndex: number) {
    this.notified = true
    this.notifyNeighbors(colorIndex)
    this.colorIndex = colorIndex
    this.notified = false
  }

  /**
   * Notify this cells neighbors to change color
   * Iff the neighbor is of matching color
   */
  private notifyNeighbors(colorIndex: number) {
    this.neighbors.forEach((neighbor: ICell) => {
      if (
        neighbor &&
        neighbor.colorIndex === this.colorIndex &&
        !neighbor.notified
      ) {
        neighbor.changeColor(colorIndex)
      }
    })
  }

  // private color = 0
  // private neighbors = []
  // private notified = false
  // private width = 0
  // public setNeighbors(neighbors: any) {
  //   this.neighbors = neighbors
  // }
  // private get colorString() {
  //   return COLORS[this.color]
  // }
  // private changeColor(color: number) {
  //   this.notified = true
  //   // notifying neighbors
  //   this.neighbors.forEach((neighbor: any) => {
  //     if (neighbor && neighbor.color === this.color && !neighbor.notified) {
  //       neighbor.changeColor(color)
  //     }
  //   })
  //   this.color = color
  //   this.notified = false
  // }
  // private created() {
  //   this.color = getRandomColor()
  // }
  // private mounted() {
  //   console.log('cell mounted');
  //   // portrait
  //   this.width = this.containerWidth / this.size
  // }
}
</script>

<style lang="scss" scoped>
.cell {
  width: 100%;
  height: 100%;
}
</style>
