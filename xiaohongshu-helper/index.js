// 小红书助手 - 主入口文件
const { Tool } = require('@openclaw/sdk');

class XiaohongshuHelper {
  constructor(config = {}) {
    this.config = {
      // 默认配置
      apiKey: config.apiKey || '',
      defaultStyle: '种草',
      defaultLength: '中等',
      emojiEnabled: true,
      hashtagCount: 5,
      debug: false,
      ...config
    };
    
    // 文案风格配置
    this.styles = {
      '种草': {
        tone: '热情推荐',
        structure: '痛点引入 → 产品介绍 → 使用体验 → 价值总结',
        emoji: ['🌟', '💡', '💰', '🎯', '🤩']
      },
      '测评': {
        tone: '客观分析',
        structure: '产品介绍 → 功能测试 → 优缺点分析 → 购买建议',
        emoji: ['📊', '⚖️', '✅', '❌', '💎']
      },
      '教程': {
        tone: '清晰教学',
        structure: '问题引入 → 步骤分解 → 技巧分享 → 总结提醒',
        emoji: ['📌', '🎓', '💡', '⚠️', '🎉']
      },
      '日常': {
        tone: '亲切分享',
        structure: '场景描述 → 感受表达 → 经验总结 → 互动邀请',
        emoji: ['☕', '📖', '🎵', '🍃', '❤️']
      }
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
      
      this.initialized = true;
      
      if (this.config.debug) {
        console.log('小红书助手初始化完成');
      }
      
      return this.tools;
    } catch (error) {
      console.error('小红书助手初始化失败:', error);
      throw error;
    }
  }

