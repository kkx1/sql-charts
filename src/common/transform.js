import { copy } from './utils'
const DEFAULT_RULE = {
  measures: [],
  dimensions: []
}

const DEFAULT_PROPERTIES = {
  settings: {
    type: {},
    axisNum: 1,
    axisOption: {
      left: [],
      right: [],
      top: [],
      bottom: []
    },
    axisType: [],
    metrics: [],
    dimension: []
  }
}

function transformChart (rules, base) {
  const dimension = rules.dimensions.map(({ name, options }) => {
    const { rotate, slabel } = options || {}
    if (rotate) {
      base.settings.label = {
        normal: {
          show: true,
          position: slabel || 'top',
          rotate: rotate
        }
      }
    }
    return name
  })
  const axisType = ['normal']
  const axisName = []
  // const showLine = []
  const min = []
  const max = []
  const metrics = rules.measures.map(({ name, options }) => {
    const {
      // line,
      right,
      yAxisLeftMin: minL,
      yAxisLeftMax: maxL,
      yAxisRightMin: minR,
      yAxisRightMax: maxR,
      fmt_KMB: kmb,
      fmt_per: per
    } = options || {}
    const index = right ? 1 : 0
    if (kmb) {
      axisType[index] = 'KMB'
      axisName[index] = '数值'
    }
    if (per) {
      axisType[index] = 'percent'
      axisName[index] = '比率'
    }
    if (right) {
      base.settings.axisOption.right.push(name)
    }
    if (minL || maxL || minR || maxR) {
      min[0] = minL
      max[0] = maxL
      min[1] = minR
      max[1] = maxR
    }
    // if (bar) {
    //   showLine.push(name)
    // }
    return name
  })
  base.settings.dimension = dimension
  base.settings.metrics = metrics
  base.settings.axisType = axisType
  base.settings.axisName = axisName
  base.settings.min = min
  base.settings.max = max
  // base.settings.showLine = showLine
  return Object.assign(base, rules)
}

export default function transform (settings) {
  const base = copy(DEFAULT_PROPERTIES)
  const properties = transformChart(settings || DEFAULT_RULE, base)
  return properties
}
