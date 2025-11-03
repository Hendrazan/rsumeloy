-- Migration: Update vacancies table to support rich text description and image
-- Created: 2025-11-03

-- Add image_public_id column to vacancies table
ALTER TABLE vacancies 
ADD COLUMN IF NOT EXISTS image_public_id TEXT;

-- Update description column to TEXT type (for rich HTML content)
-- Note: If the column already exists, this will change its type
ALTER TABLE vacancies 
ALTER COLUMN description TYPE TEXT;

-- Add comment to the new column
COMMENT ON COLUMN vacancies.image_public_id IS 'Cloudinary public ID for vacancy image (optional)';
COMMENT ON COLUMN vacancies.description IS 'Rich text HTML description of the job vacancy';

-- Index for faster queries (optional, only if you expect many vacancies)
CREATE INDEX IF NOT EXISTS idx_vacancies_deadline ON vacancies(deadline);
CREATE INDEX IF NOT EXISTS idx_vacancies_created_at ON vacancies(created_at);
