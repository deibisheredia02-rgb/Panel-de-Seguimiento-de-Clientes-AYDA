
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  role: UserRole;
}

const Layout: React.FC<LayoutProps> = ({ children, role }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 text-white flex items-center justify-between px-6 z-30 shadow-md">
        <h1 className="text-xl font-black text-blue-400">AYDA</h1>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-slate-300 hover:text-white"
        >
          <i className="fas fa-bars text-xl"></i>
        </button>
      </div>

      {/* Sidebar Component */}
      <Sidebar 
        role={role} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 p-4 md:p-6 lg:p-8 pt-20 lg:pt-8 transition-all">
        <div className="max-w-7xl mx-auto pb-20 lg:pb-0">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
