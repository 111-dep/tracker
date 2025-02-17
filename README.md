# Solana 钱包资产分析工具 v0.7

一个专注于 Solana 链上资产分析的命令行工具，支持多钱包资产追踪、实时价格更新和变化率监控。

## 最新特性 (v0.7)

### 1. 扩展监控范围
- 支持 TOP 100 代币实时监控
- 单个代币实时变化率显示
- 灵活的更新频率设置（5-60秒可调）

### 2. 优化的数据结构
- 统一的日志记录系统
- 简化的数据存储方式
- 清晰的模块职责划分

### 3. 增强的终端显示
```bash
# 终端输出示例
总资产: $44467536.89 (-0.01%/s) [07:39:40]
Mint地址	价格(USD)	价值(USD)	变化率(%/s)	时间戳
EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v	1	7792244.14	0	2/17/2025 14:28
7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr	0.26768155	633945.19	-0.01	2/17/2025 14:28
CZcdoP3hEDd8sVKqaeipXS1acxivMeC7WdDHuCADpump	0.65557969	5440725.41	0	2/17/2025 14:28
5mbK36SZ7J19An8jFochhQS4of8g6BwUjbeCSxBSoWdp	0.03293429	144418.87	0.05	2/17/2025 14:28
6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN	17.26540647	1813915.21	0	2/17/2025 14:28



```

### 4. 性能提升
- 优化的内存使用
- 减少重复计算
- 提高数据处理速度

## 系统架构

### 1. 数据获取层
- **钱包数据源**
  - Helius DAS API: 代币详细信息
  - RPC API: 备选数据源
  - 并发处理: 多钱包同时处理

- **价格数据源**
  - Jupiter API v3: 实时价格和可信度
  - Birdeye API: 备选价格源

### 2. 数据处理层
- **代币数据处理**
  - 智能合并同类代币
  - 自动处理代币精度
  - 多级变化率计算

- **价格处理**
  - 实时价格验证
  - 智能异常检测
  - 价格来源优先级

### 3. 监控引擎
- **多维度变化率**
  ```
  总值变化率 = (当前值 - 上次值) / 时间间隔
  单币变化率 = (当前价值 - 上次价值) / 时间间隔
  平均变化率 = 累计变化 / 观察周期
  ```

## 使用方法

### 1. 环境配置
```bash
# 复制并配置环境变量
cp .env.example .env

# 编辑 .env 文件
HELIUS_RPC_ENDPOINT=YOUR_ENDPOINT
HELIUS_API_KEY=YOUR_API_KEY
UPDATE_INTERVAL=20  # 自定义更新间隔（秒）
```

### 2. 运行程序
```bash
# 默认模式（实时总值监控）
go run main.go -all

# 自定义模式
go run main.go -all -interval 10 -top 100
```

## 优化计划 (v0.8)

### 1. 智能分析功能
- AI 辅助异常检测
- 智能投资建议
- 历史趋势分析

### 2. 可视化增强
- Web 界面支持
- 实时图表展示
- 自定义报表生成

### 3. 数据存储升级
- 时序数据库支持
- 分布式存储方案
- 高效数据压缩

## 已解决的问题

### 1. 结构优化
- ✅ 统一的日志系统
- ✅ 明确的模块职责
- ✅ 优化的数据流转

### 2. 性能提升
- ✅ 减少文件IO操作
- ✅ 优化内存使用
- ✅ 提高响应速度

### 3. 功能增强
- ✅ 单币变化率显示
- ✅ 自定义更新频率
- ✅ TOP 100 代币支持


## 许可证

MIT License 
