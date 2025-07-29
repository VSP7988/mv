/*
  # Create gallery_images table

  1. New Tables
    - `gallery_images`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text, optional)
      - `image_url` (text, required)
      - `category` (text, required, default 'general')
      - `is_active` (boolean, default true)
      - `sort_order` (integer, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `gallery_images` table
    - Add policy for anonymous users to read active gallery images
    - Add policy for authenticated users to manage all gallery images

  3. Indexes
    - Index on active status and sort order for efficient querying
    - Index on category for filtering
    - Index on created_at for chronological sorting
*/

CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anonymous users can read active gallery images"
  ON gallery_images
  FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage gallery images"
  ON gallery_images
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS gallery_images_active_sort_idx 
  ON gallery_images (is_active, sort_order);

CREATE INDEX IF NOT EXISTS gallery_images_category_idx 
  ON gallery_images (category);

CREATE INDEX IF NOT EXISTS gallery_images_created_at_idx 
  ON gallery_images (created_at);

-- Add constraint for category values
ALTER TABLE gallery_images 
ADD CONSTRAINT gallery_images_category_check 
CHECK (category IN ('general', 'events', 'programs', 'facilities', 'community'));