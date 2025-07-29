/*
  # Create causes table

  1. New Tables
    - `causes`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text, required)
      - `image_url` (text, required)
      - `is_active` (boolean, default true)
      - `sort_order` (integer, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `causes` table
    - Add policy for anonymous users to read active causes
    - Add policy for authenticated users to manage causes

  3. Sample Data
    - Insert default causes with working image URLs
*/

CREATE TABLE IF NOT EXISTS causes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE causes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anonymous users can read active causes"
  ON causes
  FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage causes"
  ON causes
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert sample causes with working image URLs
INSERT INTO causes (title, description, image_url, is_active, sort_order) VALUES
(
  'Children''s Education',
  'Supporting underprivileged children with quality education, school supplies, and learning resources.',
  'https://images.pexels.com/photos/8617625/pexels-photo-8617625.jpeg?auto=compress&cs=tinysrgb&w=600',
  true,
  1
),
(
  'Elderly Care Program',
  'Providing comprehensive care, medical support, and companionship for elderly community members.',
  'https://images.pexels.com/photos/7551627/pexels-photo-7551627.jpeg?auto=compress&cs=tinysrgb&w=600',
  true,
  2
),
(
  'Medical Aid Fund',
  'Emergency medical assistance and healthcare services for families who cannot afford treatment.',
  'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=600',
  true,
  3
),
(
  'Safe Housing Initiative',
  'Building and maintaining safe, comfortable homes for children and families in need.',
  'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=600',
  true,
  4
),
(
  'Food Security Program',
  'Regular food distribution and nutrition programs for vulnerable families and individuals.',
  'https://images.pexels.com/photos/6995242/pexels-photo-6995242.jpeg?auto=compress&cs=tinysrgb&w=600',
  true,
  5
),
(
  'Emergency Relief Fund',
  'Rapid response support for natural disasters and emergency situations affecting our community.',
  'https://images.pexels.com/photos/6994982/pexels-photo-6994982.jpeg?auto=compress&cs=tinysrgb&w=600',
  true,
  6
);