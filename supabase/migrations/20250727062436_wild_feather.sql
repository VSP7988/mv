/*
  # Create donate content management table

  1. New Tables
    - `donate_content`
      - `id` (uuid, primary key)
      - `qr_codes` (jsonb array for QR code images)
      - `bank_accounts` (jsonb array for bank account details)
      - `is_active` (boolean, default true)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `donate_content` table
    - Add policies for anonymous users to read active content
    - Add policies for authenticated users to manage content
*/

CREATE TABLE IF NOT EXISTS donate_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  qr_codes jsonb DEFAULT '[]'::jsonb,
  bank_accounts jsonb DEFAULT '[]'::jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE donate_content ENABLE ROW LEVEL SECURITY;

-- Policies for donate_content
CREATE POLICY "Anonymous users can read active donate content"
  ON donate_content
  FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Authenticated users can read all donate content"
  ON donate_content
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert donate content"
  ON donate_content
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update donate content"
  ON donate_content
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete donate content"
  ON donate_content
  FOR DELETE
  TO authenticated
  USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS donate_content_active_idx ON donate_content (is_active);
CREATE INDEX IF NOT EXISTS donate_content_created_at_idx ON donate_content (created_at);

-- Update trigger
CREATE OR REPLACE FUNCTION update_donate_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_donate_content_updated_at
  BEFORE UPDATE ON donate_content
  FOR EACH ROW
  EXECUTE FUNCTION update_donate_content_updated_at();