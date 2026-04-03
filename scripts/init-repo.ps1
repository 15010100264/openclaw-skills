# GitHub仓库初始化脚本

Write-Host "=== GitHub仓库初始化脚本 ===" -ForegroundColor Green
Write-Host "此脚本帮助你将本地技能平台代码推送到GitHub" -ForegroundColor Yellow
Write-Host ""

# 检查Git
Write-Host "1. 检查Git..." -ForegroundColor Yellow
try {
    $gitVersion = git --version
    Write-Host "✅ Git已安装: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git未安装" -ForegroundColor Red
    Write-Host "请先安装Git: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

# 初始化Git仓库
Write-Host "`n2. 初始化Git仓库..." -ForegroundColor Yellow
$repoPath = "."

# 检查是否已经是Git仓库
if (Test-Path ".git") {
    Write-Host "⚠️  已经是Git仓库，跳过初始化" -ForegroundColor Yellow
} else {
    git init
    Write-Host "✅ Git仓库初始化完成" -ForegroundColor Green
}

# 添加文件
Write-Host "`n3. 添加文件到Git..." -ForegroundColor Yellow
git add .
Write-Host "✅ 文件已添加到暂存区" -ForegroundColor Green

# 提交初始版本
Write-Host "`n4. 提交初始版本..." -ForegroundColor Yellow
git commit -m "初始提交: OpenClaw技能平台 v1.0.0

包含内容:
- 技能模板 (skill-template/)
- 技能中心网站 (website/)
- 贡献指南 (CONTRIBUTING.md)
- 管理脚本 (scripts/)
- 项目文档 (README.md, PROJECT_SUMMARY.md)

创建时间: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
版本: v1.0.0"
Write-Host "✅ 初始提交完成" -ForegroundColor Green

# 显示Git状态
Write-Host "`n5. 当前Git状态:" -ForegroundColor Yellow
git status

Write-Host "`n=== 本地Git仓库初始化完成 ===" -ForegroundColor Green
Write-Host ""
Write-Host "下一步操作:" -ForegroundColor Cyan
Write-Host "1. 在GitHub创建组织: openclaw-skills" -ForegroundColor White
Write-Host "2. 在组织中创建仓库: skill-platform" -ForegroundColor White
Write-Host "3. 添加远程仓库:" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/openclaw-skills/skill-platform.git" -ForegroundColor White
Write-Host "4. 推送到GitHub:" -ForegroundColor White
Write-Host "   git push -u origin main" -ForegroundColor White
Write-Host ""
Write-Host "或者，如果你想先创建技能模板仓库:" -ForegroundColor Yellow
Write-Host "1. 在组织中创建仓库: skill-template" -ForegroundColor White
Write-Host "2. 只推送skill-template目录" -ForegroundColor White
Write-Host ""
Write-Host "建议先创建组织，然后告诉我组织名称，我可以帮你继续。" -ForegroundColor Cyan