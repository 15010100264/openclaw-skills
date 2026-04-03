# 启用GitHub Pages指南

## 步骤1：访问GitHub仓库设置
1. 打开：https://github.com/15010100264/openclaw-skills
2. 点击顶部菜单的 "Settings"（设置）
3. 在左侧菜单找到 "Pages"（页面）

## 步骤2：配置GitHub Pages
1. 在 "Source"（源）部分：
   - 选择 "Deploy from a branch"（从分支部署）
2. 在 "Branch"（分支）部分：
   - 分支：选择 `main`
   - 文件夹：选择 `/website`
3. 点击 "Save"（保存）

## 步骤3：等待部署完成
- GitHub会自动部署网站
- 等待约1-2分钟
- 刷新页面查看状态

## 步骤4：访问网站
部署完成后，访问：
```
https://15010100264.github.io/openclaw-skills/
```

## 步骤5：完善仓库信息（可选但推荐）

### 添加仓库描述
1. 在仓库首页，点击 "Edit"（编辑）按钮
2. 添加描述："OpenClaw中文技能仓库 - 提供高质量、易用的OpenClaw技能"
3. 点击 "Save"（保存）

### 添加主题标签
1. 在仓库首页右侧，找到 "About"（关于）部分
2. 点击 "Edit"（编辑）
3. 在 "Topics"（主题）中添加：
   - `openclaw`
   - `ai`
   - `skills`
   - `automation`
   - `xiaohongshu`
4. 点击 "Save"（保存）

## 步骤6：创建第一个Release（发布）

### 创建Release
1. 点击仓库顶部的 "Releases"（发布）
2. 点击 "Create a new release"（创建新发布）
3. 填写信息：
   - Tag version: `v1.0.0`
   - Release title: `OpenClaw技能平台 v1.0.0`
   - Description（描述）：
     ```
     ## 初始版本 v1.0.0
     
     包含内容：
     - 技能模板 (skill-template/)
     - 小红书助手 (xiaohongshu-helper/)
     - 技能中心网站 (website/)
     - 完整文档和脚本
     
     安装命令：
     ```bash
     openclaw skill install https://github.com/15010100264/openclaw-skills
     ```
     ```
4. 点击 "Publish release"（发布）

## 完成后的链接

### 重要链接
1. **GitHub仓库**: https://github.com/15010100264/openclaw-skills
2. **技能中心网站**: https://15010100264.github.io/openclaw-skills/
3. **技能模板**: https://github.com/15010100264/openclaw-skills/tree/main/skill-template
4. **小红书助手**: https://github.com/15010100264/openclaw-skills/tree/main/xiaohongshu-helper

### 安装命令
```bash
# 安装技能模板
openclaw skill install https://github.com/15010100264/openclaw-skills/skill-template

# 安装小红书助手
openclaw skill install https://github.com/15010100264/openclaw-skills/xiaohongshu-helper
```

## 下一步建议

### 立即行动
1. 启用GitHub Pages
2. 测试网站访问
3. 分享仓库链接

### 短期计划
1. 开始社区宣传
2. 收集用户反馈
3. 开发第二个技能
4. 建立沟通渠道

### 长期目标
1. 建立完整的技能生态
2. 引入付费技能机制
3. 建立开发者社区
4. 扩展企业服务