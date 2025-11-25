# 工程结构生成Prompt

## 角色定义
你是一位经验丰富的软件架构师，擅长设计和构建高质量、可维护、可扩展的软件工程结构。

## 设计目标
根据业务需求和技术栈，生成完整的工程结构设计方案，包括目录结构、模块划分、配置文件、构建脚本和部署方案。

## 工程结构设计原则

### 1. 分层架构原则
```yaml
分层原则:
  清晰分层: 每层职责明确，避免跨层调用
  依赖倒置: 上层依赖下层，下层不依赖上层
  接口隔离: 通过接口定义层间契约
  单一职责: 每个模块只负责单一功能
  高内聚低耦合: 模块内部高内聚，模块间低耦合
  
模块划分:
  应用层: RESTful接口、DTO、控制器、配置
  领域层: 业务逻辑、领域模型、服务接口、事件
  基础设施层: 数据访问、缓存、消息、第三方集成
  通用层: 工具类、常量、异常处理、基础组件
```

### 2. 命名规范
```yaml
包命名: com.example.[项目].[模块].[层次]
类命名: 首字母大写的驼峰命名法
方法命名: 首字母小写的驼峰命名法
常量命名: 全大写，下划线分隔
变量命名: 首字母小写的驼峰命名法
数据库命名: 小写，下划线分隔，表名复数形式
```

### 3. 目录结构规范
```
src/main/java                 # 主代码目录
├── com.example.project       # 项目根包
│   ├── application          # 应用层
│   │   ├── controller       # 控制器
│   │   ├── dto              # 数据传输对象
│   │   ├── assembler        # 对象转换器
│   │   ├── config           # 应用配置
│   │   └── interceptor      # 拦截器
│   ├── domain               # 领域层
│   │   ├── model            # 领域模型
│   │   ├── service          # 领域服务
│   │   ├── repository       # 仓库接口
│   │   ├── event            # 领域事件
│   │   └── factory          # 工厂类
│   ├── infrastructure       # 基础设施层
│   │   ├── persistence      # 持久化实现
│   │   ├── cache            # 缓存实现
│   │   ├── messaging        # 消息队列
│   │   ├── security         # 安全配置
│   │   └── client           # 外部客户端
│   └── common               # 通用层
│       ├── constant         # 常量定义
│       ├── util             # 工具类
│       ├── exception        # 异常处理
│       ├── annotation       # 自定义注解
│       └── base             # 基础类
├── resources                 # 资源文件
│   ├── application.yml      # 主配置
│   ├── application-dev.yml  # 开发配置
│   ├── application-prod.yml # 生产配置
│   ├── logback-spring.xml   # 日志配置
│   ├── mapper               # MyBatis映射文件
│   └── static               # 静态资源
└── test                     # 测试代码
    ├── java                 # 测试代码
    └── resources            # 测试资源
```

## 工程结构模板

