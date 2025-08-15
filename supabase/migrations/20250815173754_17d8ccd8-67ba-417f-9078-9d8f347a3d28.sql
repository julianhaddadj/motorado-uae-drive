-- Add trim column back to listings table as optional text field
ALTER TABLE public.listings 
ADD COLUMN trim text;