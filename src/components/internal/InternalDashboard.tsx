import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { Building2, LayoutDashboard, Users, Megaphone, FileCheck, ShieldCheck, Briefcase, BarChart3, LogOut, User } from 'lucide-react';
import type { User as UserType } from '../../App';
import SuperAdminDashboard from './SuperAdminDashboard';
import MarketingOfficerDashboard from './MarketingOfficerDashboard';
import ApplicationOfficerDashboard from './ApplicationOfficerDashboard';
import ComplianceOfficerDashboard from './ComplianceOfficerDashboard';
import CaseOfficerDashboard from './CaseOfficerDashboard';

interface InternalDashboardProps {
  user: UserType;
  onLogout: () => void;
}

export default function InternalDashboard({ user, onLogout }: InternalDashboardProps) {
  const location = useLocation();

  // Navigation items based on role
  const getNavItems = () => {
    const baseItems = [
      { path: '/internal/dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['superadmin', 'marketing', 'application', 'compliance', 'case'] },
    ];

    const roleSpecificItems = [
      { path: '/internal/users', icon: Users, label: 'User Management', roles: ['superadmin'] },
      { path: '/internal/reports', icon: BarChart3, label: 'Reports & Analytics', roles: ['superadmin'] },
      { path: '/internal/marketing', icon: Megaphone, label: 'Marketing Management', roles: ['superadmin', 'marketing'] },
      { path: '/internal/applications', icon: FileCheck, label: 'Applications', roles: ['superadmin', 'application'] },
      { path: '/internal/compliance', icon: ShieldCheck, label: 'Compliance', roles: ['superadmin', 'compliance'] },
      { path: '/internal/cases', icon: Briefcase, label: 'Case Management', roles: ['superadmin', 'case'] },
    ];

    return [...baseItems, ...roleSpecificItems.filter((item) => item.roles.includes(user.role))];
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Building2 className="size-8 text-blue-600" />
            <div>
              <h1 className="text-xl">Student Application CRM</h1>
              <p className="text-sm text-gray-600">Internal Management Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg">
              <User className="size-4 text-blue-600" />
              <div className="text-right">
                <p className="text-sm">{user.name}</p>
                <p className="text-xs text-gray-600 capitalize">{user.role.replace('superadmin', 'Super Admin')}</p>
              </div>
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
            <Route path="/dashboard" element={<DashboardRouter user={user} />} />
            <Route path="/users" element={<SuperAdminDashboard user={user} section="users" />} />
            <Route path="/reports" element={<SuperAdminDashboard user={user} section="reports" />} />
            <Route path="/marketing" element={<MarketingOfficerDashboard user={user} />} />
            <Route path="/applications" element={<ApplicationOfficerDashboard user={user} />} />
            <Route path="/compliance" element={<ComplianceOfficerDashboard user={user} />} />
            <Route path="/cases" element={<CaseOfficerDashboard user={user} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function DashboardRouter({ user }: { user: UserType }) {
  switch (user.role) {
    case 'superadmin':
      return <SuperAdminDashboard user={user} section="overview" />;
    case 'marketing':
      return <MarketingOfficerDashboard user={user} />;
    case 'application':
      return <ApplicationOfficerDashboard user={user} />;
    case 'compliance':
      return <ComplianceOfficerDashboard user={user} />;
    case 'case':
      return <CaseOfficerDashboard user={user} />;
    default:
      return <div>Dashboard</div>;
  }
}