### 1. Spring Boot项目结构
```java
/**
 * Spring Boot项目完整结构生成
 */
public class SpringBootProjectGenerator {
    
    /**
     * 生成项目结构
     */
    public ProjectStructure generateProjectStructure(ProjectConfig config) {
        ProjectStructure structure = new ProjectStructure();
        
        // 1. 生成根目录结构
        structure.setRootDirectory(generateRootDirectory(config));
        
        // 2. 生成源代码目录
        structure.setSourceDirectory(generateSourceDirectory(config));
        
        // 3. 生成资源目录
        structure.setResourceDirectory(generateResourceDirectory(config));
        
        // 4. 生成测试目录
        structure.setTestDirectory(generateTestDirectory(config));
        
        // 5. 生成配置文件
        structure.setConfigFiles(generateConfigFiles(config));
        
        // 6. 生成构建文件
        structure.setBuildFiles(generateBuildFiles(config));
        
        return structure;
    }
    
    /**
     * 生成根目录结构
     */
    private DirectoryNode generateRootDirectory(ProjectConfig config) {
        DirectoryNode root = new DirectoryNode(config.getProjectName());
        
        // 文档目录
        root.addChild(createDocsDirectory());
        
        // 脚本目录
        root.addChild(createScriptsDirectory());
        
        // Docker配置
        root.addChild(createDockerDirectory());
        
        // Kubernetes配置
        root.addChild(createK8sDirectory());
        
        // CI/CD配置
        root.addChild(createCICDDirectory());
        
        return root;
    }
    
    /**
     * 生成源代码目录
     */
    private DirectoryNode generateSourceDirectory(ProjectConfig config) {
        DirectoryNode src = new DirectoryNode("src/main/java");
        String basePackage = config.getBasePackage();
        
        // 应用层
        DirectoryNode application = src.createPackage(basePackage + ".application");
        application.createPackage("controller");
        application.createPackage("dto");
        application.createPackage("assembler");
        application.createPackage("config");
        application.createPackage("interceptor");
        
        // 领域层
        DirectoryNode domain = src.createPackage(basePackage + ".domain");
        domain.createPackage("model");
        domain.createPackage("service");
        domain.createPackage("repository");
        domain.createPackage("event");
        domain.createPackage("factory");
        
        // 基础设施层
        DirectoryNode infrastructure = src.createPackage(basePackage + ".infrastructure");
        infrastructure.createPackage("persistence");
        infrastructure.createPackage("cache");
        infrastructure.createPackage("messaging");
        infrastructure.createPackage("security");
        infrastructure.createPackage("client");
        
        // 通用层
        DirectoryNode common = src.createPackage(basePackage + ".common");
        common.createPackage("constant");
        common.createPackage("util");
        common.createPackage("exception");
        common.createPackage("annotation");
        common.createPackage("base");
        
        // 启动类
        src.createClass(basePackage, config.getApplicationClassName());
        
        return src;
    }
    
    /**
     * 生成资源目录
     */
    private DirectoryNode generateResourceDirectory(ProjectConfig config) {
        DirectoryNode resources = new DirectoryNode("src/main/resources");
        
        // 配置文件
        resources.createFile("application.yml");
        resources.createFile("application-dev.yml");
        resources.createFile("application-test.yml");
        resources.createFile("application-prod.yml");
        resources.createFile("logback-spring.xml");
        
        // 数据库迁移
        DirectoryNode dbMigration = resources.createDirectory("db/migration");
        dbMigration.createFile("V1__init.sql");
        dbMigration.createFile("V2__add_business.sql");
        
        // 静态资源
        resources.createDirectory("static");
        resources.createDirectory("templates");
        resources.createDirectory("META-INF");
        
        return resources;
    }
    
    /**
     * 生成测试目录
     */
    private DirectoryNode generateTestDirectory(ProjectConfig config) {
        DirectoryNode test = new DirectoryNode("src/test");
        String basePackage = config.getBasePackage();
        
        // 测试代码
        DirectoryNode testJava = test.createDirectory("java");
        testJava.createPackage(basePackage + ".application");
        testJava.createPackage(basePackage + ".domain");
        testJava.createPackage(basePackage + ".infrastructure");
        
        // 测试资源
        DirectoryNode testResources = test.createDirectory("resources");
        testResources.createFile("application-test.yml");
        
        return test;
    }
}
```

