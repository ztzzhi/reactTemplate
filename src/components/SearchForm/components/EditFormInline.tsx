import { Form, Row, Col } from 'antd'
import './index.less'
import { Fragment } from 'react'
import getComponents from './ComponentType'
import { IEditProps } from './types'
import React from 'react'
const grid = { xs: 24, sm: 24, md: 12, lg: 8, xl: 8, xxl: 6 }
export default function EditFormInline(props: IEditProps) {
  return (
    <div className={`qsf_form_edit_inline_wrap${props.className ? ' ' + props.className : ''}`}>
      <Form
        form={props.form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout="inline"
        onValuesChange={props?.onValuesChange}
        initialValues={props?.initialValues}
        labelAlign="left"
        labelWrap
      >
        <Row gutter={props?.gutter ? props.gutter : [20, 20]} style={{ marginBottom: 12 }}>
          {props.editConfig?.map((items, index) => {
            const { warning_flag, ...item } = items
            if (item.hidden) {
              return null
            }
            return (
              <Col {...grid} key={index}>
                <Fragment>
                  <Form.Item {...item} className={warning_flag ? 'warning_required_flag' : ''}>
                    {item ? getComponents(item) : null}
                  </Form.Item>
                </Fragment>
              </Col>
            )
          })}
        </Row>
        {props?.children}
      </Form>
    </div>
  )
}
