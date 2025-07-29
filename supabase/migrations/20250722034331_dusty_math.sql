/*
  # Create board_staff table

  1. New Tables
    - `board_staff`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `designation` (text, required)
      - `image_url` (text, required)
      - `is_active` (boolean, default true)
      - `sort_order` (integer, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `board_staff` table
    - Add policy for anonymous users to read active board staff
    - Add policy for authenticated users to manage board staff
*/

CREATE TABLE IF NOT EXISTS board_staff (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  designation text NOT NULL,
  image_url text NOT NULL,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE board_staff ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anonymous users can read active board staff"
  ON board_staff
  FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage board staff"
  ON board_staff
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS board_staff_active_sort_idx ON board_staff (is_active, sort_order);
CREATE INDEX IF NOT EXISTS board_staff_created_at_idx ON board_staff (created_at);

-- Insert sample data
INSERT INTO board_staff (name, designation, image_url, sort_order) VALUES
('Dr. Sarah Johnson', 'Chairman & CEO', 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=400', 1),
('Michael Chen', 'Director of Operations', 'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=400', 2),
('Dr. Emily Rodriguez', 'Medical Director', 'https://images.pexels.com/photos/4173244/pexels-photo-4173244.jpeg?auto=compress&cs=tinysrgb&w=400', 3),
('James Wilson', 'Finance Director', 'https://images.pexels.com/photos/4173242/pexels-photo-4173242.jpeg?auto=compress&cs=tinysrgb&w=400', 4);