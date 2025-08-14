-- Clear all existing data
DELETE FROM listings;
DELETE FROM models;
DELETE FROM makes;

-- Insert makes
INSERT INTO makes (name) VALUES
('Audi'),
('BMW'),
('Bentley'),
('BYD'),
('Cadillac'),
('Chevrolet'),
('Dodge'),
('Ferrari'),
('Ford'),
('GAC'),
('GMC'),
('Honda'),
('Hyundai'),
('Infiniti'),
('Jaguar'),
('Jeep'),
('Jetour'),
('Kia'),
('Land Rover'),
('Lexus'),
('Lincoln'),
('Maserati'),
('Mazda'),
('Mercedes-Benz'),
('MG'),
('MINI'),
('Mitsubishi'),
('Nissan'),
('Peugeot'),
('Porsche'),
('Renault'),
('Rolls-Royce'),
('Rox'),
('Suzuki'),
('Tesla'),
('Toyota'),
('Volkswagen'),
('Volvo');

-- Insert models with their relationships
-- Audi models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['Q5', 'Q7', 'A3', 'A8', 'A6', 'Q8', 'Q4', 'A4', 'A5', 'Q3', 'S3/RS3', 'RS Q8', 'S7/RS7', 'S6/RS6', 'TT', 'A7', 'R8', 'SQ5', 'S5/RS5', 'e-tron', 'S3', 'S8', 'RSQ3', 'S4/RS4', 'SQ8', 'Q2', 'A1', 'S5', 'RS e-tron', 'SQ7'])
FROM makes WHERE name = 'Audi';

-- BMW models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['X5', '5-Series', 'X6', '7-Series', '3-Series', '4-Series', 'X7', '2-Series', 'X4', 'X1', 'M4', 'X3', 'X2', 'M5', '6-Series', '8-Series', '1-Series', 'M3', 'Z4', 'XM', 'iX', 'M8', 'M2', 'iX1', 'i5', 'i4', 'iX3', 'i3', 'M6', 'i7', 'i8', 'iX2', 'M1', 'Z3', 'Z8'])
FROM makes WHERE name = 'BMW';

-- Bentley models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['Continental', 'Bentayga', 'Flying Spur', 'Mulsanne', 'Arnage', 'Other', 'Azure', 'Brooklands'])
FROM makes WHERE name = 'Bentley';

-- BYD models (removing duplicate SEALION)
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['Leopard 8', 'Leopard 5', 'Song Plus', 'Leopard Titanium 3', 'HAN', 'Leopard', 'Song L', 'Seal', 'Qin L', 'e2', 'Tang', 'Qin Plus', 'ATTO 3', 'Seagull', 'Song Pro', 'Yuan up', 'SEALION', 'BYD', 'Destroyer 05', 'Dolphin', 'Other', 'XIA'])
FROM makes WHERE name = 'BYD';

-- Cadillac models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['Escalade', 'ATS', 'CT5', 'XT4', 'SRX', 'XT5', 'CT4', 'CT6', 'XT6', 'CT5/Catera', 'XTR/Eldorado', 'DTS/DeVille', 'STS/Seville', 'XTS'])
FROM makes WHERE name = 'Cadillac';

-- Chevrolet models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['Captiva', 'Camaro', 'Tahoe', 'Corvette', 'Silverado', 'Malibu', 'Cruze', 'Groove', 'Traverse', 'Spark', 'Suburban', 'Trax', 'Blazer', 'Trailblazer', 'Equinox', 'Impala', 'Aveo', 'Camaro Convertible', 'Express', 'Lumina', 'Sonic', 'Avalanche', 'Caprice', 'Epica', 'Other', 'Bolt', 'Monza', 'Pickup'])
FROM makes WHERE name = 'Chevrolet';

-- Dodge models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['Charger', 'Challenger', 'Ram', 'Durango', 'Nitro', 'Caravan', 'Neon', 'Viper', 'Magnum', 'Van'])
FROM makes WHERE name = 'Dodge';