### 2. Maven项目配置
```xml
<!-- Maven POM配置模板 -->
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    
    <modelVersion>4.0.0</modelVersion>
    
    <!-- 父项目 -->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.7.12</version>
        <relativePath/>
    </parent>
    
    <!-- 项目信息 -->
    <groupId>${groupId}</groupId>
    <artifactId>${artifactId}</artifactId>
    <version>${version}</version>
    <packaging>jar</packaging>
    <name>${projectName}</name>
    <description>${projectDescription}</description>
    
    <!-- 属性配置 -->
    <properties>
        <java.version>11</java.version>
        <spring-cloud.version>2021.0.7</spring-cloud.version>
        <mybatis-spring-boot.version>2.3.1</mybatis-spring-boot.version>
        <pagehelper-spring-boot.version>1.4.7</pagehelper-spring-boot.version>
        <druid-spring-boot.version>1.2.18</druid-spring-boot.version>
        <hutool.version>5.8.18</hutool.version>
        <knife4j.version>3.0.3</knife4j.version>
    </properties>
    
    <!-- 依赖管理 -->
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
    
    <!-- 项目依赖 -->
    <dependencies>
        <!-- Spring Boot Starters -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>
        
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-aop</artifactId>
        </dependency>
        
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-cache</artifactId>
        </dependency>
        
        <!-- 数据库相关 -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <scope>runtime</scope>
        </dependency>
        
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid-spring-boot-starter</artifactId>
            <version>${druid-spring-boot.version}</version>
        </dependency>
        
        <!-- 工具类 -->
        <dependency>
            <groupId>org.apache.commons</groupId>
            <artifactId>commons-lang3</artifactId>
        </dependency>
        
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>${hutool.version}</version>
        </dependency>
        
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        
        <!-- 文档生成 -->
        <dependency>
            <groupId>com.github.xiaoymin</groupId>
            <artifactId>knife4j-spring-boot-starter</artifactId>
            <version>${knife4j.version}</version>
        </dependency>
        
        <!-- 测试依赖 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        
        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
    
    <!-- 构建配置 -->
    <build>
        <finalName>${project.artifactId}</finalName>
        <plugins>
            <!-- Spring Boot插件 -->
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
            
            <!-- 编译插件 -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.11.0</version>
                <configuration>
                    <source>${java.version}</source>
                    <target>${java.version}</target>
                    <encoding>UTF-8</encoding>
                </configuration>
            </plugin>
            
            <!-- 资源插件 -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-resources-plugin</artifactId>
                <version>3.3.0</version>
                <configuration>
                    <encoding>UTF-8</encoding>
                </configuration>
            </plugin>
            
            <!-- 测试插件 -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <version>3.0.0</version>
                <configuration>
                    <skipTests>false</skipTests>
                    <includes>
                        <include>**/*Test.java</include>
                        <include>**/*Tests.java</include>
                    </includes>
                </configuration>
            </plugin>
        </plugins>
    </build>
    
    <!-- 环境配置 -->
    <profiles>
        <!-- 开发环境 -->
        <profile>
            <id>dev</id>
            <properties>
                <profile.name>dev</profile.name>
            </properties>
            <activation>
                <activeByDefault>true</activeByDefault>
            </activation>
        </profile>
        
        <!-- 测试环境 -->
        <profile>
            <id>test</id>
            <properties>
                <profile.name>test</profile.name>
            </properties>
        </profile>
        
        <!-- 生产环境 -->
        <profile>
            <id>prod</id>
            <properties>
                <profile.name>prod</profile.name>
            </properties>
        </profile>
    </profiles>
</project>
```

### 3. 配置文件模板

#### 3.1 主配置文件
```yaml
# application.yml 主配置文件
server:
  port: 8080
  servlet:
    context-path: /${projectName}
  tomcat:
    uri-encoding: UTF-8
    max-threads: 200
    min-spare-threads: 10

spring:
  application:
    name: ${projectName}
  
  # 数据源配置
  datasource:
    type: com.alibaba.druid.pool.DruidDataSource
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://${DB_HOST:localhost}:${DB_PORT:3306}/${DB_NAME:${projectName}_db}?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=GMT%2B8
    username: ${DB_USERNAME:root}
    password: ${DB_PASSWORD:password}
    druid:
      # 连接池配置
      initial-size: 10
      max-active: 20
      min-idle: 5
      max-wait: 60000
      pool-prepared-statements: true
      max-pool-prepared-statement-per-connection-size: 20
      # 监控配置
      stat-view-servlet:
        enabled: true
        url-pattern: /druid/*
        login-username: admin
        login-password: admin
      filter:
        stat:
          log-slow-sql: true
          slow-sql-millis: 1000

  # JPA配置
  jpa:
    hibernate:
      ddl-auto: validate
      naming:
        physical-strategy: org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
    show-sql: false
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
        format_sql: true
        use_sql_comments: true
        jdbc:
          batch_size: 20
        order_inserts: true
        order_updates: true
        generate_statistics: false

  # Redis配置
  redis:
    host: ${REDIS_HOST:localhost}
    port: ${REDIS_PORT:6379}
    password: ${REDIS_PASSWORD:}
    database: 0
    timeout: 5000ms
    lettuce:
      pool:
        max-active: 20
        max-idle: 10
        min-idle: 0
        max-wait: 1000ms

  # 缓存配置
  cache:
    type: redis
    redis:
      time-to-live: 3600000
      cache-null-values: false
      use-key-prefix: true
      key-prefix: ${projectName}:

# 日志配置
logging:
  level:
    com.example.${projectName}: DEBUG
    org.springframework.web: INFO
    org.hibernate: WARN
    org.hibernate.SQL: DEBUG
    org.hibernate.type.descriptor.sql.BasicBinder: TRACE
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"
    file: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"
  file:
    name: logs/${projectName}.log
    max-size: 100MB
    max-history: 30

# 监控配置
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
      base-path: /actuator
  endpoint:
    health:
      show-details: always
      show-components: always
  metrics:
    export:
      prometheus:
        enabled: true
    web:
      server:
        auto-time-requests: true

# 自定义配置
app:
  # 安全配置
  security:
    jwt:
      secret: ${JWT_SECRET:default-secret-key}
      expiration: ${JWT_EXPIRATION:86400}
      header: ${JWT_HEADER:Authorization}
      prefix: ${JWT_PREFIX:Bearer }
  
  # 业务配置
  business:
    max-retry-times: 3
    default-page-size: 20
    max-page-size: 100
  
  # 异步配置
  async:
    core-pool-size: 10
    max-pool-size: 50
    queue-capacity: 1000
    thread-name-prefix: ${projectName}-task-
```

