/*
  # Update projects table structure

  1. Changes
    - Remove sort_order column as it's no longer needed
    - Keep existing data intact
    - Update any indexes that reference sort_order

  2. Security
    - Maintain existing RLS policies
    - Keep all existing permissions
*/

-- Remove sort_order column
ALTER TABLE projects DROP COLUMN IF EXISTS sort_order;

-- Update any indexes that might reference sort_order
DROP INDEX IF EXISTS projects_sort_order_idx;
DROP INDEX IF EXISTS projects_active_sort_idx;

-- Recreate active projects index without sort_order
CREATE INDEX IF NOT EXISTS projects_active_idx ON projects (is_active);
CREATE INDEX IF NOT EXISTS projects_status_idx ON projects (project_status);
CREATE INDEX IF NOT EXISTS projects_category_idx ON projects (category_name);
CREATE INDEX IF NOT EXISTS projects_created_at_idx ON projects (created_at);