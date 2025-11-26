import { Form } from 'antd'
import './index.less'
import { Fragment } from 'react'
import { IEditProps } from './types'
import getComponents from './ComponentType'
export default function EditFormVertical(props: IEditProps) {
  return (
    <div className={`custom_form_edit_wrap${props.className ? ' ' + props.className : ''}`}>
      <Form
        form={props.form}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        initialValues={props?.initialValues}
        onValuesChange={props?.onValuesChange}
      >
        {props?.header}
        {props.editConfig &&
          props.editConfig?.map((item, index) => {
            if (item.hidden) {
              return null
            }
            return (
              <Fragment key={index}>{<Form.Item {...item}>{item ? getComponents(item) : null}</Form.Item>}</Fragment>
            )
          })}
      </Form>
      {props?.children}
      {props?.footer && <div className={'footer_btm_cls'}>{props?.footer}</div>}
    </div>
  )
}
