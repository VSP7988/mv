/*
  # Create Children Home Banners Table

  1. New Tables
    - `children_home_banners`
      - `id` (uuid, primary key)
      - `title` (text, optional)
      - `subtitle` (text, optional)
      - `image_url` (text, required)
      - `position` (text, default 'left', check constraint)
      - `is_active` (boolean, default true)
      - `sort_order` (integer, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `children_home_banners` table
    - Add policy for anonymous users to read active banners
    - Add policies for authenticated users to manage banners

  3. Indexes
    - Index on active status and sort order for performance
    - Index on created_at for sorting
*/

CREATE TABLE IF NOT EXISTS children_home_banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  subtitle text,
  image_url text NOT NULL,
  position text NOT NULL DEFAULT 'left',
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add check constraint for position values
ALTER TABLE children_home_banners 
ADD CONSTRAINT children_home_banners_position_check 
CHECK (position = ANY (ARRAY['left'::text, 'center'::text, 'right'::text]));

-- Enable Row Level Security
ALTER TABLE children_home_banners ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anonymous users can read active children home banners"
  ON children_home_banners
  FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Authenticated users can read all children home banners"
  ON children_home_banners
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert children home banners"
  ON children_home_banners
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update children home banners"
  ON children_home_banners
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete children home banners"
  ON children_home_banners
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX children_home_banners_active_sort_idx 
ON children_home_banners (is_active, sort_order);

CREATE INDEX children_home_banners_created_at_idx 
ON children_home_banners (created_at);