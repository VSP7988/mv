/*
  # Create banners table for home page management

  1. New Tables
    - `banners`
      - `id` (uuid, primary key)
      - `title` (text, optional)
      - `subtitle` (text, optional)
      - `image_url` (text, required)
      - `position` (text, required - left/center/right)
      - `is_active` (boolean, default true)
      - `sort_order` (integer, for ordering banners)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `banners` table
    - Add policy for authenticated users to manage banners
    - Add policy for public users to read active banners
*/

CREATE TABLE IF NOT EXISTS banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  subtitle text,
  image_url text NOT NULL,
  position text NOT NULL DEFAULT 'left' CHECK (position IN ('left', 'center', 'right')),
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users (admins) to manage all banners
CREATE POLICY "Authenticated users can manage banners"
  ON banners
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy for public users to read only active banners
CREATE POLICY "Public users can read active banners"
  ON banners
  FOR SELECT
  TO anon
  USING (is_active = true);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS banners_active_sort_idx ON banners (is_active, sort_order);
CREATE INDEX IF NOT EXISTS banners_created_at_idx ON banners (created_at);

-- Insert default banners
INSERT INTO banners (title, subtitle, image_url, position, is_active, sort_order) VALUES
(
  'Making a Difference Together',
  'Join us in our mission to provide hope, care, and support to those who need it most in our community.',
  'https://images.pexels.com/photos/6995326/pexels-photo-6995326.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'left',
  true,
  1
),
(
  'Children''s Future, Our Priority',
  'Providing safe homes, education, and love to children who need it most, building a brighter tomorrow.',
  'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'center',
  true,
  2
),
(
  'Caring for Our Elders',
  'Providing dignity, comfort, and companionship to elderly community members in their golden years.',
  'https://images.pexels.com/photos/7551627/pexels-photo-7551627.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'right',
  true,
  3
);