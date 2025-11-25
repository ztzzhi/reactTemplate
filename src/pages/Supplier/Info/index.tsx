import { Card, Table, Button, Space, Tag, Input, Rate } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { useState } from 'react'
import type { ColumnsType } from 'antd/es/table'

interface SupplierData {
  key: string
  supplierNo: string
  supplierName: string
  contact: string
  phone: string
  rating: number
  status: 'active' | 'inactive' | 'blacklist'
  createTime: string
}

const SupplierList = () => {
  const [searchText, setSearchText] = useState('')

  const statusMap = {
    active: { text: '正常', color: 'success' },
    inactive: { text: '停用', color: 'default' },
    blacklist: { text: '黑名单', color: 'error' },
  }

  const mockData: SupplierData[] = [
    {
      key: '1',
      supplierNo: 'SUP001',
      supplierName: '北京办公用品有限公司',
      contact: '张三',
      phone: '13800138000',
      rating: 4.5,
      status: 'active',
      createTime: '2023-06-15',
    },
    {
      key: '2',
      supplierNo: 'SUP002',
      supplierName: '联想科技有限公司',
      contact: '李四',
      phone: '13900139000',
      rating: 5,
      status: 'active',
      createTime: '2023-08-20',
    },
    {
      key: '3',
      supplierNo: 'SUP003',
      supplierName: '宜家家居',
      contact: '王五',
      phone: '13700137000',
      rating: 4,
      status: 'inactive',
      createTime: '2023-10-10',
    },
  ]

  const columns: ColumnsType<SupplierData> = [
    {
      title: '供应商编号',
      dataIndex: 'supplierNo',
      key: 'supplierNo',
      width: 120,
    },
    {
      title: '供应商名称',
      dataIndex: 'supplierName',
      key: 'supplierName',
    },
    {
      title: '联系人',
      dataIndex: 'contact',
      key: 'contact',
      width: 100,
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
      width: 130,
    },
    {
      title: '评分',
      dataIndex: 'rating',
      key: 'rating',
      width: 150,
      render: (rating: number) => <Rate disabled defaultValue={rating} />,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: keyof typeof statusMap) => <Tag color={statusMap[status].color}>{statusMap[status].text}</Tag>,
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 120,
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: () => (
        <Space size="small">
          <Button type="link" size="small">
            查看
          </Button>
          <Button type="link" size="small">
            评估
          </Button>
          <Button type="link" size="small" danger>
            拉黑
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <h1 style={{ marginBottom: 24, fontSize: 24, fontWeight: 600 }}>供应商列表</h1>

      <Card>
        <Space style={{ marginBottom: 16 }} size="middle">
          <Input
            placeholder="搜索供应商名称或编号"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
          />
          <Button type="primary" icon={<PlusOutlined />}>
            注册供应商
          </Button>
        </Space>

        <Table columns={columns} dataSource={mockData} pagination={{ pageSize: 10 }} />
      </Card>
    </div>
  )
}

export default SupplierList
