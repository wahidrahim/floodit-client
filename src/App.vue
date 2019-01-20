<template lang="pug">
  #app
    router-view
</template>

<style lang="scss">
html {
  box-sizing: border-box;
  height: 100%;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  background: #4c484f;
  margin: 0;
  height: 100%;
  font-family: 'Open Sans';
}

#app {
  height: 100%;
}
</style>
