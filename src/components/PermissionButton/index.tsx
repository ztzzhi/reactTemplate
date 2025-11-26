import { Button, ButtonProps } from 'antd'
import { useAppSelector } from '@/store/hooks'

interface IProps extends ButtonProps {
  children?: React.ReactNode
  permission: string
}

const PermissionButton = (myprops: IProps) => {
  const buttonCodeList = useAppSelector((state) => state.user.userInfo?.permissions) || []
  const { children, permission, ...props } = myprops

  // 判断当前用户是否有权限显示按钮
  const hasPermission = buttonCodeList.includes(permission)
  // 如果没有权限，则不渲染按钮
  if (!hasPermission) {
    return null
  }
  // 如果有权限，则渲染按钮

  return <Button {...props}>{children}</Button>
}

export default PermissionButton
