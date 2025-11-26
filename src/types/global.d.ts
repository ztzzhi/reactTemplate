import { FormInstance } from 'antd'
import type { MenuProps } from 'antd'
import React from 'react'
declare global {
  declare interface Window {
    DTFrameLogin: (
      frameParams: IDTLoginFrameParams, // DOM包裹容器相关参数
      loginParams: IDTLoginLoginParams, // 统一登录参数
      successCbk: (result: IDTLoginSuccess) => void, // 登录成功后的回调函数
      errorCbk?: (errorMsg: string) => void, // 登录失败后的回调函数
    ) => void
  }
  declare interface ViteEnv {
    VITE_API_URL: string
    VITE_PORT: number
    VITE_OPEN: boolean
    VITE_GLOB_APP_TITLE: string
    VITE_DROP_CONSOLE: boolean
    VITE_PROXY_URL: string
    VITE_BUILD_GZIP: boolean
    VITE_REPORT: boolean
  }
  declare interface SearchFormProps<T> {
    onFinish: (val: T) => void
    onReset: () => void
    form: FormInstance
  }

  declare type ISearchType =
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

  declare interface IItemArray {
    name?: string
    label: string | number | React.ReactNode
    type: ISearchType
    option?: IOption[]
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
  declare interface IResponseList<T> {
    code: number
    data: { list: T[]; page: number; total: number; msg: string }
    msg: string
    failInfo?: string
  }

  declare interface IResponseData<T> {
    code: number
    data: T[]
    msg: string
    failInfo?: string
  }

  declare interface IResponsePost<T> {
    code: number
    data: null | Reacod<string, string>
    msg: string
    failInfo?: string
  }
  declare interface IResponseDetail<T> {
    code: number
    data: T
    msg: string
  }
  declare interface IRoutesType {
    parentId: number | string
    id: string | number
    applicationId: string | number
    parentId: string | number
    name: string
    path: string
    resourcePath?: string
    icon: string
    type: 'MENU' | 'ROUTE' | 'FUNCTION'
    children: IRoutesType[] | null
    sorted: number
    fullPath: string
    function: IRoutesFunctionType[]
  }

  declare interface IRoutesFunctionType {
    interfaceUrl: string
    name: string
    type: 'FUNCTION'
    id: string | number
    parentId: number | string
  }
  declare interface IMenuType {
    label: string
    key: string
    icon: any
    children?: IMenuType[] | null
    onClick?: () => void
  }
  declare interface IOptionItem {
    label: string
    value: string | number
  }
  declare type ITimeoutType = ReturnType<typeof setTimeout> | null

  declare type IDesListType = {
    label: string | React.ReactNode
    key: string
    content: string | React.ReactNode
    format?: (info: any) => any
    hidden?: boolean
    showKey?: string
    isShowForm?: boolean
    formContent?: string | React.ReactNode
  }[]

  declare type IDICTDATAType = { [key: string]: IOptionItem[] }

  declare type IGoodsTemplateType = null | {
    notRequired: string[]
    notShow: string[]
    required: string[]
  }
}
