-- Add missing car specification fields to listings table
ALTER TABLE public.listings 
ADD COLUMN fuel_type TEXT,
ADD COLUMN exterior_color TEXT,
ADD COLUMN interior_color TEXT,
ADD COLUMN transmission TEXT,
ADD COLUMN horsepower INTEGER,
ADD COLUMN doors TEXT,
ADD COLUMN warranty TEXT,
ADD COLUMN steering_side TEXT,
ADD COLUMN insured_in_uae TEXT;