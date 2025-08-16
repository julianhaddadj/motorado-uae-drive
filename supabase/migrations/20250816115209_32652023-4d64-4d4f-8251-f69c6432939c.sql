-- Add missing body types to the enum
ALTER TYPE body_type ADD VALUE IF NOT EXISTS 'Sports Car';
ALTER TYPE body_type ADD VALUE IF NOT EXISTS 'Hard Top Convertible';
ALTER TYPE body_type ADD VALUE IF NOT EXISTS 'Soft Top Convertible';
ALTER TYPE body_type ADD VALUE IF NOT EXISTS 'Pick Up Truck';
ALTER TYPE body_type ADD VALUE IF NOT EXISTS 'Utility Truck';
ALTER TYPE body_type ADD VALUE IF NOT EXISTS 'Van';