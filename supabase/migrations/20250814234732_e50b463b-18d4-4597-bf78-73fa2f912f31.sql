-- Insert trims for key models starting with Toyota and Nissan
-- Toyota trims
INSERT INTO trims (model_id, name) VALUES
-- Toyota Land Cruiser
((SELECT id FROM models WHERE name = 'Land Cruiser' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'EXR'),
((SELECT id FROM models WHERE name = 'Land Cruiser' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'GXR'),
((SELECT id FROM models WHERE name = 'Land Cruiser' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'VXR'),
((SELECT id FROM models WHERE name = 'Land Cruiser' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'GR Sport'),
((SELECT id FROM models WHERE name = 'Land Cruiser' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Other'),

-- Toyota Prado
((SELECT id FROM models WHERE name = 'Prado' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'TX'),
((SELECT id FROM models WHERE name = 'Prado' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'TXL'),
((SELECT id FROM models WHERE name = 'Prado' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'VX'),
((SELECT id FROM models WHERE name = 'Prado' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'VXL'),
((SELECT id FROM models WHERE name = 'Prado' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Other'),

-- Toyota Hilux
((SELECT id FROM models WHERE name = 'Hilux' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'S'),
((SELECT id FROM models WHERE name = 'Hilux' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'E'),
((SELECT id FROM models WHERE name = 'Hilux' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Adventure'),
((SELECT id FROM models WHERE name = 'Hilux' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'GR Sport'),
((SELECT id FROM models WHERE name = 'Hilux' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Other'),

-- Toyota Rav 4
((SELECT id FROM models WHERE name = 'Rav 4' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'LE'),
((SELECT id FROM models WHERE name = 'Rav 4' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'XLE'),
((SELECT id FROM models WHERE name = 'Rav 4' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Adventure'),
((SELECT id FROM models WHERE name = 'Rav 4' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Limited'),
((SELECT id FROM models WHERE name = 'Rav 4' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Other'),

-- Toyota Corolla
((SELECT id FROM models WHERE name = 'Corolla' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'XLI'),
((SELECT id FROM models WHERE name = 'Corolla' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'GLI'),
((SELECT id FROM models WHERE name = 'Corolla' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'SE'),
((SELECT id FROM models WHERE name = 'Corolla' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'XSE'),
((SELECT id FROM models WHERE name = 'Corolla' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Other'),

-- Toyota Camry
((SELECT id FROM models WHERE name = 'Camry' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'S'),
((SELECT id FROM models WHERE name = 'Camry' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'SE'),
((SELECT id FROM models WHERE name = 'Camry' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'GLE'),
((SELECT id FROM models WHERE name = 'Camry' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'GLX'),
((SELECT id FROM models WHERE name = 'Camry' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Sport'),
((SELECT id FROM models WHERE name = 'Camry' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'XLE'),
((SELECT id FROM models WHERE name = 'Camry' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Other'),

-- Toyota Fortuner
((SELECT id FROM models WHERE name = 'Fortuner' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'EXR'),
((SELECT id FROM models WHERE name = 'Fortuner' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'GXR'),
((SELECT id FROM models WHERE name = 'Fortuner' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'VXR'),
((SELECT id FROM models WHERE name = 'Fortuner' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'GR-S'),
((SELECT id FROM models WHERE name = 'Fortuner' AND make_id = (SELECT id FROM makes WHERE name = 'Toyota')), 'Other'),

-- Nissan Patrol
((SELECT id FROM models WHERE name = 'Patrol' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'XE'),
((SELECT id FROM models WHERE name = 'Patrol' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'SE T1'),
((SELECT id FROM models WHERE name = 'Patrol' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'SE T2'),
((SELECT id FROM models WHERE name = 'Patrol' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'SE Platinum'),
((SELECT id FROM models WHERE name = 'Patrol' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'LE T1'),
((SELECT id FROM models WHERE name = 'Patrol' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'LE T2'),
((SELECT id FROM models WHERE name = 'Patrol' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'LE Platinum City'),
((SELECT id FROM models WHERE name = 'Patrol' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'NISMO'),
((SELECT id FROM models WHERE name = 'Patrol' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'Other'),

-- Nissan Patrol Safari
((SELECT id FROM models WHERE name = 'Patrol Safari' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'Super Safari 3-Door'),
((SELECT id FROM models WHERE name = 'Patrol Safari' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'Super Safari 5-Door'),
((SELECT id FROM models WHERE name = 'Patrol Safari' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'Other'),

-- Nissan Altima
((SELECT id FROM models WHERE name = 'Altima' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'S'),
((SELECT id FROM models WHERE name = 'Altima' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'SV'),
((SELECT id FROM models WHERE name = 'Altima' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'SL'),
((SELECT id FROM models WHERE name = 'Altima' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'Sport'),
((SELECT id FROM models WHERE name = 'Altima' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'Other'),

-- Nissan GT-R
((SELECT id FROM models WHERE name = 'GT-R' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'Premium'),
((SELECT id FROM models WHERE name = 'GT-R' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'Track Edition'),
((SELECT id FROM models WHERE name = 'GT-R' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'NISMO'),
((SELECT id FROM models WHERE name = 'GT-R' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'Other');