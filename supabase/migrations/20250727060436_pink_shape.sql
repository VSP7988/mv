/*
  # Create Children Home Management Tables

  1. New Tables
    - `children_content`
      - `id` (uuid, primary key)
      - `about_image_url` (text, about section image)
      - `about_title` (text, about section title)
      - `about_description` (text, about section description)
      - `statistics` (jsonb, array of statistics)
      - `services` (jsonb, array of services)
      - `is_active` (boolean, visibility control)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `children_banners`
      - `id` (uuid, primary key)
      - `image_url` (text, banner image)
      - `position` (text, text alignment)
      - `is_active` (boolean, visibility control)
      - `sort_order` (integer, ordering)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `children_gallery`
      - `id` (uuid, primary key)
      - `image_url` (text, gallery image)
      - `is_active` (boolean, visibility control)
      - `sort_order` (integer, ordering)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage content
    - Add policies for anonymous users to read active content
*/

-- Children Content Table
CREATE TABLE IF NOT EXISTS children_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  about_image_url text NOT NULL,
  about_title text NOT NULL DEFAULT 'A Home Away From Home',
  about_description text NOT NULL,
  statistics jsonb DEFAULT '[]'::jsonb,
  services jsonb DEFAULT '[]'::jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE children_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anonymous users can read active children content"
  ON children_content
  FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage children content"
  ON children_content
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Children Banners Table
CREATE TABLE IF NOT EXISTS children_banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  position text NOT NULL DEFAULT 'left' CHECK (position IN ('left', 'center', 'right')),
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE children_banners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anonymous users can read active children banners"
  ON children_banners
  FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Authenticated users can insert children banners"
  ON children_banners
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read all children banners"
  ON children_banners
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update children banners"
  ON children_banners
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete children banners"
  ON children_banners
  FOR DELETE
  TO authenticated
  USING (true);

-- Children Gallery Table
CREATE TABLE IF NOT EXISTS children_gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE children_gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anonymous users can read active children gallery images"
  ON children_gallery
  FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Authenticated users can insert children gallery images"
  ON children_gallery
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read all children gallery images"
  ON children_gallery
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update children gallery images"
  ON children_gallery
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete children gallery images"
  ON children_gallery
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS children_content_active_idx ON children_content (is_active);
CREATE INDEX IF NOT EXISTS children_content_created_at_idx ON children_content (created_at);

CREATE INDEX IF NOT EXISTS children_banners_active_sort_idx ON children_banners (is_active, sort_order);
CREATE INDEX IF NOT EXISTS children_banners_created_at_idx ON children_banners (created_at);
CREATE INDEX IF NOT EXISTS idx_children_banners_is_active ON children_banners (is_active);
CREATE INDEX IF NOT EXISTS idx_children_banners_sort_order ON children_banners (sort_order);
CREATE INDEX IF NOT EXISTS idx_children_banners_active_order ON children_banners (is_active, sort_order);

CREATE INDEX IF NOT EXISTS children_gallery_active_idx ON children_gallery (is_active);
CREATE INDEX IF NOT EXISTS children_gallery_active_sort_idx ON children_gallery (is_active, sort_order);
CREATE INDEX IF NOT EXISTS children_gallery_created_at_idx ON children_gallery (created_at);
CREATE INDEX IF NOT EXISTS children_gallery_sort_order_idx ON children_gallery (sort_order);

-- Create update triggers
CREATE OR REPLACE FUNCTION update_children_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_children_banners_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_children_content_updated_at
  BEFORE UPDATE ON children_content
  FOR EACH ROW
  EXECUTE FUNCTION update_children_content_updated_at();

CREATE TRIGGER update_children_banners_updated_at
  BEFORE UPDATE ON children_banners
  FOR EACH ROW
  EXECUTE FUNCTION update_children_banners_updated_at();

CREATE TRIGGER update_children_gallery_updated_at
  BEFORE UPDATE ON children_gallery
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();