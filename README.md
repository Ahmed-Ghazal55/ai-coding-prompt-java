# AI编码提示词工程

## 🚀 项目简介

AI编码提示词工程是一套完整的、系统化的AI编码辅助体系，基于团队AI编码率从9.6%稳步提升至89.2%的实践经验构建。通过结构化的Prompt设计，将AI编码经验沉淀为可复用的知识资产，帮助开发团队快速掌握AI编码技巧，显著提升开发效率和代码质量。

## 📊 项目成果

- **AI编码采纳率**: 从9.6%提升至89.2%
- **需求交付效率**: 提升23.6%
- **代码质量**: 显著提升，缺陷率降低
- **团队协作**: 标准化流程，降低沟通成本

## 🏗️ 工程架构

```
ai-coding-prompt/
├── rules/                    # 规则层 - 质量保障
├── 业务层/                   # 业务逻辑层
├── 应用层/                   # 应用接口层
├── 技术方案/                 # 技术方案层
├── 数据层/                   # 数据访问层
├── 工程结构/                 # 工程结构层
├── 前端/                     # 前端技术栈实现
├── 移动端/                   # 移动端技术栈实现
├── index.html                # 项目首页
├── prompt使用示例.md         # 使用示例文档
├── prompt使用示例图.png      # 使用示例图片
├── prompt整体介绍.md         # 整体介绍文档
└── readme.md                 # 项目说明文档
```

### 各层职责

| 层次 | 职责 | 主要内容 |
|------|------|----------|
| **规则层** | 质量保障 | 需求检查、代码审查、质量规范 |
| **业务层** | 业务逻辑 | 领域模型、业务规则、DDD实践 |
| **应用层** | 接口服务 | RESTful API、DTO设计、接口文档 |
| **技术方案** | 实现指导 | 技术选型、架构设计、实现方案 |
| **数据层** | 数据访问 | 数据库设计、持久化、缓存策略 |
| **工程结构** | 项目框架 | 目录结构、配置管理、部署方案 |
| **前端层** | 前端实现 | Vue 3、Vite 5、Pinia、Ant Design Vue |
| **移动端层** | 移动端实现 | uni-app (Vue 3)、uni-ui、跨端开发 |

## 🚀 快速开始

### 1. 环境准备

#### 后端环境
- **Java**: 11+
- **Maven**: 3.6+
- **MySQL**: 8.0+
- **Redis**: 6.0+
- **IDE**: IntelliJ IDEA / Eclipse

#### 前端环境
- **Node.js**: 18+
- **npm**: 9+
- **IDE**: VS Code / WebStorm

#### 移动端环境
- **Node.js**: 16+
- **npm**: 8+
- **IDE**: HBuilderX / VS Code + uni-app 插件
- **小程序开发工具**: 微信开发者工具、支付宝开发者工具等
- **APP打包环境**: Android Studio (Android)、Xcode (iOS)

### 2. 项目初始化

#### 后端项目初始化
```bash
# 克隆项目
git clone https://github.com/your-org/ai-coding-prompt.git
cd ai-coding-prompt

# 生成项目结构
使用 工程结构/工程结构prompt.md 生成标准项目结构

# 配置数据库
# 修改 application-dev.yml 中的数据库连接配置

# 启动项目
mvn spring-boot:run
```

#### 前端项目初始化
```bash
# 克隆项目
git clone https://github.com/your-org/ai-coding-prompt.git
cd ai-coding-prompt

# 生成前端项目结构
使用 前端/前端工程结构prompt.md 生成标准前端项目结构

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

#### 移动端项目初始化
```bash
# 克隆项目
git clone https://github.com/your-org/ai-coding-prompt.git
cd ai-coding-prompt

# 生成移动端项目结构
使用 移动端/移动端工程结构prompt.md 生成标准移动端项目结构

# 安装依赖
npm install

# 启动H5开发服务器
npm run dev:h5

# 启动微信小程序开发
npm run dev:mp-weixin

# 构建H5生产版本
npm run build:h5

