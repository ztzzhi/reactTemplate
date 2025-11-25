import { Table, Button, Space, Tag } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

interface RoleType {
  key: string
  id: string
  name: string
  description: string
  permissions: string[]
}

const RoleManagement = () => {
  const columns: ColumnsType<RoleType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '权限',
      dataIndex: 'permissions',
      key: 'permissions',
      render: (permissions: string[]) => (
        <>
          {permissions.map((permission) => (
            <Tag key={permission}>{permission}</Tag>
          ))}
        </>
      ),
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

  const data: RoleType[] = [
    {
      key: '1',
      id: '001',
      name: '管理员',
      description: '系统管理员，拥有所有权限',
      permissions: ['用户管理', '角色管理', '系统设置'],
    },
    {
      key: '2',
      id: '002',
      name: '普通用户',
      description: '普通用户，拥有基本权限',
      permissions: ['查看数据'],
    },
  ]

  return (
    <div>
      <h1 style={{ marginBottom: 24 }}>角色管理</h1>

      <Button type="primary" icon={<PlusOutlined />} style={{ marginBottom: 16 }}>
        新增角色
      </Button>

      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default RoleManagement
