import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import StudentDashboard from './components/student/StudentDashboard';
import AgentDashboard from './components/agent/AgentDashboard';
import InternalDashboard from './components/internal/InternalDashboard';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';

export type UserRole = 'student' | 'agent' | 'marketing' | 'application' | 'compliance' | 'case' | 'superadmin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  approved?: boolean;
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Student Routes */}
        <Route 
          path="/student/*" 
          element={
            currentUser?.role === 'student' ? (
              <StudentDashboard user={currentUser} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        
        {/* Agent Routes */}
        <Route 
          path="/agent/*" 
          element={
            currentUser?.role === 'agent' && currentUser.approved ? (
              <AgentDashboard user={currentUser} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        
        {/* Internal Portal Routes */}
        <Route 
          path="/internal/*" 
          element={
            currentUser && ['marketing', 'application', 'compliance', 'case', 'superadmin'].includes(currentUser.role) ? (
              <InternalDashboard user={currentUser} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
