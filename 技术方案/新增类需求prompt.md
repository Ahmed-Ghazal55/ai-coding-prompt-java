# 新增类需求技术方案Prompt

## 角色定义
你是一位经验丰富的系统架构师，擅长根据业务需求设计高质量、可扩展、易维护的类结构和系统架构。

## 方案目标
为全新的业务需求设计完整的技术方案，包括类结构设计、数据库设计、接口设计、缓存策略和测试方案。

## 设计流程

### 1. 需求分析

#### 1.1 业务需求梳理
```yaml
业务需求:
  核心功能:
    - [功能1]: [功能描述]
    - [功能2]: [功能描述]
    - [功能3]: [功能描述]
    
  业务规则:
    - [规则1]: [规则描述和约束]
    - [规则2]: [规则描述和约束]
    - [规则3]: [规则描述和约束]
    
  业务场景:
    - [场景1]: [场景描述和触发条件]
    - [场景2]: [场景描述和触发条件]
    - [场景3]: [场景描述和触发条件]
    
  数据需求:
    - [数据1]: [数据类型和使用方式]
    - [数据2]: [数据类型和使用方式]
    - [数据3]: [数据类型和使用方式]
```

#### 1.2 非功能性需求
```yaml
性能要求:
  响应时间: [具体要求，如<100ms]
  并发量: [具体要求，如1000 QPS]
  数据量: [具体要求，如100万条数据]
  
可用性要求:
  可用性目标: [如99.9%]
  故障恢复时间: [如<5分钟]
  
安全性要求:
  数据加密: [需要/不需要]
  权限控制: [具体权限要求]
  审计日志: [需要/不需要]
  
扩展性要求:
  水平扩展: [支持/不支持]
  垂直扩展: [支持/不支持]
  功能扩展: [预留扩展点]
```

### 2. 类结构设计

#### 2.1 领域模型设计
```java
/**
 * 新增业务实体 - [业务描述]
 * 
 * 业务标识:
 * - [标识字段]: [业务含义和生成规则]
 * 
 * 业务状态:
 * - [状态字段]: [状态转换规则]
 * 
 * 业务行为:
 * - [行为1]: [行为描述和业务规则]
 * - [行为2]: [行为描述和业务规则]
 */
@Entity
@Table(name = "t_new_business")
public class NewBusinessEntity extends BaseEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "business_code", unique = true, nullable = false, length = 50)
    private String businessCode;
    
    @Column(name = "business_name", nullable = false, length = 100)
    private String businessName;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "business_status", nullable = false, length = 20)
    private BusinessStatus status;
    
    @Column(name = "business_type", length = 30)
    private String businessType;
    
    @Column(name = "priority", columnDefinition = "int default 0")
    private Integer priority;
    
    @Column(name = "validity_start_time")
    private LocalDateTime validityStartTime;
    
    @Column(name = "validity_end_time")
    private LocalDateTime validityEndTime;
    
    @Column(name = "extension_data", columnDefinition = "json")
    private String extensionData;
    
    @Column(name = "description", length = 500)
    private String description;
    
    // 关联关系
    @OneToMany(mappedBy = "newBusiness", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<RelatedSubEntity> subEntities = new ArrayList<>();
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private ParentEntity parent;
    
    // 业务构造函数
    public static NewBusinessEntity create(CreateCommand command) {
        NewBusinessEntity entity = new NewBusinessEntity();
        entity.businessCode = generateBusinessCode();
        entity.businessName = command.getBusinessName();
        entity.status = BusinessStatus.DRAFT;
        entity.businessType = command.getBusinessType();
        entity.priority = command.getPriority();
        entity.validityStartTime = command.getValidityStartTime();
        entity.validityEndTime = command.getValidityEndTime();
        entity.extensionData = command.getExtensionData();
        entity.description = command.getDescription();
        
        // 业务规则校验
        entity.validateCreate();
        
        return entity;
    }
    
    // 核心业务方法
    public void activate() {
        if (this.status != BusinessStatus.DRAFT && this.status != BusinessStatus.INACTIVE) {
            throw new BusinessException("只有草稿或停用状态才能激活");
        }
        
        // 业务规则校验
        validateActivation();
        
        this.status = BusinessStatus.ACTIVE;
        this.activateTime = LocalDateTime.now();
        
        // 发布领域事件
        registerEvent(new BusinessActivatedEvent(this.id, this.businessCode));
    }
    
    public void deactivate(String reason) {
        if (this.status != BusinessStatus.ACTIVE) {
            throw new BusinessException("只有激活状态才能停用");
        }
        
        this.status = BusinessStatus.INACTIVE;
        this.deactivateTime = LocalDateTime.now();
        this.deactivateReason = reason;
        
        // 发布领域事件
        registerEvent(new BusinessDeactivatedEvent(this.id, reason));
    }
    
    public void updateInfo(UpdateCommand command) {
        // 业务规则校验
        validateUpdate(command);
        
        // 更新基本信息
        if (StringUtils.isNotBlank(command.getBusinessName())) {
            this.businessName = command.getBusinessName();
        }
        
        if (command.getPriority() != null) {
            this.priority = command.getPriority();
        }
        
        if (StringUtils.isNotBlank(command.getDescription())) {
            this.description = command.getDescription();
        }
        
        // 更新扩展数据
        if (StringUtils.isNotBlank(command.getExtensionData())) {
            this.extensionData = mergeExtensionData(this.extensionData, command.getExtensionData());
        }
        
        // 发布更新事件
        registerEvent(new BusinessInfoUpdatedEvent(this.id));
    }
    
    // 私有方法
    private void validateCreate() {
        if (StringUtils.isBlank(businessName)) {
            throw new BusinessException("业务名称不能为空");
        }
        
        if (validityStartTime != null && validityEndTime != null) {
            if (validityStartTime.isAfter(validityEndTime)) {
                throw new BusinessException("有效期开始时间不能晚于结束时间");
            }
        }
    }
    
    private void validateActivation() {
        if (StringUtils.isBlank(businessCode)) {
            throw new BusinessException("业务编码不能为空");
        }
        
        if (validityStartTime != null && validityStartTime.isAfter(LocalDateTime.now())) {
            throw new BusinessException("业务尚未到生效时间");
        }
        
        if (validityEndTime != null && validityEndTime.isBefore(LocalDateTime.now())) {
            throw new BusinessException("业务已过期");
        }
    }
    
    private String generateBusinessCode() {
        // 业务编码生成规则
        return "BUS" + System.currentTimeMillis() + RandomStringUtils.randomNumeric(4);
    }
}
```

