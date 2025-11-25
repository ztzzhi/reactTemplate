import { Breadcrumb } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import type { RouteConfig } from '@/types/router'
import { allRoutes } from '@/config/routes'
import type { BreadcrumbProps } from 'antd'
import './index.less'

interface DynamicBreadcrumbProps {
  routes?: RouteConfig[]
  homePath?: string
}

/**
 * 动态面包屑组件
 * 基于路由配置自动生成面包屑导航
 */
const DynamicBreadcrumb = ({ routes = allRoutes, homePath = '/', ...breadcrumbProps }: DynamicBreadcrumbProps) => {
  const location = useLocation()
  const navigate = useNavigate()

  const findRouteWithParents = (
    path: string,
    routes: RouteConfig[],
    parentRoutes: RouteConfig[] = [],
  ): { route: RouteConfig; parentRoutes: RouteConfig[] } | null => {
    const purePath = path.split('?')[0]
    for (const route of routes) {
      if (route.path === purePath) {
        return {
          route,
          parentRoutes: [...parentRoutes],
        }
      }

      if (route.children?.length) {
        const result = findRouteWithParents(purePath, route.children, [...parentRoutes, route])
        if (result) return result
      }
    }

    return null
  }
  /**
   * 处理面包屑点击事件
   * @param path 路径
   */
  const handleBreadcrumbClick = (path: string) => {
    // 只有首页才允许跳转
    if (path === homePath && path !== location.pathname) {
      navigate(path)
    }
  }

  // 构建面包屑数据
  const buildBreadcrumbData = (): BreadcrumbProps['items'] => {
    const currentPath = location.pathname
    const homeName = '首页'

    // 首页面包屑项
    const homeBreadcrumb = {
      title: <span style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>{homeName}</span>,
    }

    // 首页路径特殊处理
    if (currentPath === homePath) {
      return [homeBreadcrumb]
    }

    // 查找当前路径对应的路由
    const routeResult = findRouteWithParents(currentPath, routes)

    if (!routeResult) {
      // 未找到匹配路由，只显示首页
      return [homeBreadcrumb]
    }

    const { route, parentRoutes } = routeResult
    const breadcrumbItems: BreadcrumbProps['items'] = []

    // 添加首页
    breadcrumbItems.push({
      ...homeBreadcrumb,
      onClick: () => handleBreadcrumbClick(homePath),
    })

    // 添加父级路由
    parentRoutes.forEach((parentRoute) => {
      breadcrumbItems.push({
        key: parentRoute.key,
        title: parentRoute.name,
      })
    })

    breadcrumbItems.push({
      key: route.key,
      title: route.name,
    })

    return breadcrumbItems
  }

  const breadcrumbItems = buildBreadcrumbData()

  return <Breadcrumb items={breadcrumbItems} className="breadcrumb_container" {...breadcrumbProps} />
}

export default DynamicBreadcrumb
