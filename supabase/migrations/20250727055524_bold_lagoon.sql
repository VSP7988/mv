/*
  # Create oldage content management table

  1. New Tables
    - `oldage_content`
      - `id` (uuid, primary key)
      - `about_image_url` (text, about section image)
      - `about_title` (text, about section title)
      - `about_description` (text, about section description)
      - `statistics` (jsonb, array of statistics)
      - `services` (jsonb, array of services)
      - `is_active` (boolean, visibility control)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `oldage_content` table
    - Add policies for anonymous users to read active content
    - Add policies for authenticated users to manage content

  3. Indexes
    - Index on is_active for filtering
    - Index on created_at for ordering
*/

CREATE TABLE IF NOT EXISTS oldage_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  about_image_url text NOT NULL,
  about_title text DEFAULT 'Honoring Our Elders' NOT NULL,
  about_description text NOT NULL,
  statistics jsonb DEFAULT '[]'::jsonb,
  services jsonb DEFAULT '[]'::jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE oldage_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anonymous users can read active oldage content"
  ON oldage_content
  FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Authenticated users can read all oldage content"
  ON oldage_content
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert oldage content"
  ON oldage_content
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update oldage content"
  ON oldage_content
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete oldage content"
  ON oldage_content
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS oldage_content_active_idx ON oldage_content (is_active);
CREATE INDEX IF NOT EXISTS oldage_content_created_at_idx ON oldage_content (created_at);

-- Create trigger function for updating updated_at
CREATE OR REPLACE FUNCTION update_oldage_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER update_oldage_content_updated_at
  BEFORE UPDATE ON oldage_content
  FOR EACH ROW
  EXECUTE FUNCTION update_oldage_content_updated_at();