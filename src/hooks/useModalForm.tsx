import { Form, FormInstance, Modal, Space, Button, ModalProps } from 'antd'
import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { EditFormInline } from '@/components/SearchForm/components'
import { IItemArray } from '@/components/SearchForm/components/types'

export interface UseModalFormOptions<T = any> {
  // 表单提交成功后的回调
  onSuccess?: (response?: T, values?: any) => void
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
  // Modal 的标题（可以是函数，根据是否有记录返回不同标题）
  title?: string | ((record?: T) => string)
  // Modal 的宽度
  width?: number | string
  // 表单配置项
  formConfig: IItemArray[]
  // 提交请求的方法
  onSubmit?: (values: any, record?: T) => Promise<any>
  // Modal 的其他属性
  modalProps?: Omit<ModalProps, 'open' | 'onCancel' | 'title' | 'width' | 'footer'>
  // 是否显示取消按钮
  showCancel?: boolean
  // 是否显示确定按钮
  showOk?: boolean
  // 确定按钮文本
  okText?: string
  // 取消按钮文本
  cancelText?: string
  // 表单列数
  column?: number
}

export interface UseModalFormResult<T = any> {
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
  // Form实例
  form: FormInstance
  // 渲染 Modal 组件（可以直接放到 JSX 中）
  ModalForm: React.ReactElement
}

const useModalForm = <T = any,>(options: UseModalFormOptions<T>): UseModalFormResult<T> => {
  const {
    onSuccess,
    onFail,
    autoClose = true,
    autoResetForm = true,
    autoReload = true,
    onCancel,
    title = '编辑',
    width = 600,
    formConfig,
    onSubmit,
    modalProps,
    showCancel = true,
    showOk = true,
    okText = '确定',
    cancelText = '取消',
    onReload,
    column = 2,
  } = options

  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [currentRecord, setCurrentRecord] = useState<T>()

  // 使用 ref 存储配置，避免因配置对象变化导致重新渲染
  const configRef = useRef({ formConfig, modalProps, column })
  useEffect(() => {
    configRef.current = { formConfig, modalProps, column }
  }, [formConfig, modalProps, column])

  const closeModal = useCallback(() => {
    setOpen(false)
    setCurrentRecord(undefined)
    onCancel?.()
    if (autoResetForm) {
      form.resetFields()
    }
  }, [autoResetForm, form, onCancel])

  const openModal = useCallback(
    (record?: T) => {
      setOpen(true)
      setCurrentRecord(record)
      if (record) {
        form.setFieldsValue(record)
      } else {
        form.resetFields()
      }
    },
    [form],
  )

  const handleSubmit = useCallback(async () => {
    if (!onSubmit) {
      console.warn('useModalForm: onSubmit is required')
      return
    }
    try {
      const values = await form.validateFields()
      setConfirmLoading(true)
      const response = await onSubmit(values, currentRecord)
      if (response?.code === 200) {
        onSuccess?.(response, values)
        if (autoClose) {
          closeModal()
        }
        if (autoReload) {
          onReload?.()
        }
      } else {
        onFail?.(response)
      }
    } catch (error) {
      console.error('Form validation or submission failed:', error)
      onFail?.()
    } finally {
      setConfirmLoading(false)
    }
  }, [onSubmit, form, currentRecord, onSuccess, autoClose, closeModal, autoReload, onReload, onFail])

  // 计算 Modal 标题
  const modalTitle = useMemo(() => {
    if (typeof title === 'function') {
      return title(currentRecord)
    }
    return title
  }, [title, currentRecord])

  // Modal 组件 - 直接返回 JSX，使用 ref 避免因配置变化导致重新创建
  const ModalForm = useMemo(
    () => (
      <Modal
        title={modalTitle}
        open={open}
        onCancel={closeModal}
        width={width}
        footer={
          <Space>
            {showCancel && (
              <Button onClick={closeModal} disabled={confirmLoading}>
                {cancelText}
              </Button>
            )}
            {showOk && (
              <Button type="primary" onClick={handleSubmit} loading={confirmLoading}>
                {okText}
              </Button>
            )}
          </Space>
        }
        {...configRef.current.modalProps}
      >
        <EditFormInline form={form} editConfig={configRef.current.formConfig} column={configRef.current.column} />
      </Modal>
    ),
    [modalTitle, open, closeModal, width, showCancel, showOk, cancelText, okText, confirmLoading, handleSubmit, form],
  )

  return {
    open,
    openModal,
    closeModal,
    confirmLoading,
    currentRecord,
    form,
    ModalForm,
  }
}

export default useModalForm
