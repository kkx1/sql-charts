<template>
  <div id="app">
    <editor-graph></editor-graph>
  </div>
</template>

<script>
import EditorGraph from './pages/editor-graph'

export default {
  name: 'app',

  components: {
    EditorGraph
  }
}
</script>

<style>
html, body {
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: row;
  height: 100%;
}
</style>
