import { useState, useEffect } from 'react'
import { supabase, type Todo } from '../lib/supabase'

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 获取所有待办事项
  const fetchTodos = async () => {
    try {
      setLoading(true)
      
      if (!supabase) {
        throw new Error('Supabase not configured')
      }
      
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setTodos(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch todos')
      // 如果数据库连接失败，使用模拟数据
      setTodos([
        {
          id: '1',
          title: '一起去桂林旅游',
          description: '计划3天2夜，看漓江风景',
          category: '旅游',
          status: 'pending',
          created_at: '2024-01-15T10:00:00Z',
          created_by: 'user1'
        },
        {
          id: '2',
          title: '聚餐吃火锅',
          description: '周末一起去海底捞',
          category: '聚餐',
          status: 'completed',
          created_at: '2024-01-10T18:00:00Z',
          created_by: 'user2'
        },
        {
          id: '3',
          title: '一起玩剧本杀',
          description: '体验最新的恐怖剧本',
          category: '桌游',
          status: 'in_progress',
          created_at: '2024-01-12T14:00:00Z',
          created_by: 'user1'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  // 添加待办事项
  const addTodo = async (todo: Omit<Todo, 'id' | 'created_at' | 'created_by'>) => {
    try {
      // 如果 Supabase 未配置，使用本地状态
      if (!supabase || error) {
        const newTodo: Todo = {
          ...todo,
          id: Date.now().toString(),
          created_at: new Date().toISOString(),
          created_by: 'local_user'
        }
        setTodos(prev => [newTodo, ...prev])
        return newTodo
      }

      const { data, error: insertError } = await supabase
        .from('todos')
        .insert([{ ...todo, created_by: 'temp_user' }])
        .select()
        .single()

      if (insertError) throw insertError
      
      setTodos(prev => [data, ...prev])
      return data
    } catch (err) {
      console.error('Failed to add todo:', err)
      // 降级到本地添加
      const newTodo: Todo = {
        ...todo,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        created_by: 'local_user'
      }
      setTodos(prev => [newTodo, ...prev])
      return newTodo
    }
  }

  // 更新待办事项状态
  const updateTodoStatus = async (id: string, status: Todo['status']) => {
    try {
      // 本地更新
      setTodos(prev => prev.map(todo => 
        todo.id === id ? { ...todo, status } : todo
      ))

      if (supabase && !error) {
        const { error: updateError } = await supabase
          .from('todos')
          .update({ status })
          .eq('id', id)

        if (updateError) {
          console.error('Failed to update todo in database:', updateError)
          // 本地更新已经完成，继续使用本地状态
        }
      }
    } catch (err) {
      console.error('Failed to update todo status:', err)
    }
  }

  // 删除待办事项
  const deleteTodo = async (id: string) => {
    try {
      // 本地删除
      setTodos(prev => prev.filter(todo => todo.id !== id))

      if (supabase && !error) {
        const { error: deleteError } = await supabase
          .from('todos')
          .delete()
          .eq('id', id)

        if (deleteError) {
          console.error('Failed to delete todo from database:', deleteError)
        }
      }
    } catch (err) {
      console.error('Failed to delete todo:', err)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return {
    todos,
    loading,
    error,
    addTodo,
    updateTodoStatus,
    deleteTodo,
    refetch: fetchTodos
  }
}