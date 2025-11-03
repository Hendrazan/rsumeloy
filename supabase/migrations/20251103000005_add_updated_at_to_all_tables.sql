-- Migration: Add updated_at column to all main tables
-- Created: 2025-11-03
-- Purpose: Fix error "record 'new' has no field 'updated_at'" across all tables

-- First, create or replace the set_updated_at function
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at to services table (CRITICAL - MCU is here!)
ALTER TABLE services 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

DROP TRIGGER IF EXISTS set_services_updated_at ON services;
CREATE TRIGGER set_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

-- Add updated_at to doctors table
ALTER TABLE doctors 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Drop trigger if exists, then recreate
DROP TRIGGER IF EXISTS set_doctors_updated_at ON doctors;
CREATE TRIGGER set_doctors_updated_at
  BEFORE UPDATE ON doctors
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

-- Add updated_at to facilities table
ALTER TABLE facilities 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

DROP TRIGGER IF EXISTS set_facilities_updated_at ON facilities;
CREATE TRIGGER set_facilities_updated_at
  BEFORE UPDATE ON facilities
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

-- Add updated_at to articles table
ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

DROP TRIGGER IF EXISTS set_articles_updated_at ON articles;
CREATE TRIGGER set_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

-- Add updated_at to partners table
ALTER TABLE partners 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

DROP TRIGGER IF EXISTS set_partners_updated_at ON partners;
CREATE TRIGGER set_partners_updated_at
  BEFORE UPDATE ON partners
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

-- Add updated_at to vacancies table
ALTER TABLE vacancies 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

DROP TRIGGER IF EXISTS set_vacancies_updated_at ON vacancies;
CREATE TRIGGER set_vacancies_updated_at
  BEFORE UPDATE ON vacancies
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

-- Add updated_at to info table
ALTER TABLE info 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

DROP TRIGGER IF EXISTS set_info_updated_at ON info;
CREATE TRIGGER set_info_updated_at
  BEFORE UPDATE ON info
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

-- Add updated_at to ai_assistant_config table
ALTER TABLE ai_assistant_config 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

DROP TRIGGER IF EXISTS set_ai_assistant_config_updated_at ON ai_assistant_config;
CREATE TRIGGER set_ai_assistant_config_updated_at
  BEFORE UPDATE ON ai_assistant_config
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

-- Add updated_at to page_notes table
ALTER TABLE page_notes 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

DROP TRIGGER IF EXISTS set_page_notes_updated_at ON page_notes;
CREATE TRIGGER set_page_notes_updated_at
  BEFORE UPDATE ON page_notes
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();
