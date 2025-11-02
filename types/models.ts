// Tipe dasar untuk data utama aplikasi
export interface Facility {
  id: string | number;
  slug: string;
  name: string;
  description: string;
  image_public_id_1?: string;
  image_public_id_2?: string;
  image_public_id_3?: string;
}

export interface Service {
  id: string | number;
  slug: string;
  name: string;
  description: string;
  image_public_id_1?: string;
  image_public_id_2?: string;
  image_public_id_3?: string;
  status?: string;
  status_info?: string;
  notes?: string;
  schedule?: string;
}

export interface Article {
  id: string | number;
  slug: string;
  title: string;
  content: string;
  image_public_id?: string;
  created_at?: string;
  updated_at?: string;
  author?: string;
}

export interface Doctor {
  id: string | number;
  name: string;
  specialty: string;
  status: string;
  status_info?: string;
  notes?: string;
  schedule?: string;
  image_public_id?: string;
}

export interface InfoItem {
  id: string | number;
  title: string;
  description: string;
  image_public_id?: string;
  created_at?: string;
}
