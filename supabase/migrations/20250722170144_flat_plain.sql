/*
  # Add indexes for gallery_images table performance optimization

  1. Performance Improvements
    - Add index on `is_active` column for efficient filtering
    - Add index on `sort_order` column for efficient ordering
    - Add composite index on `is_active, sort_order` for optimal query performance
    - Add index on `created_at` for timestamp-based queries

  2. Query Optimization
    - Prevents statement timeouts on gallery image queries
    - Improves performance for active image filtering
    - Optimizes sorting operations
*/

-- Add index on is_active column for efficient filtering
CREATE INDEX IF NOT EXISTS gallery_images_active_idx ON gallery_images (is_active);

-- Add index on sort_order column for efficient ordering
CREATE INDEX IF NOT EXISTS gallery_images_sort_order_idx ON gallery_images (sort_order);

-- Add composite index on is_active and sort_order for optimal query performance
CREATE INDEX IF NOT EXISTS gallery_images_active_sort_idx ON gallery_images (is_active, sort_order);

-- Add index on created_at for timestamp-based queries
CREATE INDEX IF NOT EXISTS gallery_images_created_at_idx ON gallery_images (created_at);

-- Add index on category for category-based filtering
CREATE INDEX IF NOT EXISTS gallery_images_category_idx ON gallery_images (category);