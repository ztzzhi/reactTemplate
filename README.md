# React Admin Template

基于 React 18 + TypeScript + Vite + Ant Design v5 的现代化后台管理系统模板。

## ✨ 特性

- 🚀 **最新技术栈**: React 18 + TypeScript + Vite 4
- 🎨 **UI 组件库**: Ant Design v5
- 📦 **状态管理**: Redux Toolkit + Redux Persist
- 🛣️ **路由管理**: React Router v6
- 🎯 **TypeScript**: 完整的类型支持
- 🌈 **主题切换**: 支持亮色/暗色主题切换
- 🎨 **主题色**: 支持自定义主题色
- 📱 **响应式布局**: 适配各种屏幕尺寸
- 🔐 **权限管理**: 完整的权限路由系统
- 📊 **示例页面**: 包含表格、表单、图表等常用页面
- 🛠️ **工程化**: ESLint + Prettier + EditorConfig
- 🔨 **开发体验**: HMR 热更新

## 📦 技术栈

- **框架**: React 18.2.0
- **构建工具**: Vite 4.4.0
- **语言**: TypeScript 5.1.6
- **UI 框架**: Ant Design 5.19.2
- **状态管理**: Redux Toolkit 2.2.4
- **路由**: React Router DOM 6.10.0
- **HTTP 客户端**: Axios 1.6.0
- **日期处理**: Day.js 1.11.7

## 🚀 快速开始

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 开发环境

```bash
npm run dev
```

访问 http://localhost:3000

默认登录账号：
- 用户名：admin
- 密码：admin123

### 生产构建

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

### 代码格式化

```bash
npm run format
```

## 📁 项目结构

```
reacttemplate/
├── public/                 # 静态资源
│   └── vite.svg
├── src/
│   ├── api/               # API 接口
│   │   ├── index.ts
│   │   └── user.ts
│   ├── assets/            # 资源文件
│   ├── components/        # 公共组件
│   ├── layouts/           # 布局组件
│   │   └── BasicLayout/
│   │       ├── components/
│   │       │   ├── AppHeader.tsx
│   │       │   ├── AppHeader.less
│   │       │   ├── AppSidebar.tsx
│   │       │   └── AppSidebar.less
│   │       ├── index.tsx
│   │       └── index.less
│   ├── pages/             # 页面组件
│   │   ├── Dashboard/
│   │   ├── TableExample/
│   │   ├── FormExample/
│   │   ├── ChartsExample/
│   │   ├── User/
│   │   │   ├── UserList/
│   │   │   └── RoleManagement/
│   │   ├── Settings/
│   │   ├── Login/
│   │   └── NotFound/
│   ├── router/            # 路由配置
│   │   └── index.tsx
│   ├── store/             # Redux 状态管理
│   │   ├── slices/
│   │   │   ├── themeSlice.ts
│   │   │   └── userSlice.ts
│   │   ├── hooks.ts
│   │   └── index.ts
│   ├── styles/            # 全局样式
│   │   └── global.less
│   ├── utils/             # 工具函数
│   │   ├── request.ts
│   │   ├── storage.ts
│   │   └── format.ts
│   ├── App.tsx            # 应用入口组件
│   ├── main.tsx           # 应用入口文件
│   └── vite-env.d.ts      # Vite 类型定义
├── .editorconfig          # 编辑器配置
├── .env                   # 环境变量
├── .env.production        # 生产环境变量
├── .eslintrc.cjs          # ESLint 配置
├── .gitignore             # Git 忽略文件
├── .npmrc                 # npm 配置
├── .prettierrc.cjs        # Prettier 配置
├── index.html             # HTML 模板
├── package.json           # 项目依赖
├── tsconfig.json          # TypeScript 配置
├── tsconfig.node.json     # TypeScript Node 配置
└── vite.config.ts         # Vite 配置
```

## 🎨 主要功能

### 1. 主题切换

- 支持亮色/暗色主题切换
- 支持自定义主题色
- 主题配置持久化存储

### 2. 布局系统

- 响应式侧边栏
- 可折叠菜单
- 固定头部导航
- 面包屑导航

### 3. 路由系统

- 基于 React Router v6
- 嵌套路由支持
- 路由懒加载
- 404 页面处理

### 4. 状态管理

- Redux Toolkit 简化状态管理
- Redux Persist 状态持久化
- TypeScript 类型支持

### 5. HTTP 请求

- Axios 封装
- 请求/响应拦截器
- 统一错误处理
- Token 自动注入

### 6. 示例页面

- **仪表盘**: 数据统计展示
- **表格示例**: 数据表格、搜索、排序
- **表单示例**: 表单验证、提交
- **图表示例**: 图表展示区域
- **用户管理**: 用户列表、角色管理
- **系统设置**: 系统配置

## 🔧 配置说明

### 环境变量

在 `.env` 文件中配置开发环境变量：

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

在 `.env.production` 文件中配置生产环境变量：

```env
VITE_API_BASE_URL=https://api.example.com
```

### 代理配置

在 `vite.config.ts` 中配置开发服务器代理：

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
}
```

## 📝 开发指南

### 添加新页面

1. 在 `src/pages` 目录下创建页面组件
2. 在 `src/router/index.tsx` 中添加路由配置
3. 在侧边栏菜单中添加菜单项（`src/layouts/BasicLayout/components/AppSidebar.tsx`）

### 添加新 API

在 `src/api` 目录下创建对应的 API 文件：

```typescript
import request from '@/utils/request'

export const getList = (params: any) => {
  return request({
    url: '/list',
    method: 'GET',
    params,
  })
}
```

### 添加新的 Redux Slice

在 `src/store/slices` 目录下创建新的 slice：

```typescript
import { createSlice } from '@reduxjs/toolkit'

const mySlice = createSlice({
  name: 'mySlice',
  initialState: {},
  reducers: {},
})

export default mySlice.reducer
```

然后在 `src/store/index.ts` 中引入。

## 🎯 浏览器支持

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## 📄 License

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📮 联系方式

如有问题，请提交 Issue 或联系开发者。
