/*
  # Create relief content management table

  1. New Tables
    - `relief_content`
      - `id` (uuid, primary key)
      - `banner_image_url` (text, required)
      - `title` (text, required)
      - `description` (text, required)
      - `services` (jsonb, array of service objects)
      - `statistics` (jsonb, array of statistic objects)
      - `is_active` (boolean, default true)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `relief_content` table
    - Add policies for anonymous users to read active content
    - Add policies for authenticated users to manage all content
*/

CREATE TABLE IF NOT EXISTS relief_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  banner_image_url text NOT NULL,
  title text NOT NULL DEFAULT 'Relief Programs',
  description text NOT NULL DEFAULT 'Providing immediate assistance and long-term support to communities affected by disasters and emergencies',
  services jsonb DEFAULT '[]'::jsonb,
  statistics jsonb DEFAULT '[]'::jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE relief_content ENABLE ROW LEVEL SECURITY;

-- Policies for relief_content table
CREATE POLICY "Anonymous users can read active relief content"
  ON relief_content
  FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Authenticated users can read all relief content"
  ON relief_content
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert relief content"
  ON relief_content
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update relief content"
  ON relief_content
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete relief content"
  ON relief_content
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS relief_content_active_idx ON relief_content (is_active);
CREATE INDEX IF NOT EXISTS relief_content_created_at_idx ON relief_content (created_at);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_relief_content_updated_at
    BEFORE UPDATE ON relief_content
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();