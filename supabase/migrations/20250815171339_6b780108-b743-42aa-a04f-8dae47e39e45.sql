-- Clean up duplicate trims first
DELETE FROM trims 
WHERE id NOT IN (
    SELECT DISTINCT ON (model_id, name) id 
    FROM trims 
    ORDER BY model_id, name, created_at
);

-- Add basic trims for major missing Toyota models
INSERT INTO trims (model_id, name) 
SELECT m.id, trim_name
FROM models m 
JOIN makes ma ON m.make_id = ma.id
CROSS JOIN (
    VALUES 
    ('Base'),
    ('LE'),
    ('XLE'),
    ('Limited'),
    ('Platinum'),
    ('Other')
) AS trim_values(trim_name)
WHERE ma.name = 'Toyota' AND m.name IN ('Avalon', 'Avanza', 'C-HR', 'Corolla Cross', 'Crown', 'Granvia', 'Hiace', 'Highlander', 'Innova', 'Land Cruiser 70', 'Land Cruiser 71', 'Land Cruiser 76 series', 'Land Cruiser 79 series', 'Prius', 'Raize', 'Rush', 'Sequoia', 'Sienna', 'Supra', 'Yaris', 'Coaster')
ON CONFLICT DO NOTHING;