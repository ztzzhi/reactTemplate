import { TableColumnsType, Tag, Space, Tooltip, Popconfirm } from 'antd'
import { UserData } from './types'
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import PermissionLink from '@/components/PermissionLink'

// 状态映射
const STATUS_MAP: Record<number, { text: string; color: string }> = {
  1: { text: '启用', color: 'success' },
  0: { text: '禁用', color: 'error' },
}

// 标签颜色映射
const TAG_COLOR_MAP: Record<string, string> = {
  管理员: 'red',
  VIP: 'gold',
  普通用户: 'blue',
}

export const useTableColumns = ({
  onEdit,
  onDelete,
  onView,
  onStatusChange,
}: {
  onEdit: (record: UserData) => void
  onDelete: (record: UserData) => void
  onView: (record: UserData) => void
  onStatusChange: (record: UserData, status: number) => void
}): TableColumnsType<UserData> => {
  return [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 120,
      fixed: 'left',
      render: (text) => text || '-',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 100,
      render: (text) => text || '-',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      width: 200,
      ellipsis: {
        showTitle: false,
      },
      render: (text) =>
        text ? (
          <Tooltip title={text} placement="topLeft">
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{text}</div>
          </Tooltip>
        ) : (
          '-'
        ),
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 180,
      ellipsis: {
        showTitle: false,
      },
      render: (text) =>
        text ? (
          <Tooltip title={text} placement="topLeft">
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{text}</div>
          </Tooltip>
        ) : (
          '-'
        ),
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
      render: (text) => text || '-',
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      width: 200,
      render: (tags: string[]) => {
        if (!tags || tags.length === 0) return '-'
        return (
          <Space size="small" wrap>
            {tags.map((tag) => (
              <Tag color={TAG_COLOR_MAP[tag] || 'default'} key={tag}>
                {tag}
              </Tag>
            ))}
          </Space>
        )
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: number) => {
        const statusInfo = STATUS_MAP[status] || { text: '未知', color: 'default' }
        return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180,
      render: (text) => text || '-',
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 200,
      render: (_, record) => {
        return (
          <Space size="small">
            <PermissionLink
              permission="examples:table:viewinfo"
              onClick={() => onView(record)}
              style={{ fontSize: '16px' }}
            >
              查看
            </PermissionLink>
            <PermissionLink
              permission="examples:table:edit"
              onClick={() => onEdit(record)}
              style={{ fontSize: '16px' }}
            >
              编辑
            </PermissionLink>
            <Popconfirm
              title="确定要删除这条记录吗？"
              onConfirm={() => onDelete(record)}
              okText="确定"
              cancelText="取消"
            >
              <PermissionLink permission="examples:table:delete" style={{ fontSize: '16px', color: '#ff4d4f' }}>
                删除
              </PermissionLink>
            </Popconfirm>
            <Popconfirm
              title={`确定要${record.status === 1 ? '禁用' : '启用'}这条记录吗？`}
              onConfirm={() => onStatusChange(record, record.status === 1 ? 0 : 1)}
              okText="确定"
              cancelText="取消"
            >
              <PermissionLink permission="examples:table:status" style={{ fontSize: '16px' }}>
                {record.status === 1 ? '禁用' : '启用'}
              </PermissionLink>
            </Popconfirm>
          </Space>
        )
      },
    },
  ]
}
