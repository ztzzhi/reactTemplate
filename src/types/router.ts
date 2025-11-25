export interface AccessControlItem {
  code: string
  name: string
  type: 'page' | 'operation'
}

/**
 * 基础路由元信息（适用于所有路由节点）
 */
interface BaseRouteMeta {
  isRoute: boolean
  isMenu: boolean
  icon?: string
  sort?: number
}

/**
 * 菜单节点的元信息（isRoute: false）
 */
export interface MenuRouteMeta extends BaseRouteMeta {
  isRoute: false
  permissionKey?: never // 明确不允许
  accessControlList?: never // 明确不允许
}

/**
 * 真实路由节点的元信息（isRoute: true）
 */
export interface RealRouteMeta extends BaseRouteMeta {
  isRoute: true
  permissionKey: string // 必须提供
  accessControlList: AccessControlItem[] // 必须提供
}

/**
 * 菜单节点配置（isRoute: false）
 */
export interface MenuRouteConfig {
  key: string
  name: string
  path: string
  resourcePath?: never // 明确不允许
  meta: MenuRouteMeta
  children?: RouteConfig[] // 可以是任意类型的子路由
}

/**
 * 真实路由节点配置（isRoute: true）
 */
export interface RealRouteConfig {
  key: string
  name: string
  path: string
  resourcePath: string // 必须提供
  meta: RealRouteMeta
  children?: never // 真实路由不能有子路由
}

/**
 * 联合类型：一个路由节点要么是菜单节点，要么是真实路由节点
 */
export type RouteConfig = MenuRouteConfig | RealRouteConfig

/**
 * 扁平化路由信息（仅包含真实路由）
 */
export interface FlatRouteInfo {
  path: string
  key: string
  name: string
  permissionKey: string
  accessControlList: AccessControlItem[]
  resourcePath: string
}

/**
 * 菜单项配置
 */
export interface MenuItem {
  key: string
  name: string
  path: string
  icon?: string
  sort?: number
  children?: MenuItem[]
}
