<template>
  <div class="component-right-chart">
    <ve-line :data="chartData" :settings="chartDataSettings"></ve-line>
  </div>
</template>

<script>
import VeLine from 'v-charts/lib/line'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      chartData: {},
      chartDataSettings: {}
    }
  },
  watch: {
    data: 'handlerData'
  },
  methods: {
    handlerData () {
      this.chartData = { columns: this.data.columns, rows: this.data.rows }
      const {
        label,
        dimension,
        metrics,
        axisOption,
        axisType,
        axisName
      } = this.data.settings
      this.chartDataSettings = {
        label,
        dimension,
        metrics,
        axisSite: axisOption,
        yAxisType: axisType,
        yAxisName: axisName
      }
      console.log(this.chartData)
    }
  },

  components: { VeLine }
}
</script>
<style lang="less">
.component-right-chart {
  height: 600px;
  width: 600px;
  .ve-line {
    width: 500px;
    padding: 40px;
  }
}
</style>
