-- Migration: Add updated_at column to services table
-- Created: 2025-11-03
-- Purpose: Fix error "record 'new' has no field 'updated_at'" when updating services

-- First, create or replace the set_updated_at function
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at column to services table
ALTER TABLE services 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Drop trigger if exists, then create
DROP TRIGGER IF EXISTS set_services_updated_at ON services;
CREATE TRIGGER set_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();
