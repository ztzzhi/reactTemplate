// 计算多级合并行跨度的工具函数
export const calculateMultiLevelRowSpans = (data: any[], groupFields: string[]) => {
  if (!data || data.length === 0) return []

  const spans: number[] = new Array(data.length).fill(1)

  // 为每个分组字段计算合并跨度
  for (let fieldIndex = 0; fieldIndex < groupFields.length; fieldIndex++) {
    const currentField = groupFields[fieldIndex]
    const parentFields = groupFields.slice(0, fieldIndex)

    let i = 0
    while (i < data.length) {
      let spanCount = 1
      const currentRow = data[i]

      // 检查后续行是否可以合并
      for (let j = i + 1; j < data.length; j++) {
        const nextRow = data[j]

        // 检查当前字段是否相同
        if (currentRow[currentField] !== nextRow[currentField]) break

        // 检查所有父级字段是否都相同
        let parentMatch = true
        for (const parentField of parentFields) {
          if (currentRow[parentField] !== nextRow[parentField]) {
            parentMatch = false
            break
          }
        }

        if (!parentMatch) break
        spanCount++
      }

      // 设置合并跨度
      spans[i] = spanCount
      for (let k = i + 1; k < i + spanCount; k++) {
        spans[k] = 0
      }

      i += spanCount
    }
  }

  return spans
}
