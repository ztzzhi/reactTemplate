import { Form, FormInstance } from 'antd'
import { useState } from 'react'

export interface UseModalOptions<T = any> {
  // 表单提交成功后的回调
  onSuccess?: (response?: T) => void
  // 表单提交失败后的回调
  onFail?: (response?: T) => void
  // 是否自动关闭modal
  autoClose?: boolean
  // 是否自动重置表单
  autoResetForm?: boolean
  // 成功后是否自动刷新页面数据
  autoReload?: boolean
  // 重新刷新页面数据
  onReload?: () => void
  // 自定义关闭modal的回调
  onCancel?: () => void
}

export interface UseModalResult<T = any> {
  // modal显示状态
  open: boolean
  // 打开modal
  openModal: (record?: T) => void
  // 关闭modal
  closeModal: () => void
  // 提交loading状态
  confirmLoading: boolean
  // 当前编辑的记录
  currentRecord: T | undefined
  // 处理提交请求的方法
  handleSubmit: (apiRequest: (values: any) => Promise<any>) => void
  // Form实例
  form: FormInstance
}

const useModal = <T = any,>(options?: UseModalOptions<T>): UseModalResult<T> => {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [currentRecord, setCurrentRecord] = useState<T>()
  const { onSuccess, onFail, autoClose = true, autoResetForm = true, autoReload = true, onCancel } = options || {}
  const openModal = (record?: T) => {
    setOpen(true)
    setCurrentRecord(record)
    if (record) {
      form.setFieldsValue(record)
    }
  }
  const closeModal = () => {
    setOpen(false)
    setCurrentRecord(undefined)
    onCancel?.()
    if (autoResetForm) {
      form.resetFields()
    }
  }
  const handleSubmit = async (apiRequest: (values: any) => Promise<any>) => {
    try {
      const values = await form.validateFields()
      setConfirmLoading(true)
      const response = await apiRequest({
        ...values,
      })
      if (response?.code === 200) {
        onSuccess?.(response)
        closeModal()
      } else {
        // 这里捕获的是820000 820001的错误
        onFail?.(response)
      }
      if (autoClose) {
        closeModal()
      }
      if (autoReload) {
        // 如果父组件传入了reload方法，则调用
        options?.onReload?.()
      }
    } catch (error) {
      console.error('Form validation or submission failed:', error)
      onFail?.()
    } finally {
      setConfirmLoading(false)
    }
  }

  return {
    open,
    openModal,
    closeModal,
    confirmLoading,
    currentRecord,
    handleSubmit,
    form,
  }
}

export default useModal
