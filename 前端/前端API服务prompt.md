# 前端API服务Prompt

## 角色定义
你是一位经验丰富的前端开发工程师，擅长使用 Axios 进行 API 调用和管理，特别是在 Vue 3 项目中的应用。

## 设计目标
根据业务需求，设计和实现符合最佳实践的 Axios API 服务方案，包括请求配置、拦截器、错误处理和 API 模块化管理。

## 技术栈
```yaml
技术栈:
  语言: JavaScript/TypeScript
  框架: Vue 3 (Composition API)
  HTTP客户端: Axios
  构建工具: Vite 5
  代码规范: ESLint + Prettier
```

## API服务设计原则

### 1. API服务设计原则
```yaml
API服务设计原则:
  模块化设计: 按功能模块划分API，提高代码复用性和可维护性
  统一配置: 集中管理API请求配置，如基础URL、超时时间等
  拦截器机制: 统一处理请求和响应，如添加认证头、处理错误等
  类型安全: 充分利用TypeScript提供类型定义
  错误处理: 统一的错误处理机制，提高用户体验
  取消请求: 支持请求取消，避免不必要的网络请求
  重试机制: 合理的重试策略，提高请求成功率
  缓存策略: 合理使用缓存，减少网络请求
```

### 2. API分类
```yaml
API分类:
  认证API: 登录、登出、获取用户信息等
  业务API: 与业务相关的API，如订单管理、商品管理等
  公共API: 公共资源API，如获取字典数据、上传文件等
```

### 3. 命名规范
```yaml
命名规范:
  API文件名称: kebab-case (如: user-service.ts)
  API方法名称: camelCase (如: login)
  API路径名称: kebab-case (如: /api/v1/users)
  参数名称: camelCase (如: userId)
  响应类型名称: PascalCase (如: LoginResponse)
```

## API服务开发流程

### 1. API设计
```yaml
API设计步骤:
  1. 需求分析: 明确需要调用的API和参数
  2. API路径设计: 设计API的URL路径
  3. 请求方法设计: 选择合适的HTTP方法(GET/POST/PUT/DELETE等)
  4. 请求参数设计: 设计请求参数和类型
  5. 响应数据设计: 设计响应数据结构和类型
  6. 错误处理设计: 设计错误处理机制
```

### 2. API实现
```yaml
API实现步骤:
  1. 创建API服务文件和目录结构
  2. 配置Axios实例
  3. 实现请求和响应拦截器
  4. 实现API方法
  5. 定义请求和响应类型
  6. 实现错误处理机制
```

### 3. API使用
```yaml
API使用步骤:
  1. 在组件或Store中引入API服务
  2. 调用API方法
  3. 处理API响应
  4. 处理API错误
  5. 取消请求(可选)
```

## API服务模板

### 1. Axios实例配置
```typescript
// services/api.ts - Axios实例配置
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { message } from 'ant-design-vue'
import { useUserStore } from '@/stores/modules/user'

// 类型定义
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  success: boolean
}

export interface PaginationParams {
  page: number
  pageSize: number
}

export interface PaginationResponse<T = any> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// 创建Axios实例
const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const userStore = useUserStore()
    
    // 添加认证头
    if (userStore.token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${userStore.token}`
      }
    }
    
    // 添加请求ID
    config.headers = {
      ...config.headers,
      'X-Request-ID': Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    }
    
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { data } = response
    
    // 统一处理响应
    if (data.success) {
      return response
    } else {
      // 处理业务错误
      message.error(data.message || '请求失败')
      return Promise.reject(new Error(data.message || '请求失败'))
    }
  },
  (error: AxiosError<ApiResponse>) => {
    // 处理网络错误
    if (!error.response) {
      message.error('网络错误，请检查网络连接')
      return Promise.reject(error)
    }
    
    const { status, data } = error.response
    
    // 处理HTTP错误
    switch (status) {
      case 400:
        message.error(data?.message || '请求参数错误')
        break
      case 401:
        message.error(data?.message || '登录已过期，请重新登录')
        // 清除用户信息并跳转到登录页
        const userStore = useUserStore()
        userStore.logout()
        break
      case 403:
        message.error(data?.message || '没有权限访问该资源')
        break
      case 404:
        message.error(data?.message || '请求的资源不存在')
        break
      case 500:
        message.error(data?.message || '服务器内部错误')
        break
      default:
        message.error(data?.message || `请求失败: ${status}`)
    }
    
    return Promise.reject(error)
  }
)

// API请求方法封装
export const request = <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> => {
  return axiosInstance(config)
}

export const get = <T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> => {
  return axiosInstance.get(url, { params, ...config })
}

