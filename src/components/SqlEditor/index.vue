<template>
  <div class="compomemt-sql-editor" ref="code">
  </div>
</template>

<script>
import CodeMirror from './codeMirror.js'

export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },

  watch: {
    value: 'setValue'
  },

  methods: {
    setValue () {
      const { cmInstance, value } = this
      if (!cmInstance) return
      const currValue = cmInstance.getDoc().getValue()
      if (currValue !== value) {
        cmInstance.setOption('value', value)
      }
    }
  },

  mounted () {
    const cmInstance = CodeMirror(this.$refs.code, {
      value: this.value,
      mode: 'text/x-mysql',
      indentWithTabs: true
    })

    cmInstance.on('changes', () => {
      this.$emit('input', cmInstance.getDoc().getValue())
    })
    this.cmInstance = cmInstance
    this.setValue()
  }
}
</script>

<style lang="less">
.compomemt-sql-editor {
  height: 300px;
  border: 1px solid #eee;
  border-radius: 6px;
  margin: 6px 4px;;
}
</style>
