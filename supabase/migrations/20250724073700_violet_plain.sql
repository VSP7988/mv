/*
  # Fix causes table RLS policy

  1. Security
    - Add missing INSERT policy for authenticated users on causes table
    - Allow authenticated users to insert new causes
    - Maintain existing SELECT, UPDATE, DELETE policies

  This fixes the RLS policy violation error when trying to create new causes.
*/

-- Add INSERT policy for authenticated users
CREATE POLICY "Authenticated users can insert causes"
  ON causes
  FOR INSERT
  TO authenticated
  WITH CHECK (true);