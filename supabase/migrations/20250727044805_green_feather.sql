/*
  # Fix Relief Content RLS Policies

  1. Security Changes
    - Drop existing restrictive policies that block inserts
    - Create proper INSERT policy for authenticated users
    - Add comprehensive CRUD policies for all operations
    - Maintain security by allowing anonymous users only to read active content

  2. New Policy Structure
    - Anonymous users: Can only SELECT active relief content (is_active = true)
    - Authenticated users: Full CRUD access (INSERT, SELECT, UPDATE, DELETE)
    - INSERT policy: Uses WITH CHECK (true) to allow all authenticated inserts
    - UPDATE/DELETE policies: Use USING (true) for full access
*/

-- Drop existing policies that might be blocking inserts
DROP POLICY IF EXISTS "Anonymous users can read active relief content" ON relief_content;
DROP POLICY IF EXISTS "Authenticated users can delete relief content" ON relief_content;
DROP POLICY IF EXISTS "Authenticated users can insert relief content" ON relief_content;
DROP POLICY IF EXISTS "Authenticated users can read all relief content" ON relief_content;
DROP POLICY IF EXISTS "Authenticated users can update relief content" ON relief_content;

-- Create comprehensive RLS policies for relief_content table
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