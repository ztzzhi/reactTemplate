import React from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from '@/store/hooks'
import AppHeader from './components/AppHeader'
import AppSidebar from './components/AppSidebar'
import './index.less'

const { Content } = Layout

const BasicLayout = () => {
  const collapsed = useAppSelector((state) => state.theme.collapsed)

  return (
    <Layout className="basic-layout">
      <AppSidebar />
      <Layout className={`site-layout ${collapsed ? 'collapsed' : ''}`}>
        <AppHeader />
        <Content className="site-layout-content">
          <div className="content-wrapper">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default BasicLayout
