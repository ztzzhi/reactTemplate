import { useState } from 'react'
import { Card, Form, Input, Button, Select, Space, message, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/store/hooks'
import { login } from '@/store/slices/userSlice'
import { USER_ROLES, getUserPermissions } from '@/config/permissions'
import { useNavigate } from 'react-router-dom'
import { allRoutes } from '@/config/routes'

const LoginSimulator = () => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const navigate = useNavigate()

  const handleLogin = async (values: { username: string; password: string }) => {
    setLoading(true)

    try {
      // 模拟登录验证
      const userRole = USER_ROLES.find((user) => user.username === values.username)

      if (!userRole) {
        message.error('用户不存在')
        setLoading(false)
        return
      }

      // 模拟密码验证（实际项目中应该调用后端API）
      if (values.password !== '123456') {
        message.error('密码错误，提示密码：123456')
        setLoading(false)
        return
      }

      // 获取用户权限
      const permissions = getUserPermissions(values.username)

      // 模拟登录成功
      await dispatch(
        login({
          username: values.username,
          token: 'mock-token-' + Date.now(),
          permissions,
          userInfo: {
            username: values.username,
            name: userRole.name,
            role: userRole.role,
            avatar: '',
          },
        }),
      )

      message.success(`登录成功！欢迎 ${userRole.name}`)
      setTimeout(() => {
        navigate(allRoutes?.[0]?.path || '/dashboard')
      }, 600)
      form.resetFields()
    } catch (error) {
      message.error('登录失败')
    } finally {
      setLoading(false)
    }
  }

  const handleQuickLogin = (username: string) => {
    form.setFieldsValue({ username, password: '123456' })
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Card
        title={
          <div style={{ textAlign: 'center' }}>
            <Avatar size={64} icon={<UserOutlined />} style={{ marginBottom: '16px' }} />
            <div>模拟登录系统</div>
          </div>
        }
        style={{ width: 400, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}
      >
        <Form form={form} layout="vertical" onFinish={handleLogin} initialValues={{ password: '123456' }}>
          <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
            <Select
              placeholder="选择或输入用户名"
              showSearch
              filterOption={(input, option) =>
                (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
              }
            >
              {USER_ROLES.map((user) => (
                <Select.Option key={user.username} value={user.username}>
                  {user.name} ({user.username})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password placeholder="请输入密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block style={{ height: '40px' }}>
              登录
            </Button>
          </Form.Item>
        </Form>

        <div style={{ marginTop: '24px', padding: '16px', background: '#f5f5f5', borderRadius: '6px' }}>
          <div style={{ marginBottom: '12px', fontWeight: 'bold' }}>快速登录：</div>
          <Space wrap>
            {USER_ROLES.map((user) => (
              <Button key={user.username} size="small" onClick={() => handleQuickLogin(user.username)}>
                {user.name}
              </Button>
            ))}
          </Space>
          <div style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>提示：所有用户密码均为 123456</div>
        </div>

        <div style={{ marginTop: '16px', fontSize: '12px', color: '#999' }}>
          <div>角色说明：</div>
          {USER_ROLES.map((user) => {
            const permissions = getUserPermissions(user.username)
            return (
              <div key={user.username} style={{ marginTop: '4px' }}>
                • {user.name}：{permissions.length} 个权限
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}

export default LoginSimulator
