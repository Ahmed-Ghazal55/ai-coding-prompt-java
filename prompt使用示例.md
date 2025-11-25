# Prompt使用示例

## 概述

本文档提供AI编码提示词工程的具体使用示例，帮助用户快速掌握各层Prompt的使用方法和最佳实践。

## 优化后的软件开发工作流 (Optimized Software Development Workflow)

这是一个现代化、更完整的软件开发生命周期流程，从项目启动到后期维护，确保了项目的结构化和高质量交付。

### 阶段一：项目规划与初始化 (Phase 1: Planning & Initialization)

此阶段专注于项目的准备工作，确保开发团队有清晰的目标和稳固的基础。

-   **① 需求分析 (Requirement Analysis)**
    -   `📝` 与产品、业务方沟通，明确功能需求和业务目标。
-   **② 技术设计 (Technical Design)**
    -   `📐` 设计系统架构、数据库结构、选择技术栈。
-   **③ 项目结构生成 (Generate Project Structure)**
    -   `📁` 初始化代码仓库，创建标准的模块和目录结构。
-   **④ 配置环境 (Configure Environment)**
    -   `⚙️` 配置开发、测试和生产环境，包括依赖库、CI/CD 流水线等。

### 阶段二：开发与实现 (Phase 2: Development & Implementation)

这是核心的编码阶段，团队将设计转化为实际可用的软件功能。

-   **① 数据层开发 (Data Layer Development)**
    -   `🗄️` 实现数据库模型、数据访问对象（DAO）和数据持久化逻辑。
-   **② 业务逻辑实现 (Business Logic Implementation)**
    -   `💡` 编写核心业务代码，处理主要的功能逻辑。
-   **③ API 接口开发 (API Development)**
    -   `🔌` 创建和实现供前端或第三方服务调用的 API 接口。
-   **④ 单元与集成测试 (Unit & Integration Testing)**
    -   `🧪` 编写并执行测试用例，确保代码模块和模块间协作的正确性。

### 阶段三：质量保证 (Phase 3: Quality Assurance)

此阶段通过严格的审查和测试，确保软件的质量、稳定性和安全性。

-   **① 代码审查 (Code Review)**
    -   `✅` 同行或技术负责人审查代码，确保代码质量、可读性和规范性。
-   **② 系统测试 (System Testing)**
    -   `🔬` QA 团队对整个系统进行全面的功能、性能和安全测试。
-   **③ 用户验收测试 (User Acceptance Testing - UAT)**
    -   `👥` 邀请最终用户或产品经理进行测试，确认软件是否满足最初的需求。

### 阶段四：部署与发布 (Phase 4: Deployment & Release)

将通过测试的软件部署到生产环境，供最终用户使用。

-   **① 构建与打包 (Build & Package)**
    -   `📦` 将代码编译、打包成可部署的产物。
-   **② 部署至生产环境 (Deploy to Production)**
    -   `🚀` 通过自动化脚本（CI/CD）将应用发布到服务器。
-   **③ 发布后验证 (Post-Release Verification)**
    -   `🔍` 监控系统日志和关键指标，确保线上服务正常运行。

### 阶段五：运维与迭代 (Phase 5: Maintenance & Iteration)

项目发布后，进入持续的维护和优化周期。

-   **① 监控与告警 (Monitoring & Alerting)**
    -   `📈` 持续监控系统性能和健康状况，设置异常告警。
-   **② 收集用户反馈 (Gather User Feedback)**
    -   `🗣️` 收集用户的使用反馈和新的需求。
-   **③ 修复与优化 (Bug Fixing & Optimization)**
    -   `🛠️` 修复线上发现的 Bug，并根据性能数据进行优化。
-   **④ 迭代新周期 (Start New Cycle)**
    -   `🔄` 基于新的需求和反馈，返回**阶段一**，开始新的开发迭代。

## 使用流程示例

### 场景：开发一个新的订单管理功能

#### 步骤1：需求分析与检查

**使用Prompt**: `rules/Review需求实现检查prompt.md`

```markdown
# 需求规格
开发一个订单管理功能，包含以下功能点：
1. 订单创建：用户可以创建新订单
2. 订单查询：支持按状态、时间范围查询订单
3. 订单更新：更新订单状态和基本信息
4. 订单删除：软删除订单数据

# 技术要求
- 使用Spring Boot + JPA技术栈
- 支持分页查询
- 需要数据缓存优化
- 接口需要认证授权
```

**AI生成检查报告**:
```
总体评分: 85/100
通过状态: 通过
主要问题: 缺少性能指标要求
建议优先级: 中

详细检查项:
✓ 功能完整性检查 - 通过
✓ 技术方案符合性检查 - 通过
✓ 安全性要求检查 - 部分通过
✗ 性能指标检查 - 缺少具体指标

改进建议:
1. 补充性能指标要求（QPS、响应时间等）
2. 明确缓存策略和数据一致性要求
3. 补充异常处理和数据校验规则
```

#### 步骤2：技术方案设计

**使用Prompt**: `技术方案/新增类需求prompt.md`

