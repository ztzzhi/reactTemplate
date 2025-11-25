import { Card, Typography, Alert } from 'antd'

const { Title, Paragraph } = Typography

const Help = () => {
  return (
    <div>
      <Title level={2}>帮助中心</Title>

      <Card style={{ marginBottom: 16 }}>
        <Title level={4}>快速开始</Title>
        <Paragraph>欢迎使用本系统！以下是基本的使用指南：</Paragraph>
        <ol>
          <li>登录系统后，您可以在左侧菜单中找到各个功能模块</li>
          <li>点击菜单项可以跳转到对应的页面</li>
          <li>右上角可以切换主题和个性化设置</li>
          <li>支持响应式布局，适配各种屏幕尺寸</li>
        </ol>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <Title level={4}>常见问题</Title>
        <Alert
          message="如何修改个人信息？"
          description="点击右上角头像，选择个人中心即可修改个人信息和密码。"
          type="info"
        />
        <Alert message="权限不足怎么办？" description="请联系系统管理员为您分配相应的权限。" type="warning" />
        <Alert
          message="系统支持哪些浏览器？"
          description="推荐使用 Chrome、Firefox、Safari、Edge 等现代浏览器。"
          type="success"
        />
      </Card>

      <Card>
        <Title level={4}>联系我们</Title>
        <Paragraph>如果您在使用过程中遇到问题，可以通过以下方式联系我们：</Paragraph>
        <ul>
          <li>技术支持邮箱：support@example.com</li>
          <li>客服热线：400-123-4567</li>
          <li>在线客服：工作日 9:00-18:00</li>
        </ul>
      </Card>
    </div>
  )
}

export default Help
