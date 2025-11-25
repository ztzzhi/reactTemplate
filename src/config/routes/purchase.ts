import type { RouteConfig } from '@/types/router'

export const purchaseRoutes: RouteConfig[] = [
  {
    key: 'purchase-root',
    name: '采购管理',
    path: '/purchase',
    meta: {
      isRoute: false,
      isMenu: true,
      icon: 'shopping',
      sort: 1,
    },
    children: [
      // --- 合同管理 ---
      {
        key: 'contract-index',
        name: '合同管理',
        path: '/purchase/contract',
        meta: {
          isRoute: false,
          isMenu: true,
          icon: 'file-contract',
          sort: 2,
        },
        children: [
          {
            key: 'contract-list',
            name: '合同列表',
            path: '/purchase/contract/list',
            resourcePath: '../pages/Purchase/Contract/index.tsx',
            meta: {
              isRoute: true,
              isMenu: true,
              sort: 10,
              permissionKey: 'purchase:contract:view',
              accessControlList: [
                { code: 'purchase:contract:list', name: '查看合同列表', type: 'page' },
                { code: 'purchase:contract:view', name: '查看合同详情', type: 'operation' },
                { code: 'purchase:contract:add', name: '新建合同', type: 'operation' },
                { code: 'purchase:contract:edit', name: '编辑合同', type: 'operation' },
                { code: 'purchase:contract:delete', name: '删除合同', type: 'operation' },
                { code: 'purchase:contract:audit', name: '审核合同', type: 'operation' },
                { code: 'purchase:contract:export', name: '导出合同', type: 'operation' },
              ],
            },
          },
          {
            key: 'contract-create',
            name: '创建合同',
            path: '/purchase/contract/create',
            resourcePath: '../pages/Purchase/Contract/create.tsx',
            meta: {
              isRoute: true,
              isMenu: false, // 不显示在菜单中
              permissionKey: 'purchase:contract:create',
              accessControlList: [
                { code: 'purchase:contract:create', name: '创建合同', type: 'page' },
                { code: 'purchase:contract:save', name: '保存草稿', type: 'operation' },
                { code: 'purchase:contract:submit', name: '提交审批', type: 'operation' },
              ],
            },
          },
          {
            key: 'contract-detail',
            name: '合同详情',
            path: '/purchase/contract/detail/:id',
            resourcePath: '../pages/Purchase/Contract/detail/index.tsx',
            meta: {
              isRoute: true,
              isMenu: false,
              permissionKey: 'purchase:contract:detail',
              accessControlList: [
                { code: 'purchase:contract:detail', name: '查看合同详情', type: 'page' },
                { code: 'purchase:contract:version', name: '查看历史版本', type: 'operation' },
                { code: 'purchase:contract:print', name: '打印合同', type: 'operation' },
                { code: 'purchase:contract:terminate', name: '终止合同', type: 'operation' },
              ],
            },
          },
        ],
      },
      // --- 供应商管理 ---
      {
        key: 'supplier-index',
        name: '供应商管理',
        path: '/purchase/supplier',
        meta: {
          isRoute: false,
          isMenu: true,
          icon: 'team',
          sort: 13,
        },
        children: [
          {
            key: 'supplier-list',
            name: '供应商列表',
            path: '/purchase/supplier/list',
            resourcePath: '../pages/Supplier/Info/index.tsx',
            meta: {
              isRoute: true,
              isMenu: true,
              sort: 14,
              permissionKey: 'purchase:supplier:view',
              accessControlList: [
                { code: 'purchase:supplier:view', name: '查看供应商列表', type: 'page' },
                { code: 'purchase:supplier:register', name: '供应商注册', type: 'operation' },
                { code: 'purchase:supplier:evaluate', name: '绩效评估', type: 'operation' },
                { code: 'purchase:supplier:blacklist', name: '加入黑名单', type: 'operation' },
              ],
            },
          },
          {
            key: 'supplier-audit',
            name: '资质审核',
            path: '/purchase/supplier/audit',
            resourcePath: '../pages/Supplier/Audit/index.tsx',
            meta: {
              isRoute: true,
              isMenu: true,
              sort: 15,
              permissionKey: 'purchase:supplier:audit',
              accessControlList: [
                { code: 'purchase:supplier:audit', name: '资质审核', type: 'page' },
                { code: 'purchase:supplier:approve', name: '通过审核', type: 'operation' },
                { code: 'purchase:supplier:reject', name: '拒绝申请', type: 'operation' },
              ],
            },
          },
        ],
      },
    ],
  },
]
