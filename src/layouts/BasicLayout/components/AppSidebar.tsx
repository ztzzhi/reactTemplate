import React from 'react'
import { Layout, Menu } from 'antd'
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  TableOutlined,
  FormOutlined,
  BarChartOutlined,
  ShoppingOutlined,
  TeamOutlined,
  FileTextOutlined,
  AuditOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { buildMenuTree, filterRoutesByPermissions } from '@/utils/routeHelper'
import { allRoutes, mockUserPermissions } from '@/config/routes'
import { toggleSidebar } from '@/store/slices/themeSlice'
import './AppSidebar.less'

const { Sider } = Layout

// 图标映射
const iconMap: Record<string, React.ReactNode> = {
  dashboard: <DashboardOutlined />,
  appstore: <TableOutlined />,
  table: <TableOutlined />,
  form: <FormOutlined />,
  'bar-chart': <BarChartOutlined />,
  user: <UserOutlined />,
  setting: <SettingOutlined />,
  shopping: <ShoppingOutlined />,
  team: <TeamOutlined />,
  'file-contract': <FileTextOutlined />,
  audit: <AuditOutlined />,
  'question-circle': <SettingOutlined />,
  'info-circle': <SettingOutlined />,
}

const AppSidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { userInfo } = useAppSelector((state) => state.user)
  const collapsed = useAppSelector((state) => state.theme.collapsed)

  // 获取用户权限
  const userPermissions = (userInfo as any)?.permissions || mockUserPermissions

  // 根据权限过滤路由并构建菜单树
  const filteredRoutes = filterRoutesByPermissions(allRoutes, userPermissions)
  const menuTree = buildMenuTree(filteredRoutes)

  // 转换菜单树为 Antd Menu 格式
  const convertToMenuItems = (menuItems: any[]): MenuProps['items'] => {
    return menuItems.map((item) => {
      const menuItem: any = {
        key: item.path,
        icon: iconMap[item.icon] || <SettingOutlined />,
        label: item.name,
      }

      if (item.children && item.children.length > 0) {
        menuItem.children = convertToMenuItems(item.children)
      }

      return menuItem
    })
  }

  const menuItems = convertToMenuItems(menuTree)

  // 获取当前选中的菜单项
  const getSelectedKeys = () => {
    const path = location.pathname
    // 精确匹配当前路径
    return [path]
  }

  // 获取当前展开的菜单项
  const getOpenKeys = () => {
    const path = location.pathname
    const openKeys: string[] = []

    // 查找父级菜单
    const findParentPath = (items: any[], targetPath: string, parentPath: string = ''): boolean => {
      for (const item of items) {
        if (item.path === targetPath) {
          if (parentPath) {
            openKeys.push(parentPath)
          }
          return true
        }
        if (item.children && item.children.length > 0) {
          if (findParentPath(item.children, targetPath, item.path)) {
            openKeys.push(item.path)
            return true
          }
        }
      }
      return false
    }

    findParentPath(menuTree, path)
    return openKeys
  }

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key)
  }

  return (
    <Sider
      className="app-sider"
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={230}
      style={{
        overflow: 'hidden',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className="logo-container">
        <div className="logo-icon">Z</div>
        {!collapsed && <span className="logo-text">ZTZ Admin</span>}
      </div>
      <div className="menu-container">
        <Menu
          theme="light"
          mode="inline"
          defaultOpenKeys={collapsed ? undefined : getOpenKeys()}
          selectedKeys={getSelectedKeys()}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </div>
      <div className="menu_collapse_wrap">
        <div className="menu_collapse_button" onClick={() => dispatch(toggleSidebar())}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
      </div>
    </Sider>
  )
}
export default AppSidebar
