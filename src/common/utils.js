
export const copy = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

export const handlerSql = (strJson) => {
  const result = {
    dimensions: [{
      name: '',
      options: {}
    }],
    measure: []
  }
  const name = strJson.match(/GROUP\s+BY\s+(\w+)/i)[1]
  const optionsStr = strJson.match(new RegExp(`${name}\\s+as\\s+"(\\w+)"`))[1]
  let rotate
  if (optionsStr) {
    let t = optionsStr.split('__')[1]
    let lenth = t.indexOf('rotate')
    rotate = lenth ? 90 : Number(t.split('_')[1])
  }
  result.dimensions = [{
    name,
    options: {
      rotate
    }
  }]
  const measureStr = strJson.match(/SUM\((\w+)\)\s+as\s+"(\w+)"/g)
  result.measures = measureStr.map((item, index) => {
    const measureItem = { name, options: {} }
    measureItem.name = item.split('(')[1].split(')')[0]
    const optionStr = item.split('"')[1].split('"')[0]
    let optionsRight
    let yAxisLeftMin
    let yAxisLeftMax
    let yAxisRightMin
    let yAxisRightMax
    let kmb
    let per
    optionStr.split('__').forEach(i => {
      if (i === 'right') {
        optionsRight = true
      } else if (i === 'yAxisLeftMin') {
        yAxisLeftMin = Number(i.split('_')[1])
      } else if (i === 'yAxisLeftMax') {
        yAxisLeftMax = Number(i.split('_')[1])
      } else if (i === 'yAxisRightMin') {
        yAxisRightMin = Number(i.split('_')[1])
      } else if (i === 'yAxisRightMax') {
        yAxisRightMax = Number(i.split('_')[1])
      } else if (i === 'fmt_KMB') {
        kmb = true
      } else if (i === 'fmt_per') {
        per = true
      }
    })
    measureItem.options.right = optionsRight
    measureItem.options.yAxisLeftMin = yAxisLeftMin
    measureItem.options.yAxisLeftMax = yAxisLeftMax
    measureItem.options.yAxisRightMin = yAxisRightMin
    measureItem.options.yAxisRightMax = yAxisRightMax
    measureItem.options.fmt_KMB = kmb
    measureItem.options.fmt_per = per
    return measureItem
  })
  return result
  // result.measure = a
}
