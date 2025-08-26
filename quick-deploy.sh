#!/bin/bash

echo "🚀 财务数据看板系统 - 快速部署脚本"
echo "=================================="

# 检查 Node.js 和 npm
if ! command -v node &> /dev/null; then
    echo "❌ 错误：未找到 Node.js，请先安装 Node.js"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ 错误：未找到 npm，请先安装 npm"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"
echo "✅ npm 版本: $(npm --version)"

# 安装依赖
echo ""
echo "📦 安装依赖..."
npm install

# 构建项目
echo ""
echo "🔨 构建项目..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ 构建成功！"
else
    echo "❌ 构建失败，请检查错误信息"
    exit 1
fi

echo ""
echo "🎉 部署选项："
echo "1. 使用 Netlify 部署（推荐）"
echo "2. 使用 Vercel 部署"
echo "3. 使用 GitHub Pages 部署"
echo "4. 本地测试"
echo "5. 查看部署指南"

read -p "请选择部署方式 (1-5): " choice

case $choice in
    1)
        echo ""
        echo "🌐 Netlify 部署："
        echo "1. 访问 https://netlify.com"
        echo "2. 注册/登录账号"
        echo "3. 将 build 文件夹拖拽到部署区域"
        echo "4. 等待部署完成，获取分享链接"
        echo ""
        echo "📁 build 文件夹已准备就绪：$(pwd)/build"
        ;;
    2)
        echo ""
        echo "🚀 Vercel 部署："
        echo "1. 安装 Vercel CLI: npm install -g vercel"
        echo "2. 运行: vercel"
        echo "3. 按照提示完成部署"
        ;;
    3)
        echo ""
        echo "📚 GitHub Pages 部署："
        echo "1. 安装 gh-pages: npm install --save-dev gh-pages"
        echo "2. 修改 package.json 添加 homepage 和 deploy 脚本"
        echo "3. 运行: npm run deploy"
        ;;
    4)
        echo ""
        echo "🏠 本地测试："
        echo "启动本地服务器..."
        npx serve -s build -l 3000
        ;;
    5)
        echo ""
        echo "📖 查看部署指南..."
        cat SHARE_GUIDE.md
        ;;
    *)
        echo "❌ 无效选择"
        exit 1
        ;;
esac

echo ""
echo "✨ 部署完成！"
echo "📖 详细说明请查看 SHARE_GUIDE.md" 