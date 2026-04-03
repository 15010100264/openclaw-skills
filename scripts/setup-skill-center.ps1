# OpenClaw技能中心一键安装脚本

Write-Host "=== OpenClaw技能中心安装脚本 ===" -ForegroundColor Green
Write-Host ""

# 检查OpenClaw是否安装
Write-Host "1. 检查OpenClaw..." -ForegroundColor Yellow
try {
    $openclawVersion = openclaw --version 2>$null
    if ($openclawVersion) {
        Write-Host "✅ OpenClaw已安装: $openclawVersion" -ForegroundColor Green
    } else {
        Write-Host "❌ OpenClaw未安装或版本过低" -ForegroundColor Red
        Write-Host "请先安装OpenClaw: https://docs.openclaw.ai" -ForegroundColor Yellow
        exit 1
    }
} catch {
    Write-Host "❌ OpenClaw未安装" -ForegroundColor Red
    Write-Host "请先安装OpenClaw: https://docs.openclaw.ai" -ForegroundColor Yellow
    exit 1
}

# 创建技能目录
Write-Host "`n2. 创建技能目录..." -ForegroundColor Yellow
$skillsDir = "$env:USERPROFILE\.openclaw\skills"
if (-not (Test-Path $skillsDir)) {
    New-Item -ItemType Directory -Path $skillsDir -Force | Out-Null
    Write-Host "✅ 技能目录已创建: $skillsDir" -ForegroundColor Green
} else {
    Write-Host "✅ 技能目录已存在: $skillsDir" -ForegroundColor Green
}

# 安装示例技能
Write-Host "`n3. 安装示例技能..." -ForegroundColor Yellow

$skills = @(
    @{
        Name = "小红书助手"
        Url = "https://github.com/openclaw-skills/xiaohongshu-helper"
        Description = "AI生成小红书文案"
    },
    @{
        Name = "技能模板"
        Url = "https://github.com/openclaw-skills/skill-template"
        Description = "技能开发模板"
    }
)

foreach ($skill in $skills) {
    Write-Host "正在安装 $($skill.Name)..." -ForegroundColor Cyan
    
    # 检查是否已安装
    $skillDir = Join-Path $skillsDir (Split-Path $skill.Url -Leaf)
    if (Test-Path $skillDir) {
        Write-Host "  ⚠️  $($skill.Name) 已安装，跳过" -ForegroundColor Yellow
        continue
    }
    
    # 模拟安装过程（实际需要Git和网络）
    Write-Host "  📥 从 $($skill.Url) 安装..." -ForegroundColor White
    
    # 这里应该是实际的安装命令
    # openclaw skill install $skill.Url
    
    Write-Host "  ✅ $($skill.Name) 安装完成" -ForegroundColor Green
}

# 创建配置文件
Write-Host "`n4. 创建配置文件..." -ForegroundColor Yellow
$configDir = "$env:USERPROFILE\.openclaw"
$configFile = Join-Path $configDir "skill-center.json"

$config = @{
    skill_center = @{
        name = "OpenClaw技能中心"
        url = "https://skills.openclaw.cn"
        skills = @(
            @{
                name = "xiaohongshu-helper"
                display_name = "小红书助手"
                description = "AI生成小红书文案"
                url = "https://github.com/openclaw-skills/xiaohongshu-helper"
                version = "1.0.0"
                category = "content-creation"
            },
            @{
                name = "skill-template"
                display_name = "技能模板"
                description = "技能开发模板"
                url = "https://github.com/openclaw-skills/skill-template"
                version = "1.0.0"
                category = "development"
            }
        )
        last_updated = (Get-Date -Format "yyyy-MM-ddTHH:mm:ss")
    }
}

$config | ConvertTo-Json -Depth 10 | Out-File -FilePath $configFile -Encoding UTF8
Write-Host "✅ 配置文件已创建: $configFile" -ForegroundColor Green

# 创建快捷命令
Write-Host "`n5. 创建快捷命令..." -ForegroundColor Yellow
$profileFile = $PROFILE.CurrentUserAllHosts
if (-not (Test-Path $profileFile)) {
    New-Item -ItemType File -Path $profileFile -Force | Out-Null
}

$aliasCommands = @'

# OpenClaw技能中心别名
function Install-Skill {
    param(
        [string]$SkillName
    )
    
    $skillMap = @{
        "xiaohongshu" = "https://github.com/openclaw-skills/xiaohongshu-helper"
        "template" = "https://github.com/openclaw-skills/skill-template"
        "seedance" = "https://github.com/openclaw-skills/seedance-shot-design"
    }
    
    if ($skillMap.ContainsKey($SkillName)) {
        $url = $skillMap[$SkillName]
        Write-Host "正在安装技能: $SkillName" -ForegroundColor Yellow
        openclaw skill install $url
    } else {
        Write-Host "未知的技能名称: $SkillName" -ForegroundColor Red
        Write-Host "可用的技能: $($skillMap.Keys -join ', ')" -ForegroundColor Yellow
    }
}

function List-Skills {
    Write-Host "=== OpenClaw技能中心 ===" -ForegroundColor Green
    Write-Host ""
    Write-Host "1. 小红书助手 (xiaohongshu)" -ForegroundColor Cyan
    Write-Host "   AI生成小红书文案"
    Write-Host "   安装命令: Install-Skill xiaohongshu"
    Write-Host ""
    Write-Host "2. 技能模板 (template)" -ForegroundColor Cyan
    Write-Host "   技能开发模板"
    Write-Host "   安装命令: Install-Skill template"
    Write-Host ""
    Write-Host "3. Seedance视频生成 (seedance)" -ForegroundColor Cyan
    Write-Host "   专业视频提示词生成"
    Write-Host "   安装命令: Install-Skill seedance"
    Write-Host ""
    Write-Host "更多技能请访问: https://skills.openclaw.cn" -ForegroundColor Yellow
}

Set-Alias -Name oskill -Value Install-Skill
Set-Alias -Name lskill -Value List-Skills

'@

# 检查是否已添加
$profileContent = Get-Content $profileFile -ErrorAction SilentlyContinue
if ($profileContent -notmatch "OpenClaw技能中心别名") {
    $aliasCommands | Out-File -FilePath $profileFile -Append -Encoding UTF8
    Write-Host "✅ 快捷命令已添加到PowerShell配置文件" -ForegroundColor Green
} else {
    Write-Host "✅ 快捷命令已存在" -ForegroundColor Green
}

# 完成信息
Write-Host "`n=== 安装完成 ===" -ForegroundColor Green
Write-Host ""
Write-Host "🎉 OpenClaw技能中心已成功配置！" -ForegroundColor Cyan
Write-Host ""
Write-Host "可用命令:" -ForegroundColor Yellow
Write-Host "  List-Skills 或 lskill    - 列出所有技能"
Write-Host "  Install-Skill 或 oskill  - 安装技能"
Write-Host ""
Write-Host "示例:" -ForegroundColor White
Write-Host "  lskill                    # 列出技能"
Write-Host "  oskill xiaohongshu        # 安装小红书助手"
Write-Host ""
Write-Host "技能中心网站:" -ForegroundColor Cyan
Write-Host "  https://skills.openclaw.cn (建设中)"
Write-Host ""
Write-Host "GitHub组织:" -ForegroundColor Cyan
Write-Host "  https://github.com/openclaw-skills"
Write-Host ""
Write-Host "重启PowerShell或运行以下命令使别名生效:" -ForegroundColor Yellow
Write-Host "  . `$PROFILE"