# 构建微信小程序生产版本
npm run build:mp-weixin

# 构建APP生产版本
# 使用HBuilderX打开项目，点击"发行" -> "原生APP-云打包"
```

### 3. 使用示例

#### 开发新功能

```bash
# 1. 需求分析
使用 rules/Review需求实现检查prompt.md 分析需求

# 2. 技术方案设计  
使用 技术方案/新增类需求prompt.md 设计技术方案

# 3. 业务逻辑开发
使用 业务层/业务层prompt.md 指导业务逻辑实现

# 4. 接口开发
使用 应用层/接口*.md 开发RESTful接口

# 5. 数据层开发
使用 数据层/建表prompt.md + 持久化prompt.md

# 6. 测试用例生成
使用 rules/测试用例生成prompt.md 生成测试用例

# 7. 性能优化
使用 rules/性能优化prompt.md 进行性能优化

# 8. 安全检查
使用 rules/安全检查prompt.md 进行安全检查
```

#### 前端开发示例

```bash
# 1. 前端工程结构设计
使用 前端/前端工程结构prompt.md 设计前端项目结构

# 2. 前端组件开发
使用 前端/前端组件开发prompt.md 开发Vue 3组件

# 3. 前端状态管理
使用 前端/前端状态管理prompt.md 设计Pinia状态管理

# 4. 前端API服务
使用 前端/前端API服务prompt.md 配置Axios API服务

# 5. 测试用例生成
使用 rules/测试用例生成prompt.md 生成前端测试用例

# 6. 性能优化
使用 rules/性能优化prompt.md 进行前端性能优化

# 7. 安全检查
使用 rules/安全检查prompt.md 进行前端安全检查
```

#### 移动端开发示例

```bash
# 1. 移动端工程结构设计
使用 移动端/移动端工程结构prompt.md 设计移动端项目结构

# 2. 移动端组件开发
使用 移动端/移动端组件开发prompt.md 开发uni-app组件

# 3. 移动端状态管理
使用 移动端/移动端状态管理prompt.md 设计Pinia状态管理

# 4. 移动端API服务
使用 移动端/移动端API服务prompt.md 配置uni.request/Axios API服务

# 5. 跨端适配开发
使用 移动端/跨端适配prompt.md 进行跨端适配开发

# 6. 测试用例生成
使用 rules/测试用例生成prompt.md 生成移动端测试用例

# 7. 性能优化
使用 rules/性能优化prompt.md 进行移动端性能优化

# 8. 安全检查
使用 rules/安全检查prompt.md 进行移动端安全检查
```

#### 质量保证流程

```bash
# 1. 代码审查
使用 rules/Review需求实现检查prompt.md 进行代码审查

# 2. 测试验证
使用 rules/测试用例生成prompt.md 生成单元测试和集成测试用例

# 3. 性能优化
使用 rules/性能优化prompt.md 进行代码优化