**输入需求**:
```yaml
业务需求:
  核心功能:
    - 订单创建: 用户选择商品创建订单
    - 订单查询: 多条件分页查询
    - 订单更新: 状态变更和基本信息修改
    - 订单删除: 软删除机制
    
  业务规则:
    - 订单状态: 待支付、已支付、已发货、已完成、已取消
    - 库存校验: 创建订单时校验库存
    - 金额计算: 自动计算订单总金额
    - 有效期: 待支付订单30分钟过期
    
  数据需求:
    - 订单主表: 订单基本信息
    - 订单明细表: 商品明细信息
    - 订单状态表: 状态变更历史
```

**AI生成技术方案**:
```java
/**
 * 订单实体设计
 */
@Entity
@Table(name = "t_order")
public class OrderEntity extends BaseEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "order_no", unique = true, nullable = false, length = 32)
    private String orderNo;
    
    @Column(name = "user_id", nullable = false)
    private Long userId;
    
    @Column(name = "total_amount", nullable = false)
    private BigDecimal totalAmount;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "order_status", nullable = false, length = 20)
    private OrderStatus status;
    
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItemEntity> items = new ArrayList<>();
    
    // 业务方法
    public void createOrder(CreateOrderCommand command) {
        // 业务规则校验
        validateCreateCommand(command);
        
        // 生成订单号
        this.orderNo = generateOrderNo();
        this.userId = command.getUserId();
        this.status = OrderStatus.PENDING_PAYMENT;
        
        // 计算总金额
        this.totalAmount = calculateTotalAmount(command.getItems());
        
        // 创建订单明细
        createOrderItems(command.getItems());
        
        // 发布领域事件
        registerEvent(new OrderCreatedEvent(this.id, this.orderNo));
    }
    
    public void pay() {
        if (this.status != OrderStatus.PENDING_PAYMENT) {
            throw new BusinessException("订单状态不正确，无法支付");
        }
        this.status = OrderStatus.PAID;
        this.payTime = LocalDateTime.now();
        registerEvent(new OrderPaidEvent(this.id));
    }
}
```

#### 步骤3：业务逻辑实现

**使用Prompt**: `业务层/业务层prompt.md`

**AI生成业务服务**:
```java
/**
 * 订单领域服务
 */
@DomainService
@Slf4j
public class OrderDomainService {
    
    private final OrderRepository orderRepository;
    private final InventoryService inventoryService;
    private final EventPublisher eventPublisher;
    
    /**
     * 创建订单
     */
    @Transactional
    public OrderEntity createOrder(CreateOrderCommand command) {
        log.info("开始创建订单，用户ID: {}", command.getUserId());
        
        // 1. 参数校验
        validateCreateCommand(command);
        
        // 2. 库存校验
        checkInventory(command.getItems());
        
        // 3. 创建订单实体
        OrderEntity order = OrderEntity.create(command);
        
        // 4. 保存订单
        order = orderRepository.save(order);
        
        // 5. 扣减库存
        inventoryService.deductInventory(command.getItems());
        
        // 6. 发布事件
        eventPublisher.publish(new OrderCreatedEvent(order.getId(), order.getOrderNo()));
        
        log.info("订单创建成功，订单号: {}", order.getOrderNo());
        return order;
    }
    
    /**
     * 订单支付
     */
    @Transactional
    public void payOrder(String orderNo) {
        OrderEntity order = orderRepository.findByOrderNo(orderNo)
            .orElseThrow(() -> new BusinessException("订单不存在"));
        
        order.pay();
        orderRepository.save(order);
    }
    
    private void validateCreateCommand(CreateOrderCommand command) {
        if (command.getUserId() == null) {
            throw new IllegalArgumentException("用户ID不能为空");
        }
        if (CollectionUtils.isEmpty(command.getItems())) {
            throw new IllegalArgumentException("订单商品不能为空");
        }
        command.getItems().forEach(this::validateOrderItem);
    }
    
    private void checkInventory(List<OrderItemDTO> items) {
        items.forEach(item -> {
            boolean hasInventory = inventoryService.checkInventory(item.getProductId(), item.getQuantity());
            if (!hasInventory) {
                throw new BusinessException("商品库存不足: " + item.getProductId());
            }
        });
    }
}
```

#### 步骤4：接口开发

**使用Prompt**: `应用层/接口定义prompt.md`

