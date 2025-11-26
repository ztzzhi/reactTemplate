import React from 'react'
import './index.less'
interface Iprops {
  children?: React.ReactNode
  title?: string | React.ReactNode
  class?: string
  customStyle?: React.CSSProperties
  className?: string
  isShowBreadCrumb?: boolean
}
export default function PageContainer(props: Iprops) {
  return (
    <div className={`page_container${props.className ? ' ' + props.className : ''}`}>
      <div className={`header_title${props?.class ? ' eliminate' : ''}`} style={props?.customStyle}>
        <div className={'header_left'}>{props?.title}</div>
      </div>
      <div className="container_main">{props?.children}</div>
    </div>
  )
}
