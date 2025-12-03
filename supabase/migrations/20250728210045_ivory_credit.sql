/*
  # Create home gallery table

  1. New Tables
    - `home_gallery`
      - `id` (uuid, primary key)
      - `image_url` (text, required)
      - `is_active` (boolean, default true)
      - `sort_order` (integer, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `home_gallery` table
    - Add policies for anonymous users to read active images
    - Add policies for authenticated users to manage all images

  3. Indexes
    - Index on is_active for filtering
    - Index on sort_order for ordering
    - Composite index on is_active and sort_order
*/

CREATE TABLE IF NOT EXISTS home_gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE home_gallery ENABLE ROW LEVEL SECURITY;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS home_gallery_active_idx ON home_gallery (is_active);
CREATE INDEX IF NOT EXISTS home_gallery_sort_order_idx ON home_gallery (sort_order);
CREATE INDEX IF NOT EXISTS home_gallery_active_sort_idx ON home_gallery (is_active, sort_order);
CREATE INDEX IF NOT EXISTS home_gallery_created_at_idx ON home_gallery (created_at);

-- RLS Policies
CREATE POLICY "Anonymous users can read active home gallery images"
  ON home_gallery
  FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Authenticated users can read all home gallery images"
  ON home_gallery
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert home gallery images"
  ON home_gallery
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update home gallery images"
  ON home_gallery
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete home gallery images"
  ON home_gallery
  FOR DELETE
  TO authenticated
  USING (true);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_home_gallery_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_home_gallery_updated_at
  BEFORE UPDATE ON home_gallery
  FOR EACH ROW
  EXECUTE FUNCTION update_home_gallery_updated_at();