**AI生成接口定义**:
```yaml
# 订单管理API定义
apiVersion: v3
description: |
  订单管理接口，提供订单的创建、查询、更新、删除功能
  
  业务场景:
  - 用户下单购买商品
  - 商家管理订单状态
  - 系统管理员查询订单信息
  
  使用约束:
  - 需要用户认证
  - 操作需要相应权限
  - 接口有频率限制

paths:
  /api/v1/orders:
    post:
      summary: 创建订单
      description: 用户创建新订单，需要选择商品和填写收货信息
      tags:
        - 订单管理
      security:
        - bearerAuth: []
      requestBody:
        description: 订单创建请求
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateOrderRequest'
      responses:
        '200':
          description: 订单创建成功
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/OrderResponse'
        '400':
          description: 请求参数错误
        '409':
          description: 商品库存不足

    get:
      summary: 分页查询订单
      description: 支持多条件分页查询订单列表
      tags:
        - 订单管理
      security:
        - bearerAuth: []
      parameters:
        - name: status
          in: query
          description: 订单状态
          schema:
            type: string
            enum: [PENDING_PAYMENT, PAID, SHIPPED, COMPLETED, CANCELLED]
        - name: startTime
          in: query
          description: 开始时间
          schema:
            type: string
            format: date-time
        - name: endTime
          in: query
          description: 结束时间
          schema:
            type: string
            format: date-time
        - name: page
          in: query
          description: 页码，从1开始
          schema:
            type: integer
            minimum: 1
            default: 1
        - name: size
          in: query
          description: 每页大小
          schema:
            type: integer
            minimum: 1
            maximum: 100
            default: 20
      responses:
        '200':
          description: 查询成功
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PageResultOrderResponse'

components:
  schemas:
    CreateOrderRequest:
      type: object
      description: 创建订单请求
      properties:
        items:
          type: array
          description: 订单商品列表
          items:
            $ref: '#/components/schemas/OrderItemRequest'
        shippingAddress:
          $ref: '#/components/schemas/ShippingAddress'
      required:
        - items
        - shippingAddress

    OrderResponse:
      type: object
      description: 订单响应
      properties:
        id:
          type: integer
          description: 订单ID
        orderNo:
          type: string
          description: 订单号
        status:
          type: string
          description: 订单状态
        totalAmount:
          type: number
          description: 订单总金额
        items:
          type: array
          description: 订单商品列表
          items:
            $ref: '#/components/schemas/OrderItemResponse'
```

**使用Prompt**: `应用层/接口实现prompt.md`

**AI生成接口实现**:
```java
/**
 * 订单管理接口实现
 */
@RestController
@RequestMapping("/api/v1/orders")
@Tag(name = "订单管理", description = "订单管理相关接口")
@Validated
@Slf4j
public class OrderController {
    
    private final OrderApplicationService applicationService;
    private final OrderAssembler assembler;
    
    /**
     * 创建订单
     */
    @PostMapping
    @Operation(summary = "创建订单")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "订单创建成功"),
        @ApiResponse(responseCode = "400", description = "请求参数错误"),
        @ApiResponse(responseCode = "409", description = "商品库存不足")
    })
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ApiResponse<OrderResponse>> createOrder(
            @Valid @RequestBody CreateOrderRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        try {
            // 1. 参数转换
            CreateOrderCommand command = assembler.toCommand(request, userDetails.getUserId());
            
            // 2. 调用应用服务
            OrderDTO order = applicationService.createOrder(command);
            
            // 3. 返回结果
            OrderResponse response = assembler.toResponse(order);
            
            return ResponseEntity.ok(ApiResponse.success(response));
            
        } catch (BusinessException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(ApiResponse.error(e.getCode(), e.getMessage()));
        }
    }
    
    /**
     * 分页查询订单
     */
    @GetMapping
    @Operation(summary = "分页查询订单")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ApiResponse<PageResult<OrderResponse>>> findOrders(
            @RequestParam(required = false) OrderStatus status,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime startTime,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime endTime,
            @RequestParam(defaultValue = "1") @Min(1) Integer page,
            @RequestParam(defaultValue = "20") @Min(1) @Max(100) Integer size,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        OrderQuery query = OrderQuery.builder()
            .userId(userDetails.getUserId())
            .status(status)
            .startTime(startTime)
            .endTime(endTime)
            .page(page)
            .size(size)
            .build();
        
        PageResult<OrderDTO> pageResult = applicationService.findOrders(query);
        PageResult<OrderResponse> response = assembler.toPageResponse(pageResult);
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}
```

#### 步骤5：数据层开发

**使用Prompt**: `数据层/建表prompt.md`

