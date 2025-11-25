import React from 'react'
import { lazy } from 'react'
/**
 * 预加载所有页面组件
 */
const modules = import.meta.glob('../pages/**/*.tsx')

/**
 * 防止异步加载闪烁的bug
 */
export const lazyFix = (node: any) => {
  return Promise.all([node(), new Promise((resolve) => setTimeout(() => resolve(true), 200))]).then(
    ([moduleExports]) => {
      return moduleExports
    },
  )
}

/**
 * 懒加载组件包装器
 */
export function lazyLoad(importFunc: () => Promise<{ default: React.ComponentType<any> }>) {
  const LazyComponent = lazy(() => lazyFix(importFunc))
  return (
    <React.Suspense fallback={<div id="page_loading_wrap" />}>
      <LazyComponent />
    </React.Suspense>
  )
}

/**
 * 根据资源路径获取懒加载组件
 */
export function getLazyComponent(resourcePath: string) {
  if (!resourcePath) {
    console.warn('Resource path is empty')
    return lazyLoad(() => import('../pages/NotFound/index.tsx'))
  }

  if (!modules[resourcePath]) {
    console.warn(`Module not found for path: ${resourcePath}`)
    return lazyLoad(() => import('../pages/NotFound/index.tsx'))
  }

  return lazyLoad(modules[resourcePath] as () => Promise<{ default: React.ComponentType<any> }>)
}
