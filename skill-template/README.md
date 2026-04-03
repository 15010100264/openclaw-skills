# OpenClaw技能模板

## 概述
这是一个标准的OpenClaw技能模板，用于快速创建新的技能。

## 功能特性
- ✅ 标准化的项目结构
- ✅ 完整的工具注册示例
- ✅ 错误处理机制
- ✅ 配置管理
- ✅ 测试用例示例

## 快速开始

### 1. 使用模板
```bash
# 克隆模板
git clone https://github.com/openclaw-skills/skill-template my-skill

# 进入目录
cd my-skill

# 安装依赖
npm install

# 修改配置
# 1. 更新package.json中的name和description
# 2. 更新SKILL.md中的技能描述
# 3. 在index.js中添加你的工具逻辑
```

### 2. 开发技能
```javascript
// 在index.js中添加新工具
this.tools.push(new Tool({
  name: 'my_tool',
  description: '我的工具描述',
  parameters: {
    type: 'object',
    properties: {
      param1: { type: 'string', description: '参数1' }
    },
    required: ['param1']
  },
  execute: async (params) => {
    // 你的工具逻辑
    return {
      success: true,
      data: '结果',
      message: '执行成功'
    };
  }
}));
```

### 3. 测试技能
```bash
# 运行测试
npm test

# 本地安装测试
openclaw skill install .

# 使用技能
# 在OpenClaw中调用你的工具
```

## 项目结构
```
skill-template/
├── SKILL.md          # 技能描述文件
├── README.md         # 项目文档
├── package.json      # 项目配置
├── index.js          # 主入口文件
├── lib/              # 工具库（可选）
│   └── utils.js
├── config/           # 配置文件（可选）
│   └── default.json
├── test/             # 测试文件
│   └── index.test.js
└── docs/             # 文档（可选）
    └── api.md
```

## 配置说明

### package.json配置
```json
{
  "name": "your-skill-name",
  "version": "1.0.0",
  "description": "技能描述",
  "main": "index.js",
  "scripts": {
    "test": "mocha test/**/*.test.js",
    "start": "node index.js"
  },
  "dependencies": {
    "@openclaw/sdk": "^1.0.0"
  },
  "devDependencies": {
    "mocha": "^10.2.0",
    "chai": "^4.3.10"
  }
}
```

### 技能配置
技能可以通过构造函数接收配置：
```javascript
const skill = new SkillTemplate({
  debug: true,      // 调试模式
  timeout: 5000,    // 超时时间
  apiKey: 'xxx'     // API密钥等
});
```

## 开发指南

### 工具开发最佳实践
1. **参数验证**：始终验证输入参数
2. **错误处理**：使用try-catch处理异常
3. **返回格式**：统一返回格式
4. **日志记录**：重要的操作记录日志

### 示例工具
```javascript
execute: async (params) => {
  try {
    // 1. 参数验证
    if (!params.requiredParam) {
      throw new Error('缺少必要参数');
    }
    
    // 2. 业务逻辑
    const result = await someAsyncOperation(params);
    
    // 3. 返回结果
    return {
      success: true,
      data: result,
      message: '操作成功',
      metadata: {
        // 附加信息
      }
    };
  } catch (error) {
    // 4. 错误处理
    return {
      success: false,
      error: error.message,
      message: '操作失败'
    };
  }
}
```

## 测试

### 单元测试
```javascript
// test/index.test.js
const assert = require('assert');
const SkillTemplate = require('../index');

describe('SkillTemplate', () => {
  let skill;
  
  beforeEach(async () => {
    skill = new SkillTemplate();
    await skill.initialize();
  });
  
  it('应该正确初始化', () => {
    assert(skill.initialized === true);
    assert(Array.isArray(skill.tools));
  });
  
  it('示例工具应该工作', async () => {
    const tools = skill.getTools();
    const exampleTool = tools.find(t => t.name === 'example_tool');
    
    const result = await exampleTool.execute({ input: 'test', repeat: 2 });
    assert(result.success === true);
    assert(result.data === 'testtest');
  });
});
```

### 运行测试
```bash
npm test
```

## 发布

### 版本管理
```bash
# 更新版本号
npm version patch  # v1.0.0 -> v1.0.1
npm version minor  # v1.0.1 -> v1.1.0
npm version major  # v1.1.0 -> v2.0.0
```

### 发布到GitHub
1. 创建GitHub仓库
2. 推送代码
3. 创建Release
4. 更新技能中心索引

## 常见问题

### Q1: 技能安装失败
A: 检查OpenClaw版本，确保兼容。

### Q2: 工具无法调用
A: 检查工具名称是否正确，参数是否符合要求。

### Q3: 性能问题
A: 优化异步操作，添加缓存机制。

## 贡献
欢迎提交Pull Request改进模板。

## 许可证
MIT License