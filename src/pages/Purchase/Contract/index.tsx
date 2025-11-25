import { Card, Table, Button, Space, Tag, Input } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { useState } from 'react'
import type { ColumnsType } from 'antd/es/table'

interface ContractData {
  key: string
  contractNo: string
  contractName: string
  supplier: string
  amount: number
  status: 'draft' | 'pending' | 'approved' | 'rejected'
  createTime: string
}

const ContractList = () => {
  const [searchText, setSearchText] = useState('')

  const statusMap = {
    draft: { text: '草稿', color: 'default' },
    pending: { text: '待审核', color: 'processing' },
    approved: { text: '已通过', color: 'success' },
    rejected: { text: '已拒绝', color: 'error' },
  }

  const mockData: ContractData[] = [
    {
      key: '1',
      contractNo: 'CT2024001',
      contractName: '办公用品采购合同',
      supplier: '北京办公用品有限公司',
      amount: 50000,
      status: 'approved',
      createTime: '2024-01-15',
    },
    {
      key: '2',
      contractNo: 'CT2024002',
      contractName: '电脑设备采购合同',
      supplier: '联想科技有限公司',
      amount: 320000,
      status: 'pending',
      createTime: '2024-01-20',
    },
    {
      key: '3',
      contractNo: 'CT2024003',
      contractName: '办公家具采购合同',
      supplier: '宜家家居',
      amount: 150000,
      status: 'draft',
      createTime: '2024-01-25',
    },
  ]

  const columns: ColumnsType<ContractData> = [
    {
      title: '合同编号',
      dataIndex: 'contractNo',
      key: 'contractNo',
      width: 120,
    },
    {
      title: '合同名称',
      dataIndex: 'contractName',
      key: 'contractName',
    },
    {
      title: '供应商',
      dataIndex: 'supplier',
      key: 'supplier',
    },
    {
      title: '合同金额',
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      render: (amount: number) => `¥${amount.toLocaleString()}`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: keyof typeof statusMap) => <Tag color={statusMap[status].color}>{statusMap[status].text}</Tag>,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 120,
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_, __) => (
        <Space size="small">
          <Button type="link" size="small">
            查看
          </Button>
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

  return (
    <div>
      <h1 style={{ marginBottom: 24, fontSize: 24, fontWeight: 600 }}>合同列表</h1>

      <Card>
        <Space style={{ marginBottom: 16 }} size="middle">
          <Input
            placeholder="搜索合同名称或编号"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
          />
          <Button type="primary" icon={<PlusOutlined />}>
            新建合同
          </Button>
          <Button>导出</Button>
        </Space>

        <Table columns={columns} dataSource={mockData} pagination={{ pageSize: 10 }} />
      </Card>
    </div>
  )
}

export default ContractList