**AI生成数据库设计**:
```sql
-- 订单主表
CREATE TABLE t_order (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '订单ID',
    order_no VARCHAR(32) NOT NULL UNIQUE COMMENT '订单号',
    user_id BIGINT NOT NULL COMMENT '用户ID',
    total_amount DECIMAL(10,2) NOT NULL COMMENT '订单总金额',
    order_status VARCHAR(20) NOT NULL DEFAULT 'PENDING_PAYMENT' COMMENT '订单状态',
    pay_status VARCHAR(20) NOT NULL DEFAULT 'UNPAID' COMMENT '支付状态',
    ship_status VARCHAR(20) NOT NULL DEFAULT 'UNSHIPPED' COMMENT '发货状态',
    
    -- 时间信息
    order_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '下单时间',
    pay_time DATETIME COMMENT '支付时间',
    ship_time DATETIME COMMENT '发货时间',
    receive_time DATETIME COMMENT '收货时间',
    cancel_time DATETIME COMMENT '取消时间',
    
    -- 审计字段
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    created_by VARCHAR(50) NOT NULL COMMENT '创建人',
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    updated_by VARCHAR(50) NOT NULL COMMENT '更新人',
    deleted TINYINT NOT NULL DEFAULT 0 COMMENT '删除标记',
    deleted_at DATETIME COMMENT '删除时间',
    deleted_by VARCHAR(50) COMMENT '删除人',
    
    -- 索引设计
    INDEX idx_order_no (order_no),
    INDEX idx_user_id (user_id),
    INDEX idx_order_status (order_status),
    INDEX idx_pay_status (pay_status),
    INDEX idx_order_time (order_time),
    INDEX idx_created_at (created_at),
    INDEX idx_deleted (deleted),
    
    -- 复合索引
    INDEX idx_user_status (user_id, order_status),
    INDEX idx_status_time (order_status, order_time),
    
    -- 外键约束
    CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES t_user(id)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='订单主表';

-- 订单明细表
CREATE TABLE t_order_item (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '明细ID',
    order_id BIGINT NOT NULL COMMENT '订单ID',
    product_id BIGINT NOT NULL COMMENT '商品ID',
    product_name VARCHAR(200) NOT NULL COMMENT '商品名称',
    product_sku VARCHAR(50) COMMENT '商品SKU',
    unit_price DECIMAL(10,2) NOT NULL COMMENT '单价',
    quantity INT NOT NULL DEFAULT 1 COMMENT '数量',
    total_amount DECIMAL(10,2) NOT NULL COMMENT '小计金额',
    
    -- 商品属性
    product_attrs JSON COMMENT '商品属性',
    product_image VARCHAR(500) COMMENT '商品图片',
    
    -- 审计字段
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    created_by VARCHAR(50) NOT NULL COMMENT '创建人',
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    updated_by VARCHAR(50) NOT NULL COMMENT '更新人',
    deleted TINYINT NOT NULL DEFAULT 0 COMMENT '删除标记',
    
    -- 索引设计
    INDEX idx_order_id (order_id),
    INDEX idx_product_id (product_id),
    INDEX idx_product_sku (product_sku),
    INDEX idx_created_at (created_at),
    INDEX idx_deleted (deleted),
    
    -- 复合索引
    INDEX idx_order_product (order_id, product_id),
    
    -- 外键约束
    CONSTRAINT fk_order_item_order FOREIGN KEY (order_id) REFERENCES t_order(id) ON DELETE CASCADE,
    CONSTRAINT fk_order_item_product FOREIGN KEY (product_id) REFERENCES t_product(id)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='订单明细表';
```

**使用Prompt**: `数据层/持久化prompt.md`

**AI生成数据访问层**:
```java
/**
 * 订单仓库接口
 */
@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long>, JpaSpecificationExecutor<OrderEntity> {
    
    /**
     * 根据订单号查询
     */
    Optional<OrderEntity> findByOrderNo(String orderNo);
    
    /**
     * 根据用户ID和订单状态查询
     */
    Page<OrderEntity> findByUserIdAndStatus(Long userId, OrderStatus status, Pageable pageable);
    
    /**
     * 根据创建时间范围查询
     */
    @Query("SELECT o FROM OrderEntity o WHERE o.createdAt BETWEEN :startTime AND :endTime")
    List<OrderEntity> findByCreatedAtBetween(@Param("startTime") LocalDateTime startTime, 
                                           @Param("endTime") LocalDateTime endTime);
    
    /**
     * 统计用户订单数量
     */
    @Query("SELECT COUNT(o) FROM OrderEntity o WHERE o.userId = :userId AND o.deleted = false")
    long countByUserId(@Param("userId") Long userId);
    
    /**
     * 更新订单状态
     */
    @Modifying
    @Query("UPDATE OrderEntity o SET o.status = :status, o.updatedAt = CURRENT_TIMESTAMP WHERE o.orderNo = :orderNo")
    int updateStatusByOrderNo(@Param("orderNo") String orderNo, @Param("status") OrderStatus status);
}
```

## 高级使用技巧

### 1. Prompt组合使用

在实际开发中，往往需要多个Prompt协同工作：

```bash
# 完整的功能开发流程
1. 需求分析 → rules/Review需求实现检查prompt.md
2. 技术方案 → 技术方案/新增类需求prompt.md  
3. 业务逻辑 → 业务层/业务层prompt.md
4. 接口开发 → 应用层/接口定义prompt.md + 接口实现prompt.md
5. 数据层 → 数据层/建表prompt.md + 持久化prompt.md
6. 质量检查 → rules/Review需求实现检查prompt.md
```

### 2. 参数化配置

根据不同项目需求调整Prompt参数：

```yaml
# 项目特定配置
project:
  name: e-commerce-order
  package: com.example.order
  database: mysql
  cache: redis
  
# 技术栈配置  
tech-stack:
  framework: spring-boot
  version: 2.7.12
  java-version: 11
  
# 性能要求
performance:
  qps: 1000
  response-time: 100ms
  concurrent-users: 10000
```

### 3. 自定义扩展

基于标准Prompt模板进行项目特定扩展：

