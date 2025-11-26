import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useForm } from 'antd/es/form/Form'
import { message, Modal } from 'antd'
import { PlusOutlined, ExportOutlined } from '@ant-design/icons'
import PageContainer from '@/components/PageContainer'
import { SearchForm } from '@/components/SearchForm/components'
import CustomTable from '@/components/CustomTable'
import PermissionButton from '@/components/PermissionButton'
import useGetTableData from '@/hooks/useGetTableData'
import useCachePage from '@/hooks/useCachePage'
import useModalForm from '@/hooks/useModalForm'
import { searchConfig, editFormConfig } from './FormConfig'
import { useTableColumns } from './TableColumns'
import { getUserList, deleteUser, updateUserStatus } from './api'
import { UserData } from './types'
import './index.less'

const TableExample: React.FC = () => {
  const [form] = useForm()
  const { setCachePage, getCachePage } = useCachePage()
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])

  // 使用useGetTableData hook
  const { tableProps, params, search, reset, reload } = useGetTableData<UserData>(getUserList, {
    form: form,
    immediatelySend: false,
    cachePageCallback: (current, size, prevSize) => {
      const cacheData = getCachePage()
      setCachePage({
        ...cacheData,
        current: prevSize === size ? current : 1,
        size,
      })
    },
    paramsCallback: (requestParams) => {
      const { createTimeStart, ...restParams } = requestParams
      return {
        ...restParams,
        createTimeEnd: createTimeStart && createTimeStart.length === 2 ? createTimeStart[1] : undefined,
        createTimeStart: createTimeStart && createTimeStart.length === 2 ? createTimeStart[0] : undefined,
      }
    },
  })

  // 缓存配置，避免每次渲染都创建新对象
  const editConfig = useMemo(() => editFormConfig(), [])
  const searchConfigMemo = useMemo(() => searchConfig(), [])

  // 初始化 - 处理缓存数据
  const handleCacheData = async () => {
    const cacheData = getCachePage()
    if (cacheData == null) {
      await form.validateFields()
      search()
      setCachePage({ ...params })
    } else {
      const { ...resetCacheData } = cacheData
      // 先重置表单再设置缓存
      form.resetFields()
      form.setFieldsValue({
        ...resetCacheData,
      })
      reload({ ...resetCacheData })
    }
  }

  useEffect(() => {
    handleCacheData()
  }, [])

  // 表单配置

  // 编辑/新增Modal - 使用新的 useModalForm
  const EditModal = useModalForm<UserData>({
    title: (record) => (record ? '编辑用户' : '新增用户'),
    width: 800,
    column: 2,
    formConfig: editConfig,
    onSubmit: async (_values) => {
      // 这里写实际的保存请求，返回Promise
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            code: 200,
            msg: '保存成功',
          })
        }, 500)
      })
    },
    onSuccess: () => {
      message.success('操作成功')
      reload()
    },
    onFail: () => {
      message.error('操作失败')
    },
    onReload: () => {
      reload()
    },
  })

  // 查看
  const handleView = (record: UserData) => {
    Modal.info({
      title: '用户详情',
      width: 600,
      content: (
        <div style={{ marginTop: 16 }}>
          <p>
            <strong>姓名：</strong>
            {record.name}
          </p>
          <p>
            <strong>年龄：</strong>
            {record.age}
          </p>
          <p>
            <strong>地址：</strong>
            {record.address}
          </p>
          <p>
            <strong>邮箱：</strong>
            {record.email || '-'}
          </p>
          <p>
            <strong>电话：</strong>
            {record.phone || '-'}
          </p>
          <p>
            <strong>标签：</strong>
            {record.tags.join(', ')}
          </p>
          <p>
            <strong>状态：</strong>
            {record.status === 1 ? '启用' : '禁用'}
          </p>
          <p>
            <strong>创建时间：</strong>
            {record.createTime || '-'}
          </p>
        </div>
      ),
    })
  }

  // 编辑
  const handleEdit = (record: UserData) => {
    EditModal.openModal(record)
  }

  // 删除
  const handleDelete = async (record: UserData) => {
    try {
      const response = await deleteUser(record.id)
      if (response.code === 200) {
        message.success('删除成功')
        reload()
      } else {
        message.error(response.msg || '删除失败')
      }
    } catch (error) {
      console.error('删除失败:', error)
      message.error('删除失败')
    }
  }

  // 状态变更
  const handleStatusChange = async (record: UserData, newStatus: number) => {
    try {
      const response = await updateUserStatus(record.id, newStatus)
      if (response.code === 200) {
        message.success('操作成功')
        reload()
      } else {
        message.error(response.msg || '操作失败')
      }
    } catch (error) {
      console.error('操作失败:', error)
      message.error('操作失败')
    }
  }

  // 批量删除
  const handleBatchDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择要删除的记录')
      return
    }
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除选中的 ${selectedRowKeys.length} 条记录吗？`,
      onOk: async () => {
        try {
          // 模拟批量删除
          await Promise.all(selectedRowKeys.map((id) => deleteUser(id)))
          message.success('批量删除成功')
          setSelectedRowKeys([])
          reload()
        } catch (error) {
          console.error('批量删除失败:', error)
          message.error('批量删除失败')
        }
      },
    })
  }

  // 导出
  const handleExport = () => {
    message.info('导出功能开发中...')
    // 这里可以实现导出逻辑
  }

  // 新增
  const handleAdd = () => {
    EditModal.openModal()
  }

  const columns = useTableColumns({
    onView: handleView,
    onEdit: handleEdit,
    onDelete: handleDelete,
    onStatusChange: handleStatusChange,
  })

  return (
    <PageContainer className="table_example_wrap">
      <SearchForm
        loading={tableProps.loading}
        form={form}
        searchConfig={searchConfigMemo}
        onFinish={async () => {
          setCachePage({
            ...form.getFieldsValue(),
            current: 1,
            size: params.size,
          })
          search()
        }}
        onReset={() => {
          reset()
          setCachePage({
            current: 1,
            size: 10,
          })
        }}
        extra={
          <div className="table_extra_flex_wrapbox">
            <div className="table_extra_flex">
              <PermissionButton
                permission="examples:table:create"
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAdd}
              >
                新增用户
              </PermissionButton>
              {selectedRowKeys.length > 0 && (
                <PermissionButton permission="examples:table:batchDelete" danger onClick={handleBatchDelete}>
                  批量删除 ({selectedRowKeys.length})
                </PermissionButton>
              )}
            </div>
            <div className="table_extra_flex">
              <PermissionButton permission="examples:table:export" icon={<ExportOutlined />} onClick={handleExport}>
                导出
              </PermissionButton>
            </div>
          </div>
        }
      />
      <CustomTable
        stripe
        isAutoScrollY
        {...tableProps}
        columns={columns as any}
        rowKey={(record) => record.id}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys) => {
            setSelectedRowKeys(keys as string[])
          },
        }}
      />
      {/* 编辑/新增Modal*/}
      {EditModal.ModalForm}
    </PageContainer>
  )
}

export default TableExample
