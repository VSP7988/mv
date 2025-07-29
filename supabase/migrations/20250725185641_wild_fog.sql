/*
  # Fix Projects Table RLS Policies

  1. Security Updates
    - Drop existing restrictive policies
    - Add proper policies for authenticated users to manage projects
    - Allow anonymous users to read active projects only
    - Enable full CRUD operations for authenticated users

  2. Policy Details
    - Anonymous users: SELECT on active projects only
    - Authenticated users: Full CRUD (INSERT, SELECT, UPDATE, DELETE)
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anonymous users can read active projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can insert projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can read all projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can update projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can delete projects" ON projects;

-- Create new policies for projects table
CREATE POLICY "Anonymous users can read active projects"
  ON projects
  FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Authenticated users can insert projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read all projects"
  ON projects
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
  ON projects
  FOR DELETE
  TO authenticated
  USING (true);

-- Ensure RLS is enabled
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;