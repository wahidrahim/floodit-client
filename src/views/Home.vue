<template>
  <div class="home">
    <div class="container">
      <template v-for="x in size">
        <template v-for="y in size">
          <cell
            :row="x"
            :col="y"
            :key="`r${x}c${y}`"
            :ref="`r${x}c${y}`"
            @changeColor="changeColor"
          />
        </template>
        <br :key="x">
      </template>
    </div>
    <colors @changeColor="changeColor"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Cell from '@/components/Cell.vue'
import Colors from '@/components/Colors.vue'

@Component({
  components: {
    Cell,
    Colors
  }
})
export default class Home extends Vue {
  private size = 14

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

    if (color !== firstCell.color) {
      firstCell.changeColor(color)
    }
  }

  private getCellComponent(row: number, col: number): any {
    const cell = this.$refs[`r${row}c${col}`] as any[]

    return cell ? cell[0] : null
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: inline-block;
  box-shadow: 0 2px 32px rgba(black, 0.5);
  border-radius: 0.5rem;
  margin-top: 1rem;
  overflow: hidden;
}
</style>

