import { Typography } from 'antd'
import { useAppSelector } from '@/store/hooks'
import { LinkProps } from 'antd/es/typography/Link'
interface IProps extends LinkProps {
  children?: React.ReactNode
  permission: string
}
const PermissionLink = (myprops: IProps) => {
  const buttonCodeList = useAppSelector((state) => state.login.buttonCodeList) || []
  const { children, permission, ...props } = myprops
  // 判断当前用户是否有权限显示按钮
  const hasPermission = buttonCodeList.includes(permission)
  // 如果没有权限，则不渲染按钮
  if (!hasPermission) {
    return null
  }
  // 如果有权限，则渲染按钮
  return <Typography.Link {...props}>{children}</Typography.Link>
}
export default PermissionLink
