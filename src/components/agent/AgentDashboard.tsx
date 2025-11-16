import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { Users, LayoutDashboard, UserPlus, FileUp, LogOut, User } from 'lucide-react';
import type { User as UserType } from '../../App';
import AgentOverview from './AgentOverview';
import AgentStudents from './AgentStudents';
import AgentSubmissions from './AgentSubmissions';

interface AgentDashboardProps {
  user: UserType;
  onLogout: () => void;
}

export default function AgentDashboard({ user, onLogout }: AgentDashboardProps) {
  const location = useLocation();

  const navItems = [
    { path: '/agent/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/agent/students', icon: Users, label: 'My Students' },
    { path: '/agent/submissions', icon: FileUp, label: 'Submissions' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="size-8 text-blue-600" />
            <div>
              <h1 className="text-xl">Student Application CRM</h1>
              <p className="text-sm text-gray-600">Agent Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="size-4 text-gray-600" />
              <span className="text-sm">{user.name}</span>
            </div>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="size-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-[calc(100vh-73px)]">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    className="w-full justify-start"
                  >
                    <Icon className="size-4 mr-3" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/dashboard" element={<AgentOverview user={user} />} />
            <Route path="/students" element={<AgentStudents />} />
            <Route path="/submissions" element={<AgentSubmissions />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
