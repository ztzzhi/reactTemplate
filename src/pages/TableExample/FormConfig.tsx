import { IItemArray } from '@/components/SearchForm/components/types'

/**
 * 搜索表单配置
 */
export const searchConfig = (): IItemArray[] => {
  return [
    {
      label: '姓名',
      name: 'name',
      type: 'Input',
      placeholder: '请输入姓名',
      config: {
        allowClear: true,
      },
    },
    {
      label: '状态',
      name: 'status',
      type: 'Select',
      placeholder: '请选择状态',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
      config: {
        allowClear: true,
        showSearch: false,
      },
    },
    {
      label: '标签',
      name: 'tags',
      type: 'Select',
      placeholder: '请选择标签',
      options: [
        { label: '管理员', value: '管理员' },
        { label: 'VIP', value: 'VIP' },
        { label: '普通用户', value: '普通用户' },
      ],
      config: {
        mode: 'multiple',
        allowClear: true,
        maxTagCount: 'responsive',
      },
    },
    {
      label: '创建时间',
      name: 'createTimeStart',
      type: 'FixedRangePicker',
      config: {
        showTime: false,
        customFormat: 'YYYY-MM-DD',
      },
    },
  ]
}

export const editFormConfig = (): IItemArray[] => {
  return [
    {
      label: '姓名',
      name: 'name',
      type: 'Input' as const,
      placeholder: '请输入姓名',
      rules: [
        {
          required: true,
          message: '请输入姓名',
        },
      ],
    },
    {
      label: '年龄',
      name: 'age',
      type: 'InputNumber' as const,
      placeholder: '请输入年龄',
      config: {
        min: 1,
        max: 150,
      },
      rules: [
        {
          required: true,
          message: '请输入年龄',
        },
      ],
    },
    {
      label: '地址',
      name: 'address',
      type: 'Input' as const,
      placeholder: '请输入地址',
      rules: [
        {
          required: true,
          message: '请输入地址',
        },
      ],
    },
    {
      label: '邮箱',
      name: 'email',
      type: 'Input' as const,
      placeholder: '请输入邮箱',
      rules: [
        {
          type: 'email',
          message: '请输入正确的邮箱格式',
        },
      ],
    },
    {
      label: '电话',
      name: 'phone',
      type: 'Input' as const,
      placeholder: '请输入电话',
    },
    {
      label: '状态',
      name: 'status',
      type: 'Select' as const,
      placeholder: '请选择状态',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
      rules: [
        {
          required: true,
          message: '请选择状态',
        },
      ],
    },
  ]
}
