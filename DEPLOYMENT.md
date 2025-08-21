# 🚀 部署指南

## 快速部署到 Vercel + Supabase

### 第一步：准备 Supabase 数据库

1. **创建 Supabase 项目**
   - 访问 [supabase.com](https://supabase.com)
   - 点击 "New project"
   - 填写项目信息，选择地区（建议选择 Singapore 对中国访问较快）

2. **设置数据库**
   - 进入项目控制台
   - 点击左侧菜单 "SQL Editor"
   - 复制 `database.sql` 文件内容
   - 粘贴并点击 "RUN" 执行

3. **获取连接信息**
   - 点击左侧菜单 "Settings" > "API"
   - 复制 `Project URL` 和 `anon/public key`

### 第二步：部署到 Vercel

1. **推送代码到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/你的用户名/你的仓库名.git
   git push -u origin main
   ```

2. **连接 Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 点击 "Import Git Repository"
   - 选择你的 GitHub 仓库
   - 项目会自动检测为 Vite 项目

3. **配置环境变量**
   - 在部署页面点击 "Environment Variables"
   - 添加以下变量：
     ```
     VITE_SUPABASE_URL = 你的 Supabase Project URL
     VITE_SUPABASE_ANON_KEY = 你的 Supabase anon key
     ```

4. **完成部署**
   - 点击 "Deploy"
   - 等待构建完成
   - 获得你的网站链接！

### 第三步：测试功能

1. **基础功能测试**
   - ✅ 添加新的想法
   - ✅ 修改状态（待完成 → 进行中 → 已完成）
   - ✅ 删除想法
   - ✅ 手机端响应式布局

2. **数据持久化测试**
   - 刷新页面，数据是否还在
   - 多个设备同时访问，数据是否同步

## 故障排除

### 问题1：页面显示"离线模式"
**原因**：Supabase 连接配置错误
**解决**：
1. 检查 Vercel 环境变量是否正确设置
2. 确认 Supabase 项目状态是否正常
3. 检查 `database.sql` 是否完全执行

### 问题2：无法添加数据
**原因**：数据库权限策略问题
**解决**：
1. 进入 Supabase > Authentication > Settings
2. 暂时关闭 RLS (Row Level Security)
3. 或者重新执行 `database.sql` 中的策略部分

### 问题3：手机端样式异常
**原因**：Tailwind CSS 未正确加载
**解决**：
1. 检查 `tailwind.config.js` 配置
2. 确认 `src/index.css` 包含 Tailwind 指令
3. 重新构建项目：`npm run build`

## 高级配置

### 自定义域名
1. 在 Vercel 项目设置中点击 "Domains"
2. 添加你的域名
3. 按照提示配置 DNS 记录

### 启用 PWA（离线支持）
```bash
npm install -D vite-plugin-pwa
```

在 `vite.config.ts` 中添加：
```typescript
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ]
})
```

### 性能优化
1. **启用 Gzip 压缩**（Vercel 默认启用）
2. **图片优化**：使用 Vercel Image Optimization
3. **代码分割**：React 懒加载组件

## 监控和维护

### Vercel Analytics
- 在项目设置中启用 Analytics
- 查看访问量、性能指标

### Supabase 监控
- 查看 API 使用量
- 监控数据库性能
- 设置使用量告警

### 定期维护
- 每月检查依赖包更新
- 监控免费额度使用情况
- 备份重要数据

## 成本预估

**完全免费使用场景**：
- 10人以下群组
- 每月添加<100条想法
- 图片存储<1GB
- 月访问量<1万PV

**需要付费场景**：
- Supabase：数据库>500MB 或 请求>5万次/月
- Vercel：带宽>100GB/月 或 需要更多serverless函数

**升级建议**：
- Supabase Pro: $25/月（适合50人以下团队）
- Vercel Pro: $20/月（适合高流量使用）

---

🎉 恭喜！你的群组回忆册已经成功部署上线了！