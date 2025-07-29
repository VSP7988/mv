/*
  # Create Gallery Management System

  1. New Tables
    - `gallery_images`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text, optional)
      - `image_url` (text, required)
      - `category` (text, required)
      - `is_active` (boolean, default true)
      - `sort_order` (integer, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `gallery_images` table
    - Add policies for anonymous users to read active images
    - Add policies for authenticated users to manage all images

  3. Indexes
    - Index on is_active and sort_order for efficient querying
    - Index on category for filtering
    - Index on created_at for sorting
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

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_gallery_images_active_order 
  ON gallery_images (is_active, sort_order);

CREATE INDEX IF NOT EXISTS idx_gallery_images_category 
  ON gallery_images (category);

CREATE INDEX IF NOT EXISTS idx_gallery_images_created_at 
  ON gallery_images (created_at);

CREATE INDEX IF NOT EXISTS idx_gallery_images_is_active 
  ON gallery_images (is_active);

-- Add category constraint
ALTER TABLE gallery_images 
ADD CONSTRAINT gallery_images_category_check 
CHECK (category IN ('general', 'education', 'healthcare', 'eldercare', 'relief', 'events', 'volunteers', 'facilities'));