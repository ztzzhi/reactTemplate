import { Card, Table, Button, Space, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'

interface AuditData {
  key: string
  supplierName: string
  businessLicense: string
  contact: string
  phone: string
  status: 'pending' | 'approved' | 'rejected'
  submitTime: string
}

const SupplierAudit = () => {
  const statusMap = {
    pending: { text: '待审核', color: 'processing' },
    approved: { text: '已通过', color: 'success' },
    rejected: { text: '已拒绝', color: 'error' },
  }

  const mockData: AuditData[] = [
    {
      key: '1',
      supplierName: '深圳科技有限公司',
      businessLicense: '91440300XXXXXXXXXX',
      contact: '赵六',
      phone: '13600136000',
      status: 'pending',
      submitTime: '2024-01-28 10:30:00',
    },
    {
      key: '2',
      supplierName: '上海贸易公司',
      businessLicense: '91310000XXXXXXXXXX',
      contact: '孙七',
      phone: '13500135000',
      status: 'pending',
      submitTime: '2024-01-27 15:20:00',
    },
    {
      key: '3',
      supplierName: '广州物流有限公司',
      businessLicense: '91440100XXXXXXXXXX',
      contact: '周八',
      phone: '13400134000',
      status: 'approved',
      submitTime: '2024-01-26 09:15:00',
    },
  ]

  const columns: ColumnsType<AuditData> = [
    {
      title: '供应商名称',
      dataIndex: 'supplierName',
      key: 'supplierName',
    },
    {
      title: '营业执照号',
      dataIndex: 'businessLicense',
      key: 'businessLicense',
      width: 180,
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
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: keyof typeof statusMap) => <Tag color={statusMap[status].color}>{statusMap[status].text}</Tag>,
    },
    {
      title: '提交时间',
      dataIndex: 'submitTime',
      key: 'submitTime',
      width: 180,
    },
    {
      title: '操作',
      key: 'action',
      width: 180,
      render: (_, record) => (
        <Space size="small">
          <Button type="link" size="small">
            查看详情
          </Button>
          {record.status === 'pending' && (
            <>
              <Button type="link" size="small">
                通过
              </Button>
              <Button type="link" size="small" danger>
                拒绝
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ]

  return (
    <div>
      <h1 style={{ marginBottom: 24, fontSize: 24, fontWeight: 600 }}>资质审核</h1>

      <Card>
        <Table columns={columns} dataSource={mockData} pagination={{ pageSize: 10 }} />
      </Card>
    </div>
  )
}

export default SupplierAudit
