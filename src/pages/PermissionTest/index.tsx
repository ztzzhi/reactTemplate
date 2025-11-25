import { useState, useEffect } from 'react'
import { Card, Button, Space, message, Alert, Descriptions, Tag } from 'antd'
import { useAppSelector } from '@/store/hooks'
import PermissionBox from '@/components/PermissionBox'
import { USER_ROLES, getUserPermissions, getUserRole } from '@/config/permissions'

const PermissionTest = () => {
  const { userInfo } = useAppSelector((state) => state.user)
  const [currentPermissions, setCurrentPermissions] = useState<string[]>([])
  const [currentUser, setCurrentUser] = useState<string>('')

  // 初始化当前用户权限
  useEffect(() => {
    if (userInfo?.username) {
      setCurrentUser(userInfo.username)
      const permissions = getUserPermissions(userInfo.username)
      setCurrentPermissions(permissions)
    }
  }, [userInfo])

  const handlePermissionChange = (permissions: string[]) => {
    setCurrentPermissions(permissions)
    message.success(`权限已更新，当前拥有 ${permissions.length} 个权限`)
  }

  const switchUser = (username: string) => {
    const userRole = getUserRole(username)
    if (userRole) {
      setCurrentUser(username)
      const permissions = getUserPermissions(username)
      setCurrentPermissions(permissions)
      message.success(`已切换到 ${userRole.name} (${userRole.role})`)
    }
  }

  const checkPermission = (permission: string) => {
    return currentPermissions.includes(permission)
  }

  return (
    <div>
      <Card title="权限配置">
        <div style={{ height: '600px' }}>
          <PermissionBox value={currentPermissions} onChange={handlePermissionChange} />
        </div>
      </Card>
      <div style={{ marginTop: '24px', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
        权限配置: {JSON.stringify(currentPermissions)}
      </div>
    </div>
  )
}

export default PermissionTest
