@echo off
echo 设置Git认证...
echo.

REM 配置Git用户信息
git config --global user.email "15010100264@github.com"
git config --global user.name "15010100264"

echo Git用户信息已配置
echo.

REM 尝试使用设备代码（模拟）
echo 注意：需要手动在浏览器中完成设备认证
echo 访问：https://github.com/login/device
echo 输入设备代码：2DA7-757B-00E9-C08F
echo.

REM 清除旧的凭据
git credential-manager reject https://github.com

echo.
echo 请完成以下步骤：
echo 1. 访问 https://github.com/login/device
echo 2. 输入设备代码：2DA7-757B-00E9-C08F
echo 3. 授权访问
echo 4. 然后按任意键继续...
pause

echo.
echo 尝试推送代码到GitHub...
git push origin main

if %errorlevel% neq 0 (
    echo.
    echo 推送失败，错误代码: %errorlevel%
    echo 可能需要其他认证方式
) else (
    echo.
    echo 推送成功!
)

pause