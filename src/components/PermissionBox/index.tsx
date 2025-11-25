/*
PermissionBox.tsx
权限配置组件
实现左侧菜单、右侧树形权限表格的权限配置界面

主要功能：
- 左侧菜单：显示一级权限模块
- 右侧表格：树形展示选中模块的权限结构
- 权限选择：支持单项、行级、全局全选
- 数据处理：路由数据转换为权限数据，支持多级嵌套
- 状态管理：支持受控/非受控模式

关键逻辑：
1. 数据转换：RouteConfig -> PermissionRouteItem，递归处理嵌套结构
2. 菜单过滤：只显示有权限控制或有子节点的第一级菜单
3. 权限查找：根据key递归查找权限项及其子树
4. 选择逻辑：维护全局选中状态，支持全选/反选
5. 树形渲染：递归渲染权限树，支持多级展开
*/

import React, { useEffect, useState, useCallback } from 'react'
import { Checkbox, Spin } from 'antd'
import type { RouteConfig, AccessControlItem } from '@/types/router'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import { allRoutes } from '@/config/routes'
import './index.less'

// ===================== 类型定义 =====================
interface PermissionRouteItem {
  key: string
  name: string
  path: string
  level?: number // 嵌套层级
  parentKey?: string // 父级key
  children?: PermissionRouteItem[]
  accessControlList?: AccessControlItem[]
}

// 组件 props
interface PermissionBoxProps {
  value?: string[] // 受控：所有已选权限id数组
  onChange?: (allCheckedIds: string[]) => void // 所有已选权限id数组
}

