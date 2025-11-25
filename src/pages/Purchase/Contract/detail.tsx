import { Card, Descriptions, Button, Space, Tag, Timeline } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'

const ContractDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  // Mock 数据
  const contractData = {
    contractNo: 'CT2024001',
    contractName: '办公用品采购合同',
    supplier: '北京办公用品有限公司',
    amount: 50000,
    status: 'approved',
    signDate: '2024-01-15',
    duration: 12,
    description: '采购办公用品，包括文具、纸张等',
    createTime: '2024-01-10 10:30:00',
    updateTime: '2024-01-15 14:20:00',
  }

  const statusMap = {
    draft: { text: '草稿', color: 'default' },
    pending: { text: '待审核', color: 'processing' },
    approved: { text: '已通过', color: 'success' },
    rejected: { text: '已拒绝', color: 'error' },
  }

  const historyData = [
    { time: '2024-01-15 14:20:00', action: '审核通过', operator: '张经理' },
    { time: '2024-01-12 09:15:00', action: '提交审核', operator: '李采购' },
    { time: '2024-01-10 10:30:00', action: '创建合同', operator: '李采购' },
  ]

  return (
    <div>
      <h1 style={{ marginBottom: 24, fontSize: 24, fontWeight: 600 }}>合同详情</h1>

      <Card
        title="基本信息"
        extra={
          <Space>
            <Button onClick={() => navigate('/purchase/contract/list')}>返回列表</Button>
            <Button type="primary">编辑</Button>
            <Button danger>终止合同</Button>
          </Space>
        }
      >
        <Descriptions column={2} bordered>
          <Descriptions.Item label="合同编号">{contractData.contractNo}</Descriptions.Item>
          <Descriptions.Item label="状态">
            <Tag color={statusMap[contractData.status as keyof typeof statusMap].color}>
              {statusMap[contractData.status as keyof typeof statusMap].text}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="合同名称">{contractData.contractName}</Descriptions.Item>
          <Descriptions.Item label="供应商">{contractData.supplier}</Descriptions.Item>
          <Descriptions.Item label="合同金额">¥{contractData.amount.toLocaleString()}</Descriptions.Item>
          <Descriptions.Item label="签订日期">{contractData.signDate}</Descriptions.Item>
          <Descriptions.Item label="合同期限">{contractData.duration} 个月</Descriptions.Item>
          <Descriptions.Item label="创建时间">{contractData.createTime}</Descriptions.Item>
          <Descriptions.Item label="合同描述" span={2}>
            {contractData.description}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="审批历史" style={{ marginTop: 16 }}>
        <Timeline
          items={historyData.map((item) => ({
            children: (
              <div>
                <div style={{ fontWeight: 500 }}>{item.action}</div>
                <div style={{ fontSize: 12, color: '#999' }}>
                  {item.operator} · {item.time}
                </div>
              </div>
            ),
          }))}
        />
      </Card>
    </div>
  )
}

export default ContractDetail
