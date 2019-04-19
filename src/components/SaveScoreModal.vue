<template lang="pug">
  #save-modal
    form(@submit.prevent='save')
      h1 Save Score
      input(placeholder='name' v-model='player' ref='input')
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class SaveScoreModal extends Vue {
  public $refs!: {
    input: HTMLInputElement
  }
  public player = ''

  public mounted() {
    this.$refs.input.focus()
  }

  public async save() {
    const res = await this.$api.post('/score')
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
      background: rgba(white, 0.9);
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