```java
/**
 * 项目特定的业务逻辑扩展
 */
@DomainService
public class CustomOrderService extends OrderDomainService {
    
    // 项目特定的业务规则
    @Override
    protected void validateBusinessRules(CreateOrderCommand command) {
        super.validateBusinessRules(command);
        
        // 项目特定的校验逻辑
        if (command.getItems().size() > 10) {
            throw new BusinessException("单笔订单商品数量不能超过10个");
        }
    }
    
    // 项目特定的积分计算
    private void calculateMemberPoints(OrderEntity order) {
        // 根据订单金额计算积分
        int points = order.getTotalAmount().multiply(new BigDecimal("10")).intValue();
        memberPointService.addPoints(order.getUserId(), points);
    }
}
```

### 4. 团队协作模式

```bash
# 团队共享Prompt库
├── team-prompts/
│   ├── common/           # 通用Prompt模板
│   ├── project-a/        # 项目A特定Prompt
│   ├── project-b/        # 项目B特定Prompt
│   └── best-practices/   # 最佳实践总结

# 版本管理策略
git branch feature/order-management
git add prompt-templates/
git commit -m "feat: 添加订单管理功能Prompt模板"
git push origin feature/order-management
```

## 前端开发示例

### 场景：开发一个商品列表组件

#### 步骤1：前端工程结构设计

**使用Prompt**: `前端/前端工程结构prompt.md`

**输入需求**: 
```yaml
项目名称: e-commerce-frontend
技术栈: Vue 3 + TypeScript + Vite 5 + Pinia + Ant Design Vue 4.X
项目类型: 单页面应用(SPA)
功能模块: 
  - 商品管理
  - 订单管理
  - 用户中心
```

**AI生成前端项目结构**: 
```
e-commerce-frontend/
├── public/                    # 静态资源
├── src/                       # 源代码
│   ├── api/                   # API服务
│   │   ├── product.ts         # 商品API
│   │   └── index.ts           # API入口
│   ├── components/            # 组件
│   │   ├── common/            # 通用组件
│   │   └── product/           # 商品相关组件
│   ├── composables/           # 组合式函数
│   ├── layouts/               # 布局组件
│   ├── pages/                 # 页面组件
│   │   ├── product/           # 商品页面
│   │   ├── order/             # 订单页面
│   │   └── user/              # 用户页面
│   ├── router/                # 路由配置
│   ├── stores/                # Pinia状态管理
│   │   ├── product.ts         # 商品状态
│   │   └── user.ts            # 用户状态
│   ├── styles/                # 样式文件
│   ├── types/                 # TypeScript类型定义
│   ├── utils/                 # 工具函数
│   ├── App.vue                # 根组件
│   ├── main.ts                # 入口文件
│   └── vite-env.d.ts          # Vite环境类型
├── .eslintrc.js               # ESLint配置
├── .prettierrc.js             # Prettier配置
├── index.html                 # HTML模板
├── package.json               # 项目依赖
├── tsconfig.json              # TypeScript配置
└── vite.config.ts             # Vite配置
```

#### 步骤2：前端组件开发

**使用Prompt**: `前端/前端组件开发prompt.md`

**输入需求**: 
```yaml
组件名称: ProductList
组件类型: 业务组件
功能需求: 
  - 商品列表展示
  - 分页功能
  - 筛选功能
  - 排序功能
  - 商品卡片点击事件
技术栈: Vue 3 + TypeScript + Ant Design Vue 4.X
```

