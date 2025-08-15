-- Add admin delete policy for listings
CREATE POLICY "Admins can delete all listings" 
ON public.listings 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));