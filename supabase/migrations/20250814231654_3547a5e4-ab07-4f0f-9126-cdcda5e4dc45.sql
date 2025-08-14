-- Create trims table
CREATE TABLE public.trims (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  model_id UUID NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.trims ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Trims are viewable by everyone" 
ON public.trims 
FOR SELECT 
USING (true);

-- Insert the trim data
INSERT INTO public.trims (model_id, name) VALUES
-- Toyota Land Cruiser trims
((SELECT id FROM models WHERE name = 'Land Cruiser' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'EXR'),
((SELECT id FROM models WHERE name = 'Land Cruiser' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'GXR'),
((SELECT id FROM models WHERE name = 'Land Cruiser' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'VXR'),
((SELECT id FROM models WHERE name = 'Land Cruiser' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'GR Sport'),
((SELECT id FROM models WHERE name = 'Land Cruiser' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Other'),

-- Toyota Prado trims
((SELECT id FROM models WHERE name = 'Prado' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'TXL'),
((SELECT id FROM models WHERE name = 'Prado' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'VXL'),
((SELECT id FROM models WHERE name = 'Prado' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'VX'),
((SELECT id FROM models WHERE name = 'Prado' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Other'),

-- Toyota Hilux trims
((SELECT id FROM models WHERE name = 'Hilux' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'S'),
((SELECT id FROM models WHERE name = 'Hilux' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'E'),
((SELECT id FROM models WHERE name = 'Hilux' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Adventure'),
((SELECT id FROM models WHERE name = 'Hilux' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'GR Sport'),
((SELECT id FROM models WHERE name = 'Hilux' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Other'),

-- Toyota Camry trims
((SELECT id FROM models WHERE name = 'Camry' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'LE'),
((SELECT id FROM models WHERE name = 'Camry' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'SE'),
((SELECT id FROM models WHERE name = 'Camry' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'XLE'),
((SELECT id FROM models WHERE name = 'Camry' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Sport'),
((SELECT id FROM models WHERE name = 'Camry' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Other'),

-- Toyota Corolla trims
((SELECT id FROM models WHERE name = 'Corolla' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'XLI'),
((SELECT id FROM models WHERE name = 'Corolla' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'GLI'),
((SELECT id FROM models WHERE name = 'Corolla' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'SE'),
((SELECT id FROM models WHERE name = 'Corolla' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Other'),

-- Toyota Rav 4 trims
((SELECT id FROM models WHERE name = 'Rav 4' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'LE'),
((SELECT id FROM models WHERE name = 'Rav 4' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'XLE'),
((SELECT id FROM models WHERE name = 'Rav 4' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Adventure'),
((SELECT id FROM models WHERE name = 'Rav 4' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Limited'),
((SELECT id FROM models WHERE name = 'Rav 4' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Other'),

-- Toyota Fortuner trims
((SELECT id FROM models WHERE name = 'Fortuner' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'EXR'),
((SELECT id FROM models WHERE name = 'Fortuner' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'GXR'),
((SELECT id FROM models WHERE name = 'Fortuner' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'VXR'),
((SELECT id FROM models WHERE name = 'Fortuner' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'GR-S'),
((SELECT id FROM models WHERE name = 'Fortuner' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Other'),

-- Toyota Hiace trims
((SELECT id FROM models WHERE name = 'Hiace' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Panel Van'),
((SELECT id FROM models WHERE name = 'Hiace' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Commuter'),
((SELECT id FROM models WHERE name = 'Hiace' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'GL'),
((SELECT id FROM models WHERE name = 'Hiace' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Other'),

-- Toyota Yaris trims
((SELECT id FROM models WHERE name = 'Yaris' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'E'),
((SELECT id FROM models WHERE name = 'Yaris' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'SE'),
((SELECT id FROM models WHERE name = 'Yaris' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Sport'),
((SELECT id FROM models WHERE name = 'Yaris' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Other'),

-- Toyota FJ Cruiser trims
((SELECT id FROM models WHERE name = 'FJ Cruiser' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Standard'),
((SELECT id FROM models WHERE name = 'FJ Cruiser' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Off-Road'),
((SELECT id FROM models WHERE name = 'FJ Cruiser' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Final Edition'),
((SELECT id FROM models WHERE name = 'FJ Cruiser' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Other'),

-- Toyota Tundra trims
((SELECT id FROM models WHERE name = 'Tundra' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'SR'),
((SELECT id FROM models WHERE name = 'Tundra' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'SR5'),
((SELECT id FROM models WHERE name = 'Tundra' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Limited'),
((SELECT id FROM models WHERE name = 'Tundra' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Platinum'),
((SELECT id FROM models WHERE name = 'Tundra' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Other'),

-- Toyota Corolla Cross trims
((SELECT id FROM models WHERE name = 'Corolla Cross' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'L'),
((SELECT id FROM models WHERE name = 'Corolla Cross' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'LE'),
((SELECT id FROM models WHERE name = 'Corolla Cross' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'XLE'),
((SELECT id FROM models WHERE name = 'Corolla Cross' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Other'),

-- Toyota Highlander trims
((SELECT id FROM models WHERE name = 'Highlander' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'LE'),
((SELECT id FROM models WHERE name = 'Highlander' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'XLE'),
((SELECT id FROM models WHERE name = 'Highlander' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Limited'),
((SELECT id FROM models WHERE name = 'Highlander' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Platinum'),
((SELECT id FROM models WHERE name = 'Highlander' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Other');