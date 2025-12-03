/*
  # Fix Gallery Images RLS Policies

  1. Security Updates
    - Enable RLS on gallery_images table
    - Add comprehensive policies for authenticated users
    - Allow anonymous users to read active images only
    - Allow authenticated users full CRUD access

  2. Policy Details
    - Anonymous users: SELECT active images only
    - Authenticated users: Full access (SELECT, INSERT, UPDATE, DELETE)
*/

-- Enable RLS on gallery_images table
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anonymous users can read active gallery images" ON gallery_images;
DROP POLICY IF EXISTS "Authenticated users can read all gallery images" ON gallery_images;
DROP POLICY IF EXISTS "Authenticated users can insert gallery images" ON gallery_images;
DROP POLICY IF EXISTS "Authenticated users can update gallery images" ON gallery_images;
DROP POLICY IF EXISTS "Authenticated users can delete gallery images" ON gallery_images;

-- Create comprehensive RLS policies
CREATE POLICY "Anonymous users can read active gallery images"
  ON gallery_images
  FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Authenticated users can read all gallery images"
  ON gallery_images
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert gallery images"
  ON gallery_images
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update gallery images"
  ON gallery_images
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete gallery images"
  ON gallery_images
  FOR DELETE
  TO authenticated
  USING (true);