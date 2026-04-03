# 推送到GitHub脚本

Write-Host "=== 推送到GitHub ===" -ForegroundColor Green
Write-Host ""

# 检查当前状态
Write-Host "1. 检查Git状态..." -ForegroundColor Yellow
git status

# 显示提交历史
Write-Host "`n2. 提交历史:" -ForegroundColor Yellow
git log --oneline -5

# 询问是否继续
Write-Host "`n3. 准备推送到GitHub" -ForegroundColor Cyan
Write-Host "请确保你已经:" -ForegroundColor White
Write-Host "  ✅ 创建了GitHub仓库" -ForegroundColor Green
Write-Host "  ✅ 获取了仓库URL" -ForegroundColor Green
Write-Host ""

$repoUrl = Read-Host "请输入GitHub仓库URL (例如: https://github.com/15010100264/openclaw-skills.git)"

if (-not $repoUrl) {
    Write-Host "❌ 未提供仓库URL，退出" -ForegroundColor Red
    exit 1
}

# 添加远程仓库
Write-Host "`n4. 添加远程仓库..." -ForegroundColor Yellow
try {
    # 先移除可能存在的旧远程仓库
    git remote remove origin 2>$null
    
    # 添加新的远程仓库
    git remote add origin $repoUrl
    Write-Host "✅ 远程仓库已添加: $repoUrl" -ForegroundColor Green
} catch {
    Write-Host "❌ 添加远程仓库失败: $_" -ForegroundColor Red
    exit 1
}

# 拉取远程更改（如果有）
Write-Host "`n5. 拉取远程更改..." -ForegroundColor Yellow
try {
    git pull origin main --allow-unrelated-histories
    Write-Host "✅ 远程更改已拉取" -ForegroundColor Green
} catch {
    Write-Host "⚠️  拉取远程更改失败，可能是空仓库，继续..." -ForegroundColor Yellow
}

# 推送到GitHub
Write-Host "`n6. 推送到GitHub..." -ForegroundColor Yellow
try {
    git push -u origin main
    Write-Host "✅ 代码已成功推送到GitHub!" -ForegroundColor Green
} catch {
    Write-Host "❌ 推送失败: $_" -ForegroundColor Red
    Write-Host "尝试强制推送..." -ForegroundColor Yellow
    
    $forcePush = Read-Host "是否强制推送? (y/n)"
    if ($forcePush -eq 'y') {
        git push -u origin main --force
        Write-Host "✅ 强制推送成功" -ForegroundColor Green
    } else {
        Write-Host "❌ 推送取消" -ForegroundColor Red
        exit 1
    }
}

# 显示仓库信息
Write-Host "`n7. 仓库信息:" -ForegroundColor Cyan
Write-Host "远程仓库URL: $repoUrl" -ForegroundColor White
Write-Host "分支: main" -ForegroundColor White

# 获取GitHub页面URL
if ($repoUrl -match 'https://github.com/([^/]+)/([^/.]+)') {
    $username = $matches[1]
    $repoName = $matches[2].Replace('.git', '')
    $githubPages = "https://$username.github.io/$repoName"
    
    Write-Host "`nGitHub Pages URL (如果启用): $githubPages" -ForegroundColor Yellow
    Write-Host "访问 https://github.com/$username/$repoName/settings/pages 启用GitHub Pages" -ForegroundColor White
}

Write-Host "`n=== 完成 ===" -ForegroundColor Green
Write-Host "🎉 代码已成功推送到GitHub!" -ForegroundColor Cyan
Write-Host ""
Write-Host "下一步建议:" -ForegroundColor Yellow
Write-Host "1. 访问GitHub仓库页面" -ForegroundColor White
Write-Host "2. 启用GitHub Pages托管网站" -ForegroundColor White
Write-Host "3. 添加仓库描述和主题标签" -ForegroundColor White
Write-Host "4. 分享仓库链接开始宣传" -ForegroundColor White
Write-Host ""
Write-Host "技能中心网站: website/index.html" -ForegroundColor Cyan
Write-Host "可以上传到GitHub Pages进行托管" -ForegroundColor White