-- Ferrari models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['Purosangue', 'SF90 Spider', 'SF90 Stradale', '812 GTS', 'Roma', '296 GTB', '296 GTS', '488 Pista', 'F8 Spider', '812', 'F8 Tributo', 'Portofino', '488 GTB', '488 Pista Spider', '12i Cilindri', 'GTC4 Lusso', '360', '458 Italia', '488 Spider', '812 Superfast', 'California T', 'F430', '458 Spider', '612 Scaglietti', 'California', 'GTC4 Lusso T', '488', 'F12', 'LaFerrari', 'Other', '512', 'F12 Berlinetta', 'Testarossa', '599 GTB', 'Daytona', 'FF', 'La Ferrari Aperta', '246 Dino', '348', '355', '412', '430', '458', '458 Speciale', 'Ferrari 456', 'Monza', 'Super America'])
FROM makes WHERE name = 'Ferrari';

-- Ford models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['Mustang', 'Explorer', 'Edge', 'F-Series Pickup', 'Escape', 'Ecosport', 'Focus', 'Bronco', 'Ranger', 'Figo', 'Expedition', 'Territory', 'F-Series', 'Transit', 'Fusion', 'Everest', 'Taurus', 'GT', 'Fiesta', 'Shelby Cobra', 'Escort', 'Mustang Mach-E', 'Pickup', 'Crown Victoria', 'Flex', 'Other', 'Super Duty', 'Tourneo', 'Van'])
FROM makes WHERE name = 'Ford';

-- GAC models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['GS8', 'GS3', 'EMKOO', 'EMPOW', 'Aion Hyper', 'GA4', 'EMZOOM', 'GA8', 'GN6', 'GN8', 'GS5', 'Other', 'GA6', 'M8', 'S7', 'Aion Y'])
FROM makes WHERE name = 'GAC';

-- GMC models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['Yukon', 'Sierra', 'Terrain', 'Acadia', 'Hummer', 'Savana', 'Pickup', 'Canyon', 'Other'])
FROM makes WHERE name = 'GMC';

-- Honda models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['Accord', 'Civic', 'CR-V', 'City', 'HR-V', 'Odyssey', 'Pilot', 'ZR-V', 'Jazz', 'MR-V', 'S2000', 'Crosstour', 'ENP2', 'ENS1'])
FROM makes WHERE name = 'Honda';

-- Hyundai models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['Tucson', 'Elantra', 'Sonata', 'Santa Fe', 'Accent', 'Creta', 'Palisade', 'Staria', 'H1', 'Veloster', 'Kona', 'Azera', 'Grand i10', 'Venue', 'i10', 'Genesis', 'Grand Santa Fe', 'i30', 'Avante', 'Grandeur', 'Porter', 'Stargazer', 'Centennial', 'H 100', 'i20', 'Ioniq', 'Santa Cruz', 'Terracan'])
FROM makes WHERE name = 'Hyundai';

-- Infiniti models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['QX50', 'QX80', 'Q50', 'QX70', 'QX60', 'QX55', 'FX45/FX35', 'Q30', 'JX-Series', 'Q70', 'G25', 'EX35', 'G37', 'Q60', 'QX30', 'QX56', 'M-Series', 'FX50', 'G35', 'Q45'])
FROM makes WHERE name = 'Infiniti';

-- Jaguar models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['F-Pace', 'XF', 'E-Pace', 'F-Type', 'XE', 'XJ', 'XJ-Series', 'XKR', 'XK', 'I-Pace', 'S-Type', 'E-Type', 'XJS'])
FROM makes WHERE name = 'Jaguar';

-- Jeep models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['Wrangler', 'Grand Cherokee', 'Wrangler Unlimited', 'Cherokee', 'Grand Cherokee L', 'Compass', 'Grand Wagoneer', 'Gladiator', 'Renegade', 'Wrangler 4xe', 'Commander', 'Other', 'Patriot'])
FROM makes WHERE name = 'Jeep';

-- Jetour models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['T2', 'Dashing', 'T1', 'X70 Plus', 'X70', 'X90 Plus', 'X50', 'T2-4DM', 'X70 FL', 'X70 S'])
FROM makes WHERE name = 'Jetour';