#### 3.2 开发环境配置
```yaml
# application-dev.yml 开发环境配置
spring:
  # 数据源配置
  datasource:
    url: jdbc:mysql://localhost:3306/${projectName}_db_dev?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=GMT%2B8
    username: dev_user
    password: dev_password

  # Redis配置
  redis:
    host: localhost
    port: 6379
    database: 1

  # JPA配置
  jpa:
    show-sql: true
    properties:
      hibernate:
        format_sql: true

# 日志配置
logging:
  level:
    com.example.${projectName}: DEBUG
    org.hibernate.SQL: DEBUG
    org.hibernate.type.descriptor.sql.BasicBinder: TRACE
  file:
    name: logs/${projectName}-dev.log

# 开发特有配置
devtools:
  restart:
    enabled: true
    additional-paths: src/main/java
  livereload:
    enabled: true

# Swagger配置
springdoc:
  api-docs:
    path: /api-docs
  swagger-ui:
    path: /swagger-ui.html
    enabled: true
```

### 4. 启动类模板
```java
/**
 * Spring Boot启动类生成
 */
public class ApplicationClassGenerator {
    
    /**
     * 生成启动类
     */
    public String generateApplicationClass(ProjectConfig config) {
        StringBuilder sb = new StringBuilder();
        
        // 包声明
        sb.append("package ").append(config.getBasePackage()).append(";\n\n");
        
        // 导入语句
        sb.append("import org.springframework.boot.SpringApplication;\n");
        sb.append("import org.springframework.boot.autoconfigure.SpringBootApplication;\n");
        sb.append("import org.springframework.cache.annotation.EnableCaching;\n");
        sb.append("import org.springframework.data.jpa.repository.config.EnableJpaAuditing;\n");
        sb.append("import org.springframework.scheduling.annotation.EnableAsync;\n");
        sb.append("import org.springframework.transaction.annotation.EnableTransactionManagement;\n\n");
        
        // 类注释
        sb.append("/**\n");
        sb.append(" * ").append(config.getProjectDescription()).append("\n");
        sb.append(" * <p>\n");
        sb.append(" * 项目启动类\n");
        sb.append(" * </p>\n");
        sb.append(" *\n");
        sb.append(" * @author AI Coding System\n");
        sb.append(" * @version 1.0.0\n");
        sb.append(" */\n\n");
        
        // 注解
        sb.append("@SpringBootApplication\n");
        sb.append("@EnableJpaAuditing\n");
        sb.append("@EnableCaching\n");
        sb.append("@EnableAsync\n");
        sb.append("@EnableTransactionManagement\n");
        sb.append("public class ").append(config.getApplicationClassName()).append(" {\n\n");
        
        // main方法
        sb.append("    /**\n");
        sb.append("     * 项目启动方法\n");
        sb.append("     *\n");
        sb.append("n     * @param args 启动参数\n");
        sb.append("     */\n");
        sb.append("    public static void main(String[] args) {\n");
        sb.append("        SpringApplication.run(").append(config.getApplicationClassName()).append(".class, args);\n");
        sb.append("    }\n");
        sb.append("}\n");
        
        return sb.toString();
    }
}
```

### 5. Docker配置模板

