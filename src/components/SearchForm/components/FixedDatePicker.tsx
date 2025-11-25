import React from 'react'
import { DatePicker, DatePickerProps } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
// 定义 props 接口，确保类型安全
interface FixedDatePickerProps extends Omit<DatePickerProps, 'onChange' | 'value' | 'defaultValue'> {
  defaultValue?: string | Dayjs
  value?: string | Dayjs
  onChange?: (dateString: string | null) => void
  customFormat?: string
}
const FixedDatePicker: React.FC<FixedDatePickerProps> = ({
  defaultValue,
  value,
  onChange,
  customFormat,
  ...restProps
}) => {
  // 如果传入的是字符串，则将其转换为 dayjs 对象；否则保持原样
  const getDayjsValue = (val: string | Dayjs | undefined): Dayjs | undefined => {
    if (!val) return undefined
    return typeof val === 'string' ? dayjs(val) : val
  }
  const handleChange = (date: Dayjs | null) => {
    if (onChange) {
      if (!date) {
        onChange(null)
        return
      }
      const formattedDate = customFormat ? dayjs(date).format(customFormat) : dayjs(date).format('YYYY-MM-DD HH:mm:ss')
      return onChange(formattedDate)
    }
  }
  return (
    <DatePicker
      {...restProps}
      defaultValue={getDayjsValue(defaultValue)}
      value={getDayjsValue(value)}
      onChange={handleChange}
    />
  )
}

export default FixedDatePicker
