
import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserRole } from '../types';

interface SidebarProps {
  role: UserRole;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, isOpen, onClose }) => {
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: 'fa-chart-line' },
    { name: 'Nueva Prospección', path: '/nueva-prospeccion', icon: 'fa-plus-circle' },
    { name: 'Mis Prospecciones', path: '/mis-prospecciones', icon: 'fa-list-check' },
    { name: 'Centro de Análisis', path: '/centro-analisis', icon: 'fa-brain' },
    { name: 'Gestión de Campañas', path: '/gestion-campanas', icon: 'fa-paper-plane' },
    { name: 'Datos Maestros', path: '/datos-maestros', icon: 'fa-database' },
    { name: 'Configuración / Salir', path: '/configuracion', icon: 'fa-cog' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      <aside className={`fixed left-0 top-0 bottom-0 w-64 bg-slate-900 text-white shadow-2xl z-50 sidebar-transition transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-blue-400 leading-tight">AYDA</h1>
            <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold mt-1">Ecosistema de Automatización</p>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white p-2"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <nav className="p-4 flex-1 overflow-y-auto max-h-[calc(100vh-180px)]">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => { if(window.innerWidth < 1024) onClose(); }}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                    }`
                  }
                >
                  <i className={`fas ${item.icon} w-5 text-center text-sm`}></i>
                  <span className="font-semibold text-sm tracking-tight">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-slate-900 border-t border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-lg shadow-inner">
              {role[0]}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">Usuario AYDA</p>
              <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">{role}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
