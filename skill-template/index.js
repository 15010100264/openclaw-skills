// OpenClaw技能模板 - 主入口文件
const { Tool } = require('@openclaw/sdk');

class SkillTemplate {
  constructor(config = {}) {
    this.config = {
      // 默认配置
      debug: false,
      timeout: 30000,
      ...config
    };
    
    this.tools = [];
    this.initialized = false;
  }

  /**
   * 初始化技能
   */
  async initialize() {
    if (this.initialized) {
      return this.tools;
    }

    try {
      // 注册工具
      this.registerTools();
      
      // 初始化完成
      this.initialized = true;
      
      if (this.config.debug) {
        console.log(`技能模板初始化完成，注册了 ${this.tools.length} 个工具`);
      }
      
      return this.tools;
    } catch (error) {
      console.error('技能初始化失败:', error);
      throw error;
    }
  }

  /**
   * 注册所有工具
   */
  registerTools() {
    // 工具1：示例工具
    this.tools.push(new Tool({
      name: 'example_tool',
      description: '示例工具，返回输入的内容',
      parameters: {
        type: 'object',
        properties: {
          input: {
            type: 'string',
            description: '输入文本'
          },
          repeat: {
            type: 'number',
            description: '重复次数',
            default: 1
          }
        },
        required: ['input']
      },
      execute: async (params) => {
        try {
          const { input, repeat = 1 } = params;
          
          // 参数验证
          if (!input || typeof input !== 'string') {
            throw new Error('input参数必须是字符串');
          }
          
          if (repeat < 1 || repeat > 10) {
            throw new Error('repeat参数必须在1-10之间');
          }
          
          // 业务逻辑
          const result = input.repeat(repeat);
          
          // 返回结果
          return {
            success: true,
            data: result,
            message: '工具执行成功',
            metadata: {
              inputLength: input.length,
              outputLength: result.length,
              repeatCount: repeat
            }
          };
        } catch (error) {
          return {
            success: false,
            error: error.message,
            message: '工具执行失败'
          };
        }
      }
    }));

    // 工具2：配置获取工具
    this.tools.push(new Tool({
      name: 'get_config',
      description: '获取当前技能配置',
      parameters: {
        type: 'object',
        properties: {
          key: {
            type: 'string',
            description: '配置键名（可选，不传则返回所有配置）'
          }
        }
      },
      execute: async (params) => {
        try {
          const { key } = params;
          
          let data;
          if (key) {
            // 返回指定配置
            data = {
              [key]: this.config[key]
            };
          } else {
            // 返回所有配置（排除敏感信息）
            const safeConfig = { ...this.config };
            // 可以在这里过滤敏感信息
            data = safeConfig;
          }
          
          return {
            success: true,
            data,
            message: key ? `获取配置 ${key} 成功` : '获取所有配置成功'
          };
        } catch (error) {
          return {
            success: false,
            error: error.message,
            message: '获取配置失败'
          };
        }
      }
    }));

    // 工具3：技能信息工具
    this.tools.push(new Tool({
      name: 'skill_info',
      description: '获取技能信息',
      parameters: {
        type: 'object',
        properties: {}
      },
      execute: async () => {
        try {
          const info = {
            name: '技能模板',
            version: '1.0.0',
            description: 'OpenClaw技能模板',
            tools: this.tools.map(tool => tool.name),
            initialized: this.initialized,
            config: {
              debug: this.config.debug,
              timeout: this.config.timeout
            }
          };
          
          return {
            success: true,
            data: info,
            message: '获取技能信息成功'
          };
        } catch (error) {
          return {
            success: false,
            error: error.message,
            message: '获取技能信息失败'
          };
        }
      }
    }));
  }

  /**
   * 获取工具列表
   */
  getTools() {
    return this.tools;
  }

  /**
   * 更新配置
   */
  updateConfig(newConfig) {
    this.config = {
      ...this.config,
      ...newConfig
    };
    
    if (this.config.debug) {
      console.log('配置已更新:', this.config);
    }
    
    return this.config;
  }

  /**
   * 清理资源
   */
  async cleanup() {
    this.tools = [];
    this.initialized = false;
    
    if (this.config.debug) {
      console.log('技能资源已清理');
    }
  }
}

module.exports = SkillTemplate;