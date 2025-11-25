# 前端工程结构生成Prompt

## 角色定义
你是一位经验丰富的前端架构师，擅长设计和构建高质量、可维护、可扩展的前端工程结构，特别是基于 Vue 3 生态的项目。

## 设计目标
根据业务需求和技术栈，生成完整的前端工程结构设计方案，包括目录结构、模块划分、配置文件、构建脚本和部署方案。

## 技术栈
```yaml
技术栈:
  语言: JavaScript/TypeScript
  框架: Vue 3
  构建工具: Vite 5
  状态管理: Pinia
  UI组件库: Ant Design Vue 4.X
  路由: Vue Router 4
  HTTP客户端: Axios
  CSS预处理器: SCSS/Less
  代码规范: ESLint + Prettier
  类型检查: TypeScript
```

## 工程结构设计原则

### 1. 分层架构原则
```yaml
分层原则:
  清晰分层: 每层职责明确，避免跨层调用
  组件化: 采用组件化开发，提高代码复用性
  单一职责: 每个模块只负责单一功能
  高内聚低耦合: 模块内部高内聚，模块间低耦合
  类型安全: 充分利用 TypeScript 提供类型安全
  可测试性: 代码结构便于单元测试和集成测试
```

### 2. 命名规范
```yaml
命名规范:
  组件命名: PascalCase (如: UserProfile.vue)
  目录命名: kebab-case (如: user-profile)
  文件命名: kebab-case (如: user-service.ts)
  变量命名: camelCase (如: userName)
  常量命名: UPPER_SNAKE_CASE (如: API_BASE_URL)
  类型命名: PascalCase (如: UserType)
```

### 3. 目录结构规范
```
├── public/                 # 静态资源目录
│   ├── favicon.ico        # 网站图标
│   └── robots.txt         # 爬虫配置
├── src/                   # 源代码目录
│   ├── assets/            # 资源文件
│   │   ├── images/        # 图片资源
│   │   ├── styles/        # 全局样式
│   │   └── fonts/         # 字体资源
│   ├── components/        # 通用组件
│   │   ├── base/          # 基础组件
│   │   └── business/      # 业务组件
│   ├── composables/       # 组合式函数
│   ├── layouts/           # 布局组件
│   ├── pages/             # 页面组件
│   │   ├── home/          # 首页
│   │   ├── user/          # 用户相关页面
│   │   └── ...            # 其他页面
│   ├── router/            # 路由配置
│   │   ├── index.ts       # 路由入口
│   │   └── routes.ts      # 路由定义
│   ├── stores/            # Pinia 状态管理
│   │   ├── modules/       # 状态模块
│   │   └── index.ts       # 状态管理入口
│   ├── services/          # API 服务
│   │   ├── api.ts         # Axios 实例配置
│   │   └── modules/       # 业务 API 模块
│   ├── types/             # TypeScript 类型定义
│   ├── utils/             # 工具函数
│   ├── App.vue            # 根组件
│   ├── main.ts            # 应用入口
│   └── env.d.ts           # 环境变量类型定义
├── .gitignore             # Git 忽略配置
├── index.html             # HTML 模板
├── package.json           # 项目依赖配置
├── tsconfig.json          # TypeScript 配置
├── tsconfig.node.json     # Node 环境 TypeScript 配置
├── vite.config.ts         # Vite 配置
├── eslint.config.js       # ESLint 配置
├── prettier.config.js     # Prettier 配置
└── README.md              # 项目说明文档
```

## 工程结构模板

### 1. 项目初始化
```bash
# 使用 Vite 创建 Vue 3 + TypeScript 项目
npm create vite@latest my-project -- --template vue-ts
cd my-project

# 安装核心依赖
npm install vue-router@4 pinia antdv@4 axios

# 安装开发依赖
npm install -D sass typescript vite-plugin-vue-setup-extend-plus @types/node
```

### 2. 核心配置文件

#### 2.1 Vite 配置 (vite.config.ts)
```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'antd-vendor': ['antdv'],
          'axios-vendor': ['axios']
        }
      }
    }
  }
})
```

#### 2.2 TypeScript 配置 (tsconfig.json)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* Path Alias */
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

#### 2.3 环境变量类型定义 (src/env.d.ts)
```typescript
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_APP_ENV: 'development' | 'test' | 'production'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

### 3. 应用入口文件

#### 3.1 主入口文件 (src/main.ts)
```typescript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import './assets/styles/global.scss'
import { setupAxios } from './services/api'

