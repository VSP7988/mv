/*
  # Create logo management table

  1. New Tables
    - `logo_settings`
      - `id` (uuid, primary key)
      - `logo_url` (text, logo image URL)
      - `logo_name` (text, organization name)
      - `tagline` (text, optional tagline)
      - `is_active` (boolean, active status)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `logo_settings` table
    - Add policies for anonymous users to read active logo
    - Add policies for authenticated users to manage logo settings

  3. Indexes
    - Index on is_active for performance
    - Index on created_at for sorting
*/

CREATE TABLE IF NOT EXISTS logo_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  logo_url text NOT NULL,
  logo_name text DEFAULT 'MV CHARITIES'::text,
  tagline text DEFAULT 'Making a Difference'::text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE logo_settings ENABLE ROW LEVEL SECURITY;

-- Policies for logo_settings
CREATE POLICY "Anonymous users can read active logo settings"
  ON logo_settings
  FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Authenticated users can read all logo settings"
  ON logo_settings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert logo settings"
  ON logo_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update logo settings"
  ON logo_settings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete logo settings"
  ON logo_settings
  FOR DELETE
  TO authenticated
  USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS logo_settings_active_idx ON logo_settings (is_active);
CREATE INDEX IF NOT EXISTS logo_settings_created_at_idx ON logo_settings (created_at);

-- Update trigger function
CREATE OR REPLACE FUNCTION update_logo_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER update_logo_settings_updated_at
  BEFORE UPDATE ON logo_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_logo_settings_updated_at();