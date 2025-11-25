import { Form, Space, Button, Row, Col } from 'antd'
import { Fragment, useState, useEffect, useRef } from 'react'
import getComponents from './ComponentType'
import { useForm } from 'antd/es/form/Form'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import { ISearchProps, IItemArray } from './types'
import './index.less'
import React from 'react'
export default function SearchForm(props: ISearchProps) {
  const [form] = useForm()
  const slicedNum = 2
  const [isFold, setIsFold] = useState(props.isFold ? props?.isFold : false) //默认是折叠状态
  const [currentSpan, setCurrentSpan] = useState(8) //默认一行展示3个筛选项
  const [handledSearchConfig, sethandledSearchConfig] = useState<IItemArray[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  // 根据容器宽度和isFold动态设置 currentSpan
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const observer = new window.ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width
        if (width >= 1600)
          setCurrentSpan(6) // xxl
        else if (width >= 1200 && width < 1600)
          setCurrentSpan(8) // xl
        else if (width >= 992 && width < 1200)
          setCurrentSpan(8) // lg
        else if (width >= 768 && width < 992)
          setCurrentSpan(12) // md
        else if (width >= 576)
          setCurrentSpan(12) // sm
        else setCurrentSpan(24) // xs
      }
    })
    observer.observe(container)
    return () => observer.disconnect()
  }, [isFold])

  useEffect(() => {
    const handledSearchConfig = props.searchConfig?.filter((item) => !item.hidden)
    sethandledSearchConfig(handledSearchConfig)
  }, [props.searchConfig])

  function isPass() {
    const formIns = props.form ? props.form : form
    const newValues: Record<string, string | number> = {}
    formIns.validateFields().then((values) => {
      Object.keys(values).forEach((key) => {
        if (values[key] || values[key] == 0) {
          newValues[key] = values[key]
        }
      })
      props.onFinish(newValues)
    })
  }
  function handleClickFold() {
    setIsFold(!isFold)
  }
  const visibleItems = handledSearchConfig?.filter((_, index) => !(isFold && index >= slicedNum)) || []
  const usedSpan = visibleItems.length * currentSpan
  const buttonSpan = 24 - (usedSpan % 24)
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#42bac3',
          colorLink: '#42bac3',
        },
        components: {
          Menu: {
            itemBorderRadius: 0,
          },
          Table: {
            borderColor: '#e5e6eb',
          },
        },
      }}
    >
      <div ref={containerRef} className={`qsf_search_form_wrap${props.className ? ' ' + props.className : ''}`}>
        <Form
          className="qsf_search_form_wrap_formbox"
          form={props.form ? props.form : form}
          labelAlign="right"
          layout="inline"
          labelWrap={true}
          onFinish={props.onFinish}
          initialValues={props?.initialValues}
          onValuesChange={props?.onValuesChange}
        >
          <Row style={{ width: '100%' }} gutter={[10, 10]}>
            {visibleItems.map((item, index) => {
              return (
                <Col span={currentSpan} key={index}>
                  <Fragment>
                    <Form.Item {...item}>{item ? getComponents(item, isPass, index === 0) : null}</Form.Item>
                  </Fragment>
                </Col>
              )
            })}
            <Col span={buttonSpan > 0 ? buttonSpan : currentSpan} style={{ textAlign: 'right' }}>
              <div>
                <Space>
                  <Button type="primary" onClick={isPass} disabled={props?.loading}>
                    查询
                  </Button>
                  <Button onClick={props.onReset} disabled={props?.loading}>
                    重置
                  </Button>
                  {props?.searchConfig?.length > 2 ? (
                    <Button type="link" onClick={handleClickFold}>
                      {isFold ? '更多筛选' : '收起'}
                      {isFold ? <DownOutlined /> : <UpOutlined />}
                    </Button>
                  ) : null}
                </Space>
              </div>
            </Col>
          </Row>
        </Form>
        <div className="qsf_search_form_extra_wrap">{props?.extra}</div>
      </div>
    </ConfigProvider>
  )
}
