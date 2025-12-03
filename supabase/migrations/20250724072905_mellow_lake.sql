/*
  # Create causes table for Our Causes management

  1. New Tables
    - `causes`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text, required)
      - `image_url` (text, required)
      - `is_active` (boolean, default true)
      - `sort_order` (integer, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `causes` table
    - Add policy for anonymous users to read active causes
    - Add policy for authenticated users to manage all causes

  3. Indexes
    - Index on is_active for filtering
    - Index on sort_order for ordering
    - Composite index on is_active and sort_order for efficient queries
*/

CREATE TABLE IF NOT EXISTS causes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE causes ENABLE ROW LEVEL SECURITY;

-- Policy for anonymous users to read active causes
CREATE POLICY "Anonymous users can read active causes"
  ON causes
  FOR SELECT
  TO anon
  USING (is_active = true);

-- Policy for authenticated users to manage all causes
CREATE POLICY "Authenticated users can manage causes"
  ON causes
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS causes_active_idx ON causes (is_active);
CREATE INDEX IF NOT EXISTS causes_sort_order_idx ON causes (sort_order);
CREATE INDEX IF NOT EXISTS causes_active_sort_idx ON causes (is_active, sort_order);
CREATE INDEX IF NOT EXISTS causes_created_at_idx ON causes (created_at);