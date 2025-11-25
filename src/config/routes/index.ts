import type { RouteConfig } from '@/types/router'
import { basicRoutes } from './basic'
import { purchaseRoutes } from './purchase'

/**
 * 所有路由配置
 */
export const allRoutes: RouteConfig[] = [...basicRoutes, ...purchaseRoutes]

/**
 * Mock 用户权限列表
 * 实际项目中应该从后端获取
 */
export const mockUserPermissions = [
  // Dashboard
  'dashboard:view',

  // 系统管理
  'system:management:view',
  'system:management:create',
  'system:management:edit',
  'system:permission:test',

  // 示例页面
  'examples:table:view',
  'examples:form:view',
  'examples:charts:view',

  // 用户管理
  'user:list:view',
  'user:create',
  'user:edit',
  'user:delete',
  'user:roles:view',
  'user:roles:create',
  'user:roles:edit',

  // 采购管理 - 合同
  'purchase:contract:view',
  'purchase:contract:detail',
  'purchase:contract:create',
  'purchase:contract:edit',
  'purchase:contract:delete',
  'purchase:contract:audit',
  'purchase:contract:export',
  'purchase:contract:draft',
  'purchase:contract:submit',
  'purchase:contract:history',
  'purchase:contract:print',

  // 采购管理 - 供应商
  'purchase:supplier:view',
  'purchase:supplier:register',
  'purchase:supplier:evaluate',
  'purchase:supplier:audit',
  'purchase:supplier:approve',

  // 数据统计
  'statistics:view',
  'statistics:export',
  // 个人中心
  'profile:view',
  'profile:edit',
  // 帮助中心
  'help:view',
  // 关于我们
  'about:view',
  // 系统设置
  'settings:view',
  'settings:edit',
]
