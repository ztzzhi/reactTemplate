import { useState } from 'react'
import { Table, Button, Space, Tag, Input } from 'antd'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

interface DataType {
  key: string
  name: string
  age: number
  address: string
  tags: string[]
}

const TableExample = () => {
  const [searchText, setSearchText] = useState('')

  const columns: ColumnsType<DataType> = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) => record.name.toLowerCase().includes(value.toString().toLowerCase()),
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '标签',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: string[]) => (
        <>
          {tags.map((tag) => {
            const color = tag === '管理员' ? 'red' : tag === 'VIP' ? 'gold' : 'blue'
            return (
              <Tag color={color} key={tag}>
                {tag}
              </Tag>
            )
          })}
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

  const data: DataType[] = [
    {
      key: '1',
      name: '张三',
      age: 32,
      address: '北京市朝阳区',
      tags: ['管理员', 'VIP'],
    },
    {
      key: '2',
      name: '李四',
      age: 42,
      address: '上海市浦东新区',
      tags: ['VIP'],
    },
    {
      key: '3',
      name: '王五',
      age: 28,
      address: '广州市天河区',
      tags: ['普通用户'],
    },
    {
      key: '4',
      name: '赵六',
      age: 35,
      address: '深圳市南山区',
      tags: ['VIP'],
    },
  ]

  return (
    <div>
      <h1 style={{ marginBottom: 24 }}>表格示例</h1>

      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="搜索姓名"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />
        <Button type="primary" icon={<PlusOutlined />}>
          新增
        </Button>
      </Space>

      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default TableExample