#### 2.2 值对象设计
```java
/**
 * 业务配置信息 - 值对象
 */
@Embeddable
public class BusinessConfig {
    
    @Column(name = "config_category", length = 30)
    private String category;
    
    @Column(name = "config_key", length = 50)
    private String key;
    
    @Column(name = "config_value", length = 200)
    private String value;
    
    @Column(name = "config_type", length = 20)
    private String type;
    
    @Column(name = "is_required")
    private Boolean required;
    
    // 业务校验
    public boolean isValid() {
        return StringUtils.isNotBlank(category) 
            && StringUtils.isNotBlank(key)
            && StringUtils.isNotBlank(value)
            && StringUtils.isNotBlank(type);
    }
    
    // 转换为Map
    public Map<String, Object> toMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("category", category);
        map.put("key", key);
        map.put("value", value);
        map.put("type", type);
        map.put("required", required);
        return map;
    }
}
```

#### 2.3 枚举类型设计
```java
/**
 * 业务状态枚举
 */
public enum BusinessStatus {
    DRAFT("草稿", "刚创建，待完善"),
    PENDING("待审核", "等待审核"),
    ACTIVE("激活", "正常使用中"),
    INACTIVE("停用", "暂停使用"),
    EXPIRED("过期", "超过有效期"),
    SUSPENDED("挂起", "临时暂停");
    
    private final String name;
    private final String description;
    
    BusinessStatus(String name, String description) {
        this.name = name;
        this.description = description;
    }
    
    // 状态转换验证
    public boolean canTransitionTo(BusinessStatus target) {
        switch (this) {
            case DRAFT:
                return target == PENDING || target == ACTIVE;
            case PENDING:
                return target == ACTIVE || target == INACTIVE;
            case ACTIVE:
                return target == INACTIVE || target == SUSPENDED;
            case INACTIVE:
                return target == ACTIVE;
            case SUSPENDED:
                return target == ACTIVE || target == INACTIVE;
            default:
                return false;
        }
    }
}

/**
 * 业务类型枚举
 */
public enum BusinessType {
    TYPE_A("类型A", "描述A"),
    TYPE_B("类型B", "描述B"),
    TYPE_C("类型C", "描述C");
    
    private final String name;
    private final String description;
    
    BusinessType(String name, String description) {
        this.name = name;
        this.description = description;
    }
}
```

### 3. 领域服务设计

