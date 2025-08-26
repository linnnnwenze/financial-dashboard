#!/bin/bash

echo "🚀 财务数据看板系统 - 一键部署脚本"
echo "=================================="
echo ""

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
echo ""

# 安装依赖
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
echo "🎉 选择部署方式："
echo "1. 🌐 Netlify 部署（推荐 - 最简单）"
echo "2. 🚀 Vercel 部署（也很简单）"
echo "3. 📚 GitHub Pages 部署"
echo "4. 🏠 本地网络分享"
echo "5. 📖 查看所有部署指南"
echo "6. 🔧 手动部署选项"

read -p "请选择 (1-6): " choice

case $choice in
    1)
        echo ""
        echo "🌐 Netlify 部署指南："
        echo "=================="
        echo "1. 访问 https://netlify.com"
        echo "2. 注册/登录账号"
        echo "3. 将 build 文件夹拖拽到部署区域"
        echo "4. 等待部署完成，获取分享链接"
        echo ""
        echo "📁 build 文件夹位置：$(pwd)/build"
        echo ""
        echo "💡 提示：这是最简单的方法，无需命令行操作！"
        ;;
    2)
        echo ""
        echo "🚀 Vercel 部署指南："
        echo "=================="
        echo "1. 安装 Vercel CLI: npm install -g vercel"
        echo "2. 登录 Vercel: vercel login"
        echo "3. 部署项目: vercel"
        echo "4. 按照提示完成部署"
        echo ""
        echo "💡 提示：Vercel 会自动检测项目类型并配置！"
        ;;
    3)
        echo ""
        echo "📚 GitHub Pages 部署指南："
        echo "========================"
        echo "1. 在 GitHub 创建新仓库"
        echo "2. 推送代码到 GitHub"
        echo "3. 安装 gh-pages: npm install --save-dev gh-pages"
        echo "4. 修改 package.json 添加 homepage 和 deploy 脚本"
        echo "5. 运行: npm run deploy"
        echo "6. 在 GitHub 仓库设置中启用 Pages"
        echo ""
        echo "📖 详细步骤请查看 GITHUB_PAGES_DEPLOY.md"
        ;;
    4)
        echo ""
        echo "🏠 本地网络分享指南："
        echo "=================="
        
        # 获取本地 IP 地址
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | head -1 | awk '{print $2}')
        elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
            # Linux
            IP=$(hostname -I | awk '{print $1}')
        else
            # Windows
            IP=$(ipconfig | grep "IPv4" | head -1 | awk '{print $NF}')
        fi
        
        echo "1. 安装 serve: npm install -g serve"
        echo "2. 启动服务器: serve -s build -l 3000 --host 0.0.0.0"
        echo "3. 分享链接: http://$IP:3000"
        echo ""
        echo "💡 您的本地 IP 地址可能是: $IP"
        echo "💡 分享链接: http://$IP:3000"
        ;;
    5)
        echo ""
        echo "📖 所有部署指南："
        echo "================"
        echo "• Netlify 部署: NETLIFY_DEPLOY.md"
        echo "• Vercel 部署: VERCEL_DEPLOY.md"
        echo "• GitHub Pages 部署: GITHUB_PAGES_DEPLOY.md"
        echo "• 本地网络分享: LOCAL_SHARE.md"
        echo "• 通用分享指南: SHARE_GUIDE.md"
        echo ""
        echo "📁 所有指南文件都在项目根目录中"
        ;;
    6)
        echo ""
        echo "🔧 手动部署选项："
        echo "================"
        echo "1. 使用 serve 包: npx serve -s build -l 3000"
        echo "2. 使用 Python: cd build && python -m http.server 3000"
        echo "3. 使用 nginx: 将 build 文件夹复制到 nginx 目录"
        echo "4. 使用 Apache: 将 build 文件夹复制到 Apache 目录"
        echo ""
        echo "📁 build 文件夹位置：$(pwd)/build"
        ;;
    *)
        echo "❌ 无效选择"
        exit 1
        ;;
esac

echo ""
echo "✨ 部署指南已显示！"
echo "📖 详细说明请查看对应的 .md 文件"
echo ""
echo "💡 推荐使用 Netlify（选项1），这是最简单的方法！" 