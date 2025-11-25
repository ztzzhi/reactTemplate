import { Card, Row, Col, Statistic, Space } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined, UserOutlined, ShoppingOutlined } from '@ant-design/icons'
import './index.less'

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <h1 className="page-title">仪表盘</h1>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总用户数"
              value={11280}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
              suffix={
                <Space>
                  <ArrowUpOutlined />
                  <span style={{ fontSize: 14 }}>12%</span>
                </Space>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总订单数"
              value={9320}
              prefix={<ShoppingOutlined />}
              valueStyle={{ color: '#1890ff' }}
              suffix={
                <Space>
                  <ArrowUpOutlined />
                  <span style={{ fontSize: 14 }}>8%</span>
                </Space>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总收入"
              value={128600}
              precision={2}
              prefix="¥"
              valueStyle={{ color: '#cf1322' }}
              suffix={
                <Space>
                  <ArrowDownOutlined />
                  <span style={{ fontSize: 14 }}>3%</span>
                </Space>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="活跃用户"
              value={8560}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#52c41a' }}
              suffix={
                <Space>
                  <ArrowUpOutlined />
                  <span style={{ fontSize: 14 }}>15%</span>
                </Space>
              }
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={16}>
          <Card title="数据趋势" bordered={false}>
            <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ color: '#999' }}>图表区域 - 可集成 ECharts 或其他图表库</p>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="最近活动" bordered={false}>
            <div style={{ height: 300, overflow: 'auto' }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div className="activity-item">
                  <div className="activity-time">2分钟前</div>
                  <div className="activity-content">用户 张三 登录了系统</div>
                </div>
                <div className="activity-item">
                  <div className="activity-time">10分钟前</div>
                  <div className="activity-content">订单 #12345 已完成</div>
                </div>
                <div className="activity-item">
                  <div className="activity-time">1小时前</div>
                  <div className="activity-content">新用户 李四 注册成功</div>
                </div>
                <div className="activity-item">
                  <div className="activity-time">2小时前</div>
                  <div className="activity-content">系统更新完成</div>
                </div>
              </Space>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总用户数"
              value={11280}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
              suffix={
                <Space>
                  <ArrowUpOutlined />
                  <span style={{ fontSize: 14 }}>12%</span>
                </Space>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总订单数"
              value={9320}
              prefix={<ShoppingOutlined />}
              valueStyle={{ color: '#1890ff' }}
              suffix={
                <Space>
                  <ArrowUpOutlined />
                  <span style={{ fontSize: 14 }}>8%</span>
                </Space>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总收入"
              value={128600}
              precision={2}
              prefix="¥"
              valueStyle={{ color: '#cf1322' }}
              suffix={
                <Space>
                  <ArrowDownOutlined />
                  <span style={{ fontSize: 14 }}>3%</span>
                </Space>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="活跃用户"
              value={8560}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#52c41a' }}
              suffix={
                <Space>
                  <ArrowUpOutlined />
                  <span style={{ fontSize: 14 }}>15%</span>
                </Space>
              }
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={16}>
          <Card title="数据趋势" bordered={false}>
            <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ color: '#999' }}>图表区域 - 可集成 ECharts 或其他图表库</p>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="最近活动" bordered={false}>
            <div style={{ height: 300, overflow: 'auto' }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div className="activity-item">
                  <div className="activity-time">2分钟前</div>
                  <div className="activity-content">用户 张三 登录了系统</div>
                </div>
                <div className="activity-item">
                  <div className="activity-time">10分钟前</div>
                  <div className="activity-content">订单 #12345 已完成</div>
                </div>
                <div className="activity-item">
                  <div className="activity-time">1小时前</div>
                  <div className="activity-content">新用户 李四 注册成功</div>
                </div>
                <div className="activity-item">
                  <div className="activity-time">2小时前</div>
                  <div className="activity-content">系统更新完成</div>
                </div>
              </Space>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
