import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Users, FileText, BarChart2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AdminSidebar() {
  const location = useLocation()

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav className="space-y-2">
        <Link to="/admin">
          <Button variant="ghost" className={`w-full justify-start ${location.pathname === '/admin' ? 'bg-gray-700' : ''}`}>
            <BarChart2 className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </Link>
        <Link to="/admin/users">
          <Button variant="ghost" className={`w-full justify-start ${location.pathname === '/admin/users' ? 'bg-gray-700' : ''}`}>
            <Users className="mr-2 h-4 w-4" />
            Quản lý người dùng
          </Button>
        </Link>
        <Link to="/admin/posts">
          <Button variant="ghost" className={`w-full justify-start ${location.pathname === '/admin/posts' ? 'bg-gray-700' : ''}`}>
            <FileText className="mr-2 h-4 w-4" />
            Quản lý bài viết
          </Button>
        </Link>
      </nav>
    </aside>
  )
}