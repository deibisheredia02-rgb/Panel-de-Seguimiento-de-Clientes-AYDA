
export enum UserRole {
  PROSPECTOR = 'PROSPECTOR',
  ANALISTA = 'ANALISTA',
  ADMIN = 'ADMIN'
}

export interface ProspectPayload {
  header: {
    user_id: number;
    nicho: string;
    prioridad: 'normal' | 'high' | 'urgent';
    query_busqueda: string;
  };
  items: Array<{
    prospecto_id: number;
    email: string;
    personalizacion: {
      colores: string[];
    };
  }>;
}

export interface Lead {
  id: number;
  businessName: string;
  email: string;
  status: 'nuevo' | 'contactado' | 'convertido' | 'rechazado';
  date: string;
}

export interface PainPoint {
  id: string;
  description: string;
  severity: 'BAJA' | 'MEDIA' | 'ALTA';
  category: string;
}
