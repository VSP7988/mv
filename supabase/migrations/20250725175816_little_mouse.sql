/*
  # Drop Board Staff and Gallery Tables

  1. Tables to Drop
    - `board_staff` - Board and staff member information
    - `gallery_images` - Gallery image management
  
  2. Security
    - Remove all RLS policies
    - Drop all indexes
    - Clean up completely

  3. Notes
    - This will permanently delete all board staff and gallery data
    - Make sure to backup any important data before running
*/

-- Drop board_staff table and all related objects
DROP TABLE IF EXISTS board_staff CASCADE;

-- Drop gallery_images table and all related objects  
DROP TABLE IF EXISTS gallery_images CASCADE;