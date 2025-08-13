-- Create makes table
CREATE TABLE public.makes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create models table
CREATE TABLE public.models (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  make_id UUID NOT NULL REFERENCES public.makes(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(make_id, name)
);

-- Enable RLS on both tables
ALTER TABLE public.makes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.models ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (everyone can view makes and models)
CREATE POLICY "Makes are viewable by everyone" 
ON public.makes 
FOR SELECT 
USING (true);

CREATE POLICY "Models are viewable by everyone" 
ON public.models 
FOR SELECT 
USING (true);

-- Insert all makes
INSERT INTO public.makes (name) VALUES 
  ('Audi'), ('BMW'), ('Bentley'), ('BYD'), ('Cadillac'), ('Chevrolet'), 
  ('Dodge'), ('Ferrari'), ('Ford'), ('GAC'), ('GMC'), ('Honda'), 
  ('Hyundai'), ('Infiniti'), ('Jaguar'), ('Jeep'), ('Jetour'), ('Kia'), 
  ('Land Rover'), ('Lexus'), ('Lincoln'), ('Maserati'), ('Mazda'), 
  ('Mercedes-Benz'), ('MG'), ('MINI'), ('Mitsubishi'), ('Nissan'), 
  ('Peugeot'), ('Porsche'), ('Renault'), ('Rolls-Royce'), ('Rox'), 
  ('Suzuki'), ('Tesla'), ('Toyota'), ('Volkswagen'), ('Volvo');

-- Insert models for Audi
INSERT INTO public.models (make_id, name) 
SELECT id, unnest(ARRAY['Q5', 'Q7', 'A3', 'A8', 'A6', 'Q8', 'Q4', 'A4', 'A5', 'Q3', 'S3/RS3', 'RS Q8', 'S7/RS7', 'S6/RS6', 'TT', 'A7', 'R8', 'SQ5', 'S5/RS5', 'e-tron', 'S3', 'S8', 'RSQ3', 'S4/RS4', 'SQ8', 'Q2', 'A1', 'S5', 'RS e-tron', 'SQ7'])
FROM public.makes WHERE name = 'Audi';

-- Insert models for BMW
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['X5', '5-Series', 'X6', '7-Series', '3-Series', '4-Series', 'X7', '2-Series', 'X4', 'X1', 'M4', 'X3', 'X2', 'M5', '6-Series', '8-Series', '1-Series', 'M3', 'Z4', 'XM', 'iX', 'M8', 'M2', 'iX1', 'i5', 'i4', 'iX3', 'i3', 'M6', 'i7', 'i8', 'iX2', 'M1', 'Z3', 'Z8'])
FROM public.makes WHERE name = 'BMW';

-- Insert models for Bentley
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['Continental', 'Bentayga', 'Flying Spur', 'Mulsanne', 'Arnage', 'Other', 'Azure', 'Brooklands'])
FROM public.makes WHERE name = 'Bentley';

-- Insert models for BYD
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['Leopard 8', 'Leopard 5', 'Song Plus', 'Leopard Titanium 3', 'HAN', 'Leopard', 'Song L', 'Seal', 'Qin L', 'e2', 'Tang', 'Qin Plus', 'ATTO 3', 'Seagull', 'Song Pro', 'Yuan up', 'SEALION', 'BYD', 'Destroyer 05', 'Dolphin', 'Other', 'SEALION', 'XIA'])
FROM public.makes WHERE name = 'BYD';

-- Insert models for Cadillac
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['Escalade', 'ATS', 'CT5', 'XT4', 'SRX', 'XT5', 'CT4', 'CT6', 'XT6', 'CT5/Catera', 'XTR/Eldorado', 'DTS/DeVille', 'STS/Seville', 'XTS'])
FROM public.makes WHERE name = 'Cadillac';

-- Insert models for Chevrolet
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['Captiva', 'Camaro', 'Tahoe', 'Corvette', 'Silverado', 'Malibu', 'Cruze', 'Groove', 'Traverse', 'Spark', 'Suburban', 'Trax', 'Blazer', 'Trailblazer', 'Equinox', 'Impala', 'Aveo', 'Camaro Convertible', 'Express', 'Lumina', 'Sonic', 'Avalanche', 'Caprice', 'Epica', 'Other', 'Bolt', 'Monza', 'Pickup'])
FROM public.makes WHERE name = 'Chevrolet';

