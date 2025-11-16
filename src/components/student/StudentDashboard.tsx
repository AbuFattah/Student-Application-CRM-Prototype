import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { GraduationCap, LayoutDashboard, FileUp, ClipboardList, Bell, LogOut, User } from 'lucide-react';
import type { User } from '../../App';
import StudentOverview from './StudentOverview';
import StudentDocuments from './StudentDocuments';
import StudentProgress from './StudentProgress';
import StudentNotifications from './StudentNotifications';

interface StudentDashboardProps {
  user: User;
  onLogout: () => void;
}

export default function StudentDashboard({ user, onLogout }: StudentDashboardProps) {
  const location = useLocation();

  const navItems = [
    { path: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/student/documents', icon: FileUp, label: 'Documents' },
    { path: '/student/progress', icon: ClipboardList, label: 'Progress' },
    { path: '/student/notifications', icon: Bell, label: 'Notifications' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="size-8 text-blue-600" />
            <div>
              <h1 className="text-xl">Student Application CRM</h1>
              <p className="text-sm text-gray-600">Student Portal</p>
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
            <Route path="/dashboard" element={<StudentOverview user={user} />} />
            <Route path="/documents" element={<StudentDocuments />} />
            <Route path="/progress" element={<StudentProgress />} />
            <Route path="/notifications" element={<StudentNotifications />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