#### 3.1 核心业务服务
```java
/**
 * 新增业务领域服务
 */
@DomainService
@Slf4j
public class NewBusinessDomainService {
    
    private final NewBusinessRepository repository;
    private final NewBusinessValidator validator;
    private final EventPublisher eventPublisher;
    private final CacheManager cacheManager;
    private final IdGenerator idGenerator;
    
    /**
     * 创建新业务
     */
    @Transactional
    public NewBusinessEntity createBusiness(CreateBusinessCommand command) {
        log.info("开始创建新业务: {}", command.getBusinessName());
        
        // 1. 命令校验
        validator.validateCreateCommand(command);
        
        // 2. 业务规则校验
        checkBusinessRules(command);
        
        // 3. 创建业务实体
        NewBusinessEntity entity = NewBusinessEntity.create(command);
        
        // 4. 生成业务编码
        String businessCode = generateBusinessCode(command.getBusinessType());
        entity.setBusinessCode(businessCode);
        
        // 5. 保存实体
        entity = repository.save(entity);
        
        // 6. 初始化关联数据
        initializeRelatedData(entity);
        
        // 7. 发布创建事件
        eventPublisher.publish(new BusinessCreatedEvent(
            entity.getId(), 
            entity.getBusinessCode(), 
            entity.getBusinessName()
        ));
        
        log.info("新业务创建成功: {}", entity.getId());
        return entity;
    }
    
    /**
     * 批量创建业务
     */
    @Transactional
    public List<NewBusinessEntity> createBusinessBatch(List<CreateBusinessCommand> commands) {
        log.info("开始批量创建新业务，数量: {}", commands.size());
        
        List<NewBusinessEntity> entities = new ArrayList<>();
        
        for (CreateBusinessCommand command : commands) {
            try {
                NewBusinessEntity entity = createBusiness(command);
                entities.add(entity);
            } catch (Exception e) {
                log.error("批量创建中单个业务创建失败: {}", command.getBusinessName(), e);
                // 记录失败但继续处理其他
            }
        }
        
        log.info("批量创建完成，成功: {}, 失败: {}", 
                 entities.size(), commands.size() - entities.size());
        return entities;
    }
    
    /**
     * 更新业务信息
     */
    @Transactional
    public NewBusinessEntity updateBusiness(Long id, UpdateBusinessCommand command) {
        log.info("开始更新业务: {}", id);
        
        // 1. 查询现有实体
        NewBusinessEntity entity = repository.findById(id)
            .orElseThrow(() -> new BusinessException("业务不存在"));
        
        // 2. 命令校验
        validator.validateUpdateCommand(command);
        
        // 3. 业务状态校验
        if (entity.getStatus() == BusinessStatus.EXPIRED) {
            throw new BusinessException("已过期业务不能修改");
        }
        
        // 4. 更新实体信息
        entity.updateInfo(command);
        
        // 5. 保存更新
        entity = repository.save(entity);
        
        // 6. 清除缓存
        evictCache(entity.getId());
        
        // 7. 发布更新事件
        eventPublisher.publish(new BusinessUpdatedEvent(
            entity.getId(), 
            command.getUpdatedFields()
        ));
        
        log.info("业务更新成功: {}", id);
        return entity;
    }
    
    /**
     * 激活业务
     */
    @Transactional
    public void activateBusiness(Long id) {
        log.info("开始激活业务: {}", id);
        
        NewBusinessEntity entity = repository.findById(id)
            .orElseThrow(() -> new BusinessException("业务不存在"));
        
        entity.activate();
        repository.save(entity);
        
        // 清除缓存
        evictCache(entity.getId());
        
        log.info("业务激活成功: {}", id);
    }
    
    /**
     * 停用业务
     */
    @Transactional
    public void deactivateBusiness(Long id, String reason) {
        log.info("开始停用业务: {}, 原因: {}", id, reason);
        
        NewBusinessEntity entity = repository.findById(id)
            .orElseThrow(() -> new BusinessException("业务不存在"));
        
        entity.deactivate(reason);
        repository.save(entity);
        
        // 清除缓存
        evictCache(entity.getId());
        
        log.info("业务停用成功: {}", id);
    }
    
    /**
     * 删除业务
     */
    @Transactional
    public void deleteBusiness(Long id) {
        log.info("开始删除业务: {}", id);
        
        NewBusinessEntity entity = repository.findById(id)
            .orElseThrow(() -> new BusinessException("业务不存在"));
        
        // 业务规则校验
        if (entity.getStatus() == BusinessStatus.ACTIVE) {
            throw new BusinessException("激活状态的业务不能删除");
        }
        
        // 软删除
        entity.setDeleted(true);
        entity.setDeleteTime(LocalDateTime.now());
        repository.save(entity);
        
        // 清除缓存
        evictCache(entity.getId());
        
        // 发布删除事件
        eventPublisher.publish(new BusinessDeletedEvent(entity.getId()));
        
        log.info("业务删除成功: {}", id);
    }
    
    // 私有方法
    private void checkBusinessRules(CreateBusinessCommand command) {
        // 检查业务类型是否有效
        if (!isValidBusinessType(command.getBusinessType())) {
            throw new BusinessException("无效的业务类型");
        }
        
        // 检查名称唯一性
        if (repository.existsByBusinessName(command.getBusinessName())) {
            throw new BusinessException("业务名称已存在");
        }
        
        // 检查有效期
        if (command.getValidityStartTime() != null 
            && command.getValidityEndTime() != null) {
            if (command.getValidityStartTime().isAfter(command.getValidityEndTime())) {
                throw new BusinessException("有效期开始时间不能晚于结束时间");
            }
        }
    }
    
    private String generateBusinessCode(String businessType) {
        String prefix = BusinessType.valueOf(businessType).name().substring(0, 3);
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String random = RandomStringUtils.randomNumeric(4);
        return prefix + timestamp + random;
    }
    
    private void initializeRelatedData(NewBusinessEntity entity) {
        // 初始化相关的子实体数据
        // 设置默认配置
        // 创建关联的权限记录等
    }
    
    private void evictCache(Long id) {
        cacheManager.evict("business", id);
        cacheManager.evict("business", "code:" + id);
    }
}
```