export const post = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> => {
  return axiosInstance.post(url, data, config)
}

export const put = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> => {
  return axiosInstance.put(url, data, config)
}

export const del = <T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> => {
  return axiosInstance.delete(url, { params, ...config })
}

export const patch = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> => {
  return axiosInstance.patch(url, data, config)
}

// 上传文件
export const upload = <T = any>(url: string, file: File, onProgress?: (progress: number) => void): Promise<AxiosResponse<ApiResponse<T>>> => {
  const formData = new FormData()
  formData.append('file', file)
  
  return axiosInstance.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total && onProgress) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        onProgress(progress)
      }
    }
  })
}

// 下载文件
export const download = (url: string, filename?: string): void => {
  axiosInstance.get(url, {
    responseType: 'blob'
  }).then((response) => {
    const blob = new Blob([response.data])
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename || 'download'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  })
}

// 取消请求
export const cancelToken = axios.CancelToken

export default axiosInstance
```

### 2. API模块化实现
```typescript
// services/modules/auth.ts - 认证API模块
import { post, get } from '../api'
import type { ApiResponse } from '../api'

// 类型定义
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

// API方法
export const loginApi = (params: LoginParams) => {
  return post<LoginResponse>('/auth/login', params)
}

export const logoutApi = () => {
  return post('/auth/logout')
}

export const getUserInfoApi = () => {
  return get<UserInfo>('/auth/user-info')
}

export const refreshTokenApi = () => {
  return post<LoginResponse>('/auth/refresh-token')
}

// services/modules/user.ts - 用户管理API模块
import { get, post, put, del } from '../api'
import type { ApiResponse, PaginationParams, PaginationResponse } from '../api'

// 类型定义
export interface User {
  id: string
  name: string
  username: string
  email: string
  avatar: string
  status: 'active' | 'inactive'
  roles: string[]
  createdAt: string
  updatedAt: string
}

export interface CreateUserParams {
  name: string
  username: string
  password: string
  email: string
  roles: string[]
}

export interface UpdateUserParams {
  name?: string
  email?: string
  roles?: string[]
  status?: 'active' | 'inactive'
}

// API方法
export const getUsersApi = (params: PaginationParams & { keyword?: string }) => {
  return get<PaginationResponse<User>>('/api/v1/users', params)
}

export const getUserApi = (userId: string) => {
  return get<User>(`/api/v1/users/${userId}`)
}

export const createUserApi = (params: CreateUserParams) => {
  return post<User>('/api/v1/users', params)
}

export const updateUserApi = (userId: string, params: UpdateUserParams) => {
  return put<User>(`/api/v1/users/${userId}`, params)
}

export const deleteUserApi = (userId: string) => {
  return del(`/api/v1/users/${userId}`)
}

export const batchDeleteUsersApi = (userIds: string[]) => {
  return post(`/api/v1/users/batch-delete`, { userIds })
}

export const updateUserStatusApi = (userId: string, status: 'active' | 'inactive') => {
  return put(`/api/v1/users/${userId}/status`, { status })
}

// services/modules/order.ts - 订单管理API模块
import { get, post, put, del } from '../api'
import type { ApiResponse, PaginationParams, PaginationResponse } from '../api'

// 类型定义
export interface Order {
  id: string
  orderNo: string
  userId: string
  userName: string
  totalAmount: number
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: string
  updatedAt: string
}

export interface CreateOrderParams {
  productIds: string[]
  addressId: string
  paymentMethod: 'alipay' | 'wechat' | 'bank'
}

export interface UpdateOrderStatusParams {
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
}

// API方法
export const getOrdersApi = (params: PaginationParams & { status?: string; keyword?: string }) => {
  return get<PaginationResponse<Order>>('/api/v1/orders', params)
}

export const getOrderApi = (orderId: string) => {
  return get<Order>(`/api/v1/orders/${orderId}`)
}

export const createOrderApi = (params: CreateOrderParams) => {
  return post<Order>('/api/v1/orders', params)
}

export const updateOrderStatusApi = (orderId: string, params: UpdateOrderStatusParams) => {
  return put<Order>(`/api/v1/orders/${orderId}/status`, params)
}