-- Kia models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['Sportage', 'Seltos', 'Sorento', 'Carnival', 'Pegas', 'Optima', 'K5', 'Rio', 'Cerato', 'Picanto', 'Telluride', 'K3', 'Soul', 'Sonet', 'Forte', 'Sedona', 'Cadenza', 'Stinger', 'K8', 'Bongo', 'Carens', 'Mohave', 'Morning', 'K5 HEV', 'KX1', 'Quoris', 'Ray'])
FROM makes WHERE name = 'Kia';

-- Land Rover models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['Range Rover', 'Range Rover Sport', 'Defender', 'Range Rover Evoque', 'Range Rover Velar', 'Discovery Sport', 'Discovery', 'LR4', 'LR2', 'LR3'])
FROM makes WHERE name = 'Land Rover';

-- Lexus models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['RX-Series', 'IS-Series', 'LX600', 'NX-Series', 'ES-Series', 'GX 460', 'LX570', 'LS-Series', 'GS-Series', 'LX-Series', 'UX 200', 'LM 350h', 'LC 500', 'ES HYBRID', 'UX-Series', 'RC F', 'TX', 'GX 470', 'GX 550', 'LM 300', 'RC', 'CT-Series', 'LFA', 'SC-Series'])
FROM makes WHERE name = 'Lexus';

-- Lincoln models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['Navigator', 'Aviator', 'MKX', 'Nautilus', 'MKC', 'Corsair', 'Continental', 'MKS', 'MKZ', 'MKT', 'Town Car'])
FROM makes WHERE name = 'Lincoln';

-- Maserati models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['Ghibli', 'Levante', 'Grecale', 'Quattroporte', 'GranTurismo', 'MC20', 'GranCabrio', '4200', 'Spyder'])
FROM makes WHERE name = 'Maserati';

-- Mazda models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['CX-5', '6', 'CX-9', '3', 'CX-3', 'CX-30', '2', 'MX-5', '3 Hatchback', 'CX-60', 'CX-90', 'CX-7', 'Pickup'])
FROM makes WHERE name = 'Mazda';

-- Mercedes-Benz models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['G-Class', 'S-Class', 'C-Class', 'E-Class', 'A-Class', 'CLA', 'AMG', 'GLE Coupe', 'GLE-Class', 'GLC', 'V-Class', 'SL-Class', 'CLS-Class', 'GLS-Class', 'GLC Coupe', 'G-Class Brabus', 'GLA', 'GL-Class', 'GLB', 'EQS', 'EQE', 'GLK-Class', 'CLE-Class', 'Sprinter', 'M-Class', 'SLK-Class', 'C 63 AMG', 'Vito', 'CL-Class', 'C 43 AMG', 'EQC', 'SLC', 'Viano', 'EQB', 'SLS', 'CLK-Class', 'EQA', 'GLC 63', 'SLR', 'SEL-Class', 'Other', '190', '240/260/280', 'EQG', 'R-Class', 'Vito Tourer', 'X Class', 'CLC', 'SEC-Class', '220 SE', '300/350/380', 'Vito Panel Vans'])
FROM makes WHERE name = 'Mercedes-Benz';

-- MG models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['MG5', 'ZS', 'RX5', 'GT', 'HS', 'RX8', 'One', 'MG 7', 'GS', 'ZST', '6', 'Other', 'Whale', 'MG3', 'MG350', 'MG6', 'MGB', 'RX9'])
FROM makes WHERE name = 'MG';

-- MINI models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['Cooper', 'Countryman', 'Clubman', 'Coupe', 'Paceman', 'Aceman', 'Cooper Clubman', 'Roadster'])
FROM makes WHERE name = 'MINI';

-- Mitsubishi models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['Pajero', 'Attrage', 'L200', 'ASX', 'Montero Sport', 'Outlander', 'Canter', 'Lancer', 'Xpander', 'Lancer EX', 'Eclipse Cross', 'Mirage', 'Other', 'Pajero Sport', 'Xpander Cross', 'Galant', 'Van', 'Evolution', 'Grandis', '3000GT', 'Eclipse'])
FROM makes WHERE name = 'Mitsubishi';

