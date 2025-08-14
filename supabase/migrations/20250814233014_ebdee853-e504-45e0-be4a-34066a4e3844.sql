-- Add more comprehensive trim data for popular models

-- BMW trims
INSERT INTO public.trims (model_id, name) VALUES
-- BMW 3-Series
((SELECT id FROM models WHERE name = '3-Series' AND make_id = (SELECT id FROM makes WHERE name = 'BMW')), '318i'),
((SELECT id FROM models WHERE name = '3-Series' AND make_id = (SELECT id FROM makes WHERE name = 'BMW')), '320i'),
((SELECT id FROM models WHERE name = '3-Series' AND make_id = (SELECT id FROM makes WHERE name = 'BMW')), '330i'),
((SELECT id FROM models WHERE name = '3-Series' AND make_id = (SELECT id FROM makes WHERE name = 'BMW')), 'M340i'),
((SELECT id FROM models WHERE name = '3-Series' AND make_id = (SELECT id FROM makes WHERE name = 'BMW')), 'Other'),

-- BMW X5
((SELECT id FROM models WHERE name = 'X5' AND make_id = (SELECT id FROM makes WHERE name = 'BMW')), 'xDrive40i'),
((SELECT id FROM models WHERE name = 'X5' AND make_id = (SELECT id FROM makes WHERE name = 'BMW')), 'xDrive50i'),
((SELECT id FROM models WHERE name = 'X5' AND make_id = (SELECT id FROM makes WHERE name = 'BMW')), 'M Sport'),
((SELECT id FROM models WHERE name = 'X5' AND make_id = (SELECT id FROM makes WHERE name = 'BMW')), 'Other'),

-- Mercedes-Benz G-Class
((SELECT id FROM models WHERE name = 'G-Class' AND make_id = (SELECT id FROM makes WHERE name = 'Mercedes-Benz')), 'G 500'),
((SELECT id FROM models WHERE name = 'G-Class' AND make_id = (SELECT id FROM makes WHERE name = 'Mercedes-Benz')), 'G 63 AMG'),
((SELECT id FROM models WHERE name = 'G-Class' AND make_id = (SELECT id FROM makes WHERE name = 'Mercedes-Benz')), 'Other'),

-- Mercedes-Benz S-Class
((SELECT id FROM models WHERE name = 'S-Class' AND make_id = (SELECT id FROM makes WHERE name = 'Mercedes-Benz')), 'S 450'),
((SELECT id FROM models WHERE name = 'S-Class' AND make_id = (SELECT id FROM makes WHERE name = 'Mercedes-Benz')), 'S 500'),
((SELECT id FROM models WHERE name = 'S-Class' AND make_id = (SELECT id FROM makes WHERE name = 'Mercedes-Benz')), 'Other'),

-- Porsche 911
((SELECT id FROM models WHERE name = '911' AND make_id = (SELECT id FROM makes WHERE name = 'Porsche')), 'Carrera'),
((SELECT id FROM models WHERE name = '911' AND make_id = (SELECT id FROM makes WHERE name = 'Porsche')), 'Carrera S'),
((SELECT id FROM models WHERE name = '911' AND make_id = (SELECT id FROM makes WHERE name = 'Porsche')), 'Turbo'),
((SELECT id FROM models WHERE name = '911' AND make_id = (SELECT id FROM makes WHERE name = 'Porsche')), 'GT3'),
((SELECT id FROM models WHERE name = '911' AND make_id = (SELECT id FROM makes WHERE name = 'Porsche')), 'Other'),

-- Porsche Cayenne
((SELECT id FROM models WHERE name = 'Cayenne' AND make_id = (SELECT id FROM makes WHERE name = 'Porsche')), 'Base'),
((SELECT id FROM models WHERE name = 'Cayenne' AND make_id = (SELECT id FROM makes WHERE name = 'Porsche')), 'S'),
((SELECT id FROM models WHERE name = 'Cayenne' AND make_id = (SELECT id FROM makes WHERE name = 'Porsche')), 'GTS'),
((SELECT id FROM models WHERE name = 'Cayenne' AND make_id = (SELECT id FROM makes WHERE name = 'Porsche')), 'Turbo'),
((SELECT id FROM models WHERE name = 'Cayenne' AND make_id = (SELECT id FROM makes WHERE name = 'Porsche')), 'Other'),

-- Land Rover Range Rover
((SELECT id FROM models WHERE name = 'Range Rover' AND make_id = (SELECT id FROM makes WHERE name = 'Land Rover')), 'SE'),
((SELECT id FROM models WHERE name = 'Range Rover' AND make_id = (SELECT id FROM makes WHERE name = 'Land Rover')), 'Autobiography'),
((SELECT id FROM models WHERE name = 'Range Rover' AND make_id = (SELECT id FROM makes WHERE name = 'Land Rover')), 'SV'),
((SELECT id FROM models WHERE name = 'Range Rover' AND make_id = (SELECT id FROM makes WHERE name = 'Land Rover')), 'Other'),

-- Honda Civic
((SELECT id FROM models WHERE name = 'Civic' AND make_id = (SELECT id FROM makes WHERE name = 'Honda')), 'LX'),
((SELECT id FROM models WHERE name = 'Civic' AND make_id = (SELECT id FROM makes WHERE name = 'Honda')), 'EX'),
((SELECT id FROM models WHERE name = 'Civic' AND make_id = (SELECT id FROM makes WHERE name = 'Honda')), 'Sport'),
((SELECT id FROM models WHERE name = 'Civic' AND make_id = (SELECT id FROM makes WHERE name = 'Honda')), 'Touring'),
((SELECT id FROM models WHERE name = 'Civic' AND make_id = (SELECT id FROM makes WHERE name = 'Honda')), 'Other'),

-- Honda Accord
((SELECT id FROM models WHERE name = 'Accord' AND make_id = (SELECT id FROM makes WHERE name = 'Honda')), 'LX'),
((SELECT id FROM models WHERE name = 'Accord' AND make_id = (SELECT id FROM makes WHERE name = 'Honda')), 'EX'),
((SELECT id FROM models WHERE name = 'Accord' AND make_id = (SELECT id FROM makes WHERE name = 'Honda')), 'Sport'),
((SELECT id FROM models WHERE name = 'Accord' AND make_id = (SELECT id FROM makes WHERE name = 'Honda')), 'Touring'),
((SELECT id FROM models WHERE name = 'Accord' AND make_id = (SELECT id FROM makes WHERE name = 'Honda')), 'Other')

ON CONFLICT DO NOTHING;