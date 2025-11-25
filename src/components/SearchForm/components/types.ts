import { FormInstance } from 'antd'
import { Gutter } from 'antd/es/grid/row'
import { CSSProperties } from 'react'
export interface IItemArray {
  name?: string
  label: string | number
  type: IType
  options?: IOption[]
  config?: any
  valuePropName?: string //比如switch使用的是checked而不是value控制的状态 这时我们可以通过valuePropName把状态绑定到对应的属性上
  checked?: boolean
  rules?: any
  placeholder?: string
  tooltip?: string
  format?: string
  content?: React.ReactNode
  hidden?: boolean
  warning_flag?: boolean
  [k: string]: any
}
export interface IOption {
  label: string | number
  value: string | number
  disabled?: boolean
}
export interface ISearchProps {
  form: FormInstance
  searchConfig: IItemArray[]
  onFinish: (value: any) => void
  onReset: () => void
  style?: CSSProperties
  className?: string
  initialValues?: object
  loading?: boolean
  onValuesChange?: (...set: any) => void
  extra?: string | React.ReactNode
  isFold?: boolean
}

export interface IEditProps {
  form: FormInstance
  editConfig: IItemArray[]
  isNotModal?: boolean //是否用于modal中 在modal中自动居中 不在modal中会页面靠左
  footer?: string | React.ReactNode
  initialValues?: object
  className?: string
  gutter?: Gutter | [Gutter, Gutter]
  onValuesChange?: (...set: any) => void
  header?: React.ReactNode
  children?: React.ReactNode
}
export type IType =
  | 'Custom'
  | 'Input'
  | 'TreeSelect'
  | 'Search'
  | 'Password'
  | 'TextArea'
  | 'Upload'
  | 'InputNumber'
  | 'Select'
  | 'Switch'
  | 'DatePicker'
  | 'RangePicker'
  | 'Cascader'
  | 'Radio'
  | 'Transfer'
  | 'AutoComplete'
  | 'Checkbox'
  | 'UploadFile'
  | 'FixedRangePicker'
  | 'FixedDatePicker'

export type ITimeoutType = ReturnType<typeof setTimeout> | null
