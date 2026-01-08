
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardHome from './pages/DashboardHome';
import NuevaProspeccion from './pages/NuevaProspeccion';
import { UserRole } from './types';

const Placeholder = ({ title }: { title: string }) => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-4">{title}</h1>
    <p className="text-gray-600">Esta sección se encuentra bajo construcción según el esquema maestro de AYDA.</p>
  </div>
);

const App: React.FC = () => {
  // Global state for simulating role switching for demonstration purposes
  const [currentRole, setCurrentRole] = useState<UserRole>(UserRole.PROSPECTOR);

  return (
    <HashRouter>
      <div className="fixed bottom-4 right-4 z-50 bg-white p-2 rounded-lg shadow-xl border border-blue-200 flex items-center space-x-2">
        <span className="text-xs font-bold text-gray-500">SIMULAR ROL:</span>
        <select 
          value={currentRole} 
          onChange={(e) => setCurrentRole(e.target.value as UserRole)}
          className="text-sm p-1 border rounded"
        >
          <option value={UserRole.PROSPECTOR}>Prospector</option>
          <option value={UserRole.ANALISTA}>Analista</option>
          <option value={UserRole.ADMIN}>Administrador</option>
        </select>
      </div>

      <Layout role={currentRole}>
        <Routes>
          <Route path="/" element={<DashboardHome role={currentRole} />} />
          <Route path="/nueva-prospeccion" element={<NuevaProspeccion />} />
          <Route path="/mis-prospecciones" element={<Placeholder title="Mis Prospecciones" />} />
          <Route path="/centro-analisis" element={<Placeholder title="Centro de Análisis" />} />
          <Route path="/gestion-campanas" element={<Placeholder title="Gestión de Campañas" />} />
          <Route path="/datos-maestros" element={<Placeholder title="Datos Maestros" />} />
          <Route path="/configuracion" element={<Placeholder title="Configuración / Salir" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
