-- Add all missing trim data systematically

-- First, let's add Nissan Patrol trims
INSERT INTO public.trims (model_id, name) VALUES
((SELECT id FROM models WHERE name = 'Patrol' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'XE'),
((SELECT id FROM models WHERE name = 'Patrol' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'SE'),
((SELECT id FROM models WHERE name = 'Patrol' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'LE'),
((SELECT id FROM models WHERE name = 'Patrol' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'NISMO'),
((SELECT id FROM models WHERE name = 'Patrol' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'Platinum'),
((SELECT id FROM models WHERE name = 'Patrol' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'Other'),

-- Nissan Patrol Safari trims
((SELECT id FROM models WHERE name = 'Patrol Safari' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'Super Safari 3-Door'),
((SELECT id FROM models WHERE name = 'Patrol Safari' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'Super Safari 5-Door'),
((SELECT id FROM models WHERE name = 'Patrol Safari' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'Other'),

-- Nissan Altima trims
((SELECT id FROM models WHERE name = 'Altima' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'S'),
((SELECT id FROM models WHERE name = 'Altima' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'SV'),
((SELECT id FROM models WHERE name = 'Altima' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'SL'),
((SELECT id FROM models WHERE name = 'Altima' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'Sport'),
((SELECT id FROM models WHERE name = 'Altima' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'Other'),

-- Nissan GT-R trims
((SELECT id FROM models WHERE name = 'GT-R' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'Premium'),
((SELECT id FROM models WHERE name = 'GT-R' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'Track Edition'),
((SELECT id FROM models WHERE name = 'GT-R' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'NISMO'),
((SELECT id FROM models WHERE name = 'GT-R' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'Other'),

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
((SELECT id FROM models WHERE name = 'Fortuner' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Other')

ON CONFLICT DO NOTHING;