const PermissionBox: React.FC<PermissionBoxProps> = ({ value, onChange }) => {
  // ========== State ==========
  const [innerValue, setInnerValue] = useState<string[]>([])
  const checkedValue = value !== undefined ? value : innerValue
  const [rootMenus, setRootMenus] = useState<PermissionRouteItem[]>([])
  const [selectedMenuKey, setSelectedMenuKey] = useState<string>('')
  const [currentChildren, setCurrentChildren] = useState<PermissionRouteItem[]>([])
  const [loading, setLoading] = useState(false)

  // ========== 数据转换：路由配置 -> 权限数据 ==========
  const convertRoutesToPermissionData = useCallback(
    (routes: RouteConfig[], level = 0, parentKey = ''): PermissionRouteItem[] => {
      return routes.map((route) => {
        const permissionItem: PermissionRouteItem = {
          key: route.key,
          name: route.name,
          path: route.path,
          level,
          parentKey,
        }
        // 有权限控制
        if (route.meta?.accessControlList) {
          permissionItem.accessControlList = route.meta?.accessControlList
        }
        // 递归处理子路由
        if (route.children?.length) {
          permissionItem.children = convertRoutesToPermissionData(route.children, level + 1, route.key)
        }
        return permissionItem
      })
    },
    [],
  )

  // ========== 菜单过滤：只显示有权限的第一级菜单 ==========
  const getMenuItems = (items: PermissionRouteItem[]): PermissionRouteItem[] => {
    return items.filter((item) => item.accessControlList || item.children?.length)
  }

  // ========== 权限查找：递归查找指定key的权限项 ==========
  const findPermissionItemByKey = useCallback(
    (key: string, items: PermissionRouteItem[]): PermissionRouteItem | null => {
      for (const item of items) {
        if (item.key === key) return item
        if (item.children?.length) {
          const found = findPermissionItemByKey(key, item.children)
          if (found) return found
        }
      }
      return null
    },
    [],
  )

  // ========== 初始化：转换路由数据并设置默认选中 ==========
  useEffect(() => {
    const permissionData = convertRoutesToPermissionData(allRoutes)
    const menuItems = getMenuItems(permissionData)
    setRootMenus(menuItems)
    if (menuItems.length > 0) {
      setSelectedMenuKey(menuItems[0].key)
    }
  }, [convertRoutesToPermissionData])

  // ========== 菜单切换：更新右侧权限树 ==========
  useEffect(() => {
    if (!selectedMenuKey) {
      setCurrentChildren([])
      return
    }

    setLoading(true)
    const permissionData = convertRoutesToPermissionData(allRoutes)
    const selectedItem = findPermissionItemByKey(selectedMenuKey, permissionData)
    console.log(selectedItem, 'selectedItem')
    setCurrentChildren(selectedItem ? [selectedItem] : [])
    setLoading(false)
  }, [selectedMenuKey, convertRoutesToPermissionData, findPermissionItemByKey])

  // ========== 递归收集权限辅助函数 ==========
  const collectPermissions = useCallback((items: PermissionRouteItem[]): string[] => {
    return items.flatMap((item) => [
      ...(item.accessControlList?.map((f) => f.code) ?? []),
      ...(item.children?.length ? collectPermissions(item.children) : []),
    ])
  }, [])

  // ========== 权限统计：全选状态计算 ==========
  const currentMenuPermissions = collectPermissions(currentChildren)
  console.log(currentMenuPermissions, 'currentMenuPermissions')
  const checkedCurrentPermissions = checkedValue.filter((id) => currentMenuPermissions.includes(id))
  console.log(checkedCurrentPermissions, 'checkedCurrentPermissions')
  const isAllChecked =
    currentMenuPermissions.length > 0 && currentMenuPermissions.every((id) => checkedCurrentPermissions.includes(id))

  // ========== 状态更新：统一处理选中状态变化 ==========
  const updateChecked = useCallback(
    (newChecked: string[]) => {
      if (value !== undefined) {
        onChange?.(newChecked)
      } else {
        setInnerValue(newChecked)
      }
    },
    [value, onChange],
  )

  // ========== 全选处理 ==========
  const handleCheckAll = useCallback(
    (e: CheckboxChangeEvent) => {
      if (e.target.checked) {
        // 递归收集当前菜单树的所有权限
        const currentMenuPermissions = collectPermissions(currentChildren)
        const otherPermissions = checkedValue.filter((id) => !currentMenuPermissions.includes(id))
        updateChecked([...otherPermissions, ...currentMenuPermissions])
      } else {
        // 递归移除当前菜单树的所有权限
        const currentMenuPermissions = collectPermissions(currentChildren)
        const remainingPermissions = checkedValue.filter((id) => !currentMenuPermissions.includes(id))
        updateChecked(remainingPermissions)
      }
    },
    [currentChildren, checkedValue, updateChecked, collectPermissions],
  )

  // ========== 树形渲染：递归渲染权限树 ==========
  const renderPermissionTree = useCallback(
    (items: PermissionRouteItem[]): JSX.Element[] => {
      return items.map((item) => {
        const hasChildren = item.children?.length
        const hasPermissions = item.accessControlList?.length

        return (
          <div key={item.key}>
            {hasPermissions && (
              <div className="permission-demo-table-row">
                <div className="permission-demo-group-name">{item.name}</div>
                <div className="permission-demo-permissions">
                  <Checkbox.Group
                    value={checkedValue.filter((id) => item.accessControlList?.some((f) => f.code === id))}
                    onChange={(vals) => {
                      const rowIds = item.accessControlList?.map((f) => f.code) ?? []
                      const otherIds = checkedValue.filter((id) => !rowIds.includes(id))
                      updateChecked([...otherIds, ...(vals as string[])])
                    }}
                    style={{ width: '100%' }}
                  >
                    {item.accessControlList?.map((func) => (
                      <div key={func.code} className="permission-demo-checkbox-item" title={func.name}>
                        <Checkbox value={func.code}>{func.name}</Checkbox>
                      </div>
                    ))}
                  </Checkbox.Group>
                </div>
                <div className="permission-demo-checkbox-all">
                  <Checkbox
                    checked={
                      !!item.accessControlList?.length &&
                      item.accessControlList.every((func) => checkedValue.includes(func.code))
                    }
                    indeterminate={
                      item.accessControlList?.some((func) => checkedValue.includes(func.code)) &&
                      !item.accessControlList?.every((func) => checkedValue.includes(func.code))
                    }
                    onChange={(e: CheckboxChangeEvent) => {
                      const rowIds = item.accessControlList?.map((f) => f.code) ?? []
                      if (e.target.checked) {
                        updateChecked(Array.from(new Set([...checkedValue, ...rowIds])))
                      } else {
                        updateChecked(checkedValue.filter((id) => !rowIds.includes(id)))
                      }
                    }}
                  />
                </div>
              </div>
            )}

            {hasChildren && renderPermissionTree(item.children!)}
          </div>
        )
      })
    },
    [checkedValue, updateChecked],
  )

  // ========== 菜单点击处理 ==========
  const handleMenuClick = (key: string) => {
    setSelectedMenuKey(key)
  }

  // ========== 渲染 ==========
  return (
    <div className="permission-demo-container">
      {/* 左侧菜单树 */}
      <div className="permission-demo-menu">
        <div className="menu-title">权限模块</div>
        <div style={{ flex: 1, overflow: 'auto' }}>
          {rootMenus.map((item) => (
            <div
              key={item.key}
              className={`menu-item${selectedMenuKey === item.key ? ' active' : ''}${item.level ? ` level-${item.level}` : ''}`}
              onClick={() => handleMenuClick(item.key)}
              title={item.name}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
      {/* 右侧权限表格 */}
      <div className="permission-demo-table">
        <div className="table-outer">
          {/* 表头：模块名称、权限名称、全选 */}
          <div className="permission-demo-table-header">
            <div className="header-group-name">模块名称</div>
            <div className="header-permissions">权限名称</div>
            <div className="header-checkbox-all">
              <Checkbox
                checked={isAllChecked}
                indeterminate={checkedCurrentPermissions.length > 0 && !isAllChecked}
                onChange={handleCheckAll}
                className={`permission-demo-checkbox-all${isAllChecked ? ' checked' : ''}`}
              >
                全选
              </Checkbox>
            </div>
          </div>
          {/* 表体：树形展示权限结构 */}
          <div className="permission-demo-table-body">
            {loading ? (
              <Spin />
            ) : currentChildren.length > 0 ? (
              renderPermissionTree(currentChildren)
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>暂无权限配置</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PermissionBox
