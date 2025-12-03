/*
  # Add indexes for causes table

  1. Performance Optimization
    - Add index on `is_active` column for filtering active causes
    - Add index on `sort_order` column for sorting
    - Add composite index on `is_active` and `sort_order` for optimized queries
    - Add index on `created_at` for potential future sorting needs

  2. Query Optimization
    - These indexes will significantly speed up the query execution
    - Prevents statement timeout errors
    - Improves overall application performance
*/

-- Index for filtering by is_active
CREATE INDEX IF NOT EXISTS causes_active_idx ON causes (is_active);

-- Index for sorting by sort_order
CREATE INDEX IF NOT EXISTS causes_sort_order_idx ON causes (sort_order);

-- Composite index for the exact query pattern used (is_active = true ORDER BY sort_order)
CREATE INDEX IF NOT EXISTS causes_active_sort_idx ON causes (is_active, sort_order);

-- Index for created_at for potential future use
CREATE INDEX IF NOT EXISTS causes_created_at_idx ON causes (created_at);