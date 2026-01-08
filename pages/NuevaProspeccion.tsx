
import React, { useState } from 'react';
import { ProspectPayload } from '../types';

const NuevaProspeccion: React.FC = () => {
  const [header, setHeader] = useState<ProspectPayload['header']>({
    user_id: 123,
    nicho: 'HOGAR',
    prioridad: 'normal',
    query_busqueda: '',
  });

  const [items, setItems] = useState<ProspectPayload['items']>([]);
  const [newLead, setNewLead] = useState({ businessName: '', email: '', color: '#3b82f6' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddItem = () => {
    if (!newLead.businessName || !newLead.email) return;
    const itemToAdd: ProspectPayload['items'][0] = {
      prospecto_id: Math.floor(Math.random() * 1000),
      email: newLead.email,
      personalizacion: { colores: [newLead.color] }
    };
    setItems([...items, itemToAdd]);
    setNewLead({ businessName: '', email: '', color: '#3b82f6' });
  };

  const handleSendToBackend = () => {
    setIsSubmitting(true);
    const finalPayload: ProspectPayload = { header, items };
    console.log("FINAL PROSPECTING PAYLOAD:", JSON.stringify(finalPayload, null, 2));
    setTimeout(() => {
      alert("Prospección iniciada con éxito. Ver consola.");
      setIsSubmitting(false);
    }, 1000);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <header>
        <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">Nueva Prospección</h1>
        <p className="text-slate-500 font-medium text-sm md:text-base">Configura la cabecera y añade leads al lote de prospección.</p>
      </header>

      {/* CABECERA */}
      <div className="bg-white p-5 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3 flex items-center">
          <i className="fas fa-sliders-h mr-2"></i> Configuración Maestros
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-700 uppercase tracking-tighter">Nicho de Negocio</label>
            <select 
              value={header.nicho}
              onChange={(e) => setHeader({...header, nicho: e.target.value})}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-semibold text-sm outline-none"
            >
              <option value="HOGAR">Hogar</option>
              <option value="EMPRESAS">Empresas</option>
              <option value="CLINICAS">Clínicas</option>
              <option value="EDIFICIOS">Edificios</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-700 uppercase tracking-tighter">Prioridad</label>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {['normal', 'high', 'urgent'].map((p) => (
                <label key={p} className={`flex items-center space-x-2 cursor-pointer px-3 py-1.5 rounded-full border transition-all ${header.prioridad === p ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100' : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-blue-300'}`}>
                  <input 
                    type="radio" 
                    name="priority" 
                    value={p}
                    checked={header.prioridad === p}
                    onChange={() => setHeader({...header, prioridad: p as any})}
                    className="hidden"
                  />
                  <span className="text-[11px] font-black uppercase tracking-tight">{p}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-700 uppercase tracking-tighter">Query (Google Maps)</label>
            <input 
              type="text"
              placeholder="Ej: dentistas en Barcelona..."
              value={header.query_busqueda}
              onChange={(e) => setHeader({...header, query_busqueda: e.target.value})}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 transition-all font-semibold text-sm outline-none"
            />
          </div>
        </div>
      </div>

      {/* DETALLE DE LEADS */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 bg-slate-50/50 border-b border-slate-100 flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Negocio</label>
              <input 
                type="text" 
                className="w-full p-3 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-100 outline-none"
                placeholder="Nombre del lead..."
                value={newLead.businessName}
                onChange={(e) => setNewLead({...newLead, businessName: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Email</label>
              <input 
                type="email" 
                className="w-full p-3 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-100 outline-none"
                placeholder="ejemplo@lead.com"
                value={newLead.email}
                onChange={(e) => setNewLead({...newLead, email: e.target.value})}
              />
            </div>
            <div className="flex items-end gap-3">
              <div className="flex-1">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Color Base</label>
                 <input 
                  type="color" 
                  className="w-full h-[46px] p-1 border border-slate-200 rounded-xl cursor-pointer bg-white"
                  value={newLead.color}
                  onChange={(e) => setNewLead({...newLead, color: e.target.value})}
                />
              </div>
              <button 
                onClick={handleAddItem}
                className="bg-blue-600 text-white h-[46px] px-6 rounded-xl font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95 flex items-center justify-center space-x-2"
              >
                <i className="fas fa-plus"></i>
                <span className="hidden sm:inline">AGREGAR</span>
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[600px]">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr className="text-slate-500">
                <th className="p-4 font-black uppercase text-[10px] tracking-widest">Email</th>
                <th className="p-4 font-black uppercase text-[10px] tracking-widest">Prospecto ID</th>
                <th className="p-4 font-black uppercase text-[10px] tracking-widest text-center">Visual</th>
                <th className="p-4 font-black uppercase text-[10px] tracking-widest text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-10 text-center text-slate-400 italic font-medium">No hay leads en el lote actual.</td>
                </tr>
              ) : (
                items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                    <td className="p-4 font-bold text-slate-700">{item.email}</td>
                    <td className="p-4 text-slate-400 font-mono text-xs tracking-tighter">#{item.prospecto_id}</td>
                    <td className="p-4">
                      <div className="w-8 h-8 rounded-lg border border-slate-200 mx-auto shadow-inner" style={{backgroundColor: item.personalizacion.colores[0]}}></div>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => removeItem(idx)}
                        className="text-red-400 hover:text-red-600 p-2 md:opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 lg:relative lg:p-0 bg-white/80 backdrop-blur-md lg:bg-transparent lg:flex lg:justify-end z-20 border-t border-slate-100 lg:border-none">
        <button 
          onClick={handleSendToBackend}
          disabled={items.length === 0 || isSubmitting}
          className={`w-full lg:w-auto px-8 py-4 rounded-2xl font-black text-white shadow-2xl flex items-center justify-center space-x-3 transition-all ${
            items.length === 0 
              ? 'bg-slate-300 cursor-not-allowed shadow-none' 
              : 'bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-blue-200'
          }`}
        >
          {isSubmitting ? (
            <i className="fas fa-circle-notch fa-spin"></i>
          ) : (
            <i className="fas fa-rocket"></i>
          )}
          <span className="tracking-tight uppercase">INICIAR PROSPECCIÓN MAESTRA</span>
        </button>
      </div>
    </div>
  );
};

export default NuevaProspeccion;