#### Dockerfile
```dockerfile
# Dockerfile 模板
# 使用多阶段构建优化镜像大小

# 构建阶段
FROM openjdk:11-jdk-slim as builder

# 设置工作目录
WORKDIR /app

# 复制pom.xml和源码
COPY pom.xml .
COPY src ./src

# 安装Maven并构建项目
RUN apt-get update && \
    apt-get install -y maven && \
    mvn clean package -DskipTests

# 运行阶段
FROM openjdk:11-jre-slim

# 设置时区
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# 创建应用用户
RUN groupadd -r appgroup && useradd -r -g appgroup appuser

# 设置工作目录
WORKDIR /app

# 复制构建好的jar包
COPY --from=builder /app/target/*.jar app.jar

# 创建日志目录
RUN mkdir -p /app/logs && \
    chown -R appuser:appgroup /app

# 切换到应用用户
USER appuser

# 暴露端口
EXPOSE 8080

# 健康检查
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:8080/actuator/health || exit 1

# 启动命令
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]
```

#### Docker Compose配置
```yaml
# docker-compose.yml 模板
version: '3.8'

services:
  # 应用服务
  ${projectName}-app:
    build:
      context: .
      dockerfile: Dockerfile
    image: ${projectName}:${version:-latest}
    container_name: ${projectName}-app
    restart: unless-stopped
    ports:
      - "${APP_PORT:-8080}:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=${PROFILE:-prod}
      - DB_HOST=${DB_HOST:-mysql}
      - DB_PORT=${DB_PORT:-3306}
      - DB_NAME=${DB_NAME:-${projectName}_db}
      - DB_USERNAME=${DB_USERNAME:-root}
      - DB_PASSWORD=${DB_PASSWORD:-password}
      - REDIS_HOST=${REDIS_HOST:-redis}
      - REDIS_PORT=${REDIS_PORT:-6379}
      - REDIS_PASSWORD=${REDIS_PASSWORD:-}
      - JWT_SECRET=${JWT_SECRET:-default-secret}
    depends_on:
      - mysql
      - redis
    networks:
      - ${projectName}-network
    volumes:
      - ./logs:/app/logs
      - ./config:/app/config

  # MySQL数据库
  mysql:
    image: mysql:8.0
    container_name: ${projectName}-mysql
    restart: unless-stopped
    ports:
      - "${DB_PORT:-3306}:3306"
    environment:
      - MYSQL_ROOT_PASSWORD=${DB_ROOT_PASSWORD:-root_password}
      - MYSQL_DATABASE=${DB_NAME:-${projectName}_db}
      - MYSQL_USER=${DB_USERNAME:-${projectName}_user}
      - MYSQL_PASSWORD=${DB_PASSWORD:-password}
      - TZ=Asia/Shanghai
    command: 
      --default-authentication-plugin=mysql_native_password
      --character-set-server=utf8mb4
      --collation-server=utf8mb4_unicode_ci
    volumes:
      - mysql_data:/var/lib/mysql
      - ./sql:/docker-entrypoint-initdb.d
    networks:
      - ${projectName}-network

  # Redis缓存
  redis:
    image: redis:6.2-alpine
    container_name: ${projectName}-redis
    restart: unless-stopped
    ports:
      - "${REDIS_PORT:-6379}:6379"
    command: redis-server --appendonly yes --requirepass ${REDIS_PASSWORD:-}
    volumes:
      - redis_data:/data
    networks:
      - ${projectName}-network

  # Nginx反向代理
  nginx:
    image: nginx:alpine
    container_name: ${projectName}-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/conf.d:/etc/nginx/conf.d
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - ${projectName}-app
    networks:
      - ${projectName}-network

# 数据卷
volumes:
  mysql_data:
  redis_data:

# 网络配置
networks:
  ${projectName}-network:
    driver: bridge
```

## 输入要求
1. 项目名称和描述
2. 技术栈选择
3. 架构模式偏好
4. 模块划分需求
5. 第三方集成需求
6. 部署环境要求
7. 性能指标要求

## 输出要求
1. 完整项目目录结构
2. Maven/Gradle构建文件
3. 配置文件模板
4. 启动类代码
5. Docker配置文件
6. 部署脚本
7. 开发规范文档

## 质量检查
- [ ] 目录结构清晰合理
- [ ] 模块划分职责明确
- [ ] 配置文件完整
- [ ] 构建脚本可用
- [ ] 部署方案可行
- [ ] 文档说明清晰