**AI生成商品列表组件**: 
```vue
<template>
  <div class="product-list">
    <!-- 筛选和排序区域 -->
    <div class="product-list__header">
      <a-row :gutter="[16, 16]">
        <a-col :span="8">
          <a-input
            v-model:value="searchKeyword"
            placeholder="搜索商品名称"
            allow-clear
            @change="handleSearch"
          >
            <template #prefix>
              <SearchOutlined />
            </template>
          </a-input>
        </a-col>
        <a-col :span="8">
          <a-select
            v-model:value="sortBy"
            placeholder="排序方式"
            @change="handleSort"
          >
            <a-select-option value="price-asc">价格从低到高</a-select-option>
            <a-select-option value="price-desc">价格从高到低</a-select-option>
            <a-select-option value="sales-desc">销量从高到低</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="8">
          <a-select
            v-model:value="categoryId"
            placeholder="商品分类"
            allow-clear
            @change="handleCategoryChange"
          >
            <a-select-option value="">全部分类</a-select-option>
            <a-select-option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </a-select-option>
          </a-select>
        </a-col>
      </a-row>
    </div>

    <!-- 商品列表区域 -->
    <div class="product-list__content">
      <a-row :gutter="[16, 16]">
        <a-col :xs="24" :sm="12" :md="8" :lg="6" v-for="product in products" :key="product.id">
          <a-card :hoverable="true" :cover="<img alt=\"product\" :src=\"product.imageUrl\" />" @click="handleProductClick(product)">
            <template #title>
              <div class="product-title">{{ product.name }}</div>
            </template>
            <template #meta>
              <a-rate :value="product.rating" disabled />
            </template>
            <div class="product-price">¥{{ product.price.toFixed(2) }}</div>
            <div class="product-sales">销量: {{ product.sales }}</div>
          </a-card>
        </a-col>
      </a-row>
    </div>

    <!-- 分页区域 -->
    <div class="product-list__footer">
      <a-pagination
        v-model:current="currentPage"
        :page-size="pageSize"
        :total="total"
        @change="handlePageChange"
        show-size-changer
        :page-size-options="['12', '24', '36', '48']"
        show-total="(total) => `共 ${total} 件商品`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import type { Product, Category } from '@/types'
import { useProductStore } from '@/stores/product'

// Props
interface Props {
  initialCategoryId?: string
}

const props = withDefaults(defineProps<Props>(), {
  initialCategoryId: ''
})

// Emits
const emit = defineEmits<{
  (e: 'productClick', product: Product): void
  (e: 'update:loading', loading: boolean): void
}>()

// Store
const productStore = useProductStore()

// State
const searchKeyword = ref('')
const sortBy = ref('')
const categoryId = ref(props.initialCategoryId)
const currentPage = ref(1)
const pageSize = ref(12)
const total = ref(0)
const products = ref<Product[]>([])
const categories = ref<Category[]>([])
const loading = ref(false)

// Methods
const fetchProducts = async () => {
  loading.value = true
  emit('update:loading', true)
  try {
    const result = await productStore.getProductList({
      keyword: searchKeyword.value,
      categoryId: categoryId.value,
      sortBy: sortBy.value,
      page: currentPage.value,
      pageSize: pageSize.value
    })
    products.value = result.list
    total.value = result.total
  } catch (error) {
    console.error('Failed to fetch products:', error)
  } finally {
    loading.value = false
    emit('update:loading', false)
  }
}

const fetchCategories = async () => {
  try {
    categories.value = await productStore.getCategories()
  } catch (error) {
    console.error('Failed to fetch categories:', error)
  }
}

const handleSearch = () => {
  currentPage.value = 1
  fetchProducts()
}

const handleSort = () => {
  currentPage.value = 1
  fetchProducts()
}

const handleCategoryChange = () => {
  currentPage.value = 1
  fetchProducts()
}

const handlePageChange = (page: number, size: number) => {
  currentPage.value = page
  pageSize.value = size
  fetchProducts()
}

const handleProductClick = (product: Product) => {
  emit('productClick', product)
}

// Lifecycle
onMounted(() => {
  fetchCategories()
  fetchProducts()
})
</script>

<style scoped lang="scss">
.product-list {
  &__header {
    margin-bottom: 20px;
    padding: 16px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &__content {
    margin-bottom: 20px;
  }

  &__footer {
    display: flex;
    justify-content: center;
    padding: 16px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}

.product-title {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-price {
  font-size: 18px;
  font-weight: bold;
  color: #ff4d4f;
  margin: 8px 0;
}

.product-sales {
  font-size: 12px;
  color: #8c8c8c;
}
</style>
```

#### 步骤3：前端状态管理

**使用Prompt**: `前端/前端状态管理prompt.md`

**输入需求**: 
```yaml
模块名称: product
功能需求: 
  - 商品列表管理
  - 商品详情管理
  - 商品分类管理
技术栈: Vue 3 + TypeScript + Pinia
```

**AI生成商品状态管理**: 
```typescript
// stores/product.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product, Category, ProductListParams, ProductListResult } from '@/types'
import { productApi } from '@/api'

export const useProductStore = defineStore('product', () => {
  // State
  const products = ref<Product[]>([])
  const categories = ref<Category[]>([])
  const currentProduct = ref<Product | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const getProductById = computed(() => (id: string) => {
    return products.value.find(product => product.id === id) || null
  })

  // Actions
  async function getProductList(params: ProductListParams): Promise<ProductListResult> {
    loading.value = true
    error.value = null
    try {
      const result = await productApi.getProductList(params)
      products.value = result.list
      return result
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch products'
      return { list: [], total: 0 }
    } finally {
      loading.value = false
    }
  }

  async function getProductById(id: string): Promise<Product | null> {
    loading.value = true
    error.value = null
    try {
      const product = await productApi.getProductById(id)
      currentProduct.value = product
      return product
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch product'
      return null
    } finally {
      loading.value = false
    }
  }

  async function getCategories(): Promise<Category[]> {
    if (categories.value.length > 0) {
      return categories.value
    }
    
    loading.value = true
    error.value = null
    try {
      const result = await productApi.getCategories()
      categories.value = result
      return result
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch categories'
      return []
    } finally {
      loading.value = false
    }
  }

  async function createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product | null> {
    loading.value = true
    error.value = null
    try {
      const result = await productApi.createProduct(product)
      products.value.unshift(result)
      return result
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create product'
      return null
    } finally {
      loading.value = false
    }
  }

  async function updateProduct(id: string, product: Partial<Product>): Promise<Product | null> {
    loading.value = true
    error.value = null
    try {
      const result = await productApi.updateProduct(id, product)
      const index = products.value.findIndex(p => p.id === id)
      if (index !== -1) {
        products.value[index] = { ...products.value[index], ...result }
      }
      if (currentProduct.value?.id === id) {
        currentProduct.value = { ...currentProduct.value, ...result }
      }
      return result
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update product'
      return null
    } finally {
      loading.value = false
    }
  }

  async function deleteProduct(id: string): Promise<boolean> {
    loading.value = true
    error.value = null
    try {
      await productApi.deleteProduct(id)
      products.value = products.value.filter(p => p.id !== id)
      if (currentProduct.value?.id === id) {
        currentProduct.value = null
      }
      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete product'
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    products,
    categories,
    currentProduct,
    loading,
    error,
    // Getters
    getProductById,
    // Actions
    getProductList,
    getProductById,
    getCategories,
    createProduct,
    updateProduct,
    deleteProduct
  }
})
```

