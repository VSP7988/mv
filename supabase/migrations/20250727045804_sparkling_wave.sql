/*
  # Create Relief Gallery Table

  1. New Tables
    - `relief_gallery`
      - `id` (uuid, primary key)
      - `image_url` (text, required)
      - `is_active` (boolean, default true)
      - `sort_order` (integer, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `relief_gallery` table
    - Add policies for anonymous users to read active images
    - Add policies for authenticated users to manage all images

  3. Indexes
    - Index on is_active for filtering
    - Index on sort_order for ordering
    - Combined index on is_active and sort_order for performance
*/

CREATE TABLE IF NOT EXISTS relief_gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE relief_gallery ENABLE ROW LEVEL SECURITY;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS relief_gallery_active_idx ON relief_gallery (is_active);
CREATE INDEX IF NOT EXISTS relief_gallery_sort_order_idx ON relief_gallery (sort_order);
CREATE INDEX IF NOT EXISTS relief_gallery_active_sort_idx ON relief_gallery (is_active, sort_order);
CREATE INDEX IF NOT EXISTS relief_gallery_created_at_idx ON relief_gallery (created_at);

-- RLS Policies
-- Anonymous users can read active gallery images
CREATE POLICY "Anonymous users can read active relief gallery images"
  ON relief_gallery
  FOR SELECT
  TO anon
  USING (is_active = true);

-- Authenticated users can manage all relief gallery images
CREATE POLICY "Authenticated users can insert relief gallery images"
  ON relief_gallery
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read all relief gallery images"
  ON relief_gallery
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update relief gallery images"
  ON relief_gallery
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete relief gallery images"
  ON relief_gallery
  FOR DELETE
  TO authenticated
  USING (true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_relief_gallery_updated_at
    BEFORE UPDATE ON relief_gallery
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();