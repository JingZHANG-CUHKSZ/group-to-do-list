import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 如果环境变量不存在或无效，则不创建 Supabase 客户端
export const supabase = (supabaseUrl && supabaseKey && supabaseUrl.startsWith('http')) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null

// 数据库类型定义
export interface Todo {
  id: string
  title: string
  description: string
  category: string
  status: 'pending' | 'in_progress' | 'completed'
  created_at: string
  created_by: string
}

export interface Comment {
  id: string
  todo_id: string
  user_id: string
  content: string
  created_at: string
}

export interface Media {
  id: string
  todo_id: string
  type: 'image' | 'video'
  url: string
  uploaded_by: string
  created_at: string
}

export interface User {
  id: string
  name: string
  avatar?: string
  role: 'member' | 'viewer'
  created_at: string
}