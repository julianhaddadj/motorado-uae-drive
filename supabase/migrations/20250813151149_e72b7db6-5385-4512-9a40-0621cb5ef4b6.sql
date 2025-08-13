-- Create makes table
CREATE TABLE public.makes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create models table
CREATE TABLE public.models (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  make_id UUID NOT NULL REFERENCES public.makes(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(make_id, name)
);

-- Enable RLS on both tables
ALTER TABLE public.makes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.models ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (everyone can view makes and models)
CREATE POLICY "Makes are viewable by everyone" 
ON public.makes 
FOR SELECT 
USING (true);

CREATE POLICY "Models are viewable by everyone" 
ON public.models 
FOR SELECT 
USING (true);