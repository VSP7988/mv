/*
  # Create certifications table

  1. New Tables
    - `certifications`
      - `id` (uuid, primary key)
      - `certificate_name` (text, required)
      - `image_url` (text, required)
      - `pdf_url` (text, optional)
      - `is_active` (boolean, default true)
      - `sort_order` (integer, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `certifications` table
    - Add policies for anonymous users to read active certifications
    - Add policies for authenticated users to manage certifications

  3. Indexes
    - Add indexes for performance optimization
*/

CREATE TABLE IF NOT EXISTS certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  certificate_name text NOT NULL,
  image_url text NOT NULL,
  pdf_url text,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

-- Policies for anonymous users (can only read active certifications)
CREATE POLICY "Anonymous users can read active certifications"
  ON certifications
  FOR SELECT
  TO anon
  USING (is_active = true);

-- Policies for authenticated users (full CRUD access)
CREATE POLICY "Authenticated users can read all certifications"
  ON certifications
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert certifications"
  ON certifications
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update certifications"
  ON certifications
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete certifications"
  ON certifications
  FOR DELETE
  TO authenticated
  USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS certifications_active_idx ON certifications (is_active);
CREATE INDEX IF NOT EXISTS certifications_sort_order_idx ON certifications (sort_order);
CREATE INDEX IF NOT EXISTS certifications_created_at_idx ON certifications (created_at);
CREATE INDEX IF NOT EXISTS certifications_active_sort_idx ON certifications (is_active, sort_order);