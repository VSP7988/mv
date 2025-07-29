/*
  # Fix Certifications Table RLS Policies

  1. Security Updates
    - Drop existing restrictive policies that block inserts
    - Add proper INSERT policy for authenticated users
    - Add comprehensive CRUD policies for authenticated users
    - Maintain security by allowing anonymous users only to read active certifications

  2. Policy Structure
    - Anonymous users: Can only SELECT active certifications (is_active = true)
    - Authenticated users: Full CRUD access (INSERT, SELECT, UPDATE, DELETE)
*/

-- Drop existing policies that might be blocking operations
DROP POLICY IF EXISTS "Anonymous users can read active certifications" ON certifications;
DROP POLICY IF EXISTS "Authenticated users can insert certifications" ON certifications;
DROP POLICY IF EXISTS "Authenticated users can read all certifications" ON certifications;
DROP POLICY IF EXISTS "Authenticated users can update certifications" ON certifications;
DROP POLICY IF EXISTS "Authenticated users can delete certifications" ON certifications;

-- Create comprehensive RLS policies for certifications table
CREATE POLICY "Anonymous users can read active certifications"
  ON certifications
  FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Authenticated users can insert certifications"
  ON certifications
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read all certifications"
  ON certifications
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update certifications"
  ON certifications
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete certifications"
  ON certifications
  FOR DELETE
  TO authenticated
  USING (true);

-- Ensure RLS is enabled
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;