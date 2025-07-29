/*
  # Create medical content management table

  1. New Tables
    - `medical_content`
      - `id` (uuid, primary key)
      - `banner_image_url` (text, required)
      - `title` (text, default: 'Medical Services')
      - `description` (text, default description)
      - `services` (jsonb, array of service objects)
      - `statistics` (jsonb, array of statistic objects)
      - `health_tips` (jsonb, array of health tip objects)
      - `is_active` (boolean, default: true)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `medical_content` table
    - Add policies for authenticated users to manage content
    - Add policy for anonymous users to read active content
*/

CREATE TABLE IF NOT EXISTS medical_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  banner_image_url text NOT NULL,
  title text NOT NULL DEFAULT 'Medical Services',
  description text NOT NULL DEFAULT 'Providing accessible, quality healthcare services to ensure the wellbeing of our community members',
  services jsonb DEFAULT '[]'::jsonb,
  statistics jsonb DEFAULT '[]'::jsonb,
  health_tips jsonb DEFAULT '[]'::jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE medical_content ENABLE ROW LEVEL SECURITY;

-- Policies for medical_content
CREATE POLICY "Anonymous users can read active medical content"
  ON medical_content
  FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Authenticated users can read all medical content"
  ON medical_content
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert medical content"
  ON medical_content
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update medical content"
  ON medical_content
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete medical content"
  ON medical_content
  FOR DELETE
  TO authenticated
  USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS medical_content_active_idx ON medical_content (is_active);
CREATE INDEX IF NOT EXISTS medical_content_created_at_idx ON medical_content (created_at);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_medical_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_medical_content_updated_at
  BEFORE UPDATE ON medical_content
  FOR EACH ROW
  EXECUTE FUNCTION update_medical_content_updated_at();