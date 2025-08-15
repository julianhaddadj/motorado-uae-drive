-- Drop the trims table completely
DROP TABLE IF EXISTS trims;

-- Remove trim column from listings table
ALTER TABLE listings DROP COLUMN IF EXISTS trim;