import React from 'react'
import { DatePicker } from 'antd'
import type { RangePickerProps } from 'antd/es/date-picker'
import dayjs, { Dayjs } from 'dayjs'
type RangeValue = [Dayjs | null, Dayjs | null]
interface FixedRangePickerProps extends Omit<RangePickerProps, 'onChange' | 'value' | 'defaultValue'> {
  defaultValue?: string[] | RangeValue
  value?: string[] | RangeValue
  onChange?: (dateStrings: string[] | null) => void
  customFormat?: string
}
const FixedRangePicker: React.FC<FixedRangePickerProps> = ({
  defaultValue,
  value,
  onChange,
  customFormat,
  ...restProps
}) => {
  const getDayjsValue = (val: string[] | RangeValue | undefined): RangeValue | undefined => {
    if (!val || val.length === 0) return undefined
    return Array.isArray(val) && val.length === 2
      ? [val[0] ? dayjs(val[0]) : null, val[1] ? dayjs(val[1]) : null]
      : undefined
  }
  const handleChange: RangePickerProps['onChange'] = (dates) => {
    if (onChange) {
      if (!dates) {
        onChange(null)
        return
      }
      const format = customFormat || 'YYYY-MM-DD HH:mm:ss'
      const [startDate, endDate] = dates
      const start = startDate ? startDate.format(format) : ''
      const end = endDate ? endDate.format(format) : ''
      if (start && end) {
        onChange([start, end])
      } else {
        onChange(null)
      }
    }
  }

  return (
    <DatePicker.RangePicker
      {...restProps}
      defaultValue={getDayjsValue(defaultValue)}
      value={getDayjsValue(value)}
      onChange={handleChange}
    />
  )
}

export default FixedRangePicker