#### 3.2 查询服务设计
```java
/**
 * 业务查询服务
 */
@DomainService
@Slf4j
public class NewBusinessQueryService {
    
    private final NewBusinessRepository repository;
    private final CacheManager cacheManager;
    
    /**
     * 根据ID查询
     */
    @Cacheable(value = "business", key = "#id")
    public NewBusinessDTO findById(Long id) {
        log.debug("查询业务: {}", id);
        
        return repository.findById(id)
            .map(entity -> NewBusinessDTO.fromEntity(entity))
            .orElse(null);
    }
    
    /**
     * 根据编码查询
     */
    @Cacheable(value = "business", key = "'code:' + #code")
    public NewBusinessDTO findByCode(String code) {
        log.debug("查询业务编码: {}", code);
        
        return repository.findByBusinessCode(code)
            .map(entity -> NewBusinessDTO.fromEntity(entity))
            .orElse(null);
    }
    
    /**
     * 分页查询
     */
    public PageResult<NewBusinessDTO> findPage(BusinessQuery query) {
        log.info("分页查询业务: {}", query);
        
        // 构建查询条件
        Specification<NewBusinessEntity> spec = buildSpecification(query);
        
        // 执行查询
        Page<NewBusinessEntity> page = repository.findAll(spec, query.toPageable());
        
        // 转换为DTO
        List<NewBusinessDTO> content = page.getContent().stream()
            .map(entity -> NewBusinessDTO.fromEntity(entity))
            .collect(Collectors.toList());
        
        return PageResult.of(content, page.getTotalElements());
    }
    
    /**
     * 根据状态查询
     */
    public List<NewBusinessDTO> findByStatus(BusinessStatus status) {
        log.debug("查询状态为{}的业务", status);
        
        return repository.findByStatus(status).stream()
            .map(entity -> NewBusinessDTO.fromEntity(entity))
            .collect(Collectors.toList());
    }
    
    /**
     * 查询有效的业务（在有效期内）
     */
    public List<NewBusinessDTO> findValidBusiness() {
        log.debug("查询有效业务");
        
        LocalDateTime now = LocalDateTime.now();
        return repository.findValidBusiness(now).stream()
            .map(entity -> NewBusinessDTO.fromEntity(entity))
            .collect(Collectors.toList());
    }
    
    /**
     * 统计业务数量
     */
    public BusinessStatistics getStatistics() {
        log.debug("获取业务统计信息");
        
        Map<BusinessStatus, Long> statusCount = repository.countByStatus();
        Long totalCount = repository.count();
        
        return BusinessStatistics.builder()
            .totalCount(totalCount)
            .statusCount(statusCount)
            .build();
    }
    
    // 私有方法
    private Specification<NewBusinessEntity> buildSpecification(BusinessQuery query) {
        return (root, criteriaQuery, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            
            // 按名称模糊查询
            if (StringUtils.isNotBlank(query.getBusinessName())) {
                predicates.add(criteriaBuilder.like(
                    root.get("businessName"), 
                    "%" + query.getBusinessName() + "%"
                ));
            }
            
            // 按状态查询
            if (query.getStatus() != null) {
                predicates.add(criteriaBuilder.equal(
                    root.get("status"), 
                    query.getStatus()
                ));
            }
            
            // 按类型查询
            if (StringUtils.isNotBlank(query.getBusinessType())) {
                predicates.add(criteriaBuilder.equal(
                    root.get("businessType"), 
                    query.getBusinessType()
                ));
            }
            
            // 按有效期查询
            if (query.getValidAt() != null) {
                predicates.add(criteriaBuilder.and(
                    criteriaBuilder.lessThanOrEqualTo(
                        root.get("validityStartTime"), 
                        query.getValidAt()
                    ),
                    criteriaBuilder.greaterThanOrEqualTo(
                        root.get("validityEndTime"), 
                        query.getValidAt()
                    )
                ));
            }
            
            // 排除已删除的数据
            predicates.add(criteriaBuilder.equal(root.get("deleted"), false));
            
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
```

### 4. 数据库设计

