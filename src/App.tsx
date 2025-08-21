import { useState } from 'react'
import { Plus, Calendar, Users, CheckCircle, Trash2 } from 'lucide-react'
import { useTodos } from './hooks/useTodos'
import type { Todo } from './lib/supabase'

function App() {
  const { todos, loading, error, addTodo, updateTodoStatus, deleteTodo } = useTodos()
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTodo, setNewTodo] = useState({ title: '', description: '', category: '旅游', status: 'pending' as const })

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodo.title.trim()) return

    await addTodo(newTodo)
    setNewTodo({ title: '', description: '', category: '旅游', status: 'pending' as const })
    setShowAddForm(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Users className="h-7 w-7 text-blue-500" />
                群组回忆册
              </h1>
              {error && (
                <p className="text-sm text-amber-600 mt-1">
                  ⚠️ 离线模式 - 数据仅保存在本地
                </p>
              )}
            </div>
            <button 
              onClick={() => setShowAddForm(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
            >
              <Plus className="h-4 w-4" />
              添加想法
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">待完成</p>
                <p className="text-2xl font-bold text-orange-600">
                  {todos.filter(t => t.status === 'pending').length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-orange-500" />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">进行中</p>
                <p className="text-2xl font-bold text-blue-600">
                  {todos.filter(t => t.status === 'in_progress').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">已完成</p>
                <p className="text-2xl font-bold text-green-600">
                  {todos.filter(t => t.status === 'completed').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Todo List */}
        <div className="space-y-4">
          {todos.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">还没有任何想法</p>
              <button 
                onClick={() => setShowAddForm(true)}
                className="text-blue-500 hover:text-blue-600"
              >
                添加第一个想法
              </button>
            </div>
          ) : (
            todos.map((todo) => (
              <div key={todo.id} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{todo.title}</h3>
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {todo.category}
                      </span>
                      <select 
                        value={todo.status}
                        onChange={(e) => updateTodoStatus(todo.id, e.target.value as Todo['status'])}
                        className={`px-2 py-1 text-xs font-medium rounded-full border-0 cursor-pointer ${
                          todo.status === 'completed' ? 'bg-green-100 text-green-800' :
                          todo.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-orange-100 text-orange-800'
                        }`}
                      >
                        <option value="pending">待完成</option>
                        <option value="in_progress">进行中</option>
                        <option value="completed">已完成</option>
                      </select>
                    </div>
                    <p className="text-gray-600 mb-3">{todo.description}</p>
                    <p className="text-sm text-gray-400">
                      创建于 {new Date(todo.created_at).toLocaleDateString('zh-CN')}
                    </p>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-gray-400 hover:text-red-500 p-2"
                      title="删除"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Add Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">添加新想法</h2>
            <form onSubmit={handleAddTodo} className="space-y-4">
              <input 
                type="text" 
                placeholder="标题（如：去桂林旅游）"
                value={newTodo.title}
                onChange={(e) => setNewTodo(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <textarea 
                placeholder="详细描述..."
                rows={3}
                value={newTodo.description}
                onChange={(e) => setNewTodo(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <select 
                value={newTodo.category}
                onChange={(e) => setNewTodo(prev => ({ ...prev, category: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="旅游">旅游</option>
                <option value="聚餐">聚餐</option>
                <option value="桌游">桌游</option>
                <option value="运动">运动</option>
                <option value="学习">学习</option>
                <option value="其他">其他</option>
              </select>
              <div className="flex gap-3 mt-6">
                <button 
                  type="button"
                  onClick={() => {
                    setShowAddForm(false)
                    setNewTodo({ title: '', description: '', category: '旅游', status: 'pending' as const })
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  取消
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  添加
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
