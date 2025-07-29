import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export interface Banner {
  id: string;
  title?: string;
  subtitle?: string;
  image_url: string;
  position: 'left' | 'center' | 'right';
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface AboutContent {
  id: string;
  image_url: string;
  years_of_service: number;
  about_title: string;
  about_text: string;
  lives_impacted: number;
  active_volunteers: number;
  our_vision: string;
  our_mission: string;
  created_at: string;
  updated_at: string;
}

export interface Cause {
  id: string;
  title: string;
  description: string;
  image_url: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category_name: string;
  project_status: 'ongoing' | 'completed' | 'planning';
  image_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ReliefContent {
  id: string;
  banner_image_url: string;
  title: string;
  description: string;
  services: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  statistics: Array<{
    number: string;
    label: string;
  }>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Certification {
  id: string;
  certificate_name: string;
  image_url: string;
  pdf_url?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ReliefGallery {
  id: string;
  image_url: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface MedicalGallery {
  id: string;
  image_url: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface MedicalContent {
  id: string;
  banner_image_url: string;
  title: string;
  description: string;
  services: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  statistics: Array<{
    number: string;
    label: string;
  }>;
  health_tips: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface OldageGallery {
  id: string;
  image_url: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface OldageBanner {
  id: string;
  title?: string;
  subtitle?: string;
  image_url: string;
  position: 'left' | 'center' | 'right';
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface OldageContent {
  id: string;
  about_image_url: string;
  about_title: string;
  about_description: string;
  statistics: Array<{
    number: string;
    label: string;
  }>;
  services: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ChildrenContent {
  id: string;
  about_image_url: string;
  about_title: string;
  about_description: string;
  statistics: Array<{
    number: string;
    label: string;
  }>;
  services: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ChildrenBanner {
  id: string;
  image_url: string;
  position: 'left' | 'center' | 'right';
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ChildrenGallery {
  id: string;
  image_url: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface DonateContent {
  id: string;
  qr_codes: Array<{
    title: string;
    image_url: string;
    description?: string;
  }>;
  bank_accounts: Array<{
    bank_name: string;
    account_name: string;
    account_number: string;
    routing_number?: string;
    swift_code?: string;
    branch?: string;
  }>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LogoSettings {
  id: string;
  logo_url: string;
  logo_name: string;
  tagline: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BoardStaff {
  id: string;
  name: string;
  designation: string;
  image_url: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface HomeGallery {
  id: string;
  image_url: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}