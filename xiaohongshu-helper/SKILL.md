# 小红书助手

## 描述
AI智能生成小红书文案，支持多种风格：种草、测评、教程、日常。一键生成高质量内容，提升内容创作效率。

## 使用场景
- **种草笔记**：产品推荐和体验分享
- **测评对比**：产品功能对比评测
- **教程指南**：步骤教学和技巧分享
- **日常分享**：生活记录和心情分享
- **商业推广**：品牌宣传和产品推广

## 安装
```bash
# 通过GitHub URL安装
openclaw skill install https://github.com/openclaw-skills/xiaohongshu-helper

# 或者通过技能中心安装（如果配置了）
openclaw skill install xiaohongshu-helper
```

## 使用方法

### 基本使用
```javascript
// 生成小红书文案
const result = await xiaohongshu.generate({
  style: '种草',
  topic: 'AI写作工具',
  keywords: ['效率', '创作', 'AI'],
  length: '中等'
});
```

### 配置选项
| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| style | string | "种草" | 文案风格：种草/测评/教程/日常 |
| topic | string | "" | 主题内容（必填） |
| keywords | array | [] | 关键词列表 |
| length | string | "中等" | 文案长度：短/中等/长 |
| emoji | boolean | true | 是否添加表情符号 |
| hashtags | number | 5 | 话题标签数量 |

### 工具列表
| 工具名称 | 描述 | 参数 |
|----------|------|------|
| generate_content | 生成小红书文案 | style, topic, keywords, length |
| generate_title | 生成标题 | topic, style |
| generate_hashtags | 生成话题标签 | topic, count |
| analyze_trend | 分析热门话题 | category |
| optimize_content | 优化现有文案 | content, target |

## 示例

### 示例1：种草笔记
```markdown
标题：这款AI写作工具让我效率翻倍！🤖

正文：
最近发现了一款超好用的AI写作工具，简直是内容创作者的福音！

🌟 核心功能：
1. 智能文案生成：输入关键词，自动生成高质量文案
2. 多平台适配：支持小红书、微博、公众号等多种格式
3. 一键优化：不满意？一键优化到满意为止
4. 实时更新：紧跟热点，内容永远新鲜

💡 使用体验：
- 操作简单：界面简洁，上手零难度
- 效果惊艳：生成的内容质量超出预期
- 节省时间：原来需要2小时的工作，现在10分钟搞定

💰 性价比：
目前有新人优惠，性价比超高！强烈推荐给经常需要创作内容的朋友们～

#AI写作 #效率工具 #内容创作 #种草 #好物推荐
```

### 示例2：教程分享
```markdown
标题：3步学会用AI生成小红书爆款文案 📝

正文：
很多朋友问我怎么快速生成高质量小红书文案，今天分享我的独家秘籍！

📌 第一步：明确目标
- 确定文案类型：种草/测评/教程/日常
- 设定目标受众：年轻人/宝妈/职场人士
- 选择关键词：3-5个核心关键词

📌 第二步：使用工具
推荐使用AI写作助手，操作简单效果佳：
1. 选择文案风格
2. 输入主题和关键词
3. 调整长度和语气
4. 一键生成

📌 第三步：优化调整
- 添加表情符号增加亲和力
- 插入相关话题标签
- 检查逻辑和流畅度
- 添加个人体验和感受

🎯 小贴士：
- 保持真诚：AI生成后加入真实感受
- 关注热点：结合当前热门话题
- 定期更新：工具也在不断进化

#AI教程 #小红书运营 #文案技巧 #内容创作 #学习分享
```

## 开发指南

### 项目结构
```
xiaohongshu-helper/
├── SKILL.md          # 技能描述文件
├── README.md         # 详细文档
├── package.json      # Node.js配置
├── index.js          # 主入口文件
├── lib/              # 工具库
│   ├── generator.js  # 文案生成器
│   ├── analyzer.js   # 内容分析器
│   └── optimizer.js  # 内容优化器
├── config/           # 配置文件
│   └── styles.json   # 风格配置
└── test/             # 测试文件
    └── index.test.js
```

### 依赖说明
```json
{
  "dependencies": {
    "@openclaw/sdk": "^1.0.0",
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "mocha": "^10.2.0",
    "chai": "^4.3.10"
  }
}
```

## 常见问题

### Q1: 生成的内容质量不高怎么办？
A: 尝试调整关键词，提供更详细的主题描述，或选择不同的文案风格。

### Q2: 如何让文案更有个性？
A: 在AI生成的基础上，加入个人真实体验和感受，让内容更生动。

### Q3: 支持其他平台吗？
A: 当前主要针对小红书优化，未来会扩展更多平台支持。

### Q4: 需要网络连接吗？
A: 需要，技能会调用AI服务生成内容。

## 更新日志

### v1.0.0 (2026-04-03)
- 初始版本发布
- 支持4种文案风格
- 提供标题和话题标签生成
- 包含内容优化功能

### v0.1.0 (2026-04-02)
- 测试版本
- 基础文案生成功能

## 许可证
MIT License

## 作者
- OpenClaw技能中心团队
- GitHub: @openclaw-skills
- 邮箱: contact@openclaw-skills.cn

## 相关链接
- [GitHub仓库](https://github.com/openclaw-skills/xiaohongshu-helper)
- [技能中心](https://skills.openclaw.cn/xiaohongshu-helper)
- [问题反馈](https://github.com/openclaw-skills/xiaohongshu-helper/issues)
- [使用教程](https://skills.openclaw.cn/docs/xiaohongshu-helper)