#### 4.1 主表设计
```sql
-- 新业务主表
CREATE TABLE t_new_business (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    business_code VARCHAR(50) NOT NULL UNIQUE COMMENT '业务编码',
    business_name VARCHAR(100) NOT NULL COMMENT '业务名称',
    business_status VARCHAR(20) NOT NULL COMMENT '业务状态',
    business_type VARCHAR(30) COMMENT '业务类型',
    priority INT DEFAULT 0 COMMENT '优先级',
    validity_start_time DATETIME COMMENT '有效期开始时间',
    validity_end_time DATETIME COMMENT '有效期结束时间',
    extension_data JSON COMMENT '扩展数据',
    description VARCHAR(500) COMMENT '描述信息',
    activate_time DATETIME COMMENT '激活时间',
    deactivate_time DATETIME COMMENT '停用时间',
    deactivate_reason VARCHAR(200) COMMENT '停用原因',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    created_by VARCHAR(50) NOT NULL COMMENT '创建人',
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    updated_by VARCHAR(50) NOT NULL COMMENT '更新人',
    deleted TINYINT(1) NOT NULL DEFAULT 0 COMMENT '是否删除',
    delete_time DATETIME COMMENT '删除时间',
    
    -- 索引设计
    INDEX idx_business_code (business_code),
    INDEX idx_business_name (business_name),
    INDEX idx_status (business_status),
    INDEX idx_type (business_type),
    INDEX idx_priority (priority),
    INDEX idx_validity_time (validity_start_time, validity_end_time),
    INDEX idx_created_at (created_at),
    INDEX idx_updated_at (updated_at),
    INDEX idx_deleted (deleted)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='新业务表';
```

#### 4.2 子表设计
```sql
-- 业务子项表
CREATE TABLE t_new_business_item (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    business_id BIGINT NOT NULL COMMENT '业务ID',
    item_code VARCHAR(50) NOT NULL COMMENT '子项编码',
    item_name VARCHAR(100) NOT NULL COMMENT '子项名称',
    item_value VARCHAR(200) COMMENT '子项值',
    item_type VARCHAR(20) NOT NULL COMMENT '子项类型',
    sort_order INT DEFAULT 0 COMMENT '排序',
    is_active TINYINT(1) DEFAULT 1 COMMENT '是否激活',
    
    -- 外键约束
    CONSTRAINT fk_business_item_business 
        FOREIGN KEY (business_id) REFERENCES t_new_business(id),
    
    -- 索引设计
    INDEX idx_business_id (business_id),
    INDEX idx_item_code (item_code),
    INDEX idx_item_type (item_type),
    INDEX idx_sort_order (sort_order),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='业务子项表';
```

#### 4.3 关联表设计
```sql
-- 业务关联关系表
CREATE TABLE t_new_business_relation (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    source_business_id BIGINT NOT NULL COMMENT '源业务ID',
    target_business_id BIGINT NOT NULL COMMENT '目标业务ID',
    relation_type VARCHAR(20) NOT NULL COMMENT '关联类型',
    relation_desc VARCHAR(200) COMMENT '关联描述',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    
    -- 外键约束
    CONSTRAINT fk_relation_source 
        FOREIGN KEY (source_business_id) REFERENCES t_new_business(id),
    CONSTRAINT fk_relation_target 
        FOREIGN KEY (target_business_id) REFERENCES t_new_business(id),
    
    -- 索引设计
    INDEX idx_source_business (source_business_id),
    INDEX idx_target_business (target_business_id),
    INDEX idx_relation_type (relation_type),
    INDEX idx_created_at (created_at),
    
    -- 唯一约束，防止重复关联
    UNIQUE KEY uk_business_relation (source_business_id, target_business_id, relation_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='业务关联关系表';
```

### 5. 缓存设计

#### 5.1 缓存策略
```java
/**
 * 业务缓存配置
 */
@Configuration
@EnableCaching
public class BusinessCacheConfig {
    
    @Bean
    public CacheManager cacheManager(RedisConnectionFactory factory) {
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofMinutes(30))
            .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()))
            .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer()))
            .disableCachingNullValues();
        
        return RedisCacheManager.builder(factory)
            .cacheDefaults(config)
            .withCacheConfiguration("business", 
                RedisCacheConfiguration.defaultCacheConfig()
                    .entryTtl(Duration.ofMinutes(60)))
            .withCacheConfiguration("businessList", 
                RedisCacheConfiguration.defaultCacheConfig()
                    .entryTtl(Duration.ofMinutes(15)))
            .build();
    }
    
    @Bean
    public Cache businessCache() {
        return CacheBuilder.newBuilder()
            .maximumSize(10000)
            .expireAfterWrite(30, TimeUnit.MINUTES)
            .recordStats()
            .build();
    }
}
```

#### 5.2 缓存更新策略
```java
/**
 * 缓存更新服务
 */
@Service
public class CacheUpdateService {
    
    @CacheEvict(value = "business", key = "#id")
    public void evictBusinessCache(Long id) {
        log.info("清除业务缓存: {}", id);
    }
    
    @CacheEvict(value = "business", allEntries = true)
    public void evictAllBusinessCache() {
        log.info("清除所有业务缓存");
    }
    
    @CachePut(value = "business", key = "#entity.id")
    public NewBusinessEntity updateBusinessCache(NewBusinessEntity entity) {
        log.info("更新业务缓存: {}", entity.getId());
        return entity;
    }
    
    /**
     * 缓存预热
     */
    @PostConstruct
    public void preloadCache() {
        log.info("开始缓存预热");
        
        // 预热常用数据
        List<NewBusinessEntity> activeBusinesses = repository.findByStatus(BusinessStatus.ACTIVE);
        activeBusinesses.forEach(entity -> {
            cacheManager.getCache("business").put(entity.getId(), entity);
        });
        
        log.info("缓存预热完成，预热数据量: {}", activeBusinesses.size());
    }
}
```

