
import React from 'react';
import { UserRole } from '../types';

interface DashboardHomeProps {
  role: UserRole;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ role }) => {
  if (role === UserRole.ANALISTA) {
    return <DashboardAnalista />;
  }
  return <DashboardProspector />;
};

const DashboardProspector: React.FC = () => {
  const kpis = [
    { label: 'Mis Leads Activos', value: '3', color: 'blue' },
    { label: 'Pendientes', value: '2', color: 'yellow' },
    { label: 'Convertidos Mes', value: '1', color: 'green' },
  ];

  const recentLeads = [
    { name: 'Clínica Dental Sonrisas', status: 'convertido', date: '2023-11-20' },
    { name: 'Admin. Edificios Norte', status: 'pendiente', date: '2023-11-21' },
    { name: 'Hotel Grand Plaza', status: 'pendiente', date: '2023-11-22' },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">Mi Panel de Seguimiento</h1>
        <p className="text-slate-500 font-medium">Gestión de prospección personal.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">{kpi.label}</p>
            <p className="text-3xl md:text-4xl font-black mt-1 text-slate-800">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 md:p-5 border-b border-slate-100 bg-slate-50/50">
          <h2 className="font-extrabold text-slate-800 text-sm md:text-base">Estado Reciente</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[500px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-100">
                <th className="p-4 font-bold uppercase text-[10px] tracking-widest">Nombre del Negocio</th>
                <th className="p-4 font-bold uppercase text-[10px] tracking-widest text-center">Estado</th>
                <th className="p-4 font-bold uppercase text-[10px] tracking-widest">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentLeads.map((lead, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-semibold text-slate-700">{lead.name}</td>
                  <td className="p-4 text-center">
                    {lead.status === 'convertido' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">
                        <i className="fas fa-check-circle mr-1"></i> ÉXITO
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                        <i className="fas fa-clock mr-1"></i> EN ESPERA
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-slate-500 font-medium">{lead.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const DashboardAnalista: React.FC = () => {
  const urgentPainPoints = [
    { title: 'Retraso en plomería - Sector Norte', severity: 'ALTA', source: 'Reddit' },
    { title: 'Falta de insumos limpieza', severity: 'MEDIA', source: 'Foros' },
    { title: 'Mal servicio al cliente - Urgente', severity: 'ALTA', source: 'Comentarios' },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">Centro de Inteligencia</h1>
        <p className="text-slate-500 font-medium">Análisis de sentimientos y puntos de dolor detectados.</p>
      </header>

      {/* Urgent Alert */}
      <div className="bg-red-50 border-l-4 border-red-500 p-5 md:p-6 rounded-r-2xl shadow-sm flex flex-col sm:flex-row items-center sm:space-x-4 space-y-3 sm:space-y-0">
        <div className="bg-red-500 text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse shadow-lg shadow-red-200">
          <i className="fas fa-exclamation-triangle text-xl"></i>
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-red-800 font-black text-lg">ACCIÓN REQUERIDA</h3>
          <p className="text-red-700 font-medium text-sm">5 Pain Points esperando análisis inmediato para validación de marketing.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 md:p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="font-extrabold text-slate-800 text-sm md:text-base">Pain Points Urgentes</h2>
          <span className="bg-white text-slate-600 text-[10px] font-black px-2 py-1 rounded-full border border-slate-200 uppercase tracking-tighter">Últimas 24h</span>
        </div>
        <div className="divide-y divide-slate-100">
          {urgentPainPoints.map((pp, i) => (
            <div key={i} className="p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:bg-slate-50 transition-colors gap-3">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${pp.severity === 'ALTA' ? 'bg-red-500' : 'bg-yellow-500'} shadow-sm`}></div>
                <div>
                  <p className="font-bold text-slate-700 text-sm md:text-base leading-tight">{pp.title}</p>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">Fuente: <span className="text-blue-500">{pp.source}</span></p>
                </div>
              </div>
              <button className="w-full sm:w-auto text-blue-600 font-black text-xs md:text-sm hover:underline flex items-center justify-center py-2 sm:py-0 border border-blue-100 sm:border-none rounded-lg bg-blue-50 sm:bg-transparent">
                Analizar <i className="fas fa-chevron-right ml-1.5"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
