<template lang="pug">
  #save-modal
    form(@submit.prevent='save')
      h1 Save Score
      input(placeholder='name' v-model='player' ref='input')
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class SaveScoreModal extends Vue {
  public $refs!: {
    input: HTMLInputElement
  }
  public player = ''

  @Prop()
  public moves!: number

  @Prop()
  public size!: number

  @Prop()
  public board!: number[]

  public mounted() {
    this.$refs.input.focus()
  }

  public async save() {
    const res = await this.$api.post('/scores', {
      score: {
        moves: this.moves,
        player: this.player
      },
      board: {
        size: this.size,
        cells: this.board
      }
    })

    this.$emit('close')
  }
}
</script>

<style lang="scss" scoped>
#save-modal {
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(black, 0.5);

  form {
    margin-top: 4rem;
    width: 100%;

    h1 {
      color: white;
      text-shadow: 0 0 10px rgba(black, 0.5);
    }

    input {
      font-size: 2rem;
      border: none;
      border-radius: 0.5rem;
      background: white;
      color: black;
      padding: 0.5rem 1rem;
      width: calc(100% - 4rem);
      text-align: center;

      &::placeholder {
        color: lightgray;
      }
    }

    button {
      font-size: 2rem;
    }
  }
}
</style>
