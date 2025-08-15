-- Add trims for Porsche Cayman
INSERT INTO trims (model_id, name) 
SELECT m.id, trim_name
FROM models m 
JOIN makes ma ON m.make_id = ma.id
CROSS JOIN (
    VALUES 
    ('Base'),
    ('S'),
    ('GTS'),
    ('GT4'),
    ('718'),
    ('Other')
) AS trim_values(trim_name)
WHERE ma.name = 'Porsche' AND m.name = 'Cayman'
ON CONFLICT DO NOTHING;

-- Update the existing listing to use correct Porsche and Cayman IDs
UPDATE listings 
SET 
    make = (SELECT id FROM makes WHERE name = 'Porsche'),
    model = (SELECT m.id FROM models m JOIN makes ma ON m.make_id = ma.id WHERE ma.name = 'Porsche' AND m.name = 'Cayman'),
    trim = (SELECT t.id FROM trims t JOIN models m ON t.model_id = m.id JOIN makes ma ON m.make_id = ma.id WHERE ma.name = 'Porsche' AND m.name = 'Cayman' AND t.name = 'S')
WHERE id = '3c9e76f7-078a-4640-be55-cd4277fd426c';