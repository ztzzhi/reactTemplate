import { Card, Form, Input, Button, Switch, Select, message } from 'antd'

const { Option } = Select

const Settings = () => {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log('Settings:', values)
    message.success('设置保存成功！')
  }

  return (
    <div>
      <h1 style={{ marginBottom: 24 }}>系统设置</h1>

      <Card title="基本设置">
        <Form
          form={form}
          name="settings"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            siteName: 'React Admin Template',
            language: 'zh-CN',
            notifications: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="网站名称" name="siteName">
            <Input placeholder="请输入网站名称" />
          </Form.Item>

          <Form.Item label="语言" name="language">
            <Select>
              <Option value="zh-CN">简体中文</Option>
              <Option value="en-US">English</Option>
            </Select>
          </Form.Item>

          <Form.Item label="启用通知" name="notifications" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item label="邮箱服务器" name="emailServer">
            <Input placeholder="smtp.example.com" />
          </Form.Item>

          <Form.Item label="邮箱端口" name="emailPort">
            <Input placeholder="587" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit">
              保存设置
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Settings
