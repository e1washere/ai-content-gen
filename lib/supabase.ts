import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface User {
  id: string
  email: string
  created_at: string
  subscription_status: 'free' | 'premium' | 'pro'
  credits_remaining: number
}

export interface GeneratedContent {
  id: string
  user_id: string
  content_type: 'product_description' | 'social_media' | 'blog_post'
  input_data: any
  generated_content: string
  created_at: string
} 