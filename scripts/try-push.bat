@echo off
echo 尝试推送到GitHub...
echo.

REM 检查Git状态
git status

echo.
echo 提交历史:
git log --oneline -3

echo.
echo 尝试推送...
git push origin main

if %errorlevel% neq 0 (
    echo.
    echo 推送失败，错误代码: %errorlevel%
    echo 可能需要GitHub认证
    pause
) else (
    echo.
    echo 推送成功!
)