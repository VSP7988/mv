/*
  # Create about_content table for homepage about section

  1. New Tables
    - `about_content`
      - `id` (uuid, primary key)
      - `image_url` (text, about section image)
      - `years_of_service` (integer, years of service)
      - `about_title` (text, about section title)
      - `about_text` (text, about section description)
      - `lives_impacted` (integer, lives impacted count)
      - `active_volunteers` (integer, active volunteers count)
      - `our_vision` (text, vision statement)
      - `our_mission` (text, mission statement)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `about_content` table
    - Add policies for authenticated users to manage content
    - Add policy for anonymous users to read content
*/

CREATE TABLE IF NOT EXISTS about_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  years_of_service integer DEFAULT 15,
  about_title text DEFAULT 'About MV Charities',
  about_text text NOT NULL,
  lives_impacted integer DEFAULT 500,
  active_volunteers integer DEFAULT 50,
  our_vision text NOT NULL,
  our_mission text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users (admins) to manage content
CREATE POLICY "Authenticated users can manage about content"
  ON about_content
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy for anonymous users to read content
CREATE POLICY "Anonymous users can read about content"
  ON about_content
  FOR SELECT
  TO anon
  USING (true);

-- Insert default content if table is empty
INSERT INTO about_content (
  image_url,
  years_of_service,
  about_title,
  about_text,
  lives_impacted,
  active_volunteers,
  our_vision,
  our_mission
) VALUES (
  'https://images.pexels.com/photos/6995326/pexels-photo-6995326.jpeg?auto=compress&cs=tinysrgb&w=800',
  15,
  'About MV Charities',
  'Maranatha Vimukthi Charities has been dedicated to serving our community for over 15 years. We believe in the power of compassion and collective action to transform lives and build stronger communities. Our comprehensive approach addresses multiple aspects of community welfare, from providing safe homes for children and elderly care to medical assistance and disaster relief. Every program we run is designed to create lasting, positive change.',
  500,
  50,
  'To create a world where every individual, regardless of age or circumstance, has access to basic necessities, dignity, and opportunities for growth. We envision communities where compassion drives action and no one is left behind.',
  'To provide comprehensive care and support services to children, elderly, and vulnerable community members through sustainable programs that promote health, education, and social welfare while fostering community engagement and volunteerism.'
) ON CONFLICT DO NOTHING;