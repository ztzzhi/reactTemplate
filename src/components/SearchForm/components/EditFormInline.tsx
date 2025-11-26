import { Form, Row, Col } from 'antd'
import './index.less'
import { Fragment } from 'react'
import getComponents from './ComponentType'
import { IEditProps } from './types'
export default function EditFormInline(props: IEditProps) {
  const { column = 3 } = props
  return (
    <div className={`custom_form_edit_inline_wrap${props.className ? ' ' + props.className : ''}`}>
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
              <Col {...{ xs: 24, sm: 24, md: 12, lg: 24 / column, xl: 24 / column, xxl: 24 / column }} key={index}>
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
