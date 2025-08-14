-- Insert remaining trim data (continuing from Toyota)

-- Nissan Patrol trims
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

-- Nissan Sunny trims
((SELECT id FROM models WHERE name = 'Sunny' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'S'),
((SELECT id FROM models WHERE name = 'Sunny' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'SV'),
((SELECT id FROM models WHERE name = 'Sunny' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'SL'),
((SELECT id FROM models WHERE name = 'Sunny' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'Other'),

-- Nissan X-Trail trims
((SELECT id FROM models WHERE name = 'X-Trail' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'S'),
((SELECT id FROM models WHERE name = 'X-Trail' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'SV'),
((SELECT id FROM models WHERE name = 'X-Trail' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'SL'),
((SELECT id FROM models WHERE name = 'X-Trail' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'Other'),

-- Nissan Pathfinder trims
((SELECT id FROM models WHERE name = 'Pathfinder' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'S'),
((SELECT id FROM models WHERE name = 'Pathfinder' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'SV'),
((SELECT id FROM models WHERE name = 'Pathfinder' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'SL'),
((SELECT id FROM models WHERE name = 'Pathfinder' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'Platinum'),
((SELECT id FROM models WHERE name = 'Pathfinder' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'Other'),

-- Nissan Kicks trims
((SELECT id FROM models WHERE name = 'Kicks' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'S'),
((SELECT id FROM models WHERE name = 'Kicks' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'SV'),
((SELECT id FROM models WHERE name = 'Kicks' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'SL'),
((SELECT id FROM models WHERE name = 'Kicks' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'Other'),

-- Nissan Armada trims
((SELECT id FROM models WHERE name = 'Armada' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'SL'),
((SELECT id FROM models WHERE name = 'Armada' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'Platinum'),
((SELECT id FROM models WHERE name = 'Armada' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'Other'),

-- Nissan Navara trims
((SELECT id FROM models WHERE name = 'Navara' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'Single Cab'),
((SELECT id FROM models WHERE name = 'Navara' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'Double Cab LE'),
((SELECT id FROM models WHERE name = 'Navara' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'PRO-4X'),
((SELECT id FROM models WHERE name = 'Navara' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'Other'),

-- Nissan GT-R trims
((SELECT id FROM models WHERE name = 'GT-R' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'Premium'),
((SELECT id FROM models WHERE name = 'GT-R' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'Track Edition'),
((SELECT id FROM models WHERE name = 'GT-R' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'NISMO'),
((SELECT id FROM models WHERE name = 'GT-R' AND make_id = (SELECT id FROM makes WHERE name = 'Nissan')), 'Other'),

-- Lexus LX 600 trims
((SELECT id FROM models WHERE name = 'LX 600' AND make_id = (SELECT id FROM makes WHERE name = 'Lexus')), 'Signature'),
((SELECT id FROM models WHERE name = 'LX 600' AND make_id = (SELECT id FROM makes WHERE name = 'Lexus')), 'F Sport'),
((SELECT id FROM models WHERE name = 'LX 600' AND make_id = (SELECT id FROM makes WHERE name = 'Lexus')), 'VIP'),
((SELECT id FROM models WHERE name = 'LX 600' AND make_id = (SELECT id FROM makes WHERE name = 'Lexus')), 'Other'),

-- Lexus LX 570 trims
((SELECT id FROM models WHERE name = 'LX 570' AND make_id = (SELECT id FROM makes WHERE name = 'Lexus')), 'Base'),
((SELECT id FROM models WHERE name = 'LX 570' AND make_id = (SELECT id FROM makes WHERE name = 'Lexus')), 'Sport S'),
((SELECT id FROM models WHERE name = 'LX 570' AND make_id = (SELECT id FROM makes WHERE name = 'Lexus')), 'Black Edition'),
((SELECT id FROM models WHERE name = 'LX 570' AND make_id = (SELECT id FROM makes WHERE name = 'Lexus')), 'Other'),

-- Lexus RX-Series trims
((SELECT id FROM models WHERE name = 'RX-Series' AND make_id = (SELECT id FROM makes WHERE name = 'Lexus')), 'Premium'),
((SELECT id FROM models WHERE name = 'RX-Series' AND make_id = (SELECT id FROM makes WHERE name = 'Lexus')), 'Luxury'),
((SELECT id FROM models WHERE name = 'RX-Series' AND make_id = (SELECT id FROM makes WHERE name = 'Lexus')), 'F Sport'),
((SELECT id FROM models WHERE name = 'RX-Series' AND make_id = (SELECT id FROM makes WHERE name = 'Lexus')), 'Other'),

-- Lexus NX-Series trims
((SELECT id FROM models WHERE name = 'NX-Series' AND make_id = (SELECT id FROM makes WHERE name = 'Lexus')), 'Premier'),
((SELECT id FROM models WHERE name = 'NX-Series' AND make_id = (SELECT id FROM makes WHERE name = 'Lexus')), 'Luxury'),
((SELECT id FROM models WHERE name = 'NX-Series' AND make_id = (SELECT id FROM makes WHERE name = 'Lexus')), 'F Sport'),
((SELECT id FROM models WHERE name = 'NX-Series' AND make_id = (SELECT id FROM makes WHERE name = 'Lexus')), 'Other'),

-- Lexus ES-Series trims
((SELECT id FROM models WHERE name = 'ES-Series' AND make_id = (SELECT id FROM makes WHERE name = 'Lexus')), 'Premier'),
((SELECT id FROM models WHERE name = 'ES-Series' AND make_id = (SELECT id FROM makes WHERE name = 'Lexus')), 'Excellence'),
((SELECT id FROM models WHERE name = 'ES-Series' AND make_id = (SELECT id FROM makes WHERE name = 'Lexus')), 'F Sport'),
((SELECT id FROM models WHERE name = 'ES-Series' AND make_id = (SELECT id FROM makes WHERE name = 'Lexus')), 'Other'),

-- Lexus GX 460 trims
((SELECT id FROM models WHERE name = 'GX 460' AND make_id = (SELECT id FROM makes WHERE name = 'Lexus')), 'Premium'),
((SELECT id FROM models WHERE name = 'GX 460' AND make_id = (SELECT id FROM makes WHERE name = 'Lexus')), 'Luxury'),
((SELECT id FROM models WHERE name = 'GX 460' AND make_id = (SELECT id FROM makes WHERE name = 'Lexus')), 'Black Line'),
((SELECT id FROM models WHERE name = 'GX 460' AND make_id = (SELECT id FROM makes WHERE name = 'Lexus')), 'Other'),

-- Lexus UX-Series trims
((SELECT id FROM models WHERE name = 'UX-Series' AND make_id = (SELECT id FROM makes WHERE name = 'Lexus')), 'UX 200'),
((SELECT id FROM models WHERE name = 'UX-Series' AND make_id = (SELECT id FROM makes WHERE name = 'Lexus')), 'F Sport'),
((SELECT id FROM models WHERE name = 'UX-Series' AND make_id = (SELECT id FROM makes WHERE name = 'Lexus')), 'Other');