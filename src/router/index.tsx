import { useRoutes, Navigate } from 'react-router-dom'
import BasicLayout from '@/layouts/BasicLayout'
import { flattenRoutes } from '@/utils/routeHelper'
import { getLazyComponent } from './lazyLoad'
import { allRoutes } from '@/config/routes'

// 将路由配置移到组件外部，避免每次重新创建
const createRouteConfig = () => {
  // 扁平化路由，只包含真实路由
  const flatRoutes = flattenRoutes(allRoutes)
  return [
    {
      path: '/',
      element: <Navigate to={flatRoutes[0].path} replace />,
    },
    {
      path: '/',
      element: <BasicLayout />,
      children: flatRoutes.map((route) => ({
        path: route.path,
        element: getLazyComponent(route.resourcePath),
        key: route.key,
      })),
    },
    {
      path: '/login',
      element: getLazyComponent('../pages/Login/index.tsx'),
    },
    {
      path: '/404',
      element: getLazyComponent('../pages/NotFound/index.tsx'),
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]
}

// 在模块加载时就创建路由配置，避免每次渲染重新创建
const routeConfig = createRouteConfig()

export default () => useRoutes(routeConfig)
