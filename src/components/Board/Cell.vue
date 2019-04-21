<template lang="pug">
.cell(:style='{ backgroundColor: colorString }', @click='$emit("changeColor", colorIndex)')
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import store from '@/store'

@Component
export default class Cell extends Vue implements ICell {
  public colorIndex = 0
  public notified = false
  private neighbors = []

  /**
   * The index of this cell in the
   * 1D representation of the `board`
   */
  @Prop({ required: true })
  public boardIndex!: number

  /**
   * Get all possible cell colors
   */
  private get colors(): string[] {
    return this.$store.getters.colors
  }

  /**
   * Returns the hex string value of the color specified by colorIndex
   */
  private get colorString() {
    return this.colors[this.colorIndex]
  }

  /**
   * Set a random color for this cell
   */
  private created() {
    const min = 0
    const max = this.colors.length
    const randomInt = Math.floor(Math.random() * (max - min)) + min // [min, max)

    this.colorIndex = randomInt
  }

  /**
   * Set this cells neighbors - provided by parent `Board`
   */
  public setNeighbors(neighbors: []) {
    this.neighbors = neighbors
  }

  /**
   * Change this cells color and notify it's neigbors
   * Initially called by `Board` for the top-left `Cell`
   */
  public changeColor(colorIndex: number) {
    this.notified = true
    this.notifyNeighbors(colorIndex)
    this.notified = false // ready to be notified again

    this.$store.commit('updateCurrentBoard', {
      index: this.boardIndex,
      colorIndex
    })

    this.colorIndex = colorIndex
  }

  /**
   * Notify this cells neighbors to change color
   * Iff the neighbor is of matching color
   * and has not already been notified
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
}
</script>

<style lang="scss" scoped>
.cell {
  width: 100%;
  height: 100%;
  transition: background-color 500ms ease-in-out;
}
</style>
