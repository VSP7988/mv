/*
  # Create oldage home banners table

  1. New Tables
    - `oldage_banners`
      - `id` (uuid, primary key)
      - `title` (text, optional)
      - `subtitle` (text, optional)
      - `image_url` (text, required)
      - `position` (text, default 'left')
      - `is_active` (boolean, default true)
      - `sort_order` (integer, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `oldage_banners` table
    - Add policies for anonymous users to read active banners
    - Add policies for authenticated users to manage all banners

  3. Indexes
    - Add indexes for performance optimization
    - Index on is_active and sort_order for efficient querying
*/

CREATE TABLE IF NOT EXISTS oldage_banners (
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

-- Enable RLS
ALTER TABLE oldage_banners ENABLE ROW LEVEL SECURITY;

-- Policies for anonymous users (public access to active banners)
CREATE POLICY "Anonymous users can read active oldage banners"
  ON oldage_banners
  FOR SELECT
  TO anon
  USING (is_active = true);

-- Policies for authenticated users (full access)
CREATE POLICY "Authenticated users can read all oldage banners"
  ON oldage_banners
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert oldage banners"
  ON oldage_banners
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update oldage banners"
  ON oldage_banners
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete oldage banners"
  ON oldage_banners
  FOR DELETE
  TO authenticated
  USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_oldage_banners_is_active ON oldage_banners (is_active);
CREATE INDEX IF NOT EXISTS idx_oldage_banners_sort_order ON oldage_banners (sort_order);
CREATE INDEX IF NOT EXISTS idx_oldage_banners_active_order ON oldage_banners (is_active, sort_order);
CREATE INDEX IF NOT EXISTS oldage_banners_active_sort_idx ON oldage_banners (is_active, sort_order);
CREATE INDEX IF NOT EXISTS oldage_banners_created_at_idx ON oldage_banners (created_at);

-- Update trigger
CREATE OR REPLACE FUNCTION update_oldage_banners_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_oldage_banners_updated_at
  BEFORE UPDATE ON oldage_banners
  FOR EACH ROW
  EXECUTE FUNCTION update_oldage_banners_updated_at();