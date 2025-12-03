/*
  # Remove unused tables and functions

  This migration removes the following tables and their associated functions:
  1. board_staff - Board and staff member information
  2. gallery_images - Gallery image management
  3. children_home_banners - Children home page banners

  ## Tables to be dropped
  - `board_staff`
  - `gallery_images` 
  - `children_home_banners`

  ## Security
  - All RLS policies will be automatically dropped with the tables
*/

-- Drop tables (this will also drop all associated policies, indexes, and constraints)
DROP TABLE IF EXISTS board_staff CASCADE;
DROP TABLE IF EXISTS gallery_images CASCADE;
DROP TABLE IF EXISTS children_home_banners CASCADE;