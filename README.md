# OpenClaw技能中心

## 概述
OpenClaw中文技能仓库，提供高质量、易用的OpenClaw技能。

## 快速开始

### 安装技能
```bash
# 方式1：通过GitHub URL安装
openclaw skill install https://github.com/openclaw-skills/xiaohongshu-helper

# 方式2：通过技能名称安装（需要配置技能中心）
openclaw skill install xiaohongshu-helper
```

### 开发技能
```bash
# 1. 克隆模板仓库
git clone https://github.com/openclaw-skills/skill-template my-skill

# 2. 开发技能
cd my-skill
# 编辑SKILL.md和index.js

# 3. 测试技能
openclaw skill install .

# 4. 提交到GitHub
git add .
git commit -m "初始版本"
git push origin main
```

## 技能列表

### 已发布技能
| 技能名称 | 描述 | 版本 | 安装命令 |
|----------|------|------|----------|
| 小红书助手 | AI生成小红书文案 | v1.0.0 | `openclaw skill install xiaohongshu-helper` |
| Seedance视频生成 | 专业视频提示词生成 | v1.7.1 | `openclaw skill install seedance-shot-design` |
| 自我进化技能 | AI自我学习系统 | v0.2.0 | `openclaw skill install self-improving-agent` |

### 开发中技能
- 知识库管理技能
- 自动化工作流技能
- 企业解决方案技能

## 贡献指南

### 1. 开发流程
1. Fork本组织仓库
2. 创建技能目录
3. 遵循技能开发规范
4. 提交Pull Request
5. 通过审核后合并

### 2. 技能规范
- 必须包含`SKILL.md`文件
- 必须包含`package.json`文件
- 必须包含测试用例
- 必须包含使用文档

### 3. 代码规范
- 使用ES6+语法
- 添加必要的注释
- 错误处理完善
- 性能优化考虑

## 技能中心架构

### 仓库结构
```
openclaw-skills/
├── skill-template/          # 技能模板
├── xiaohongshu-helper/      # 小红书助手
├── seedance-shot-design/    # Seedance技能
├── self-improving-agent/    # 自我进化技能
├── docs/                    # 文档
└── website/                 # 技能中心网站
```

### 安装机制
1. **直接安装**：`openclaw skill install <github-url>`
2. **中心安装**：配置技能中心后，`openclaw skill install <skill-name>`
3. **本地安装**：`openclaw skill install ./local-path`

## 社区支持

### 问题反馈
- GitHub Issues：报告bug和功能请求
- 讨论区：技能使用讨论
- 邮件列表：重要通知

### 交流渠道
- Discord：实时交流
- 微信群：中文用户交流
- 论坛：深度讨论

## 路线图

### 2026年4月
- [ ] 建立技能仓库组织
- [ ] 发布3个核心技能
- [ ] 创建技能中心网站
- [ ] 建立社区贡献机制

### 2026年5月
- [ ] 技能数量达到10个
- [ ] 建立技能评分系统
- [ ] 推出付费技能机制
- [ ] 建立开发者激励计划

### 2026年6月
- [ ] 技能数量达到30个
- [ ] 建立企业技能市场
- [ ] 推出技能认证体系
- [ ] 建立合作伙伴生态

## 许可证
所有技能默认使用MIT许可证，除非特别说明。

## 联系我们
- GitHub：https://github.com/openclaw-skills
- 邮箱：contact@openclaw-skills.cn
- 网站：https://skills.openclaw.cn（建设中）