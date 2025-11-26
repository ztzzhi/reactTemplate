# 项目技术方案（路由 / 权限 / 面包屑 / 懒加载）

## 1. 架构切面概览

- **配置即架构**：所有页面元数据集中在 `src/config/routes/*.ts`，结合 `src/types/router.ts` 的类型约束，统一声明路径、菜单、权限、资源文件。
- **单一数据源驱动**：`allRoutes` 同时喂给路由系统、侧边菜单、面包屑、权限面板，确保 UI 同步演进。
- **布局分层**：`src/layouts/BasicLayout` 将 App 切成 Sidebar（导航）、Header（主题/面包屑/用户）、Content（`<Outlet />`），路由仅负责页面内容。

## 2. 路由管理（从模型到运行）

1. **路由模型**  
   `RouteConfig` 拆成 `MenuRouteConfig` 与 `RealRouteConfig`，借助 `isRoute` / `isMenu` 元信息明确“是否渲染菜单”与“是否对应实际页面”，并强制真实路由必须提供 `permissionKey` 与 `accessControlList`。
2. **配置分包**
   - `basicRoutes`：仪表盘、系统管理、示例、用户、统计等基础模块。
   - `purchaseRoutes`：采购场景的合同、供应商多级菜单。
   - `allRoutes`：通过展开数组形成统一输入，便于后续扩展新模块而不触碰核心逻辑。
3. **辅助方法** (`src/utils/routeHelper.ts`)
   - `flattenRoutes`：仅提取 `meta.isRoute` 为 true 的节点，生成 `{ path, key, resourcePath, permissionKey }` 列表，供 `react-router` 与权限模块复用。
   - `filterRoutesByPermissions`：以权限集合过滤树并自动剔除空菜单。
   - `buildMenuTree`：生成纯菜单结构用于 Sidebar。
4. **运行态生成路由** (`src/router/index.tsx`)
   - 启动时执行 `createRouteConfig()`，避免组件重渲染时重复构建。
   - 利用 `useRoutes` 注入：根路径自动重定向到第一个可访问页面；`BasicLayout` 承载所有业务子路由；`/login`、`/404`、通配符单独兜底。
   - 每个子路由的 `element` 通过 `getLazyComponent(route.resourcePath)` 动态解析，保证配置与页面文件路径强绑定。

## 3. 权限管理（数据->过滤->表现）

1. **权限声明**
   - 在路由层声明 `permissionKey`（决定是否能访问页面）和 `accessControlList`（列出页面下的按钮/操作权限）。
   - 权限 code 命名遵循 `模块:资源:动作`，便于后端/网关统一管理。
2. **权限来源**
   - Demo 环境通过 `mockUserPermissions`（`src/config/routes/index.ts`）模拟后端下发。
   - `src/store/slices/userSlice.ts` 在登录时记录 `token`、`userInfo.permissions`，后续可挂到 `filterRoutesByPermissions` 或接口入参。
3. **路由/菜单过滤**
   - 登录后根据用户权限对 `allRoutes` 做过滤，最终 Sidebar 与 `<Route>` 都只保留用户可达的节点，规避“菜单能点但路由 404”的体验问题。
   - 可在服务端返回菜单树时直接复用相同 schema，前后端协同成本更低。
4. **权限可视化配置** (`src/components/PermissionBox`)
   - 以路由树为输入，自动生成权限矩阵（左侧模块，右侧勾选表），支持全选 / 行选 / 粒度选择，方便运营或管理员配置账号权限。
   - 递归转换、收集权限 code、受控/非受控双模式，都为二次封装埋点。

## 4. 导航体系（面包屑 & Sidebar 的闭环）

1. **Sidebar**
   - `AppSidebar`（`BasicLayout/components`）基于 `buildMenuTree` 的结果渲染可折叠菜单，借助 `themeSlice` 控制收缩、主题色等 UI 状态。
   - 因菜单树来源与路由一致，所以增删页面无需再同步手写菜单。
2. **面包屑** (`src/components/Breadcrumb`)
   - 依赖 `useLocation()` 获取当前路径，从 `allRoutes` 找到节点及祖先链。
   - 首页固定展示并可点击回跳，其余层级仅展示路径，保证“路径深度==父子路由深度”。
   - 面包屑不需要额外配置，所有新增页面自动继承层级信息，讲解项目时可强调“面包屑 = 路由树视图投影”这一设计。

## 5. 懒加载路由（设计与收益）

1. **实现方式**
   - `import.meta.glob('../pages/**/*.tsx')` 在构建期生成页面模块映射。
   - `getLazyComponent(resourcePath)` 动态匹配配置中的 `resourcePath`，并通过 `lazyLoad()` 包装 `React.lazy()`。
   - `lazyFix` 在真正渲染前并行执行模块加载与 200ms 延迟 Promise，缓解骨架闪烁问题；外层 `React.Suspense` 用 `#page_loading_wrap` 兜底。
   - 当配置指向无效路径时自动回退到 `NotFound`，提升调试体验。
2. **为什么要用**
   - **性能**：首次白屏仅下载布局 + 首屏业务页面，其他模块按需加载，特别适合本项目这种多模块后台。
   - **与配置解耦**：新增页面只需填写 `resourcePath`，无需在路由文件里手写 `import()`。
   - **配合权限**：由于懒加载在路由渲染时才触发，被权限过滤掉的页面不会被请求，节省带宽。
   - **容错 & 体验**：`lazyFix` 统一处理 loading 态，可扩展为骨架屏；集中入口便于接入错误边界、埋点等。

## 6. 讲解思路建议（层层递进）

1. **先讲模型**：从 `RouteConfig`/`meta` 说起，强调“一个配置决定菜单、路由、权限、面包屑”。
2. **再讲路由运行链路**：配置 -> `flattenRoutes` -> `useRoutes`，顺带带出懒加载。
3. **随后权限治理**：展示 `permissionKey`、`filterRoutesByPermissions`、`PermissionBox` 如何协同。
4. **最后展示导航体验**：Sidebar 与面包屑如何自动生成，以及主题切换、用户信息等附加能力。
5. **收尾提性能与扩展**：懒加载收益、模块拆分方式、未来如何把 `mockUserPermissions` 替换为真实接口。

通过以上拆解，你可以从“数据模型 -> 运行机制 -> 用户体验 -> 性能优化”四个层次递进讲述该项目的技术方案，既能展示架构思路，又能落到可感知的业务价值。