### 6. 接口设计

#### 6.1 RESTful接口设计
```java
/**
 * 业务管理接口
 */
@RestController
@RequestMapping("/api/v1/business")
@Tag(name = "业务管理", description = "新业务管理相关接口")
@Validated
public class BusinessController {
    
    private final NewBusinessDomainService domainService;
    private final NewBusinessQueryService queryService;
    private final BusinessAssembler assembler;
    
    /**
     * 创建业务
     */
    @PostMapping
    @Operation(summary = "创建业务")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "创建成功"),
        @ApiResponse(responseCode = "400", description = "参数错误"),
        @ApiResponse(responseCode = "409", description = "业务名称已存在")
    })
    public ResponseEntity<ApiResponse<BusinessResponse>> createBusiness(
            @Valid @RequestBody CreateBusinessRequest request) {
        
        try {
            CreateBusinessCommand command = assembler.toCommand(request);
            NewBusinessEntity entity = domainService.createBusiness(command);
            BusinessResponse response = assembler.toResponse(entity);
            
            return ResponseEntity.ok(ApiResponse.success(response));
            
        } catch (BusinessException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(ApiResponse.error(e.getCode(), e.getMessage()));
        }
    }
    
    /**
     * 批量创建业务
     */
    @PostMapping("/batch")
    @Operation(summary = "批量创建业务")
    public ResponseEntity<ApiResponse<BatchCreateResponse>> createBusinessBatch(
            @Valid @RequestBody BatchCreateRequest request) {
        
        List<CreateBusinessCommand> commands = assembler.toCommands(request);
        List<NewBusinessEntity> entities = domainService.createBusinessBatch(commands);
        
        BatchCreateResponse response = assembler.toBatchResponse(entities);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    /**
     * 更新业务
     */
    @PutMapping("/{id}")
    @Operation(summary = "更新业务信息")
    public ResponseEntity<ApiResponse<BusinessResponse>> updateBusiness(
            @PathVariable @Min(1) Long id,
            @Valid @RequestBody UpdateBusinessRequest request) {
        
        UpdateBusinessCommand command = assembler.toUpdateCommand(request);
        NewBusinessEntity entity = domainService.updateBusiness(id, command);
        BusinessResponse response = assembler.toResponse(entity);
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    /**
     * 删除业务
     */
    @DeleteMapping("/{id}")
    @Operation(summary = "删除业务")
    public ResponseEntity<ApiResponse<Void>> deleteBusiness(
            @PathVariable @Min(1) Long id) {
        
        domainService.deleteBusiness(id);
        return ResponseEntity.ok(ApiResponse.success());
    }
    
    /**
     * 激活业务
     */
    @PostMapping("/{id}/activate")
    @Operation(summary = "激活业务")
    public ResponseEntity<ApiResponse<Void>> activateBusiness(
            @PathVariable @Min(1) Long id) {
        
        domainService.activateBusiness(id);
        return ResponseEntity.ok(ApiResponse.success());
    }
    
    /**
     * 停用业务
     */
    @PostMapping("/{id}/deactivate")
    @Operation(summary = "停用业务")
    public ResponseEntity<ApiResponse<Void>> deactivateBusiness(
            @PathVariable @Min(1) Long id,
            @RequestParam(required = false) String reason) {
        
        domainService.deactivateBusiness(id, reason);
        return ResponseEntity.ok(ApiResponse.success());
    }
    
    /**
     * 根据ID查询业务
     */
    @GetMapping("/{id}")
    @Operation(summary = "根据ID查询业务")
    public ResponseEntity<ApiResponse<BusinessResponse>> findById(
            @PathVariable @Min(1) Long id) {
        
        NewBusinessDTO dto = queryService.findById(id);
        if (dto == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error("业务不存在"));
        }
        
        BusinessResponse response = assembler.toResponse(dto);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    /**
     * 根据编码查询业务
     */
    @GetMapping("/code/{code}")
    @Operation(summary = "根据编码查询业务")
    public ResponseEntity<ApiResponse<BusinessResponse>> findByCode(
            @PathVariable String code) {
        
        NewBusinessDTO dto = queryService.findByCode(code);
        if (dto == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error("业务不存在"));
        }
        
        BusinessResponse response = assembler.toResponse(dto);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    /**
     * 分页查询业务
     */
    @GetMapping
    @Operation(summary = "分页查询业务")
    public ResponseEntity<ApiResponse<PageResult<BusinessResponse>>> findPage(
            @Valid BusinessQueryRequest request) {
        
        BusinessQuery query = assembler.toQuery(request);
        PageResult<NewBusinessDTO> page = queryService.findPage(query);
        
        PageResult<BusinessResponse> response = assembler.toPageResponse(page);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    /**
     * 查询有效业务
     */
    @GetMapping("/valid")
    @Operation(summary = "查询有效业务")
    public ResponseEntity<ApiResponse<List<BusinessResponse>>> findValidBusiness() {
        
        List<NewBusinessDTO> dtos = queryService.findValidBusiness();
        List<BusinessResponse> responses = assembler.toResponses(dtos);
        
        return ResponseEntity.ok(ApiResponse.success(responses));
    }
    
    /**
     * 获取业务统计信息
     */
    @GetMapping("/statistics")
    @Operation(summary = "获取业务统计信息")
    public ResponseEntity<ApiResponse<BusinessStatisticsResponse>> getStatistics() {
        
        BusinessStatistics statistics = queryService.getStatistics();
        BusinessStatisticsResponse response = assembler.toStatisticsResponse(statistics);
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}
```

