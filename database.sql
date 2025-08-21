-- 群组回忆册数据库结构
-- 在 Supabase 的 SQL Editor 中执行这些语句

-- 用户表
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    avatar TEXT,
    role TEXT DEFAULT 'member' CHECK (role IN ('member', 'viewer')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 待办事项表
CREATE TABLE todos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 评论表
CREATE TABLE comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    todo_id UUID REFERENCES todos(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 媒体文件表（图片、视频）
CREATE TABLE media (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    todo_id UUID REFERENCES todos(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('image', 'video')),
    url TEXT NOT NULL,
    uploaded_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 行级安全策略 (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- 权限策略：所有人都可以查看，只有成员可以编辑
CREATE POLICY "Anyone can view todos" ON todos FOR SELECT USING (true);
CREATE POLICY "Members can create todos" ON todos FOR INSERT WITH CHECK (true);
CREATE POLICY "Members can update todos" ON todos FOR UPDATE USING (true);
CREATE POLICY "Members can delete todos" ON todos FOR DELETE USING (true);

CREATE POLICY "Anyone can view comments" ON comments FOR SELECT USING (true);
CREATE POLICY "Members can create comments" ON comments FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view media" ON media FOR SELECT USING (true);
CREATE POLICY "Members can upload media" ON media FOR INSERT WITH CHECK (true);

-- 创建存储桶用于文件上传
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

-- 存储桶权限策略
CREATE POLICY "Anyone can view media files" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Members can upload media files" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media');

-- 创建实时订阅功能
-- 这将允许多人实时协作
CREATE PUBLICATION supabase_realtime FOR TABLE todos, comments;