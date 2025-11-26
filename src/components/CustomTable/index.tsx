import { Table, Pagination } from 'antd'
import { TableRowSelection } from 'antd/es/table/interface'
import { useEffect, useMemo, useState } from 'react'
import type { TableProps } from 'antd/es/table'
interface CustomTableProps extends TableProps {
  stripe?: boolean
  isAutoScrollY?: boolean
  className?: string
  pageSizeOptions?: number[]
  extraHeight?: number
  searchFormClassName?: string
  tableRowGray?: (record?: any) => string
}
export default function CustomTable(props: CustomTableProps) {
  const { rowSelection, isAutoScrollY, stripe, scroll, pagination, tableRowGray, ...reset } = props
  const [ClientHeight, setClientHeight] = useState(0)
  const [innerHeight, setinnerHeight] = useState(window.innerHeight)
  const mergedRowSelection = useMemo(() => {
    return {
      preserveSelectedRowKeys: rowSelection?.preserveSelectedRowKeys !== false,
      fixed: 'left',
      ...rowSelection,
    }
  }, [rowSelection])
  useEffect(() => {
    const reCalcHeight = () => {
      setinnerHeight(window.innerHeight)
    }
    window.addEventListener('resize', reCalcHeight)
    const SearchForm = props?.searchFormClassName
      ? document.querySelector('.' + props?.searchFormClassName)
      : document.querySelector('.custom_search_form_wrap')
    const resizeObserver = new ResizeObserver((entries) => {
      entries[0].target.clientHeight ? setClientHeight(entries[0].target.clientHeight) : setClientHeight(0)
    })
    if (SearchForm) {
      resizeObserver.observe(SearchForm)
    } else {
      setClientHeight(0)
    }
    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', reCalcHeight)
    }
  }, [])
  const getTableHeight = (innerHeight: number) => {
    return innerHeight - 190 - ClientHeight - (props?.extraHeight || 0)
  }
  return (
    <div className={`custom_table_wrap${props?.className ? ' ' + props.className : ''}`}>
      <Table
        {...reset}
        size={props?.size || 'small'}
        className="custom_table_main"
        scroll={{
          x: scroll?.x ?? window.innerWidth - 230 - 80,
          y: isAutoScrollY != false ? `${getTableHeight(innerHeight)}px` : scroll?.y ? scroll?.y : '100%',
        }}
        pagination={false}
        rowHoverable={false}
        // rowClassName={(record, index) => {
        //   return tableRowGray && typeof tableRowGray === 'function'
        //     ? tableRowGray(record)
        //     : stripe != false
        //       ? index % 2 === 0
        //         ? ''
        //         : 'custom_table_stripe'
        //       : ''
        // }}
        bordered={props?.bordered !== false}
        rowSelection={rowSelection ? (mergedRowSelection as TableRowSelection<any>) : undefined}
      />
      {pagination && (
        <Pagination
          showSizeChanger={true}
          showTitle={true}
          showTotal={(total) => `共 ${total} 条`}
          style={{ textAlign: 'center', marginTop: 12 }}
          pageSizeOptions={props?.pageSizeOptions || [10, 30, 100]}
          {...pagination}
        />
      )}
    </div>
  )
}
