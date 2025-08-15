-- Add trims for Toyota FJ Cruiser
INSERT INTO trims (model_id, name) 
SELECT m.id, trim_name
FROM models m 
JOIN makes ma ON m.make_id = ma.id
CROSS JOIN (
    VALUES 
    ('Base'),
    ('Trail Teams Special Edition'),
    ('Rock Warrior'),
    ('TRD Special Edition'),
    ('Other')
) AS trim_values(trim_name)
WHERE ma.name = 'Toyota' AND m.name = 'FJ Cruiser';

-- Add more trims for other Toyota models that might be missing
-- Add trims for Toyota 4Runner
INSERT INTO trims (model_id, name) 
SELECT m.id, trim_name
FROM models m 
JOIN makes ma ON m.make_id = ma.id
CROSS JOIN (
    VALUES 
    ('SR5'),
    ('TRD Off-Road'),
    ('TRD Pro'),
    ('Limited'),
    ('Nightshade'),
    ('Other')
) AS trim_values(trim_name)
WHERE ma.name = 'Toyota' AND m.name = '4Runner'
ON CONFLICT DO NOTHING;

-- Add trims for Toyota Tundra
INSERT INTO trims (model_id, name) 
SELECT m.id, trim_name
FROM models m 
JOIN makes ma ON m.make_id = ma.id
CROSS JOIN (
    VALUES 
    ('SR'),
    ('SR5'),
    ('Limited'),
    ('Platinum'),
    ('TRD Pro'),
    ('1794'),
    ('Other')
) AS trim_values(trim_name)
WHERE ma.name = 'Toyota' AND m.name = 'Tundra'
ON CONFLICT DO NOTHING;

-- Add trims for Toyota Tacoma
INSERT INTO trims (model_id, name) 
SELECT m.id, trim_name
FROM models m 
JOIN makes ma ON m.make_id = ma.id
CROSS JOIN (
    VALUES 
    ('SR'),
    ('SR5'),
    ('TRD Sport'),
    ('TRD Off-Road'),
    ('TRD Pro'),
    ('Limited'),
    ('Other')
) AS trim_values(trim_name)
WHERE ma.name = 'Toyota' AND m.name = 'Tacoma'
ON CONFLICT DO NOTHING;