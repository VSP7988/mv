/*
  # Create Projects Management System

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text, required)
      - `category_name` (text, required)
      - `project_status` (text, required - ongoing, completed, planning)
      - `image_url` (text, required)
      - `is_active` (boolean, default true)
      - `sort_order` (integer, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `projects` table
    - Add policies for anonymous users to read active projects
    - Add policies for authenticated users to manage all projects

  3. Indexes
    - Index on is_active for filtering
    - Index on sort_order for ordering
    - Combined index on is_active and sort_order for efficient queries
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category_name text NOT NULL,
  project_status text NOT NULL CHECK (project_status IN ('ongoing', 'completed', 'planning')),
  image_url text NOT NULL,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policies for anonymous users (read active projects only)
CREATE POLICY "Anonymous users can read active projects"
  ON projects
  FOR SELECT
  TO anon
  USING (is_active = true);

-- Policies for authenticated users (full access)
CREATE POLICY "Authenticated users can read all projects"
  ON projects
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

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

-- Indexes for performance
CREATE INDEX IF NOT EXISTS projects_active_idx ON projects (is_active);
CREATE INDEX IF NOT EXISTS projects_sort_order_idx ON projects (sort_order);
CREATE INDEX IF NOT EXISTS projects_active_sort_idx ON projects (is_active, sort_order);
CREATE INDEX IF NOT EXISTS projects_status_idx ON projects (project_status);
CREATE INDEX IF NOT EXISTS projects_category_idx ON projects (category_name);
CREATE INDEX IF NOT EXISTS projects_created_at_idx ON projects (created_at);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();