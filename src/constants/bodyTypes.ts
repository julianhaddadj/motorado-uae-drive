export const BODY_TYPES = [
  "SUV",
  "Coupe",
  "Sedan",
  "Crossover",
  "Convertible",
  "Pickup",
  "Hatchback",
  "Van/Minivan",
  "Wagon",
  "Other"
] as const;

export type BodyType = typeof BODY_TYPES[number];