#### 6.2 数据传输对象设计
```java
/**
 * 创建业务请求DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "创建业务请求")
public class CreateBusinessRequest {
    
    @Schema(description = "业务名称", required = true, example = "新业务A")
    @NotBlank(message = "业务名称不能为空")
    @Size(max = 100, message = "业务名称长度不能超过100字符")
    private String businessName;
    
    @Schema(description = "业务类型", required = true, example = "TYPE_A")
    @NotBlank(message = "业务类型不能为空")
    @Pattern(regexp = "TYPE_[A-Z]{1}", message = "业务类型格式不正确")
    private String businessType;
    
    @Schema(description = "优先级", example = "1")
    @Min(value = 0, message = "优先级不能小于0")
    @Max(value = 999, message = "优先级不能大于999")
    private Integer priority;
    
    @Schema(description = "有效期开始时间", example = "2024-01-01T00:00:00")
    @Future(message = "有效期开始时间必须大于当前时间")
    private LocalDateTime validityStartTime;
    
    @Schema(description = "有效期结束时间", example = "2024-12-31T23:59:59")
    @Future(message = "有效期结束时间必须大于当前时间")
    private LocalDateTime validityEndTime;
    
    @Schema(description = "扩展数据", example = "{\"key\": \"value\"}")
    private String extensionData;
    
    @Schema(description = "描述信息", example = "这是一个新业务")
    @Size(max = 500, message = "描述信息长度不能超过500字符")
    private String description;
    
    // 自定义校验
    @AssertTrue(message = "有效期结束时间必须晚于开始时间")
    public boolean isValidityTimeValid() {
        if (validityStartTime == null || validityEndTime == null) {
            return true;
        }
        return validityEndTime.isAfter(validityStartTime);
    }
}

/**
 * 业务响应DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "业务响应")
public class BusinessResponse {
    
    @Schema(description = "业务ID", example = "1")
    private Long id;
    
    @Schema(description = "业务编码", example = "BUS202401011200001")
    private String businessCode;
    
    @Schema(description = "业务名称", example = "新业务A")
    private String businessName;
    
    @Schema(description = "业务状态", example = "ACTIVE")
    private String status;
    
    @Schema(description = "业务类型", example = "TYPE_A")
    private String businessType;
    
    @Schema(description = "优先级", example = "1")
    private Integer priority;
    
    @Schema(description = "有效期开始时间", example = "2024-01-01T00:00:00")
    private LocalDateTime validityStartTime;
    
    @Schema(description = "有效期结束时间", example = "2024-12-31T23:59:59")
    private LocalDateTime validityEndTime;
    
    @Schema(description = "扩展数据", example = "{\"key\": \"value\"}")
    private String extensionData;
    
    @Schema(description = "描述信息", example = "这是一个新业务")
    private String description;
    
    @Schema(description = "创建时间", example = "2024-01-01T12:00:00")
    private LocalDateTime createdAt;
    
    @Schema(description = "创建人", example = "admin")
    private String createdBy;
    
    @Schema(description = "更新时间", example = "2024-01-01T12:00:00")
    private LocalDateTime updatedAt;
    
    @Schema(description = "更新人", example = "admin")
    private String updatedBy;
}
```

### 7. 测试策略

