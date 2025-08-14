-- Insert remaining trim data with correct model names
INSERT INTO public.trims (model_id, name) VALUES
-- Lexus LX600 trims (corrected name)
((SELECT id FROM models WHERE name = 'LX600' AND make_id = (SELECT id FROM makes WHERE name = 'Lexus')), 'Signature'),
((SELECT id FROM models WHERE name = 'LX600' AND make_id = (SELECT id FROM makes WHERE name = 'Lexus')), 'F Sport'),
((SELECT id FROM models WHERE name = 'LX600' AND make_id = (SELECT id FROM makes WHERE name = 'Lexus')), 'VIP'),
((SELECT id FROM models WHERE name = 'LX600' AND make_id = (SELECT id FROM makes WHERE name = 'Lexus')), 'Other'),

-- Lexus LX570 trims (corrected name)
((SELECT id FROM models WHERE name = 'LX570' AND make_id = (SELECT id FROM makes WHERE name = 'Lexus')), 'Base'),
((SELECT id FROM models WHERE name = 'LX570' AND make_id = (SELECT id FROM makes WHERE name = 'Lexus')), 'Sport S'),
((SELECT id FROM models WHERE name = 'LX570' AND make_id = (SELECT id FROM makes WHERE name = 'Lexus')), 'Black Edition'),
((SELECT id FROM models WHERE name = 'LX570' AND make_id = (SELECT id FROM makes WHERE name = 'Lexus')), 'Other')

ON CONFLICT DO NOTHING;