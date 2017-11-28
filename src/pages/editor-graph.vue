<template>
  <div class="page-editor-graph">
    <div class="editor-data">
      <div class="code-section block">
        <p>数据格式</p>
        <code-section :content="testData" json></code-section>
      </div>
      <div class="sql-editor block">
        <div class="title">
           <p>图标配置</p>
          <button @click="getSql" class="button">图片预览</button>
        </div>
        <sql-editor v-model="viewSql"></sql-editor>
      </div>
    </div>
    <div class="chart-view block">
      <p>预览</p>
      <chart-view :data="chartData"></chart-view>
    </div>
  </div>
</template>

<script>
import CodeSection from '../components/CodeSection'
import SqlEditor from '../components/SqlEditor'
import ChartView from '../components/ChartView'
import transform from '../common/transform'
import testData from './test-data'
import viewSql from './viewSql'
import { handlerSql, copy } from '../common/utils'

export default {
  data () {
    return {
      viewSql: '',
      temProperties: null,
      properties: {},
      testData: {},
      chartData: {}
    }
  },

  methods: {
    getSql () {
      if (this.viewSql) {
        this.temProperties = handlerSql(this.viewSql)
      }
      this.handlerChartData()
    },
    handlerChartData () {
      let temProperties
      if (this.temProperties) {
        temProperties = copy(this.temProperties)
      }
      const properties = temProperties ? transform({
        dimensions: temProperties.dimensions,
        measures: temProperties.measures
      }) : {}
      this.properties = properties
      this.chartData = properties
        ? Object.assign({}, this.testData, { settings: properties.settings })
        : this.testData
      console.log(JSON.stringify(this.chartData))
    }
  },

  created () {
    this.testData = testData
    this.viewSql = viewSql.sql
  },

  components: {
    CodeSection,
    SqlEditor,
    ChartView
  }
}
</script>

<style lang="less">
.page-editor-graph {
  min-width: 1200px;
  height: 100%;
  background-color: #eee;
  display: flex;
  flex-direction: row;

  p {
    display: block;
    padding: 0;
    padding-left: 8px;
    border-left: 4px solid #19d4ae;
    margin: auto 0;
    color: #19d4ae;
    font-size: 14px;
  }

  .block {
    background-color: #fff;
    margin: 10px;
    padding: 6px;
  }
  .editor-data {
    width: 560px;
  }
  .title {
    display: flex;
    p {
      flex: 1;
    }
    .button {
      height: 26px;
      margin-right: 6px;
      padding: 0 16px;
      border: none;
      background-color: #19d4ae;
      color: #fff;
    }
    .button:focus {
      outline: none;
    }
  }
}
</style>
