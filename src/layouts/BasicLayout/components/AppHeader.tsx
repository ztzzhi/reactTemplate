import { Layout, Space, Dropdown, Avatar, ColorPicker, Tooltip, Button } from 'antd'
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  SunOutlined,
  MoonOutlined,
  BgColorsOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { toggleTheme, setPrimaryColor } from '@/store/slices/themeSlice'
import { logout } from '@/store/slices/userSlice'
import Breadcrumb from '@/components/Breadcrumb'
import './AppHeader.less'

const { Header } = Layout

const AppHeader = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { theme, primaryColor } = useAppSelector((state) => state.theme)
  const { userInfo } = useAppSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人中心',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '设置',
      onClick: () => navigate('/settings'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout,
    },
  ]

  return (
    <Header className="app-header">
      <div className="header-left">
        <Breadcrumb />
      </div>

      <div className="header-right">
        <Space size="middle" style={{ height: '100%' }}>
          {/* 主题切换按钮 */}
          <Tooltip title={theme === 'dark' ? '切换到浅色主题' : '切换到深色主题'}>
            <Button
              type="text"
              icon={theme === 'dark' ? <SunOutlined /> : <MoonOutlined />}
              onClick={() => dispatch(toggleTheme())}
              className="theme-toggle-btn"
            />
          </Tooltip>

          {/* 主题色选择器 */}
          <Tooltip title="选择主题色">
            <ColorPicker
              value={primaryColor}
              onChange={(color) => dispatch(setPrimaryColor(color.toHexString()))}
              showText={false}
              presets={[
                {
                  label: '推荐',
                  colors: ['#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1', '#13c2c2', '#eb2f96', '#fa8c16'],
                },
              ]}
              getPopupContainer={(trigger) => trigger.parentElement!}
            >
              <Button
                type="text"
                icon={<BgColorsOutlined />}
                className="color-picker-btn"
                style={{ color: primaryColor }}
              />
            </ColorPicker>
          </Tooltip>

          {/* 用户信息下拉菜单 */}
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow trigger={['click']}>
            <div className="user-info" role="button" tabIndex={0}>
              <Avatar size="small" icon={<UserOutlined />} src={userInfo?.avatar} className="user-avatar" />
              <span className="username">{userInfo?.username || '用户'}</span>
            </div>
          </Dropdown>
        </Space>
      </div>
    </Header>
  )
}

export default AppHeader
