<template>
  <div class="game">
    <div
      class="container"
      ref="container"
      :style="{
      'width': `${containerWidth}px`,
      'height': `${containerWidth}px` }"
    >
      <template v-for="x in size">
        <template v-for="y in size">
          <cell
            :row="x"
            :col="y"
            :size="size"
            :containerWidth="containerWidth"
            :key="`r${x}c${y}`"
            :ref="`r${x}c${y}`"
            @changeColor="changeColor"
          />
        </template>
      </template>
    </div>
    <colors @changeColor="changeColor"/>
    <h1 class="moves">{{ moves || '' }}</h1>
    <actions/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

import Cell from '@/components/Cell.vue'
import Colors from '@/components/Colors.vue'
import Actions from '@/components/Actions.vue'

@Component({
  components: {
    Cell,
    Colors,
    Actions
  }
})
export default class Home extends Vue {
  public $refs!: {
    container: HTMLElement
    [key: string]: any
  }

  private size = 14
  private moves = 0
  private gameOver = false
  private containerWidth = 0

  private beforeMount() {
    this.containerWidth = window.innerWidth - 48
  }

  private mounted() {
    // set neighbors
    for (let r = 1; r <= this.size; r++) {
      for (let c = 1; c <= this.size; c++) {
        const cell = this.getCellComponent(r, c)

        cell.setNeighbors([
          this.getCellComponent(r, c - 1), // left
          this.getCellComponent(r - 1, c), // top
          this.getCellComponent(r, c + 1), // right
          this.getCellComponent(r + 1, c) // bottom
        ])
      }
    }
  }

  private changeColor(color: number) {
    const firstCell = this.getCellComponent(1, 1)

    if (color !== firstCell.color && !this.gameOver) {
      firstCell.changeColor(color)
      this.moves++

      // check if game is over
      const colors: number[] = []

      iterator: for (let r = 1; r <= this.size; r++) {
        for (let c = 1; c <= this.size; c++) {
          if (colors.length > 1) {
            break iterator // break out asap
          }
          if (!colors.includes(this.getCellComponent(r, c).color)) {
            colors.push(color)
          }
        }
      }

      if (colors.length === 1) {
        this.gameOver = true
      }
    }
  }

  private getCellComponent(row: number, col: number): any {
    const cell = this.$refs[`r${row}c${col}`] as any[]

    return cell ? cell[0] : null
  }
}
</script>

<style lang="scss" scoped>
.game {
  text-align: center;
}

.container {
  display: inline-flex;
  flex-wrap: wrap;
  box-shadow: 0 2px 32px rgba(black, 0.5);
  border-radius: 0.5rem;
  margin-top: 1rem;
  overflow: hidden;
  white-space: nowrap;
}

.moves {
  color: white;
  font-size: 4rem;
  font-style: italic;
  margin: 1rem 0 0;
}
</style>