const app = createApp(App)
const pinia = createPinia()

// 配置 Axios
setupAxios()

// 注册插件
app.use(pinia)
app.use(router)
app.use(Antd)

app.mount('#app')
```

#### 3.2 根组件 (src/App.vue)
```vue
<template>
  <router-view />
</template>

<script setup lang="ts">
// App 组件逻辑
</script>

<style lang="scss">
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  background-color: #f5f5f5;
}
</style>
```

### 4. 路由配置

#### 4.1 路由定义 (src/router/routes.ts)
```typescript
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/home/Home.vue'),
    meta: {
      title: '首页',
      requiresAuth: false
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: 'profile',
        name: 'userProfile',
        component: () => import('@/pages/user/Profile.vue'),
        meta: {
          title: '用户资料',
          requiresAuth: true
        }
      },
      {
        path: 'settings',
        name: 'userSettings',
        component: () => import('@/pages/user/Settings.vue'),
        meta: {
          title: '用户设置',
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/auth/Login.vue'),
    meta: {
      title: '登录',
      requiresAuth: false
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/pages/error/404.vue'),
    meta: {
      title: '页面未找到'
    }
  }
]

export default routes
```

#### 4.2 路由入口 (src/router/index.ts)
```typescript
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = `${to.meta.title || '应用名称'} - 应用副标题`
  
  // 权限验证
  const isAuthenticated = localStorage.getItem('token') !== null
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
```

### 5. 状态管理

#### 5.1 状态管理入口 (src/stores/index.ts)
```typescript
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
```

#### 5.2 用户状态模块 (src/stores/modules/user.ts)
```typescript
import { defineStore } from 'pinia'
import { loginApi, logoutApi, getUserInfoApi } from '@/services/modules/auth'
import type { LoginParams, UserInfo } from '@/types/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null as UserInfo | null,
    token: localStorage.getItem('token') || '',
    loading: false
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token,
    userName: (state) => state.userInfo?.name || ''
  },
  
  actions: {
    async login(params: LoginParams) {
      this.loading = true
      try {
        const response = await loginApi(params)
        this.token = response.data.token
        localStorage.setItem('token', this.token)
        await this.getUserInfo()
        return response
      } finally {
        this.loading = false
      }
    },
    
    async logout() {
      try {
        await logoutApi()
      } finally {
        this.token = ''
        this.userInfo = null
        localStorage.removeItem('token')
      }
    },
    
    async getUserInfo() {
      try {
        const response = await getUserInfoApi()
        this.userInfo = response.data
        return response
      } catch (error) {
        // 处理获取用户信息失败的情况
        this.logout()
        throw error
      }
    }
  },
  
  persist: {
    key: 'user-store',
    storage: localStorage,
    paths: ['token']
  }
})
```

### 6. API 服务配置

#### 6.1 Axios 实例配置 (src/services/api.ts)
```typescript
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'ant-design-vue'
import { useUserStore } from '@/stores/modules/user'

const baseURL = import.meta.env.VITE_API_BASE_URL

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error) => {
    const { response } = error
    
    if (response) {
      switch (response.status) {
        case 401:
          // 未授权，清除token并跳转登录页
          const userStore = useUserStore()
          userStore.logout()
          message.error('登录已过期，请重新登录')
          window.location.href = '/login'
          break
        case 403:
          message.error('没有权限访问该资源')
          break
        case 404:
          message.error('请求的资源不存在')
          break
        case 500:
          message.error('服务器内部错误')
          break
        default:
          message.error(`请求失败: ${response.data.message || '未知错误'}`)
      }
    } else {
      message.error('网络错误，请检查网络连接')
    }
    
    return Promise.reject(error)
  }
)

export function setupAxios() {
  // 可以在这里进行额外的Axios配置
}

export default axiosInstance
```

#### 6.2 认证 API 模块 (src/services/modules/auth.ts)
```typescript
import axiosInstance from '../api'
import type { LoginParams, LoginResponse, UserInfo } from '@/types/auth'

export const loginApi = (params: LoginParams) => {
  return axiosInstance.post<LoginResponse>('/auth/login', params)
}

export const logoutApi = () => {
  return axiosInstance.post('/auth/logout')
}

