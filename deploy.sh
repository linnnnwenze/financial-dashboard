#!/bin/bash

# 财务数据看板系统 - 部署脚本

echo "🚀 开始部署财务数据看板系统..."

# 检查 Node.js 是否安装
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未找到 Node.js，请先安装 Node.js"
    exit 1
fi

# 检查 npm 是否安装
if ! command -v npm &> /dev/null; then
    echo "❌ 错误: 未找到 npm，请先安装 npm"
    exit 1
fi

echo "✅ Node.js 和 npm 已安装"

# 安装依赖
echo "📦 安装依赖..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ 依赖安装失败"
    exit 1
fi

echo "✅ 依赖安装完成"

# 构建项目
echo "🔨 构建项目..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败"
    exit 1
fi

echo "✅ 构建完成"

# 检查构建结果
if [ ! -d "build" ]; then
    echo "❌ 构建目录不存在"
    exit 1
fi

echo "✅ 构建目录检查通过"

# 显示部署选项
echo ""
echo "🎉 构建成功！请选择部署方式："
echo ""
echo "1. 本地测试 (npm run serve)"
echo "2. 部署到 GitHub Pages"
echo "3. 部署到 Netlify"
echo "4. 部署到 Vercel"
echo "5. 手动部署 (复制 build 文件夹)"
echo ""

read -p "请选择部署方式 (1-5): " choice

case $choice in
    1)
        echo "🌐 启动本地服务器..."
        npm run serve
        ;;
    2)
        echo "📚 部署到 GitHub Pages..."
        echo "请按照以下步骤操作："
        echo "1. 创建 GitHub 仓库"
        echo "2. 运行: npm install --save-dev gh-pages"
        echo "3. 修改 package.json 中的 homepage 字段"
        echo "4. 运行: npm run deploy"
        ;;
    3)
        echo "🌍 部署到 Netlify..."
        echo "请访问 https://netlify.com 并拖拽 build 文件夹到部署区域"
        ;;
    4)
        echo "⚡ 部署到 Vercel..."
        echo "请运行: npm install -g vercel && vercel"
        ;;
    5)
        echo "📁 手动部署..."
        echo "build 文件夹已准备就绪，您可以："
        echo "- 将 build 文件夹内容上传到任何 Web 服务器"
        echo "- 使用任何静态文件托管服务"
        echo "- 部署到云服务器"
        ;;
    *)
        echo "❌ 无效选择"
        exit 1
        ;;
esac

echo ""
echo "🎊 部署完成！"
echo "📖 详细部署说明请参考 DEPLOYMENT.md" 