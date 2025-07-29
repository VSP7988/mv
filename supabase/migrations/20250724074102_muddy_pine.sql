/*
  # Create board_staff table

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
    - Add policies for authenticated users to manage board staff
    - Add policy for anonymous users to read active board staff
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

-- Policy for anonymous users to read active board staff
CREATE POLICY "Anonymous users can read active board staff"
  ON board_staff
  FOR SELECT
  TO anon
  USING (is_active = true);

-- Policy for authenticated users to read all board staff
CREATE POLICY "Authenticated users can read all board staff"
  ON board_staff
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy for authenticated users to insert board staff
CREATE POLICY "Authenticated users can insert board staff"
  ON board_staff
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy for authenticated users to update board staff
CREATE POLICY "Authenticated users can update board staff"
  ON board_staff
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy for authenticated users to delete board staff
CREATE POLICY "Authenticated users can delete board staff"
  ON board_staff
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_board_staff_active ON board_staff (is_active);
CREATE INDEX IF NOT EXISTS idx_board_staff_sort_order ON board_staff (sort_order);
CREATE INDEX IF NOT EXISTS idx_board_staff_active_order ON board_staff (is_active, sort_order);