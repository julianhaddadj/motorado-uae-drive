-- Add seller type and dealership name fields to listings table
ALTER TABLE public.listings 
ADD COLUMN seller_type text NOT NULL DEFAULT 'Owner',
ADD COLUMN dealership_name text;

-- Add check constraint for seller_type values
ALTER TABLE public.listings 
ADD CONSTRAINT valid_seller_type CHECK (seller_type IN ('Owner', 'Dealership'));

-- Add check constraint to ensure dealership_name is required when seller_type is 'Dealership'
CREATE OR REPLACE FUNCTION validate_dealership_name()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.seller_type = 'Dealership' AND (NEW.dealership_name IS NULL OR LENGTH(TRIM(NEW.dealership_name)) = 0) THEN
    RAISE EXCEPTION 'Dealership name is required when seller type is Dealership';
  END IF;
  
  IF NEW.seller_type = 'Dealership' AND NEW.dealership_name IS NOT NULL THEN
    IF LENGTH(TRIM(NEW.dealership_name)) < 2 OR LENGTH(TRIM(NEW.dealership_name)) > 80 THEN
      RAISE EXCEPTION 'Dealership name must be between 2 and 80 characters';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for dealership name validation
CREATE TRIGGER validate_dealership_name_trigger
  BEFORE INSERT OR UPDATE ON public.listings
  FOR EACH ROW
  EXECUTE FUNCTION validate_dealership_name();