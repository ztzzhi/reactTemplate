import { Form, Input, Button, Select, DatePicker, Switch, Card, message } from 'antd'

const { TextArea } = Input
const { Option } = Select

const FormExample = () => {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log('Success:', values)
    message.success('表单提交成功！')
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
    message.error('表单提交失败，请检查输入！')
  }

  return (
    <div>
      <h1 style={{ marginBottom: 24 }}>表单示例</h1>

      <Card>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true, status: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              { required: true, message: '请输入邮箱!' },
              { type: 'email', message: '请输入有效的邮箱地址!' },
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item label="角色" name="role" rules={[{ required: true, message: '请选择角色!' }]}>
            <Select placeholder="请选择角色">
              <Option value="admin">管理员</Option>
              <Option value="user">普通用户</Option>
              <Option value="guest">访客</Option>
            </Select>
          </Form.Item>

          <Form.Item label="出生日期" name="birthday" rules={[{ required: true, message: '请选择出生日期!' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="个人简介" name="bio">
            <TextArea rows={4} placeholder="请输入个人简介" />
          </Form.Item>

          <Form.Item label="启用状态" name="status" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              提交
            </Button>
            <Button htmlType="button" onClick={() => form.resetFields()}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default FormExample
