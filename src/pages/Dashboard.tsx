import React from 'react';
import { useAuth } from '../context/AuthContext';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { UserDashboard } from '../components/dashboard/UserDashboard';
import { AgentDashboard } from '../components/dashboard/AgentDashboard';
import { AdminDashboard } from '../components/dashboard/AdminDashboard';

export const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  const renderDashboard = () => {
    switch (user.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'guide': // Using 'guide' as 'agent' for this context based on existing roles
      case 'host':
        return <AgentDashboard />;
      case 'tourist':
      default:
        return <UserDashboard />;
    }
  };

  return (
    <DashboardLayout>
      {renderDashboard()}
    </DashboardLayout>
  );
};
