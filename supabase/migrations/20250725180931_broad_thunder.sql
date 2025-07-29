/*
  # Complete removal of Board & Staff and Gallery features

  1. Drop Tables
    - Drop `board_staff` table if exists
    - Drop `gallery_images` table if exists
  
  2. Clean up any related policies, indexes, or triggers
*/

-- Drop gallery_images table and all related objects
DROP TABLE IF EXISTS gallery_images CASCADE;

-- Drop board_staff table and all related objects  
DROP TABLE IF EXISTS board_staff CASCADE;

-- Remove any orphaned policies (cleanup)
DO $$
BEGIN
  -- Clean up any remaining policies for these tables
  DROP POLICY IF EXISTS "Anonymous users can read active board members" ON board_staff;
  DROP POLICY IF EXISTS "Authenticated users can manage board members" ON board_staff;
  DROP POLICY IF EXISTS "Anonymous users can read active gallery images" ON gallery_images;
  DROP POLICY IF EXISTS "Authenticated users can manage gallery images" ON gallery_images;
EXCEPTION
  WHEN undefined_table THEN
    -- Tables don't exist, which is fine
    NULL;
END $$;