# 4. 安全检查
使用 rules/安全检查prompt.md 进行安全审计
```

## 📖 详细文档

### [整体介绍](prompt整体介绍.md)
了解AI编码提示词工程的整体架构、设计原则和核心理念

### [使用示例](prompt使用示例.md)
通过具体的开发示例，学习如何使用各层Prompt进行功能开发

### [工程结构](工程结构/工程结构.md)
详细的项目目录结构和各模块职责说明

### 前端文档
- **前端工程结构**: `前端/前端工程结构prompt.md` - 前端项目结构设计指南
- **前端组件开发**: `前端/前端组件开发prompt.md` - Vue 3组件开发最佳实践
- **前端状态管理**: `前端/前端状态管理prompt.md` - Pinia状态管理设计
- **前端API服务**: `前端/前端API服务prompt.md` - Axios API管理方案

### 移动端文档
- **移动端工程结构**: `移动端/移动端工程结构prompt.md` - 移动端项目结构设计指南
- **移动端组件开发**: `移动端/移动端组件开发prompt.md` - uni-app组件开发最佳实践
- **移动端状态管理**: `移动端/移动端状态管理prompt.md` - 移动端状态管理设计
- **移动端API服务**: `移动端/移动端API服务prompt.md` - 移动端API管理方案
- **跨端适配开发**: `移动端/跨端适配prompt.md` - 跨端适配开发指南

## 🎯 核心特性

### 1. 完整的开发流程覆盖
从需求分析到代码实现，再到测试部署，提供全流程的AI编码支持

### 2. 多维度质量保障
- ✅ **功能完整性**: 确保所有需求功能都得到实现
- ✅ **代码规范性**: 遵循编码规范和最佳实践  
- ✅ **性能优化**: 内置性能优化建议
- ✅ **安全防护**: 包含安全防护指南
- ✅ **可维护性**: 提高代码可读性和可维护性

### 3. 灵活的扩展机制
- **模块化设计**: 每个Prompt都是独立的模块
- **可配置化**: 支持项目特定的配置调整
- **版本控制**: 支持Prompt版本的管理和升级
- **自定义扩展**: 支持团队特定的最佳实践

## 🛠️ 技术栈

### 后端技术栈
- **框架**: Spring Boot 2.7.x
- **数据库**: MyBatis-Plus + JPA
- **缓存**: Redis + Caffeine
- **消息队列**: RocketMQ / RabbitMQ
- **监控**: Spring Boot Actuator + Micrometer
- **文档**: Knife4j (Swagger增强)

### 前端技术栈
- **语言**: JavaScript / TypeScript
- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite 5
- **状态管理**: Pinia
- **UI组件库**: Ant Design Vue 4.X
- **路由**: Vue Router 4
- **HTTP客户端**: Axios
- **CSS预处理器**: SCSS/Less
- **代码规范**: ESLint + Prettier
- **类型检查**: TypeScript

### 移动端技术栈
- **框架**: uni-app (Vue 3 版本)
- **UI组件库**: uni-ui
- **语言**: JavaScript / TypeScript
- **状态管理**: Pinia / Vuex 4
- **路由**: uni-app 内置路由
- **HTTP客户端**: uni.request / Axios (适配)
- **跨端支持**: APP、小程序、H5
- **构建工具**: HBuilderX / CLI
- **代码规范**: ESLint + Prettier

### 基础设施
- **容器化**: Docker + Docker Compose
- **容器编排**: Kubernetes
- **CI/CD**: Jenkins / GitLab CI
- **监控**: Prometheus + Grafana
- **日志**: ELK Stack

## 📋 使用指南

### Prompt选择指南

| 开发阶段 | 推荐Prompt | 说明 |
|----------|------------|------|
| **需求分析** | `rules/Review需求实现检查prompt.md` | 需求完整性检查 |
| **技术方案** | `技术方案/新增类需求prompt.md` | 新功能技术方案 |
| **业务逻辑** | `业务层/业务层prompt.md` | 领域模型和业务逻辑 |
| **接口开发** | `应用层/接口*.md` | RESTful接口开发 |
| **数据层** | `数据层/建表prompt.md` | 数据库表设计 |
| **代码审查** | `rules/Review需求实现检查prompt.md` | 代码质量检查 |
| **测试用例生成** | `rules/测试用例生成prompt.md` | 生成单元测试和集成测试用例 |
| **性能优化** | `rules/性能优化prompt.md` | 代码性能优化 |
| **安全检查** | `rules/安全检查prompt.md` | 安全审计和漏洞检测 |
| **前端工程结构** | `前端/前端工程结构prompt.md` | 前端项目结构设计 |
| **前端组件开发** | `前端/前端组件开发prompt.md` | Vue 3组件开发 |
| **前端状态管理** | `前端/前端状态管理prompt.md` | Pinia状态管理 |
| **前端API服务** | `前端/前端API服务prompt.md` | Axios API管理 |
| **移动端工程结构** | `移动端/移动端工程结构prompt.md` | 移动端项目结构设计 |
| **移动端组件开发** | `移动端/移动端组件开发prompt.md` | uni-app组件开发 |
| **移动端状态管理** | `移动端/移动端状态管理prompt.md` | 移动端状态管理设计 |
| **移动端API服务** | `移动端/移动端API服务prompt.md` | 移动端API管理 |
| **跨端适配开发** | `移动端/跨端适配prompt.md` | 跨端适配开发指南 |

### 最佳实践

#### 1. 渐进式采用
- 从简单功能开始试用
- 逐步扩展到复杂业务场景
- 持续优化和调整Prompt配置

#### 2. 团队协作
- 建立团队共享的Prompt库
- 定期进行使用经验分享
- 建立反馈和改进机制

#### 3. 质量保证
- 建立代码审查流程
- 使用自动化测试验证
- 持续监控代码质量指标

## 🔧 配置说明

### 数据库配置
```yaml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/demo_db?useSSL=false&serverTimezone=UTC
    username: ${DB_USERNAME:root}
    password: ${DB_PASSWORD:password}