export const deleteOrderApi = (orderId: string) => {
  return del(`/api/v1/orders/${orderId}`)
}
```

### 3. API使用示例
```vue
<template>
  <div class="api-example">
    <h3>API服务示例</h3>
    
    <!-- 用户列表 -->
    <a-card title="用户列表" :bordered="false">
      <a-table
        :columns="columns"
        :data-source="users"
        :loading="loading"
        :pagination="pagination"
        row-key="id"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <a-tag :color="record.status === 'active' ? 'success' : 'default'">
              {{ record.status === 'active' ? '激活' : '禁用' }}
            </a-tag>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-button type="link" @click="handleEdit(record)">
              编辑
            </a-button>
            <a-button type="link" danger @click="handleDelete(record)">
              删除
            </a-button>
            <a-button 
              type="link" 
              :danger="record.status === 'active'"
              @click="handleUpdateStatus(record)"
            >
              {{ record.status === 'active' ? '禁用' : '激活' }}
            </a-button>
          </template>
        </template>
      </a-table>
    </a-card>
    
    <!-- 创建用户模态框 -->
    <a-modal
      v-model:open="modalVisible"
      :title="modalTitle"
      @ok="handleModalOk"
      @cancel="handleModalCancel"
    >
      <a-form :model="formData" layout="vertical">
        <a-form-item label="姓名" required>
          <a-input v-model:value="formData.name" placeholder="请输入姓名" />
        </a-form-item>
        <a-form-item label="用户名" required>
          <a-input v-model:value="formData.username" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item label="邮箱" required>
          <a-input v-model:value="formData.email" placeholder="请输入邮箱" />
        </a-form-item>
        <a-form-item label="密码" v-if="!isEditing" required>
          <a-input-password v-model:value="formData.password" placeholder="请输入密码" />
        </a-form-item>
        <a-form-item label="角色" required>
          <a-select 
            v-model:value="formData.roles" 
            mode="multiple" 
            placeholder="请选择角色"
          >
            <a-select-option value="admin">管理员</a-select-option>
            <a-select-option value="user">普通用户</a-select-option>
            <a-select-option value="editor">编辑</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import type { TableColumnsType, TablePaginationConfig } from 'ant-design-vue'
import {
  getUsersApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
  updateUserStatusApi
} from '@/services/modules/user'
import type { User, CreateUserParams, UpdateUserParams } from '@/services/modules/user'

// 表格数据
const users = ref<User[]>([])
const loading = ref(false)
const pagination = ref<TablePaginationConfig>({
  current: 1,
  pageSize: 10,
  total: 0
})

// 表格列配置
const columns: TableColumnsType<User> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 80
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 120
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 180
  },
  {
    title: '操作',
    key: 'action',
    width: 200,
    fixed: 'right'
  }
]

// 模态框
const modalVisible = ref(false)
const isEditing = ref(false)
const currentUser = ref<User | null>(null)
const modalTitle = ref('创建用户')

// 表单数据
const formData = reactive<CreateUserParams & UpdateUserParams>({
  name: '',
  username: '',
  password: '',
  email: '',
  roles: []
})

// 生命周期
onMounted(() => {
  fetchUsers()
})

// 方法
const fetchUsers = async () => {
  loading.value = true
  try {
    const response = await getUsersApi({
      page: pagination.value.current,
      pageSize: pagination.value.pageSize
    })
    users.value = response.data.data.items
    pagination.value.total = response.data.data.total
  } finally {
    loading.value = false
  }
}

const handleTableChange = (newPagination: TablePaginationConfig) => {
  pagination.value = newPagination
  fetchUsers()
}

const handleCreate = () => {
  isEditing.value = false
  currentUser.value = null
  modalTitle.value = '创建用户'
  Object.assign(formData, {
    name: '',
    username: '',
    password: '',
    email: '',
    roles: []
  })
  modalVisible.value = true
}

const handleEdit = (record: User) => {
  isEditing.value = true
  currentUser.value = record
  modalTitle.value = '编辑用户'
  Object.assign(formData, {
    name: record.name,
    username: record.username,
    email: record.email,
    roles: record.roles
  })
  modalVisible.value = true
}

const handleModalOk = async () => {
  try {
    if (isEditing.value && currentUser.value) {
      await updateUserApi(currentUser.value.id, formData)
    } else {
      await createUserApi(formData as CreateUserParams)
    }
    modalVisible.value = false
    fetchUsers()
  } catch (error) {
    // 错误已在API服务中处理
  }
}

const handleModalCancel = () => {
  modalVisible.value = false
}

const handleDelete = async (record: User) => {
  try {
    await deleteUserApi(record.id)
    fetchUsers()
  } catch (error) {
    // 错误已在API服务中处理
  }
}

const handleUpdateStatus = async (record: User) => {
  try {
    await updateUserStatusApi(record.id, record.status === 'active' ? 'inactive' : 'active')
    fetchUsers()
  } catch (error) {
    // 错误已在API服务中处理
  }
}
</script>