## 移动端开发示例

### 场景：开发一个移动端商品详情页

#### 步骤1：移动端工程结构设计

**使用Prompt**: `移动端/移动端工程结构prompt.md`

**输入需求**: 
```yaml
项目名称: e-commerce-mobile
技术栈: uni-app (Vue 3) + TypeScript + uni-ui
项目类型: 跨平台应用(APP、小程序、H5)
功能模块: 
  - 商品浏览
  - 购物车
  - 订单管理
  - 用户中心
```

**AI生成移动端项目结构**: 
```
e-commerce-mobile/
├── components/                # 组件
│   ├── common/                # 通用组件
│   └── product/               # 商品相关组件
├── pages/                     # 页面
│   ├── index/                 # 首页
│   ├── product/               # 商品页面
│   ├── cart/                  # 购物车页面
│   ├── order/                 # 订单页面
│   └── user/                  # 用户页面
├── services/                  # API服务
│   ├── product.ts             # 商品API
│   └── user.ts                # 用户API
├── stores/                    # 状态管理
│   ├── product.ts             # 商品状态
│   └── cart.ts                # 购物车状态
├── static/                    # 静态资源
├── styles/                    # 样式文件
├── types/                     # TypeScript类型定义
├── utils/                     # 工具函数
├── App.vue                    # 根组件
├── main.ts                    # 入口文件
├── manifest.json              # 应用配置
├── pages.json                 # 页面配置
├── tsconfig.json              # TypeScript配置
└── vite.config.ts             # Vite配置
```

#### 步骤2：移动端组件开发

**使用Prompt**: `移动端/移动端组件开发prompt.md`

**输入需求**: 
```yaml
组件名称: ProductDetail
组件类型: 业务组件
功能需求: 
  - 商品图片轮播
  - 商品基本信息展示
  - 商品规格选择
  - 加入购物车功能
  - 立即购买功能
技术栈: uni-app (Vue 3) + TypeScript + uni-ui
```

