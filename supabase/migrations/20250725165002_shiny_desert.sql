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
    - Add policy for anonymous users to read active board members
    - Add policy for authenticated users to manage board members

  3. Indexes
    - Index on is_active for filtering
    - Index on sort_order for ordering
    - Composite index on is_active and sort_order for efficient queries
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
CREATE POLICY "Anonymous users can read active board members"
  ON board_staff
  FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Authenticated users can read all board members"
  ON board_staff
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert board members"
  ON board_staff
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update board members"
  ON board_staff
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete board members"
  ON board_staff
  FOR DELETE
  TO authenticated
  USING (true);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_board_staff_is_active 
  ON board_staff (is_active);

CREATE INDEX IF NOT EXISTS idx_board_staff_sort_order 
  ON board_staff (sort_order);

CREATE INDEX IF NOT EXISTS idx_board_staff_active_order 
  ON board_staff (is_active, sort_order);

CREATE INDEX IF NOT EXISTS board_staff_created_at_idx 
  ON board_staff (created_at);

CREATE INDEX IF NOT EXISTS board_staff_active_sort_idx 
  ON board_staff (is_active, sort_order);