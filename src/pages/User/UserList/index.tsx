import { Table, Button, Space, Tag } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

interface UserType {
  key: string
  id: string
  name: string
  email: string
  role: string
  status: string
}

const UserList = () => {
  const columns: ColumnsType<UserType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => {
        const color = role === 'admin' ? 'red' : 'blue'
        return <Tag color={color}>{role === 'admin' ? '管理员' : '普通用户'}</Tag>
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color = status === 'active' ? 'green' : 'default'
        return <Tag color={color}>{status === 'active' ? '激活' : '禁用'}</Tag>
      },
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" size="small">
            编辑
          </Button>
          <Button type="link" size="small" danger>
            删除
          </Button>
        </Space>
      ),
    },
  ]

  const data: UserType[] = [
    {
      key: '1',
      id: '001',
      name: '张三',
      email: 'zhangsan@example.com',
      role: 'admin',
      status: 'active',
    },
    {
      key: '2',
      id: '002',
      name: '李四',
      email: 'lisi@example.com',
      role: 'user',
      status: 'active',
    },
    {
      key: '3',
      id: '003',
      name: '王五',
      email: 'wangwu@example.com',
      role: 'user',
      status: 'inactive',
    },
  ]

  return (
    <div>
      <h1 style={{ marginBottom: 24 }}>用户列表</h1>

      <Button type="primary" icon={<PlusOutlined />} style={{ marginBottom: 16 }}>
        新增用户
      </Button>

      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default UserList
