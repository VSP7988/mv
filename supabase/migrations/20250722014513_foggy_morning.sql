/*
  # Fix RLS policies for banners table

  1. Security Updates
    - Add comprehensive RLS policies for all CRUD operations
    - Allow authenticated users to manage banners (admin functionality)
    - Allow anonymous users to read active banners (public display)
    
  2. Policies Added
    - INSERT policy for authenticated users
    - UPDATE policy for authenticated users  
    - DELETE policy for authenticated users
    - SELECT policy for anonymous users (active banners only)
    - SELECT policy for authenticated users (all banners)
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Authenticated users can manage banners" ON banners;
DROP POLICY IF EXISTS "Public users can read active banners" ON banners;

-- Create comprehensive RLS policies
CREATE POLICY "Authenticated users can insert banners"
  ON banners
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update banners"
  ON banners
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete banners"
  ON banners
  FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can read all banners"
  ON banners
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anonymous users can read active banners"
  ON banners
  FOR SELECT
  TO anon
  USING (is_active = true);