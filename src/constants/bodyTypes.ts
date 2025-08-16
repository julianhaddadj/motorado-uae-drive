export const BODY_TYPES = [
  "SUV",
  "Coupe",
  "Sedan", 
  "Crossover",
  "Hard Top Convertible",
  "Soft Top Convertible",
  "Pick Up Truck",
  "Hatchback",
  "Sports Car",
  "Van",
  "Wagon",
  "Utility Truck",
  "Other"
] as const;

export type BodyType = typeof BODY_TYPES[number];