-- Insert models for Dodge
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['Charger', 'Challenger', 'Ram', 'Durango', 'Nitro', 'Caravan', 'Neon', 'Viper', 'Magnum', 'Van'])
FROM public.makes WHERE name = 'Dodge';

-- Insert models for Ferrari
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['Purosangue', 'SF90 Spider', 'SF90 Stradale', '812 GTS', 'Roma', '296 GTB', '296 GTS', '488 Pista', 'F8 Spider', '812', 'F8 Tributo', 'Portofino', '488 GTB', '488 Pista Spider', '12i Cilindri', 'GTC4 Lusso', '360', '458 Italia', '488 Spider', '812 Superfast', 'California T', 'F430', '458 Spider', '612 Scaglietti', 'California', 'GTC4 Lusso T', '488', 'F12', 'LaFerrari', 'Other', '512', 'F12 Berlinetta', 'Testarossa', '599 GTB', 'Daytona', 'FF', 'La Ferrari Aperta', '246 Dino', '348', '355', '412', '430', '458', '458 Speciale', 'Ferrari 456', 'Monza', 'Super America'])
FROM public.makes WHERE name = 'Ferrari';

-- Insert models for Ford
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['Mustang', 'Explorer', 'Edge', 'F-Series Pickup', 'Escape', 'Ecosport', 'Focus', 'Bronco', 'Ranger', 'Figo', 'Expedition', 'Territory', 'F-Series', 'Transit', 'Fusion', 'Everest', 'Taurus', 'GT', 'Fiesta', 'Shelby Cobra', 'Escort', 'Mustang Mach-E', 'Pickup', 'Crown Victoria', 'Flex', 'Other', 'Super Duty', 'Tourneo', 'Van'])
FROM public.makes WHERE name = 'Ford';

-- Continue with remaining makes... (I'll add them all in batches due to length)
-- Insert models for GAC
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['GS8', 'GS3', 'EMKOO', 'EMPOW', 'Aion Hyper', 'GA4', 'EMZOOM', 'GA8', 'GN6', 'GN8', 'GS5', 'Other', 'GA6', 'M8', 'S7', 'Aion Y'])
FROM public.makes WHERE name = 'GAC';

-- Insert models for GMC
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['Yukon', 'Sierra', 'Terrain', 'Acadia', 'Hummer', 'Savana', 'Pickup', 'Canyon', 'Other'])
FROM public.makes WHERE name = 'GMC';

-- Insert models for Honda
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['Accord', 'Civic', 'CR-V', 'City', 'HR-V', 'Odyssey', 'Pilot', 'ZR-V', 'Jazz', 'MR-V', 'S2000', 'Crosstour', 'ENP2', 'ENS1'])
FROM public.makes WHERE name = 'Honda';

-- Insert models for Hyundai
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['Tucson', 'Elantra', 'Sonata', 'Santa Fe', 'Accent', 'Creta', 'Palisade', 'Staria', 'H1', 'Veloster', 'Kona', 'Azera', 'Grand i10', 'Venue', 'i10', 'Genesis', 'Grand Santa Fe', 'i30', 'Avante', 'Grandeur', 'Porter', 'Stargazer', 'Centennial', 'H 100', 'i20', 'Ioniq', 'Santa Cruz', 'Terracan'])
FROM public.makes WHERE name = 'Hyundai';

-- Insert models for Infiniti
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['QX50', 'QX80', 'Q50', 'QX70', 'QX60', 'QX55', 'FX45/FX35', 'Q30', 'JX-Series', 'Q70', 'G25', 'EX35', 'G37', 'Q60', 'QX30', 'QX56', 'M-Series', 'FX50', 'G35', 'Q45'])
FROM public.makes WHERE name = 'Infiniti';

-- Insert models for Jaguar
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['F-Pace', 'XF', 'E-Pace', 'F-Type', 'XE', 'XJ', 'XJ-Series', 'XKR', 'XK', 'I-Pace', 'S-Type', 'E-Type', 'XJS'])
FROM public.makes WHERE name = 'Jaguar';

-- Insert models for Jeep
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['Wrangler', 'Grand Cherokee', 'Wrangler Unlimited', 'Cherokee', 'Grand Cherokee L', 'Compass', 'Grand Wagoneer', 'Gladiator', 'Renegade', 'Wrangler 4xe', 'Commander', 'Other', 'Patriot'])
FROM public.makes WHERE name = 'Jeep';

