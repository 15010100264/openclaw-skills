# 小红书助手 - OpenClaw技能

## 概述
AI智能生成小红书文案，支持多种风格：种草、测评、教程、日常。一键生成高质量内容，提升内容创作效率。

## 功能特性
- ✅ **4种文案风格**：种草、测评、教程、日常
- ✅ **智能标题生成**：自动生成吸引人的标题
- ✅ **话题标签推荐**：生成相关话题标签
- ✅ **热门话题分析**：分析当前热门趋势
- ✅ **文案优化功能**：优化现有文案质量
- ✅ **表情符号支持**：自动添加合适表情
- ✅ **长度控制**：支持短/中/长三种长度

## 快速开始

### 安装
```bash
# 通过GitHub URL安装
openclaw skill install https://github.com/openclaw-skills/xiaohongshu-helper

# 或者通过技能中心安装
openclaw skill install xiaohongshu-helper
```

### 基本使用
```javascript
// 生成种草文案
const result = await xiaohongshu.generate_content({
  style: '种草',
  topic: 'AI写作工具',
  keywords: ['效率', '创作', 'AI'],
  length: '中等'
});

console.log(result.data.content);
```

## 详细使用指南

### 可用工具

#### 1. generate_content - 生成小红书文案
```javascript
参数:
- style: '种草' | '测评' | '教程' | '日常' (默认: '种草')
- topic: string (必填) - 主题内容
- keywords: string[] - 关键词列表
- length: '短' | '中等' | '长' (默认: '中等')
- targetAudience: string - 目标受众

示例:
await xiaohongshu.generate_content({
  style: '种草',
  topic: '无线耳机',
  keywords: ['降噪', '音质', '续航'],
  length: '中等',
  targetAudience: '通勤族'
});
```

#### 2. generate_title - 生成标题
```javascript
参数:
- topic: string (必填)
- style: '种草' | '测评' | '教程' | '日常'
- emoji: boolean - 是否添加表情符号

示例:
await xiaohongshu.generate_title({
  topic: '早餐食谱',
  style: '教程',
  emoji: true
});
```

#### 3. generate_hashtags - 生成话题标签
```javascript
参数:
- topic: string - 主题内容
- count: number - 标签数量 (1-20)
- includeGeneral: boolean - 是否包含通用标签

示例:
await xiaohongshu.generate_hashtags({
  topic: '健身',
  count: 8,
  includeGeneral: true
});
```

#### 4. analyze_trend - 分析热门话题
```javascript
参数:
- category: '美妆' | '穿搭' | '美食' | '旅行' | '数码' | '家居' | '全部'
- limit: number - 返回数量 (1-50)

示例:
await xiaohongshu.analyze_trend({
  category: '美食',
  limit: 10
});
```

#### 5. optimize_content - 优化现有文案
```javascript
参数:
- content: string (必填) - 原始文案
- target: '简洁' | '生动' | '专业' | '亲和'
- addEmoji: boolean - 是否添加表情符号

示例:
await xiaohongshu.optimize_content({
  content: '这个产品很好用',
  target: '生动',
  addEmoji: true
});
```

## 配置选项

### 技能配置
```javascript
const xiaohongshu = new XiaohongshuHelper({
  apiKey: '',              // API密钥（如果需要）
  defaultStyle: '种草',     // 默认文案风格
  defaultLength: '中等',    // 默认文案长度
  emojiEnabled: true,      // 是否启用表情符号
  hashtagCount: 5,         // 默认话题标签数量
  debug: false             // 调试模式
});
```

## 示例输出

### 种草文案示例
```
标题：这款无线耳机让我通勤不再无聊！🎧

最近发现这款无线耳机，简直太棒了！

🌟 为什么推荐无线耳机？
- 解决痛点：降噪效果明显，通勤更安静
- 使用体验：操作简单，音质惊艳
- 性价比：物超所值，强烈推荐

以上就是我的无线耳机分享，希望对你有帮助！

#无线耳机 #降噪耳机 #通勤好物 #好物推荐 #生活分享
```

### 教程文案示例
```
标题：3步学会健康早餐搭配 🍳

很多朋友问我怎么准备健康早餐，今天详细分享一下！

📌 健康早餐详细教程：
1. 第一步：准备基础材料（鸡蛋、面包、蔬菜）
2. 第二步：按照步骤操作（煎蛋、烤面包、搭配）
3. 第三步：检查效果，调整优化
💡 小贴士：注意营养均衡，效果更佳

关于健康早餐，你有什么想法？欢迎评论区交流～

#健康早餐 #早餐食谱 #营养搭配 #生活技巧 #教程分享
```

## 开发指南

### 项目结构
```
xiaohongshu-helper/
├── SKILL.md          # 技能描述文件
├── README.md         # 详细文档
├── package.json      # 项目配置
├── index.js          # 主入口文件
└── test/             # 测试文件（可选）
    └── index.test.js
```

### 本地开发
```bash
# 克隆仓库
git clone https://github.com/openclaw-skills/xiaohongshu-helper

# 安装依赖
npm install

# 本地测试
openclaw skill install .

# 运行测试
npm test
```

## 常见问题

### Q1: 生成的内容不够个性化怎么办？
A: 在AI生成的基础上，加入个人真实体验和感受，让内容更生动。

### Q2: 如何提高文案质量？
A: 提供更详细的主题描述，选择合适的关键词，调整文案风格。

### Q3: 支持批量生成吗？
A: 当前版本支持单次生成，批量生成功能在开发计划中。

### Q4: 需要网络连接吗？
A: 不需要，所有生成逻辑都在本地运行。

## 更新日志

### v1.0.0 (2026-04-03)
- 初始版本发布
- 支持4种文案风格
- 提供5个核心工具
- 完整的配置和优化功能

## 贡献
欢迎提交Issue和Pull Request改进技能。

## 许可证
MIT License

## 联系我们
- GitHub: https://github.com/openclaw-skills
- 技能中心: https://skills.openclaw.cn
- 邮箱: contact@openclaw-skills.cn