**AI生成商品详情组件**: 
```vue
<template>
  <view class="product-detail">
    <!-- 商品图片轮播 -->
    <swiper class="product-swiper" indicator-dots circular autoplay>
      <swiper-item v-for="(image, index) in product.images" :key="index">
        <image :src="image" mode="aspectFill" class="swiper-image"></image>
      </swiper-item>
    </swiper>

    <!-- 商品基本信息 -->
    <view class="product-info">
      <text class="product-title">{{ product.title }}</text>
      <text class="product-price">¥{{ product.price.toFixed(2) }}</text>
      <text class="product-sales">销量 {{ product.sales }} | 库存 {{ product.stock }}</text>
    </view>

    <!-- 商品规格选择 -->
    <view class="product-specs">
      <text class="specs-title">选择规格</text>
      <view class="specs-list">
        <view 
          v-for="(spec, index) in product.specs" 
          :key="index"
          class="spec-item"
          :class="{ active: selectedSpec === spec }"
          @click="selectedSpec = spec"
        >
          {{ spec }}
        </view>
      </view>
    </view>

    <!-- 商品详情 -->
    <view class="product-description">
      <text class="description-title">商品详情</text>
      <rich-text :nodes="product.description"></rich-text>
    </view>

    <!-- 底部操作栏 -->
    <view class="bottom-bar">
      <view class="bar-item" @click="addToCart">
        <text class="bar-icon">🛒</text>
        <text class="bar-text">加入购物车</text>
      </view>
      <view class="bar-item primary" @click="buyNow">
        <text class="bar-text">立即购买</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { Product } from '@/types'
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'

// Props
interface Props {
  productId: string
}

const props = defineProps<Props>()

// Store
const productStore = useProductStore()
const cartStore = useCartStore()

// State
const product = ref<Product>({
  id: '',
  title: '',
  price: 0,
  sales: 0,
  stock: 0,
  images: [],
  specs: [],
  description: ''
})
const selectedSpec = ref('')
const loading = ref(false)

// Methods
const fetchProductDetail = async () => {
  loading.value = true
  try {
    const result = await productStore.getProductById(props.productId)
    if (result) {
      product.value = result
      // 默认选择第一个规格
      if (result.specs.length > 0) {
        selectedSpec.value = result.specs[0]
      }
    }
  } catch (error) {
    uni.showToast({
      title: '获取商品详情失败',
      icon: 'none'
    })
  } finally {
    loading.value = false
  }
}

const addToCart = () => {
  if (!selectedSpec.value) {
    uni.showToast({
      title: '请选择商品规格',
      icon: 'none'
    })
    return
  }
  
  cartStore.addToCart({
    productId: product.value.id,
    title: product.value.title,
    price: product.value.price,
    spec: selectedSpec.value,
    quantity: 1,
    image: product.value.images[0]
  })
  
  uni.showToast({
    title: '已加入购物车',
    icon: 'success'
  })
}

const buyNow = () => {
  if (!selectedSpec.value) {
    uni.showToast({
      title: '请选择商品规格',
      icon: 'none'
    })
    return
  }
  
  // 跳转到确认订单页面
  uni.navigateTo({
    url: `/pages/order/confirm?productId=${product.value.id}&spec=${selectedSpec.value}&quantity=1`
  })
}

// Lifecycle
onMounted(() => {
  fetchProductDetail()
})

// Watch
watch(() => props.productId, (newId) => {
  if (newId) {
    fetchProductDetail()
  }
})
</script>

<style scoped lang="scss">
.product-detail {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.product-swiper {
  height: 400rpx;
  width: 100%;
}

.swiper-image {
  width: 100%;
  height: 100%;
}

.product-info {
  padding: 20rpx;
  background-color: #fff;
  margin-bottom: 10rpx;
}

.product-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 10rpx;
  line-height: 1.5;
}

.product-price {
  font-size: 40rpx;
  font-weight: bold;
  color: #ff4d4f;
  display: block;
  margin-bottom: 10rpx;
}

.product-sales {
  font-size: 24rpx;
  color: #999;
  display: block;
}

.product-specs {
  padding: 20rpx;
  background-color: #fff;
  margin-bottom: 10rpx;
}

.specs-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 20rpx;
}

.specs-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.spec-item {
  padding: 15rpx 30rpx;
  background-color: #f5f5f5;
  border-radius: 40rpx;
  font-size: 26rpx;
  color: #333;
}

.spec-item.active {
  background-color: #e6f7ff;
  color: #1890ff;
  border: 1rpx solid #1890ff;
}

.product-description {
  padding: 20rpx;
  background-color: #fff;
  margin-bottom: 100rpx; /* 为底部操作栏留出空间 */
}

.description-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 20rpx;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.bar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 40rpx;
  height: 100%;
}

.bar-item.primary {
  background-color: #ff4d4f;
  color: #fff;
  width: 300rpx;
  border-radius: 50rpx;
  margin: 20rpx;
  height: 80rpx;
}

.bar-icon {
  font-size: 40rpx;
  margin-bottom: 5rpx;
}

.bar-text {
  font-size: 24rpx;
}
</style>
```

## 常见问题解答

### Q1: 如何选择合适的Prompt模板？

**A1**: 根据开发阶段和需求类型选择：
- 需求分析阶段 → rules/Review需求实现检查prompt.md
- 新功能开发 → 技术方案/新增类需求prompt.md
- 现有功能修改 → 技术方案/修改类需求prompt.md
- 接口开发 → 应用层/接口*.md
- 数据库开发 → 数据层/建表prompt.md
- 前端开发 → 前端/前端*.md
- 移动端开发 → 移动端/移动端*.md

### Q2: Prompt参数如何配置？

**A2**: 根据项目类型在配置文件中设置：

```yaml
# 前端项目配置
# vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})

# 移动端项目配置
# pages.json
{
  "pages": [
    {
      "path": "pages/index/index",
      "style": {
        "navigationBarTitleText": "首页"
      }
    }
  ],
  "globalStyle": {
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTextStyle": "black"
  }
}
```

### Q3: 如何处理Prompt生成的代码不符合项目规范的情况？

**A3**: 
1. 检查Prompt参数配置是否正确
2. 在项目特定Prompt中添加自定义规则
3. 使用代码审查工具进行二次检查
4. 持续优化Prompt模板

### Q4: 如何评估Prompt使用效果？

**A4**: 
- **量化指标**: AI编码采纳率、代码质量指标、开发效率提升
- **定性评估**: 团队反馈、代码可维护性、项目一致性
- **持续监控**: 定期收集使用数据和反馈建议

## 最佳实践总结

### 1. 渐进式采用
- 从简单功能开始试用
- 逐步扩展到复杂业务场景
- 持续优化和调整Prompt配置

### 2. 团队协作
- 建立团队共享的Prompt库
- 定期进行使用经验分享
- 建立反馈和改进机制

### 3. 质量保证
- 建立代码审查流程
- 使用自动化测试验证
- 持续监控代码质量指标

### 4. 知识沉淀
- 记录使用经验和最佳实践
- 建立项目特定的Prompt模板
- 形成团队知识库

### 5. 跨平台开发注意事项
- 优先使用跨平台API
- 合理使用条件编译
- 考虑不同平台的性能差异
- 测试覆盖所有目标平台

通过以上示例和实践，您可以快速掌握AI编码提示词工程的使用方法，并在实际项目中发挥其最大价值。