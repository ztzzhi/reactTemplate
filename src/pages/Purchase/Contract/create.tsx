import { Card, Form, Input, InputNumber, DatePicker, Select, Button, Space } from 'antd'
import { useNavigate } from 'react-router-dom'

const { TextArea } = Input

const ContractCreate = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const handleSubmit = (values: any) => {
    console.log('提交合同:', values)
    // 这里应该调用 API 提交数据
    navigate('/purchase/contract/list')
  }

  const handleSaveDraft = () => {
    const values = form.getFieldsValue()
    console.log('保存草稿:', values)
    // 这里应该调用 API 保存草稿
  }

  return (
    <div>
      <h1 style={{ marginBottom: 24, fontSize: 24, fontWeight: 600 }}>创建合同</h1>

      <Card>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="合同名称" name="contractName" rules={[{ required: true, message: '请输入合同名称' }]}>
            <Input placeholder="请输入合同名称" />
          </Form.Item>

          <Form.Item label="供应商" name="supplierId" rules={[{ required: true, message: '请选择供应商' }]}>
            <Select placeholder="请选择供应商">
              <Select.Option value="1">北京办公用品有限公司</Select.Option>
              <Select.Option value="2">联想科技有限公司</Select.Option>
              <Select.Option value="3">宜家家居</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="合同金额" name="amount" rules={[{ required: true, message: '请输入合同金额' }]}>
            <InputNumber
              style={{ width: '100%' }}
              placeholder="请输入合同金额"
              min={0}
              precision={2}
              formatter={(value) => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
          </Form.Item>

          <Form.Item label="签订日期" name="signDate" rules={[{ required: true, message: '请选择签订日期' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="合同期限" name="duration">
            <InputNumber style={{ width: '100%' }} placeholder="请输入合同期限（月）" min={1} />
          </Form.Item>

          <Form.Item label="合同描述" name="description">
            <TextArea rows={4} placeholder="请输入合同描述" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                提交审批
              </Button>
              <Button onClick={handleSaveDraft}>保存草稿</Button>
              <Button onClick={() => navigate('/purchase/contract/list')}>取消</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default ContractCreate