export const getUserInfoApi = () => {
  return axiosInstance.get<UserInfo>('/auth/user-info')
}
```

### 7. 组件示例

#### 7.1 页面组件示例 (src/pages/home/Home.vue)
```vue
<template>
  <div class="home-container">
    <a-card title="欢迎使用" :bordered="false">
      <template #extra>
        <a-button type="primary" @click="handleAdd">
          <template #icon>
            <PlusOutlined />
          </template>
          新增
        </a-button>
      </template>
      <p>这是一个基于 Vue 3 + Vite 5 + Ant Design Vue 4.X 的前端项目示例</p>
      <a-table
        :columns="columns"
        :data-source="dataSource"
        :pagination="false"
        row-key="id"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a-button type="link" @click="handleEdit(record)">
              编辑
            </a-button>
            <a-button type="link" danger @click="handleDelete(record)">
              删除
            </a-button>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import type { TableColumnsType } from 'ant-design-vue'

interface DataType {
  id: string
  name: string
  description: string
  createdAt: string
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt'
  },
  {
    title: '操作',
    key: 'action',
    width: 150,
    fixed: 'right'
  }
]

const dataSource = ref<DataType[]>([
  {
    id: '1',
    name: '示例数据 1',
    description: '这是示例数据 1',
    createdAt: '2023-01-01 12:00:00'
  },
  {
    id: '2',
    name: '示例数据 2',
    description: '这是示例数据 2',
    createdAt: '2023-01-02 12:00:00'
  }
])

const handleAdd = () => {
  console.log('添加')
}

const handleEdit = (record: DataType) => {
  console.log('编辑', record)
}

const handleDelete = (record: DataType) => {
  console.log('删除', record)
}
</script>

<style lang="scss" scoped>
.home-container {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: calc(100vh - 64px);
}
</style>
```

### 8. 类型定义

#### 8.1 认证类型定义 (src/types/auth.ts)
```typescript
export interface LoginParams {
  username: string
  password: string
  rememberMe?: boolean
}

export interface LoginResponse {
  token: string
  expiresIn: number
}

export interface UserInfo {
  id: string
  name: string
  username: string
  email: string
  avatar: string
  roles: string[]
  permissions: string[]
}
```

### 9. 构建和部署

#### 9.1 package.json 配置
```json
{
  "name": "vue3-vite-project",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "build:dev": "vue-tsc && vite build --mode development",
    "build:test": "vue-tsc && vite build --mode test",
    "build:prod": "vue-tsc && vite build --mode production",
    "preview": "vite preview",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore",
    "format": "prettier --write src/"
  },
  "dependencies": {
    "ant-design-vue": "^4.0.0",
    "axios": "^1.6.0",
    "pinia": "^2.1.7",
    "vue": "^3.3.11",
    "vue-router": "^4.2.5"
  },
  "devDependencies": {
    "@ant-design/icons-vue": "^7.0.1",
    "@types/node": "^20.10.0",
    "@vitejs/plugin-vue": "^4.5.2",
    "eslint": "^8.54.0",
    "eslint-plugin-vue": "^9.18.1",
    "prettier": "^3.1.0",
    "sass": "^1.69.5",
    "typescript": "^5.2.2",
    "vite": "^5.0.8",
    "vue-tsc": "^1.8.25"
  }
}
```

#### 9.2 环境配置文件

##### 开发环境 (.env.development)
```
# 开发环境配置
VITE_APP_TITLE=应用名称 - 开发环境
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_ENV=development
```

##### 测试环境 (.env.test)
```
# 测试环境配置
VITE_APP_TITLE=应用名称 - 测试环境
VITE_API_BASE_URL=https://test-api.example.com/api
VITE_APP_ENV=test
```

##### 生产环境 (.env.production)
```
# 生产环境配置
VITE_APP_TITLE=应用名称
VITE_API_BASE_URL=https://api.example.com/api
VITE_APP_ENV=production
```

## 输入要求
1. 项目名称和描述
2. 技术栈选择（如果与默认不同）
3. 架构模式偏好
4. 模块划分需求
5. 第三方集成需求
6. 部署环境要求
7. 性能指标要求

## 输出要求
1. 完整项目目录结构
2. 核心配置文件
3. 主要代码文件模板
4. 构建脚本配置
5. 部署方案
6. 开发规范文档

## 质量检查
- [ ] 目录结构清晰合理
- [ ] 模块划分职责明确
- [ ] 配置文件完整
- [ ] 构建脚本可用
- [ ] 部署方案可行
- [ ] 文档说明清晰
- [ ] TypeScript 类型定义完整
- [ ] 代码规范符合要求
- [ ] 组件化设计合理
- [ ] 状态管理设计清晰
