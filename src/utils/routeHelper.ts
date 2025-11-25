import type { RouteConfig, FlatRouteInfo, MenuItem } from '@/types/router'

/**
 * 扁平化路由配置，提取所有真实路由（isRoute: true）
 */
export function flattenRoutes(routes: RouteConfig[]): FlatRouteInfo[] {
  const result: FlatRouteInfo[] = []

  function traverse(routeList: RouteConfig[]) {
    routeList.forEach((route) => {
      if (route.meta.isRoute) {
        // 真实路由节点
        result.push({
          path: route.path,
          key: route.key,
          name: route.name,
          permissionKey: route.meta.permissionKey,
          accessControlList: route.meta.accessControlList,
          resourcePath: route.resourcePath,
        } as FlatRouteInfo)
      } else {
        // 菜单节点，继续遍历子路由
        if (route.children && route.children.length > 0) {
          traverse(route.children)
        }
      }
    })
  }

  traverse(routes)
  return result
}

/**
 * 根据权限过滤路由
 * @param routes 路由配置
 * @param permissions 用户拥有的权限列表
 */
export function filterRoutesByPermissions(routes: RouteConfig[], permissions: string[]): RouteConfig[] {
  const permissionSet = new Set(permissions)

  function filter(routeList: RouteConfig[]): RouteConfig[] {
    return routeList
      .filter((route) => {
        if (route.meta.isRoute) {
          // 真实路由：检查是否有权限
          return permissionSet.has(route.meta.permissionKey)
        }
        // 菜单节点：检查是否有子路由
        return true
      })
      .map((route) => {
        if (!route.meta.isRoute && route.children) {
          // 递归过滤子路由
          const filteredChildren = filter(route.children)
          return {
            ...route,
            children: filteredChildren,
          }
        }
        return route
      })
      .filter((route) => {
        // 移除没有子路由的菜单节点
        if (!route.meta.isRoute) {
          return route.children && route.children.length > 0
        }
        return true
      })
  }

  return filter(routes)
}

/**
 * 构建菜单树（仅包含 isMenu: true 的节点）
 */
export function buildMenuTree(routes: RouteConfig[]): MenuItem[] {
  function build(routeList: RouteConfig[]): MenuItem[] {
    return routeList
      .filter((route) => route.meta.isMenu)
      .map((route) => {
        const menuItem: MenuItem = {
          key: route.key,
          name: route.name,
          path: route.path,
          icon: route.meta.icon,
          sort: route.meta.sort,
        }

        if (!route.meta.isRoute && route.children) {
          const children = build(route.children)
          if (children.length > 0) {
            menuItem.children = children
          }
        }

        return menuItem
      })
      .sort((a, b) => (a.sort || 0) - (b.sort || 0))
  }

  return build(routes)
}