-- Insert models for Jetour
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['T2', 'Dashing', 'T1', 'X70 Plus', 'X70', 'X90 Plus', 'X50', 'T2-4DM', 'X70 FL', 'X70 S'])
FROM public.makes WHERE name = 'Jetour';

-- Insert models for Kia
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['Sportage', 'Seltos', 'Sorento', 'Carnival', 'Pegas', 'Optima', 'K5', 'Rio', 'Cerato', 'Picanto', 'Telluride', 'K3', 'Soul', 'Sonet', 'Forte', 'Sedona', 'Cadenza', 'Stinger', 'K8', 'Bongo', 'Carens', 'Mohave', 'Morning', 'K5 HEV', 'KX1', 'Quoris', 'Ray'])
FROM public.makes WHERE name = 'Kia';

-- Insert models for Land Rover
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['Range Rover', 'Range Rover Sport', 'Defender', 'Range Rover Evoque', 'Range Rover Velar', 'Discovery Sport', 'Discovery', 'LR4', 'LR2', 'LR3'])
FROM public.makes WHERE name = 'Land Rover';

-- Insert models for Lexus
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['RX-Series', 'IS-Series', 'LX600', 'NX-Series', 'ES-Series', 'GX 460', 'LX570', 'LS-Series', 'GS-Series', 'LX-Series', 'UX 200', 'LM 350h', 'LC 500', 'ES HYBRID', 'UX-Series', 'RC F', 'TX', 'GX 470', 'GX 550', 'LM 300', 'RC', 'CT-Series', 'LFA', 'SC-Series'])
FROM public.makes WHERE name = 'Lexus';

-- Insert models for Lincoln
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['Navigator', 'Aviator', 'MKX', 'Nautilus', 'MKC', 'Corsair', 'Continental', 'MKS', 'MKZ', 'MKT', 'Town Car'])
FROM public.makes WHERE name = 'Lincoln';

-- Insert models for Maserati
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['Ghibli', 'Levante', 'Grecale', 'Quattroporte', 'GranTurismo', 'MC20', 'GranCabrio', '4200', 'Spyder'])
FROM public.makes WHERE name = 'Maserati';

-- Insert models for Mazda
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['CX-5', '6', 'CX-9', '3', 'CX-3', 'CX-30', '2', 'MX-5', '3 Hatchback', 'CX-60', 'CX-90', 'CX-7', 'Pickup'])
FROM public.makes WHERE name = 'Mazda';

-- Insert models for Mercedes-Benz
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['G-Class', 'S-Class', 'C-Class', 'E-Class', 'A-Class', 'CLA', 'AMG', 'GLE Coupe', 'GLE-Class', 'GLC', 'V-Class', 'SL-Class', 'CLS-Class', 'GLS-Class', 'GLC Coupe', 'G-Class Brabus', 'GLA', 'GL-Class', 'GLB', 'EQS', 'EQE', 'GLK-Class', 'CLE-Class', 'Sprinter', 'M-Class', 'SLK-Class', 'C 63 AMG', 'Vito', 'CL-Class', 'C 43 AMG', 'EQC', 'SLC', 'Viano', 'EQB', 'SLS', 'CLK-Class', 'EQA', 'GLC 63', 'SLR', 'SEL-Class', 'Other', '190', '240/260/280', 'EQG', 'R-Class', 'Vito Tourer', 'X Class', 'CLC', 'SEC-Class', '220 SE', '300/350/380', 'Vito Panel Vans'])
FROM public.makes WHERE name = 'Mercedes-Benz';

-- Insert models for MG
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['MG5', 'ZS', 'RX5', 'GT', 'HS', 'RX8', 'One', 'MG 7', 'GS', 'ZST', '6', 'Other', 'Whale', 'MG3', 'MG350', 'MG6', 'MGB', 'RX9'])
FROM public.makes WHERE name = 'MG';

-- Insert models for MINI
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['Cooper', 'Countryman', 'Clubman', 'Coupe', 'Paceman', 'Aceman', 'Cooper Clubman', 'Roadster'])
FROM public.makes WHERE name = 'MINI';

-- Insert models for Mitsubishi
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['Pajero', 'Attrage', 'L200', 'ASX', 'Montero Sport', 'Outlander', 'Canter', 'Lancer', 'Xpander', 'Lancer EX', 'Eclipse Cross', 'Mirage', 'Other', 'Pajero Sport', 'Xpander Cross', 'Galant', 'Van', 'Evolution', 'Grandis', '3000GT', 'Eclipse'])
FROM public.makes WHERE name = 'Mitsubishi';

