import React from 'react'
import './index.less'
interface Iprops {
  children?: React.ReactNode
  footer?: string | React.ReactNode
  class?: string
  customStyle?: React.CSSProperties
  className?: string
}
export default function DetailContainer(props: Iprops) {
  return (
    <div className={`detail_container${props.className ? ' ' + props.className : ''}`}>
      <div className="detail_container_main">{props?.children}</div>
      {props?.footer && <div className={'footer_btm_cls'}>{props?.footer}</div>}
      <div style={{ height: props?.footer ? 40 : 0, backgroundColor: `var(--color-bg-2)` }}></div>
    </div>
  )
}
