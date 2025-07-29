/*
  # Create medical gallery table

  1. New Tables
    - `medical_gallery`
      - `id` (uuid, primary key)
      - `image_url` (text, required)
      - `is_active` (boolean, default true)
      - `sort_order` (integer, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `medical_gallery` table
    - Add policy for anonymous users to read active images
    - Add policies for authenticated users to manage all images

  3. Indexes
    - Index on `is_active` for filtering
    - Index on `sort_order` for ordering
    - Composite index on `is_active, sort_order` for efficient queries
*/

CREATE TABLE IF NOT EXISTS medical_gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE medical_gallery ENABLE ROW LEVEL SECURITY;

-- Policies for medical_gallery
CREATE POLICY "Anonymous users can read active medical gallery images"
  ON medical_gallery
  FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Authenticated users can read all medical gallery images"
  ON medical_gallery
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert medical gallery images"
  ON medical_gallery
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update medical gallery images"
  ON medical_gallery
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete medical gallery images"
  ON medical_gallery
  FOR DELETE
  TO authenticated
  USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS medical_gallery_active_idx ON medical_gallery (is_active);
CREATE INDEX IF NOT EXISTS medical_gallery_sort_order_idx ON medical_gallery (sort_order);
CREATE INDEX IF NOT EXISTS medical_gallery_active_sort_idx ON medical_gallery (is_active, sort_order);
CREATE INDEX IF NOT EXISTS medical_gallery_created_at_idx ON medical_gallery (created_at);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_medical_gallery_updated_at
    BEFORE UPDATE ON medical_gallery
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();