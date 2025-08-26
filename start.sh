#!/bin/bash

# 财务数据看板系统 - 快速启动脚本

echo "🚀 启动财务数据看板系统..."

# 检查是否已安装依赖
if [ ! -d "node_modules" ]; then
    echo "📦 首次运行，正在安装依赖..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ 依赖安装失败"
        exit 1
    fi
    echo "✅ 依赖安装完成"
fi

# 启动开发服务器
echo "🌐 启动开发服务器..."
echo "📱 系统将在浏览器中自动打开"
echo "🔗 访问地址: http://localhost:3000"
echo ""
echo "按 Ctrl+C 停止服务器"
echo ""

npm start 