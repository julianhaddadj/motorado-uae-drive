-- Add phone contact fields to listings table
ALTER TABLE public.listings 
ADD COLUMN contact_phone_country_code text,
ADD COLUMN contact_phone_number text,
ADD COLUMN contact_phone_has_whatsapp boolean DEFAULT false;