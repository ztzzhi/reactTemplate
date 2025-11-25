/**
 * 角色权限配置
 * 定义不同角色对应的权限列表
 */

export interface RolePermissions {
  [roleName: string]: string[]
}

export const ROLE_PERMISSIONS: RolePermissions = {
  // 管理员 - 拥有所有权限
  admin: [
    'login:view',
    'dashboard:view',

    // 系统管理
    'system:management:view',
    'system:management:create',
    'system:management:edit',
    'system:management:delete',
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
  ],

  // 普通用户 - 基础权限
  user: [
    'login:view',
    'dashboard:view',
    'examples:table:view',
    'examples:form:view',
    'profile:view',
    'profile:edit',
    'help:view',
    'about:view',
  ],

  // 访客 - 最小权限
  guest: ['login:view', 'dashboard:view', 'profile:view', 'help:view'],

  // 采购专员 - 采购相关权限
  purchaser: [
    'login:view',
    'dashboard:view',
    'purchase:contract:view',
    'purchase:contract:detail',
    'purchase:contract:create',
    'purchase:contract:edit',
    'purchase:contract:draft',
    'purchase:contract:submit',
    'purchase:contract:history',
    'purchase:contract:print',
    'purchase:supplier:view',
    'purchase:supplier:register',
    'statistics:view',
    'profile:view',
    'profile:edit',
  ],

  // 审核员 - 审核相关权限
  auditor: [
    'login:view',
    'dashboard:view',
    'purchase:contract:view',
    'purchase:contract:detail',
    'purchase:contract:audit',
    'purchase:supplier:view',
    'purchase:supplier:evaluate',
    'purchase:supplier:audit',
    'statistics:view',
    'profile:view',
    'profile:edit',
  ],
}

/**
 * 用户角色映射
 * 定义用户账号对应的角色
 */
export interface UserRole {
  username: string
  role: string
  name?: string
}

export const USER_ROLES: UserRole[] = [
  { username: 'admin', role: 'admin', name: '系统管理员' },
  { username: 'user', role: 'user', name: '普通用户' },
  { username: 'guest', role: 'guest', name: '访客' },
  { username: 'purchaser', role: 'purchaser', name: '采购专员' },
  { username: 'auditor', role: 'auditor', name: '审核员' },
]

/**
 * 根据用户名获取用户权限
 * @param username 用户名
 * @returns 权限列表
 */
export const getUserPermissions = (username: string): string[] => {
  const userRole = USER_ROLES.find((user) => user.username === username)
  if (!userRole) {
    // 默认返回访客权限
    return ROLE_PERMISSIONS.guest
  }
  return ROLE_PERMISSIONS[userRole.role] || []
}

/**
 * 根据用户名获取用户角色信息
 * @param username 用户名
 * @returns 用户角色信息
 */
export const getUserRole = (username: string): UserRole | undefined => {
  return USER_ROLES.find((user) => user.username === username)
}

/**
 * 获取所有可用角色
 * @returns 角色列表
 */
export const getAllRoles = (): string[] => {
  return Object.keys(ROLE_PERMISSIONS)
}
