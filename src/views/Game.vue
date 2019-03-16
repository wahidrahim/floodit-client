<template lang="pug">
  .game(ref='game')
    .container(ref='container', :style="{\
      'width': `${containerWidth}px`,\
      'height': `${containerWidth}px` }")
      
      template(v-for='x in size')
        template(v-for='y in size')
          cell(:row='x', :col='y',
            :size='size',
            :containerWidth='containerWidth',
            :key='`r${x}c${y}`',
            :ref='`r${x}c${y}`',
            @changeColor='changeColor')

      .actions(v-if='gameOver')
        .action(@click="")
          i.mdi.mdi-sword-cross
          |&nbsp;Send Challenge
        .action(@click="save")
          i.mdi.mdi-content-save-outline
          |&nbsp;Save

    colors(@changeColor='changeColor')

    h1.moves {{ moves || '' }}
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import axios from 'axios'

import Cell from '@/components/Cell.vue'
import Colors from '@/components/Colors.vue'

@Component({
  components: {
    Cell,
    Colors
  }
})
export default class Home extends Vue {
  $refs!: {
    container: HTMLElement
    [key: string]: any
  }

  private size = 3
  private moves = 0
  private gameOver = false
  private containerWidth = 0
  private cells: number[][] = []

  private beforeMount() {
    const MAX_WIDTH = 480
    const PADDING = 32

    this.containerWidth =
      document.body.clientWidth < MAX_WIDTH
        ? document.body.clientWidth - PADDING
        : MAX_WIDTH - PADDING
  }

  private mounted() {
    // set neighbors and record cell matrix
    for (let r = 1; r <= this.size; r++) {
      this.cells[r - 1] = []

      for (let c = 1; c <= this.size; c++) {
        const cell = this.getCellComponent(r, c)

        cell.setNeighbors([
          this.getCellComponent(r, c - 1), // left
          this.getCellComponent(r - 1, c), // top
          this.getCellComponent(r, c + 1), // right
          this.getCellComponent(r + 1, c) // bottom
        ])

        this.cells[r - 1][c - 1] = cell.color
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

  private async save() {
    const data = {
      size: this.size,
      moves: this.moves,
      cells: this.cells
    }

    const response = await axios.post('//localhost:9090/save', data)
  }
}
</script>

<style lang="scss" scoped>
.game {
  width: 100%;
  height: 100%;
  max-width: 480px;
  margin: 0 auto;
  text-align: center;
}

.container {
  position: relative;
  display: inline-flex;
  flex-wrap: wrap;
  box-shadow: 0 2px 32px rgba(black, 0.2);
  border-radius: 0.5rem;
  margin-top: 1rem;
  overflow: hidden;
  white-space: nowrap;
}

.moves {
  color: white;
  font-family: 'Exo 2';
  font-style: italic;
  font-size: 4rem;
  margin: 1rem 0 0;
}

.actions {
  position: absolute;
  font-size: 2rem;
  align-self: center;
  left: 0;
  right: 0;
  color: #000;

  .action {
    margin: 1rem;

    &:hover {
      cursor: pointer;
      color: white;
      text-shadow: 0 0 3px #000;
    }
  }
}
</style>

