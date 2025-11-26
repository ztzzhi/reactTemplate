/**
 * @function 封装了常用的AntDesignForm与AntDesignTable联动逻辑
 * 入参
 * @param  networkRequest        网络请求
 * @param  extraParams           扩展参数
 * -------------------------------------------------------------*
 * 返参
 * @param  tableProps            table所需参数直接透传Table组件即可
 * @param  params                参数列表
 * @param  search                查询方法
 * @param  reset                 重置方法
 * @param  reload                刷新方法
 */

import { FormInstance } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
type IDefaultParams = Record<string, any>
interface IUseGetDataReturn<T> {
  tableProps: ITableProps<T>
  params: IDefaultParams
  setParams: React.Dispatch<React.SetStateAction<Record<string, any>>>
  search: () => void
  reset: (otherParams?: Record<string, any>) => void
  reload: (extraParams?: Record<string, any>) => void
}
interface ITableProps<T> {
  dataSource: T[]
  loading: boolean
}
interface IExtraParams {
  form: FormInstance
  pageSize?: 1 | 5 | 10 | 30 | 100 | 500 | 999 //取至CustomTable的配置
  defaultFieldsParams?: IDefaultParams //表单初始值
  defaultParams?: IDefaultParams //固定参数每次请求都会有的参数
  immediatelySend?: boolean //立刻触发请求，默认开始，如果关闭了使用search方法进行手动触发
  paramsCallback?: (params: Record<string, any>) => Record<string, any>
}
const useGetTableData = <T>(
  networkRequest: (...set: any) => Promise<IResponseData<T>>,
  extraParams?: IExtraParams,
): IUseGetDataReturn<T> => {
  // 会打印三次 第一次是onChange触发setParams 第二次是setTableProps改变loading为true 第三次是setTableProps获取到数据并且loading为false
  // 后端接口名称需要同步！！！
  // 不建议使用时读取params的其他参数，可以读取current和size参数，其他参数不建议，防止参数不同步，必须读取时可使用form.getFieldValues
  const [params, setParams] = React.useState<Record<string, any>>({
    ...extraParams?.defaultParams,
    ...extraParams?.defaultFieldsParams,
  })
  const [tableProps, setTableProps] = useState<ITableProps<T>>({
    dataSource: [],
    loading: extraParams?.immediatelySend !== false,
  })
  const sendRequest = React.useCallback(async () => {
    setTableProps((prev) => ({ ...prev, loading: true }))
    try {
      const res = await networkRequest(params)
      if (res?.code === 200) {
        updateTableProps(res)
      } else {
        updateTableProps()
      }
    } catch (err) {
      updateTableProps()
    }
  }, [networkRequest, params])
  const search = () => {
    // search不改变pageSize
    const paramsData = { ...params, ...extraParams?.defaultParams, ...extraParams?.form?.getFieldsValue() }
    // 过滤掉参数为 【null】 【''】 【undefined】 【空数组】 的参数
    const filteredEntries = Object.entries(paramsData).filter(
      ([key, value]) =>
        key && value !== '' && value !== null && value !== undefined && !(Array.isArray(value) && value.length === 0),
    )
    const filterData = Object.fromEntries(filteredEntries) as Record<string, any>
    const handledParams = extraParams?.paramsCallback ? extraParams.paramsCallback(filterData) : filterData
    const filteredEntriesSec = Object.entries(handledParams).filter(
      ([key, value]) =>
        key && value !== '' && value !== null && value !== undefined && !(Array.isArray(value) && value.length === 0),
    )
    const filterDataSec = Object.fromEntries(filteredEntriesSec) as Record<string, any>
    setParams(filterDataSec)
  }
  const reload = (reloadParams?: Record<string, any>) => {
    if (reloadParams == undefined) {
      sendRequest()
    } else {
      // 过滤掉参数为 【null】 【''】 【undefined】 【空数组】 的参数
      const filteredEntries = Object.entries(reloadParams || {}).filter(
        ([key, value]) =>
          key && value !== '' && value !== null && value !== undefined && !(Array.isArray(value) && value.length === 0),
      )
      const filterData = Object.fromEntries(filteredEntries) as Record<string, any>
      const handledParams = extraParams?.paramsCallback ? extraParams.paramsCallback(filterData) : filterData
      const filteredEntriesSec = Object.entries(handledParams).filter(
        ([key, value]) =>
          key && value !== '' && value !== null && value !== undefined && !(Array.isArray(value) && value.length === 0),
      )
      const filterDataSec = Object.fromEntries(filteredEntriesSec) as Record<string, any>
      setParams({ ...filterDataSec })
    }
  }
  const reset = (otherParams?: Record<string, any>) => {
    // reset改变pageSize所以使用initParams
    extraParams?.form.resetFields()
    extraParams?.form?.setFieldsValue({ ...extraParams?.defaultFieldsParams, ...otherParams })
    const paramsData = {
      ...extraParams?.defaultParams,
      ...extraParams?.defaultFieldsParams,
      ...otherParams,
    }
    const handledParams = extraParams?.paramsCallback ? extraParams.paramsCallback(paramsData) : paramsData
    // 过滤掉参数为 【null】 【''】 【undefined】 【空数组】 的参数
    const filteredEntries = Object.entries(handledParams).filter(
      ([key, value]) =>
        key && value !== '' && value !== null && value !== undefined && !(Array.isArray(value) && value.length === 0),
    )
    const filterData = Object.fromEntries(filteredEntries) as Record<string, any>
    setParams(filterData)
  }
  useUpdateEffect(() => {
    // console.log(
    //   `%c ${JSON.stringify(params)} %c RequestPayload `,
    //   'padding: 2px 1px; border-radius: 2px 0 0 2px; color: #fff; background: #5584ff; font-weight: bold;',
    //   'padding: 2px 1px; border-radius: 0 2px 2px 0; color: #fff; background: #42c02e; font-weight: bold;',
    // )
    sendRequest()
  }, [params])
  useEffect(() => {
    if (Object.keys(extraParams?.defaultFieldsParams || {}).length > 0) {
      extraParams?.form?.setFieldsValue(extraParams.defaultFieldsParams)
    }
    if (extraParams?.immediatelySend === false) return
    sendRequest()
  }, [])
  // 只需要更新时执行
  function useUpdateEffect(effect: () => void, dependencies: any[]) {
    const isFirstRender = useRef(true)
    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false
      } else {
        effect()
      }
    }, dependencies)
  }
  const updateTableProps = (res?: IResponseData<T>) => {
    setTableProps((prev) => ({
      ...prev,
      loading: false,
      dataSource: res?.data || [],
    }))
  }
  const returnObject: IUseGetDataReturn<T> = React.useMemo(
    () => ({
      tableProps,
      params,
      setParams,
      search,
      reset,
      reload,
    }),
    [params, tableProps],
  )
  return returnObject
}
export default useGetTableData
