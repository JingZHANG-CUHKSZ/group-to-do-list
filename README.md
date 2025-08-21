# 群组回忆册

一个为微信群朋友们设计的共享待办事项和回忆记录网站，支持手机和电脑端流畅使用。

## ✨ 功能特色

- 📝 **共享待办清单** - 记录旅游计划、聚餐想法、桌游等各种活动
- 👥 **实时协作** - 多人同时编辑，实时同步
- 📱 **移动端友好** - 响应式设计，手机编辑体验优秀
- 🖼️ **回忆相册** - 完成活动后上传照片和感想
- 🔒 **权限控制** - 群员可编辑，访客可查看
- 💾 **数据安全** - 自动云端备份，防误删

## 🚀 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 配置环境变量
```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件，填入你的 Supabase 配置：
```env
VITE_SUPABASE_URL=你的项目URL
VITE_SUPABASE_ANON_KEY=你的匿名密钥
```

### 3. 设置数据库
1. 注册 [Supabase](https://supabase.com) 账号
2. 创建新项目
3. 在 SQL Editor 中执行 `database.sql` 中的命令

### 4. 启动开发服务器
```bash
npm run dev
```

## 🌐 部署到 Vercel

### 方式一：GitHub 自动部署（推荐）
1. 将代码推送到 GitHub
2. 访问 [Vercel](https://vercel.com)
3. 导入 GitHub 项目
4. 在环境变量中设置 Supabase 配置
5. 部署完成！

### 方式二：命令行部署
```bash
npm install -g vercel
npm run build
vercel --prod
```

## 💰 免费额度说明

**Vercel 免费版：**
- ✅ 无限制的静态网站
- ✅ 100GB 带宽/月
- ✅ 自定义域名

**Supabase 免费版：**
- ✅ 500MB 数据库存储
- ✅ 1GB 文件存储
- ✅ 50,000 次 API 请求/月

## 🛠️ 技术栈

- **前端**：React 19 + TypeScript + Tailwind CSS
- **构建工具**：Vite
- **后端服务**：Supabase (PostgreSQL)
- **部署平台**：Vercel
- **图标库**：Lucide React

## 📖 使用说明

### 基础功能
1. **添加想法** - 点击右上角"添加想法"按钮
2. **更新状态** - 点击状态标签切换：待完成 → 进行中 → 已完成
3. **删除项目** - 点击右侧垃圾桶图标

### 高级功能（待开发）
- 图片上传和展示
- 评论系统
- 用户认证
- 回忆册导出

## 🔧 开发指南

### 项目结构
```
src/
├── components/     # 可复用组件
├── hooks/         # 自定义 Hooks
├── lib/           # 工具库和配置
├── App.tsx        # 主应用组件
└── main.tsx       # 应用入口
```

### 本地开发
```bash
npm run dev      # 启动开发服务器
npm run build    # 构建生产版本
npm run preview  # 预览生产版本
```

## 📝 待办清单

- [ ] 用户认证系统
- [ ] 图片上传功能  
- [ ] 评论系统
- [ ] 实时通知
- [ ] 导出回忆册
- [ ] PWA 支持
- [ ] 国际化支持

## 💡 灵感来源

这个项目诞生于朋友们在微信群里总是冒出各种有趣想法，但经常因为缺乏统一管理而被遗忘。希望通过这个工具，让每一个美好的想法都能被记录、执行和回忆。
