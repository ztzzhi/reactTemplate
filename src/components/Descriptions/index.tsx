import { Descriptions } from 'antd'
import './index.less'
import React from 'react'
interface Iprops {
  title: string
  list?: listArrType[]
  extra?: React.ReactNode
  extraButton?: React.ReactNode
  extraHeader?: React.ReactNode
  column?: columnType
  children?: React.ReactNode
  layout?: 'horizontal' | 'vertical'
}

interface listArrType {
  label: string | React.ReactNode
  key?: string
  content: string | React.ReactNode
  labelStyle?: React.CSSProperties
  [propName: string]: any
}

type columnEnum = 6 | 5 | 4 | 3 | 2 | 1

interface columnType {
  xxl?: columnEnum
  xl?: columnEnum
  lg?: columnEnum
  md?: columnEnum
  sm?: columnEnum
  xs?: columnEnum
}

export default function DescriptionsComponent(props: Iprops) {
  return (
    <div
      className="descriptions_box"
      style={{
        marginBottom: 12,
      }}
    >
      {(props?.title || props?.extra) && (
        <div className="descriptions_box_header">
          {props.title ? (
            <div className="dbh_title">
              {props.title}
              {props?.extraButton || null}
            </div>
          ) : null}
          {props?.extra ? <div className="dbh_extra_wrap">{props?.extra}</div> : null}
        </div>
      )}
      {props?.extraHeader && <div className="dbh_extra_header_wrap">{props?.extraHeader}</div>}
      <Descriptions
        column={props.column ? props.column : { xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
        layout={props.layout ? props.layout : 'horizontal'}
      >
        {props?.list && props?.list?.length > 0 ? (
          props?.list?.map((item, index) => {
            return (
              <Descriptions.Item
                className="descriptions_item"
                style={{ paddingRight: 10 }}
                labelStyle={item.labelStyle ? item.labelStyle : {}}
                key={index}
                label={item.label}
                contentStyle={{ flexWrap: 'wrap' }}
              >
                {item.content}
              </Descriptions.Item>
            )
          })
        ) : (
          <Descriptions.Item>{props?.children}</Descriptions.Item>
        )}
      </Descriptions>
    </div>
  )
}