-- Nissan models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['Patrol', 'Altima', 'Sunny', 'X-Trail', 'Kicks', 'Pathfinder', 'Sentra', 'Xterra', 'Armada', 'Urvan', 'Tiida', 'Maxima', 'Juke', 'Navara', 'Patrol Safari', 'Rogue', 'Micra', 'Murano', 'GT-R', 'Skyline', 'Versa', '370z', 'Qashqai', 'Super Safari', 'Pickup', 'Sylphy', 'Titan', 'Z', '350Z', 'Quest', 'Silvia', '400Z', 'Magnite', 'Patrol Pickup', 'Van'])
FROM makes WHERE name = 'Nissan';

-- Peugeot models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['3008', 'Partner', 'Expert', '308', '2008', '208', '5008', 'Landtrek', '301', '508', 'Boxer', 'RCZ', '207', '408', 'Traveller', '206', '307', 'e-2008', 'iOn'])
FROM makes WHERE name = 'Peugeot';

-- Porsche models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['Carrera / 911', 'Cayenne', 'Macan', 'Panamera', 'Cayman', 'Boxster', 'Taycan', '911', '718 Spyder', '918 Spyder', '928', '944', '968'])
FROM makes WHERE name = 'Porsche';

-- Renault models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['Duster', 'Koleos', 'Megane', 'Symbol', 'Captur', 'Dokker', 'Fluence', 'Master', 'Express Van', 'Other', 'Talisman', 'Alpine A110', 'Arkana', 'Clio', 'Safrane', 'Samsung', 'Zoe'])
FROM makes WHERE name = 'Renault';

-- Rolls-Royce models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['Cullinan', 'Ghost', 'Wraith', 'Phantom', 'Spectre', 'Dawn'])
FROM makes WHERE name = 'Rolls-Royce';

-- Rox models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['01'])
FROM makes WHERE name = 'Rox';

-- Suzuki models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['Jimny', 'Swift', 'Ciaz', 'Dzire', 'Baleno', 'Grand Vitara', 'Ertiga', 'Fronx', 'Vitara', 'Celerio', 'APV Van', 'SX4', 'Eeco', 'Kizashi'])
FROM makes WHERE name = 'Suzuki';

-- Tesla models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['Model 3', 'Model Y', 'Model X', 'Cybertruck', 'Model S'])
FROM makes WHERE name = 'Tesla';

-- Toyota models (removing duplicate Fortuner)
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['Land Cruiser', 'Prado', 'Hilux', 'Rav 4', 'Corolla', 'Yaris', 'Camry', 'Fortuner', 'Hiace', 'Highlander', 'FJ Cruiser', 'Corolla Cross', 'Rush', 'Land Cruiser 76 series', 'Tundra', 'Land Cruiser 79 series', 'C-HR', 'Land Cruiser 70', 'Coaster', '4Runner', 'Sienna', 'Raize', 'Avanza', 'Granvia', 'Innova', 'Tacoma', 'Land Cruiser 71', 'Sequoia', 'Supra', 'Crown', 'Prius', 'Avalon', 'Veloz', 'Levin', 'Pickup', 'Previa', 'Urban Cruiser', 'Alphard', '86', 'BZ4X', 'Cither', 'Venza', 'bZ3', 'GR86', 'Aurion', 'Cressida', 'MR2', 'Rumion', 'Wish', 'Zelas'])
FROM makes WHERE name = 'Toyota';

-- Volkswagen models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['Golf', 'Tiguan', 'Teramont', 'Touareg', 'Passat', 'T-Roc', 'ID.4', 'Jetta', 'Beetle', 'ID.6', 'CC', 'Scirocco', 'Polo', 'Transporter', 'Amarok', 'Arteon', 'Atlas', 'Crafter', 'Eos', 'ID.7', 'Multivan'])
FROM makes WHERE name = 'Volkswagen';

-- Volvo models
INSERT INTO models (make_id, name) 
SELECT id, unnest(ARRAY['XC60', 'XC90', 'S90', 'XC40', 'V-Class', 'S60', 'Other', 'C-Class', 'C40', 'S40', 'S80', 'XC40 Recharge'])
FROM makes WHERE name = 'Volvo';