<style lang="scss" scoped>
.api-example {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: calc(100vh - 64px);
}
</style>
```

## API服务最佳实践

### 1. 模块化管理
```typescript
// 推荐按功能模块划分API
├── services/
│   ├── api.ts              // Axios实例配置
│   └── modules/
│       ├── auth.ts         // 认证API
│       ├── user.ts         // 用户管理API
│       ├── order.ts        // 订单管理API
│       └── product.ts      // 商品管理API
```

### 2. 类型安全
```typescript
// 定义清晰的请求和响应类型
interface LoginParams {
  username: string
  password: string
  rememberMe?: boolean
}

interface LoginResponse {
  token: string
  expiresIn: number
}

// 使用类型定义API方法
export const loginApi = (params: LoginParams) => {
  return post<LoginResponse>('/auth/login', params)
}
```

### 3. 错误处理
```typescript
// 统一的错误处理机制
axiosInstance.interceptors.response.use(
  (response) => {
    // 处理成功响应
    return response
  },
  (error) => {
    // 统一处理错误
    message.error(error.message || '请求失败')
    return Promise.reject(error)
  }
)
```

### 4. 请求取消
```typescript
// 使用CancelToken取消请求
import { cancelToken } from '@/services/api'

const source = cancelToken.source()

// 发起请求
apiService.get('/api/data', { cancelToken: source.token })

// 取消请求
source.cancel('请求被取消')
```

### 5. 重试机制
```typescript
// 实现重试机制
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000
})

// 添加重试拦截器
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config } = error
    if (!config || !config.retry) return Promise.reject(error)
    
    // 设置重试次数和延迟
    config._retryCount = config._retryCount || 0
    
    if (config._retryCount >= config.retry) {
      return Promise.reject(error)
    }
    
    // 增加重试次数
    config._retryCount += 1
    
    // 计算重试延迟
    const delay = new Promise((resolve) => {
      setTimeout(resolve, config.retryDelay || 1000)
    })
    
    // 重新发起请求
    return delay.then(() => axiosInstance(config))
  }
)
```

### 6. 缓存策略
```typescript
// 实现简单的缓存机制
const cache = new Map()

const cachedGet = async (url: string, params?: any) => {
  const key = `${url}-${JSON.stringify(params)}`
  
  if (cache.has(key)) {
    return cache.get(key)
  }
  
  const response = await get(url, params)
  cache.set(key, response)
  
  // 设置缓存过期时间
  setTimeout(() => {
    cache.delete(key)
  }, 5 * 60 * 1000) // 5分钟过期
  
  return response
}
```

## API服务文档

### 1. API文档结构
```yaml
API文档结构:
  API名称: API的中文名称和英文名称
  API描述: API的功能和使用场景
  请求方法: HTTP方法(GET/POST/PUT/DELETE等)
  请求URL: API的URL路径
  请求参数: 请求参数的详细说明
  响应数据: 响应数据的详细说明
  错误码: 可能的错误码和说明
  使用示例: API的使用示例
```

### 2. 示例文档
```markdown
# 用户登录API

## 功能描述
用户登录，获取认证令牌

## 请求方法
POST

## 请求URL
`/auth/login`

## 请求参数

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| username | string | 是 | 用户名 |
| password | string | 是 | 密码 |
| rememberMe | boolean | 否 | 是否记住我 |

## 响应数据

```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 86400
  },
  "success": true
}
```

## 错误码

| 错误码 | 描述 |
|--------|------|
| 400 | 请求参数错误 |
| 401 | 用户名或密码错误 |
| 500 | 服务器内部错误 |

## 使用示例

```typescript
import { loginApi } from '@/services/modules/auth'

const handleLogin = async () => {
  try {
    const response = await loginApi({
      username: 'admin',
      password: '123456',
      rememberMe: true
    })
    console.log('登录成功', response.data.data.token)
  } catch (error) {
    console.error('登录失败', error)
  }
}
```
```

## 输入要求
1. API服务需求描述
2. API路径和方法
3. 请求参数和类型
4. 响应数据结构
5. 错误处理需求
6. 性能要求

## 输出要求
1. 完整的API服务代码
2. API的类型定义
3. API的使用示例
4. API的文档说明
5. API服务最佳实践建议

## 质量检查
- [ ] API服务是否按功能模块划分
- [ ] 是否使用了TypeScript类型定义
- [ ] 是否实现了统一的错误处理机制
- [ ] 是否实现了请求和响应拦截器
- [ ] API方法名称是否清晰、易于理解
- [ ] 是否提供了API文档和使用示例
- [ ] 是否考虑了性能优化，如请求取消、重试机制等
