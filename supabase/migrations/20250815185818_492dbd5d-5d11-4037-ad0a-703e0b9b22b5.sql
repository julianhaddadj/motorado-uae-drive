-- Change horsepower column from integer to text to store ranges like "300-399 HP"
ALTER TABLE public.listings 
ALTER COLUMN horsepower TYPE text;