  /**
   * 注册所有工具
   */
  registerTools() {
    // 工具1：生成小红书文案
    this.tools.push(new Tool({
      name: 'generate_content',
      description: '生成小红书文案',
      parameters: {
        type: 'object',
        properties: {
          style: {
            type: 'string',
            description: '文案风格：种草/测评/教程/日常',
            enum: ['种草', '测评', '教程', '日常'],
            default: this.config.defaultStyle
          },
          topic: {
            type: 'string',
            description: '主题内容（必填）'
          },
          keywords: {
            type: 'array',
            description: '关键词列表',
            items: { type: 'string' },
            default: []
          },
          length: {
            type: 'string',
            description: '文案长度：短/中等/长',
            enum: ['短', '中等', '长'],
            default: this.config.defaultLength
          },
          targetAudience: {
            type: 'string',
            description: '目标受众',
            default: '年轻人'
          }
        },
        required: ['topic']
      },
      execute: async (params) => {
        try {
          const { style, topic, keywords = [], length, targetAudience } = params;
          
          // 参数验证
          if (!topic || typeof topic !== 'string') {
            throw new Error('topic参数必须是非空字符串');
          }
          
          if (!this.styles[style]) {
            throw new Error(`不支持的文案风格: ${style}`);
          }
          
          // 生成文案
          const content = this.generateContent(style, topic, keywords, length, targetAudience);
          
          return {
            success: true,
            data: {
              content,
              metadata: {
                style,
                topic,
                keywords,
                length,
                targetAudience,
                wordCount: content.length,
                generatedAt: new Date().toISOString()
              }
            },
            message: '文案生成成功'
          };
        } catch (error) {
          return {
            success: false,
            error: error.message,
            message: '文案生成失败'
          };
        }
      }
    }));

    // 工具2：生成标题
    this.tools.push(new Tool({
      name: 'generate_title',
      description: '生成小红书标题',
      parameters: {
        type: 'object',
        properties: {
          topic: {
            type: 'string',
            description: '主题内容（必填）'
          },
          style: {
            type: 'string',
            description: '文案风格',
            enum: ['种草', '测评', '教程', '日常'],
            default: this.config.defaultStyle
          },
          emoji: {
            type: 'boolean',
            description: '是否添加表情符号',
            default: this.config.emojiEnabled
          }
        },
        required: ['topic']
      },
      execute: async (params) => {
        try {
          const { topic, style, emoji } = params;
          
          if (!topic) {
            throw new Error('topic参数不能为空');
          }
          
          // 生成标题
          const title = this.generateTitle(topic, style, emoji);
          
          return {
            success: true,
            data: {
              title,
              metadata: {
                topic,
                style,
                emoji,
                generatedAt: new Date().toISOString()
              }
            },
            message: '标题生成成功'
          };
        } catch (error) {
          return {
            success: false,
            error: error.message,
            message: '标题生成失败'
          };
        }
      }
    }));

    // 工具3：生成话题标签
    this.tools.push(new Tool({
      name: 'generate_hashtags',
      description: '生成小红书话题标签',
      parameters: {
        type: 'object',
        properties: {
          topic: {
            type: 'string',
            description: '主题内容'
          },
          count: {
            type: 'number',
            description: '标签数量',
            minimum: 1,
            maximum: 20,
            default: this.config.hashtagCount
          },
          includeGeneral: {
            type: 'boolean',
            description: '是否包含通用标签',
            default: true
          }
        }
      },
      execute: async (params) => {
        try {
          const { topic = '', count, includeGeneral } = params;
          
          // 生成话题标签
          const hashtags = this.generateHashtags(topic, count, includeGeneral);
          
          return {
            success: true,
            data: {
              hashtags,
              metadata: {
                topic,
                count: hashtags.length,
                includeGeneral,
                generatedAt: new Date().toISOString()
              }
            },
            message: '话题标签生成成功'
          };
        } catch (error) {
          return {
            success: false,
            error: error.message,
            message: '话题标签生成失败'
          };
        }
      }
    }));

    // 工具4：分析热门话题
    this.tools.push(new Tool({
      name: 'analyze_trend',
      description: '分析小红书热门话题',
      parameters: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            description: '分类：美妆/穿搭/美食/旅行/数码/家居',
            enum: ['美妆', '穿搭', '美食', '旅行', '数码', '家居', '全部'],
            default: '全部'
          },
          limit: {
            type: 'number',
            description: '返回数量',
            minimum: 1,
            maximum: 50,
            default: 10
          }
        }
      },
      execute: async (params) => {
        try {
          const { category, limit } = params;
          
          // 分析热门话题（模拟数据）
          const trends = this.analyzeTrends(category, limit);
          
          return {
            success: true,
            data: {
              trends,
              metadata: {
                category,
                limit,
                analyzedAt: new Date().toISOString()
              }
            },
            message: '热门话题分析成功'
          };
        } catch (error) {
          return {
            success: false,
            error: error.message,
            message: '热门话题分析失败'
          };
        }
      }
    }));

    // 工具5：优化现有文案
    this.tools.push(new Tool({
      name: 'optimize_content',
      description: '优化现有小红书文案',
      parameters: {
        type: 'object',
        properties: {
          content: {
            type: 'string',
            description: '原始文案内容（必填）'
          },
          target: {
            type: 'string',
            description: '优化目标：简洁/生动/专业/亲和',
            enum: ['简洁', '生动', '专业', '亲和'],
            default: '生动'
          },
          addEmoji: {
            type: 'boolean',
            description: '是否添加表情符号',
            default: this.config.emojiEnabled
          }
        },
        required: ['content']
      },
      execute: async (params) => {
        try {
          const { content, target, addEmoji } = params;
          
          if (!content || typeof content !== 'string') {
            throw new Error('content参数必须是非空字符串');
          }
          
          // 优化文案
          const optimized = this.optimizeContent(content, target, addEmoji);
          
          return {
            success: true,
            data: {
              original: content,
              optimized,
              improvements: this.getImprovements(content, optimized)
            },
            message: '文案优化成功'
          };
        } catch (error) {
          return {
            success: false,
            error: error.message,
            message: '文案优化失败'
          };
        }
      }
    }));
  }

  /**
   * 生成小红书文案
   */
  generateContent(style, topic, keywords, length, targetAudience) {
    const styleConfig = this.styles[style];
    const lengthMultiplier = { '短': 0.7, '中等': 1, '长': 1.5 }[length] || 1;
    
    // 构建文案
    let content = '';
    
    // 标题
    content += this.generateTitle(topic, style, this.config.emojiEnabled) + '\n\n';
    
    // 正文开头
    const openings = [
      `最近发现${topic}，简直太棒了！`,
      `今天来聊聊${topic}，我的真实体验分享～`,
      `很多朋友问我${topic}，今天详细分享一下！`,
      `关于${topic}，我有话要说！`
    ];
    content += openings[Math.floor(Math.random() * openings.length)] + '\n\n';
    
    // 根据风格添加内容
    if (style === '种草') {
      content += `🌟 为什么推荐${topic}？\n`;
      content += `- 解决痛点：${keywords[0] || '效率'}提升明显\n`;
      content += `- 使用体验：操作简单，效果惊艳\n`;
      content += `- 性价比：物超所值，强烈推荐\n\n`;
    } else if (style === '测评') {
      content += `📊 ${topic}详细测评：\n`;
      content += `✅ 优点：${keywords[0] || '功能强大'}，${keywords[1] || '体验良好'}\n`;
      content += `❌ 缺点：${keywords[2] || '略有不足'}，但可以接受\n`;
      content += `💎 总结：${keywords[3] || '值得尝试'}，适合${targetAudience}\n\n`;
    } else if (style === '教程') {
      content += `📌 ${topic}详细教程：\n`;
      content += `1. 第一步：准备${keywords[0] || '基础材料'}\n`;
      content += `2. 第二步：按照步骤操作\n`;
      content += `3. 第三步：${keywords[1] || '检查效果'}，调整优化\n`;
      content += `💡 小贴士：${keywords[2] || '注意细节'}，效果更佳\n\n`;
    } else if (style === '日常') {
      content += `☕ 关于${topic}的日常分享：\n`;
      content += `今天${keywords[0] || '偶然发现'}${topic}，\n`;
      content += `感觉${keywords[1] || '很有意思'}，\n`;
      content += `分享给同样喜欢${keywords[2] || '探索'}的你～\n\n`;
    }
    
    // 结尾
    const endings = [
      `以上就是我的${topic}分享，希望对你有帮助！`,
      `关于${topic}，你有什么想法？欢迎评论区交流～`,
      `如果你也尝试过${topic}，欢迎分享你的体验！`,
      `记得点赞收藏，下次需要${topic}时随时查看！`
    ];
    content += endings[Math.floor(Math.random() * endings.length)] + '\n\n';
    
    // 添加话题标签
    const hashtags = this.generateHashtags(topic, this.config.hashtagCount, true);
    content += hashtags.join(' ');
    
    // 根据长度调整
    if (lengthMultiplier < 1) {
      // 缩短文案
      const lines = content.split('\n');
      content = lines.slice(0, Math.floor(lines.length * lengthMultiplier)).join('\n');
    }
    
    return content;
  }

  /**
   * 生成标题
   */
  generateTitle(topic, style, emoji = true) {
    const styleTitles = {
      '种草': [`${topic}让我效率翻倍！`, `这款${topic}太香了！`, `强烈推荐${topic}！`],
      '测评': [`${topic}深度测评`, `${topic}真实体验`, `${topic}优缺点分析`],
      '教程': [`3步学会${topic}`, `${topic}详细教程`, `${topic}入门指南`],
      '日常': [`关于${topic}的日常`, `${topic}分享时刻`, `${topic}的小确幸`]
    };
    
    let title = styleTitles[style][Math.floor(Math.random() * styleTitles[style].length)];
    
    // 添加表情符号
    if (emoji && this.config.emojiEnabled) {
      const emojis = this.styles[style].emoji;
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      title += ` ${emoji}`;
    }
    
    return title;
  }

  /**
   * 生成话题标签
   */
  generateHashtags(topic, count = 5, includeGeneral = true) {
    const hashtags = [];
    
    // 基于主题的标签
    if (topic) {
      const topicTags = [
        `#${topic}`,
        `#${topic}分享`,
        `#${topic}教程`,
        `#${topic}推荐`
      ];
      hashtags.push(...topicTags.slice(0, Math.min(3, Math.floor(count / 2))));
    }
    
    // 通用标签
    if (includeGeneral) {
      const generalTags = [
        '#小红书', '#种草', '#好物分享', '#生活记录',
        '#教程', '#测评', '#日常', '#分享'
      ];
      
      const remaining = count - hashtags.length;
      if (remaining > 0) {
        const selected = generalTags
          .sort(() => Math.random() - 0.5)
          .slice(0, remaining);
        hashtags.push(...selected);
      }
    }
    
    return hashtags.slice(0, count);
  }

  /**
   * 分析热门话题
   */
  analyzeTrends(category, limit) {
    // 模拟数据 - 实际应该调用API
    const allTrends = {
      '美妆': ['早C晚A', '以油养肤', '精简护肤', '国货彩妆'],
      '穿搭': ['cleanfit', '多巴胺穿搭', '知识分子风', '老钱风'],
      '美食': ['减脂餐', '懒人食谱', '空气炸锅', '咖啡探店'],
      '旅行': ['citywalk', '小众旅行地', '周末去哪儿', '酒店测评'],
      '数码': ['AI工具', '电子产品', '智能家居', '摄影技巧'],
      '家居': ['极简主义', '租房改造', '绿植养护', '收纳整理']
    };
    
    let trends = [];
    
    if (category === '全部') {
      // 合并所有分类
      Object.values(allTrends).forEach(catTrends => {
        trends.push(...catTrends);
      });
    } else if (allTrends[category]) {
      trends = allTrends[category];
    }
    
    // 添加热度数据
    return trends.slice(0, limit).map((trend, index) => ({
      rank: index + 1,
      topic: trend,
      category: category === '全部' ? this.getCategoryForTrend(trend) : category,
      heat: Math.floor(Math.random() * 100) + 50, // 模拟热度
      growth: (Math.random() * 30 - 10).toFixed(1) + '%' // 模拟增长
    }));
  }

  /**
   * 优化文案
   */
  optimizeContent(content, target, addEmoji) {
    let optimized = content;
    
    // 根据目标优化
    switch(target) {
      case '简洁':
        optimized = optimized.replace(/\s+/g, ' ').trim();
        break;
      case '生动':
        optimized = this.makeContentVivid(optimized);
        break;
      case '专业':
        optimized = this.makeContentProfessional(optimized);
        break;
      case '亲和':
        optimized = this.makeContentFriendly(optimized);
        break;
    }
    
    // 添加表情符号
    if (addEmoji) {
      optimized = this.addEmojis(optimized);
    }
    
    return optimized;
  }

  /**
   * 获取改进点
   */
  getImprovements(original, optimized) {
    const improvements = [];
    
    if (optimized.length < original.length * 0.8) {
      improvements.push('内容更简洁');
    }
    
    if (optimized.includes('🌟') || optimized.includes('💡') || optimized.includes('🎯')) {
      improvements.push('添加了视觉元素');
    }
    
    const originalLines = original.split('\n').length;
    const optimizedLines = optimized.split('\n').length;
    if (optimizedLines > originalLines) {
      improvements.push('结构更清晰');
    }
    
    return improvements;
  }

  /**
   * 使内容更生动
   */
  makeContentVivid(content) {
    // 添加生动的表达
    const vividPhrases = [
      '简直太棒了！', '效果惊艳！', '强烈推荐！',
      '一定要试试！', '不会后悔！', '值得拥有！'
    ];
    
    let newContent = content;
    const lines = newContent.split('\n');
    if (lines.length > 2) {
      // 在第二行后添加生动表达
      const randomPhrase = vividPhrases[Math.floor(Math.random() * vividPhrases.length)];
      lines.splice(2, 0, randomPhrase);
      newContent = lines.join('\n');
    }
    
    return newContent;
  }

  /**
   * 使内容更专业
   */
  makeContentProfessional(content) {
    // 添加专业术语和结构
    let newContent = content;
    
    // 添加专业开头
    if (!newContent.includes('分析') && !newContent.includes('测评') && !newContent.includes('评估')) {
      newContent = '经过详细分析和测试，' + newContent;
    }
    
    // 添加数据支持
    const dataPhrases = [
      '根据实际测试，',
      '数据显示，',
      '研究表明，',
      '从专业角度分析，'
    ];
    
    const randomPhrase = dataPhrases[Math.floor(Math.random() * dataPhrases.length)];
    const lines = newContent.split('\n');
    if (lines.length > 1) {
      lines.splice(1, 0, randomPhrase);
      newContent = lines.join('\n');
    }
    
    return newContent;
  }

  /**
   * 使内容更亲和
   */
  makeContentFriendly(content) {
    // 添加亲和表达
    const friendlyPhrases = [
      '亲爱的朋友们，',
      '小伙伴们，',
      '大家好呀，',
      '今天想和大家分享，'
    ];
    
    let newContent = content;
    const randomPhrase = friendlyPhrases[Math.floor(Math.random() * friendlyPhrases.length)];
    newContent = randomPhrase + ' ' + newContent;
    
    // 添加互动邀请
    if (!newContent.includes('欢迎') && !newContent.includes('分享') && !newContent.includes('交流')) {
      newContent += '\n\n如果你也有相关经验，欢迎在评论区分享交流～';
    }
    
    return newContent;
  }

  /**
   * 添加表情符号
   */
  addEmojis(content) {
    const emojiMap = {
      '推荐': '🌟',
      '技巧': '💡',
      '注意': '⚠️',
      '总结': '🎯',
      '步骤': '📌',
      '体验': '🤔',
      '效果': '🎉',
      '价格': '💰',
      '教程': '🎓',
      '日常': '☕'
    };
    
    let newContent = content;
    
    // 在关键词后添加表情符号
    Object.entries(emojiMap).forEach(([keyword, emoji]) => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      newContent = newContent.replace(regex, `$1 ${emoji}`);
    });
    
    return newContent;
  }

  /**
   * 获取分类
   */
  getCategoryForTrend(trend) {
    const categoryMap = {
      '美妆': ['护肤', '彩妆', '美容'],
      '穿搭': ['服装', '搭配', '时尚'],
      '美食': ['食谱', '餐厅', '烹饪'],
      '旅行': ['旅游', '景点', '酒店'],
      '数码': ['电子', '科技', '智能'],
      '家居': ['家具', '装饰', '收纳']
    };
    
    for (const [category, keywords] of Object.entries(categoryMap)) {
      for (const keyword of keywords) {
        if (trend.includes(keyword)) {
          return category;
        }
      }
    }
    
    return '其他';
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
      console.log('小红书助手配置已更新:', this.config);
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
      console.log('小红书助手资源已清理');
    }
  }
}

module.exports = XiaohongshuHelper;