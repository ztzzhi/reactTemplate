import { Card, Row, Col } from 'antd'

const ChartsExample = () => {
  return (
    <div>
      <h1 style={{ marginBottom: 24 }}>图表示例</h1>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="柱状图" bordered={false}>
            <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ color: '#999' }}>可集成 ECharts、Chart.js 等图表库</p>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="折线图" bordered={false}>
            <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ color: '#999' }}>可集成 ECharts、Chart.js 等图表库</p>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="饼图" bordered={false}>
            <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ color: '#999' }}>可集成 ECharts、Chart.js 等图表库</p>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="雷达图" bordered={false}>
            <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ color: '#999' }}>可集成 ECharts、Chart.js 等图表库</p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ChartsExample
