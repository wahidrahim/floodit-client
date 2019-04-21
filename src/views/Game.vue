<template lang="pug">
  #game
    //- Container width is calculated before mount.
    board
    // .container(
    //   :style='{\
    //     width: `${containerWidth}px`,\
    //     height: `${containerWidth}px`\
    //   }')
      
    //   //- Cells are rendered "linearly". They wrap to the
    //       next row based on their width (calculated in Cell.vue)
    //   template(v-for='x in size')
    //     template(v-for='y in size')
    //       cell(:row='x', :col='y',
    //         :size='size',
    //         :containerWidth='containerWidth',
    //         :key='`r${x}c${y}`',
    //         :ref='`r${x}c${y}`',
    //         @changeColor='changeColor')

      //- TODO: make separate component
      .actions(v-if='gameOver')
        .action(@click="")
          i.mdi.mdi-sword-cross
          |  Send Challenge
        .action(@click="showSaveScoreModal = true")
          i.mdi.mdi-content-save-outline
          |  Save

    colors(@changeColor='changeColor')

    h1.moves {{ moves || '' }}

    //- TODO: get these states from vuex store
    save-score-modal(v-if='showSaveScoreModal' :moves='moves', :size='size' :board='board' @close='showSaveScoreModal = false')
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

import Board from '@/components/Board/Board.vue'
import Colors from '@/components/Colors.vue'
import SaveScoreModal from '@/components/SaveScoreModal.vue'

@Component({
  components: {
    // Cell,
    Colors,
    SaveScoreModal,
    Board
  }
})
export default class Home extends Vue {
  public $refs!: {
    container: HTMLElement
    [key: string]: any // r1c1, r1c2, r1c3, ... ,r(SIZE)c(SIZE)
  }

  // TODO: Store them in vuex store
  private size = 14
  private moves = 0
  private board: number[] = []
  private gameOver = false
  private showSaveScoreModal = false
  private containerWidth = 0

  /**
   * Set the neighbours of each cell
   */
  // private mounted() {
  //   for (let r = 1; r <= this.size; r++) {
  //     for (let c = 1; c <= this.size; c++) {
  //       const cell = this.getCellComponent(r, c)

  //       cell.setNeighbors([
  //         this.getCellComponent(r, c - 1), // left
  //         this.getCellComponent(r - 1, c), // top
  //         this.getCellComponent(r, c + 1), // right
  //         this.getCellComponent(r + 1, c) // bottom
  //       ])

  //       // save the numeric representation of the initilized board
  //       this.board.push(cell.color)
  //     }
  //   }
  // }

  public changeColor(color: number) {
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

  /**
   * Set the width of the board
   */
  private beforeMount() {
    const MAX_WIDTH = 480
    const PADDING = 32

    this.containerWidth =
      document.body.clientWidth < MAX_WIDTH
        ? document.body.clientWidth - PADDING
        : MAX_WIDTH - PADDING
  }

  /**
   * Helper method to return the Cell vue component
   */
  private getCellComponent(row: number, col: number) {
    const cell = this.$refs[`r${row}c${col}`] as any[]

    return cell ? cell[0] : null
  }
}
</script>

<style lang="scss" scoped>
#game {
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
    }
  }
}
</style>