-- Insert models for Nissan
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['Patrol', 'Altima', 'Sunny', 'X-Trail', 'Kicks', 'Pathfinder', 'Sentra', 'Xterra', 'Armada', 'Urvan', 'Tiida', 'Maxima', 'Juke', 'Navara', 'Patrol Safari', 'Rogue', 'Micra', 'Murano', 'GT-R', 'Skyline', 'Versa', '370z', 'Qashqai', 'Super Safari', 'Pickup', 'Sylphy', 'Titan', 'Z', '350Z', 'Quest', 'Silvia', '400Z', 'Magnite', 'Patrol Pickup', 'Van'])
FROM public.makes WHERE name = 'Nissan';

-- Insert models for Peugeot
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['3008', 'Partner', 'Expert', '308', '2008', '208', '5008', 'Landtrek', '301', '508', 'Boxer', 'RCZ', '207', '408', 'Traveller', '206', '307', 'e-2008', 'iOn'])
FROM public.makes WHERE name = 'Peugeot';

-- Insert models for Porsche
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['Carrera / 911', 'Cayenne', 'Macan', 'Panamera', 'Cayman', 'Boxster', 'Taycan', '911', '718 Spyder', '918 Spyder', '928', '944', '968'])
FROM public.makes WHERE name = 'Porsche';

-- Insert models for Renault
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['Duster', 'Koleos', 'Megane', 'Symbol', 'Captur', 'Dokker', 'Fluence', 'Master', 'Express Van', 'Other', 'Talisman', 'Alpine A110', 'Arkana', 'Clio', 'Safrane', 'Samsung', 'Zoe'])
FROM public.makes WHERE name = 'Renault';

-- Insert models for Rolls-Royce
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['Cullinan', 'Ghost', 'Wraith', 'Phantom', 'Spectre', 'Dawn'])
FROM public.makes WHERE name = 'Rolls-Royce';

-- Insert models for Rox
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['01'])
FROM public.makes WHERE name = 'Rox';

-- Insert models for Suzuki
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['Jimny', 'Swift', 'Ciaz', 'Dzire', 'Baleno', 'Grand Vitara', 'Ertiga', 'Fronx', 'Vitara', 'Celerio', 'APV Van', 'SX4', 'Eeco', 'Kizashi'])
FROM public.makes WHERE name = 'Suzuki';

-- Insert models for Tesla
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['Model 3', 'Model Y', 'Model X', 'Cybertruck', 'Model S'])
FROM public.makes WHERE name = 'Tesla';

-- Insert models for Toyota
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['Land Cruiser', 'Prado', 'Hilux', 'Rav 4', 'Corolla', 'Yaris', 'Camry', 'Fortuner', 'Hiace', 'Highlander', 'FJ Cruiser', 'Corolla Cross', 'Rush', 'Land Cruiser 76 series', 'Tundra', 'Land Cruiser 79 series', 'C-HR', 'Land Cruiser 70', 'Coaster', '4Runner', 'Sienna', 'Raize', 'Avanza', 'Granvia', 'Innova', 'Tacoma', 'Land Cruiser 71', 'Sequoia', 'Supra', 'Crown', 'Prius', 'Avalon', 'Fortuner', 'Veloz', 'Levin', 'Pickup', 'Previa', 'Urban Cruiser', 'Alphard', '86', 'BZ4X', 'Cither', 'Venza', 'bZ3', 'GR86', 'Aurion', 'Cressida', 'MR2', 'Rumion', 'Wish', 'Zelas'])
FROM public.makes WHERE name = 'Toyota';

-- Insert models for Volkswagen
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['Golf', 'Tiguan', 'Teramont', 'Touareg', 'Passat', 'T-Roc', 'ID.4', 'Jetta', 'Beetle', 'ID.6', 'CC', 'Scirocco', 'Polo', 'Transporter', 'Amarok', 'Arteon', 'Atlas', 'Crafter', 'Eos', 'ID.7', 'Multivan'])
FROM public.makes WHERE name = 'Volkswagen';

-- Insert models for Volvo
INSERT INTO public.models (make_id, name)
SELECT id, unnest(ARRAY['XC60', 'XC90', 'S90', 'XC40', 'V-Class', 'S60', 'Other', 'C-Class', 'C40', 'S40', 'S80', 'XC40 Recharge'])
FROM public.makes WHERE name = 'Volvo';