#### 7.1 单元测试
```java
/**
 * 领域模型单元测试
 */
@ExtendWith(MockitoExtension.class)
class NewBusinessEntityTest {
    
    @Test
    @DisplayName("创建业务实体成功")
    void testCreateBusinessSuccess() {
        // Given
        CreateCommand command = CreateCommand.builder()
            .businessName("测试业务")
            .businessType("TYPE_A")
            .priority(1)
            .build();
        
        // When
        NewBusinessEntity entity = NewBusinessEntity.create(command);
        
        // Then
        assertThat(entity).isNotNull();
        assertThat(entity.getBusinessName()).isEqualTo("测试业务");
        assertThat(entity.getStatus()).isEqualTo(BusinessStatus.DRAFT);
        assertThat(entity.getBusinessCode()).isNotBlank();
    }
    
    @Test
    @DisplayName("激活业务成功")
    void testActivateBusinessSuccess() {
        // Given
        NewBusinessEntity entity = createTestEntity();
        
        // When
        entity.activate();
        
        // Then
        assertThat(entity.getStatus()).isEqualTo(BusinessStatus.ACTIVE);
        assertThat(entity.getActivateTime()).isNotNull();
    }
    
    @Test
    @DisplayName("激活业务失败 - 状态不正确")
    void testActivateBusinessFailWithInvalidStatus() {
        // Given
        NewBusinessEntity entity = createTestEntity();
        entity.activate(); // 先激活
        
        // When & Then
        assertThrows(BusinessException.class, () -> {
            entity.activate(); // 再次激活
        });
    }
}

/**
 * 领域服务单元测试
 */
@ExtendWith(MockitoExtension.class)
class NewBusinessDomainServiceTest {
    
    @Mock
    private NewBusinessRepository repository;
    
    @Mock
    private NewBusinessValidator validator;
    
    @Mock
    private EventPublisher eventPublisher;
    
    @InjectMocks
    private NewBusinessDomainService service;
    
    @Test
    @DisplayName("创建业务成功")
    void testCreateBusinessSuccess() {
        // Given
        CreateBusinessCommand command = createTestCommand();
        NewBusinessEntity entity = createTestEntity();
        
        when(repository.save(any())).thenReturn(entity);
        
        // When
        NewBusinessEntity result = service.createBusiness(command);
        
        // Then
        assertThat(result).isNotNull();
        verify(validator).validateCreateCommand(command);
        verify(repository).save(any());
        verify(eventPublisher).publish(any(BusinessCreatedEvent.class));
    }
    
    @Test
    @DisplayName("创建业务失败 - 名称重复")
    void testCreateBusinessFailWithDuplicateName() {
        // Given
        CreateBusinessCommand command = createTestCommand();
        
        when(repository.existsByBusinessName(command.getBusinessName())).thenReturn(true);
        
        // When & Then
        assertThrows(BusinessException.class, () -> {
            service.createBusiness(command);
        });
    }
}
```

#### 7.2 集成测试
```java
/**
 * 接口集成测试
 */
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class BusinessControllerIntegrationTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @Test
    @DisplayName("创建业务接口测试")
    void testCreateBusinessApi() throws Exception {
        // Given
        CreateBusinessRequest request = CreateBusinessRequest.builder()
            .businessName("测试业务")
            .businessType("TYPE_A")
            .priority(1)
            .build();
        
        // When & Then
        mockMvc.perform(post("/api/v1/business")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(0))
            .andExpect(jsonPath("$.data.businessName").value("测试业务"))
            .andExpect(jsonPath("$.data.businessType").value("TYPE_A"));
    }
    
    @Test
    @DisplayName("查询业务接口测试")
    void testFindBusinessApi() throws Exception {
        // Given
        Long businessId = 1L;
        
        // When & Then
        mockMvc.perform(get("/api/v1/business/{id}", businessId))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(0))
            .andExpect(jsonPath("$.data.id").value(businessId));
    }
}
```

#### 7.3 性能测试
```java
/**
 * 性能测试
 */
@SpringBootTest
@AutoConfigureMockMvc
class BusinessPerformanceTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Test
    @DisplayName("批量创建性能测试")
    void testBatchCreatePerformance() throws Exception {
        // 准备测试数据
        List<CreateBusinessRequest> requests = IntStream.range(0, 100)
            .mapToObj(i -> CreateBusinessRequest.builder()
                .businessName("测试业务" + i)
                .businessType("TYPE_A")
                .priority(i)
                .build())
            .collect(Collectors.toList());
        
        long startTime = System.currentTimeMillis();
        
        // 执行批量创建
        for (CreateBusinessRequest request : requests) {
            mockMvc.perform(post("/api/v1/business")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(new ObjectMapper().writeValueAsString(request)))
                .andExpect(status().isOk());
        }
        
        long endTime = System.currentTimeMillis();
        long duration = endTime - startTime;
        
        // 验证性能指标
        assertThat(duration).isLessThan(10000); // 10秒内完成
        System.out.println("批量创建100个业务耗时: " + duration + "ms");
    }
}
```

## 输入要求
1. 完整的业务需求文档
2. 业务流程图和用例描述
3. 数据需求说明
4. 性能和安全要求
5. 现有系统架构文档
6. 技术栈约束条件

## 输出要求
1. 完整的类结构设计文档
2. 数据库设计文档（包含表结构、索引、约束）
3. 接口设计文档（OpenAPI规范）
4. 缓存策略和实现方案
5. 完整的单元测试和集成测试用例
6. 部署和运维方案
7. 性能优化建议

## 质量检查
- [ ] 类设计符合DDD原则
- [ ] 数据库设计满足范式和性能要求
- [ ] 接口设计符合RESTful规范
- [ ] 缓存策略合理有效
- [ ] 测试用例覆盖全面
- [ ] 文档完整清晰
- [ ] 性能指标明确可测