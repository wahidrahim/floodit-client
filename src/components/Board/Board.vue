<template lang="pug">
#board
  table(:style='{ width: `${boardWidth}px`, height: `${boardWidth}px` }')
    tr(v-for='row in size')
      td(v-for='col in size')
        cell(:ref='`r${row}c${col}`' @changeColor='changeColor')
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import Cell from './Cell.vue'

@Component({
  components: { Cell }
})
export default class Board extends Vue {
  public $refs!: {
    [key: string]: any // cells: r1c1, r1c2, r1c3, ... , r(SIZE)c(SIZE)
  }

  private size = 3
  private boardWidth = 0
  private initialBoard: number[] = []

  /**
   * Set the size of the board to fit mobile screens
   */
  private beforeMount() {
    const maxWidth = 480 // px
    const padding = 32 // px

    this.boardWidth =
      document.body.clientWidth < maxWidth
        ? document.body.clientWidth - padding
        : maxWidth - padding
  }

  /**
   * Set the neighbors of each cell,
   * and save the initial board as a number[]
   */
  private mounted() {
    for (let r = 1; r <= this.size; r++) {
      for (let c = 1; c <= this.size; c++) {
        const cell = this.getCellComponent(r, c)

        cell.setNeighbors([
          this.getCellComponent(r, c - 1), // left
          this.getCellComponent(r - 1, c), // top
          this.getCellComponent(r, c + 1), // right
          this.getCellComponent(r + 1, c) // bottom
        ])

        // save the numeric representation of the initilized board
        this.initialBoard.push(cell.colorIndex)
      }
    }
  }

  private changeColor(colorIndex: number) {
    const firstCell = this.getCellComponent(1, 1)

    if (colorIndex !== firstCell.colorIndex) {
      firstCell.changeColor(colorIndex)
    }
  }

  /**
   * Helper method to return the Cell vue component
   */
  private getCellComponent(row: number, col: number): ICell {
    const cell = this.$refs[`r${row}c${col}`]

    return cell ? cell[0] : null
  }
}
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  margin: 1rem auto;

  tr {
    td {
      overflow: hidden; // makes the corner border radius visible
      padding: 0;
    }

    &:first-child {
      td:first-child {
        border-top-left-radius: 0.5rem;
      }

      td:last-child {
        border-top-right-radius: 0.5rem;
      }
    }

    &:last-child {
      td:first-child {
        border-bottom-left-radius: 0.5rem;
      }
      td:last-child {
        border-bottom-right-radius: 0.5rem;
      }
    }
  }
}
</style>