```

### Redis配置
```yaml
spring:
  redis:
    host: ${REDIS_HOST:localhost}
    port: ${REDIS_PORT:6379}
    database: 0
    timeout: 5000ms
```

### 日志配置
```yaml
logging:
  level:
    com.example.demo: DEBUG
    org.hibernate.SQL: DEBUG
  file:
    name: logs/demo.log
```

## 🧪 测试

### 单元测试
```bash
# 运行单元测试
mvn test

# 生成测试报告
mvn jacoco:report
```

### 集成测试
```bash
# 运行集成测试
mvn verify

# 性能测试
mvn jmeter:run
```

## 📈 监控和运维

### 应用监控
- **健康检查**: `/actuator/health`
- **指标监控**: `/actuator/metrics`
- **Prometheus**: `/actuator/prometheus`

### 日志管理
- **日志文件**: `logs/demo.log`
- **日志级别**: 支持动态调整
- **日志聚合**: 支持ELK集成

### 性能监控
- **APM监控**: 支持SkyWalking、Pinpoint
- **数据库监控**: Druid监控界面
- **缓存监控**: Redis监控指标

## 🚀 部署

### Docker部署
```bash
# 构建镜像
docker build -t ai-coding-demo .

# 运行容器
docker run -d -p 8080:8080 ai-coding-demo
```

### Kubernetes部署
```bash
# 部署到Kubernetes
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

### 传统部署
```bash
# 打包应用
mvn clean package

# 运行应用
java -jar target/demo-1.0.0.jar
```

## 🤝 贡献指南

### 如何贡献
1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 贡献内容
- 🐛 **Bug修复**: 发现并修复代码中的问题
- ✨ **新功能**: 添加新的Prompt模板或功能
- 📖 **文档**: 改进项目文档和说明
- 🎨 **代码风格**: 优化代码结构和风格
- 📈 **性能**: 提升系统性能

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 👥 团队成员

- **项目发起人**: [Your Name](https://github.com/yourusername)
- **核心贡献者**: [Contributor1](https://github.com/contributor1), [Contributor2](https://github.com/contributor2)
- **感谢所有贡献者**: [Contributors](https://github.com/your-org/ai-coding-prompt/graphs/contributors)

## 📞 联系方式

- **项目邮箱**: ai-coding@yourcompany.com
- **技术支持**: support@yourcompany.com
- **社区讨论**: [GitHub Discussions](https://github.com/your-org/ai-coding-prompt/discussions)

## 🙏 致谢

感谢以下项目和工具的支持：

- [Spring Boot](https://spring.io/projects/spring-boot) - 优秀的Java开发框架
- [MyBatis-Plus](https://baomidou.com/) - 强大的ORM框架
- [Redis](https://redis.io/) - 高性能缓存数据库
- [Docker](https://www.docker.com/) - 容器化技术
- [Kubernetes](https://kubernetes.io/) - 容器编排平台

---

**⭐ 如果这个项目对您有帮助，请给个Star支持一下！**