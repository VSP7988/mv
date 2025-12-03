/*
  # Create board_staff table for managing board members and staff

  1. New Tables
    - `board_staff`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `designation` (text, required)
      - `image_url` (text, required)
      - `is_active` (boolean, default true)
      - `sort_order` (integer, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `board_staff` table
    - Add policies for anonymous users to read active board staff
    - Add policies for authenticated users to manage board staff

  3. Indexes
    - Index on is_active for filtering
    - Index on sort_order for ordering
    - Index on created_at for sorting
*/

CREATE TABLE IF NOT EXISTS board_staff (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  designation text NOT NULL,
  image_url text NOT NULL,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE board_staff ENABLE ROW LEVEL SECURITY;

-- Policies for board_staff table
CREATE POLICY "Anonymous users can read active board staff"
  ON board_staff
  FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Authenticated users can read all board staff"
  ON board_staff
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert board staff"
  ON board_staff
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update board staff"
  ON board_staff
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete board staff"
  ON board_staff
  FOR DELETE
  TO authenticated
  USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS board_staff_active_idx ON board_staff (is_active);
CREATE INDEX IF NOT EXISTS board_staff_sort_order_idx ON board_staff (sort_order);
CREATE INDEX IF NOT EXISTS board_staff_created_at_idx ON board_staff (created_at);
CREATE INDEX IF NOT EXISTS board_staff_active_sort_idx ON board_staff (is_active, sort_order);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_board_staff_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_board_staff_updated_at
  BEFORE UPDATE ON board_staff
  FOR EACH ROW
  EXECUTE FUNCTION update_board_staff_updated_at();