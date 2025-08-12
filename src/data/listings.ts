export type Emirate =
  | "Dubai"
  | "Abu Dhabi"
  | "Sharjah"
  | "Ajman"
  | "Ras Al Khaimah"
  | "Fujairah"
  | "Umm Al Quwain";

export type Listing = {
  id: string;
  slug: string;
  title: string;
  make: string;
  model: string;
  trim?: string;
  year: number;
  priceAED: number;
  mileage: number; // in km
  bodyType: string;
  fuel: string;
  transmission: string;
  color: string;
  gccSpec?: boolean;
  warranty?: boolean;
  emirate: Emirate;
  area?: string;
  description?: string;
  isPremium?: boolean;
  publishedAt: string; // ISO
  coverImageUrl: string;
  images?: string[];
};

import camry from "@/assets/listing-camry.jpg";
import lexus from "@/assets/listing-lexus-rx.jpg";
import p911 from "@/assets/listing-911.jpg";

export const listings: Listing[] = [
  {
    id: "1001",
    slug: "toyota-camry-2020-se-1001",
    title: "Toyota Camry 2020 SE",
    make: "Toyota",
    model: "Camry",
    trim: "SE",
    year: 2020,
    priceAED: 55900,
    mileage: 68000,
    bodyType: "Sedan",
    fuel: "Petrol",
    transmission: "Automatic",
    color: "White",
    gccSpec: true,
    warranty: false,
    emirate: "Dubai",
    area: "Business Bay",
    description: "Well maintained, single owner, dealer serviced.",
    isPremium: true,
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    coverImageUrl: camry,
    images: [camry],
  },
  {
    id: "1002",
    slug: "lexus-rx-2021-f-sport-1002",
    title: "Lexus RX 2021 F Sport",
    make: "Lexus",
    model: "RX",
    trim: "F Sport",
    year: 2021,
    priceAED: 174000,
    mileage: 32000,
    bodyType: "SUV",
    fuel: "Petrol",
    transmission: "Automatic",
    color: "Black",
    gccSpec: true,
    warranty: true,
    emirate: "Abu Dhabi",
    area: "Al Reem Island",
    description: "Low mileage, full option, dealer warranty.",
    isPremium: true,
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    coverImageUrl: lexus,
    images: [lexus],
  },
  {
    id: "1003",
    slug: "porsche-911-2019-carrera-1003",
    title: "Porsche 911 Carrera 2019",
    make: "Porsche",
    model: "911",
    trim: "Carrera",
    year: 2019,
    priceAED: 349000,
    mileage: 41000,
    bodyType: "Coupe",
    fuel: "Petrol",
    transmission: "Automatic",
    color: "Red",
    gccSpec: true,
    warranty: false,
    emirate: "Dubai",
    area: "JLT",
    description: "Pristine condition, sports chrono, ceramic brakes.",
    isPremium: false,
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
    coverImageUrl: p911,
    images: [p911],
  },
  {
    id: "1004",
    slug: "nissan-patrol-2018-le-1004",
    title: "Nissan Patrol 2018 LE",
    make: "Nissan",
    model: "Patrol",
    trim: "LE",
    year: 2018,
    priceAED: 129000,
    mileage: 125000,
    bodyType: "SUV",
    fuel: "Petrol",
    transmission: "Automatic",
    color: "White",
    gccSpec: true,
    warranty: false,
    emirate: "Sharjah",
    description: "Perfect family SUV, GCC specs, good condition.",
    isPremium: false,
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    coverImageUrl: camry,
    images: [camry],
  },
  {
    id: "1005",
    slug: "mercedes-e300-2020-amg-1005",
    title: "Mercedes E300 2020 AMG Line",
    make: "Mercedes",
    model: "E300",
    year: 2020,
    priceAED: 189000,
    mileage: 52000,
    bodyType: "Sedan",
    fuel: "Petrol",
    transmission: "Automatic",
    color: "Blue",
    gccSpec: true,
    warranty: false,
    emirate: "Dubai",
    isPremium: true,
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    coverImageUrl: lexus,
    images: [lexus],
  },
  {
    id: "1006",
    slug: "bmw-520i-2017-1006",
    title: "BMW 520i 2017",
    make: "BMW",
    model: "520i",
    year: 2017,
    priceAED: 66000,
    mileage: 148000,
    bodyType: "Sedan",
    fuel: "Petrol",
    transmission: "Automatic",
    color: "Gray",
    gccSpec: false,
    warranty: false,
    emirate: "Abu Dhabi",
    isPremium: false,
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    coverImageUrl: camry,
    images: [camry],
  },
  {
    id: "1007",
    slug: "audi-a6-2019-1007",
    title: "Audi A6 2019",
    make: "Audi",
    model: "A6",
    year: 2019,
    priceAED: 105000,
    mileage: 89000,
    bodyType: "Sedan",
    fuel: "Petrol",
    transmission: "Automatic",
    color: "Black",
    gccSpec: true,
    warranty: false,
    emirate: "Dubai",
    isPremium: false,
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    coverImageUrl: p911,
    images: [p911],
  },
  {
    id: "1008",
    slug: "honda-civic-2018-1008",
    title: "Honda Civic 2018",
    make: "Honda",
    model: "Civic",
    year: 2018,
    priceAED: 42000,
    mileage: 155000,
    bodyType: "Sedan",
    fuel: "Petrol",
    transmission: "Automatic",
    color: "White",
    gccSpec: true,
    warranty: false,
    emirate: "Sharjah",
    isPremium: false,
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    coverImageUrl: camry,
    images: [camry],
  },
  {
    id: "1009",
    slug: "kia-sportage-2022-1009",
    title: "Kia Sportage 2022",
    make: "Kia",
    model: "Sportage",
    year: 2022,
    priceAED: 89000,
    mileage: 29000,
    bodyType: "SUV",
    fuel: "Petrol",
    transmission: "Automatic",
    color: "White",
    gccSpec: true,
    warranty: true,
    emirate: "Dubai",
    isPremium: true,
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    coverImageUrl: lexus,
    images: [lexus],
  },
  {
    id: "1010",
    slug: "hyundai-elantra-2017-1010",
    title: "Hyundai Elantra 2017",
    make: "Hyundai",
    model: "Elantra",
    year: 2017,
    priceAED: 28000,
    mileage: 170000,
    bodyType: "Sedan",
    fuel: "Petrol",
    transmission: "Automatic",
    color: "Silver",
    gccSpec: true,
    warranty: false,
    emirate: "Ajman",
    isPremium: false,
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 200).toISOString(),
    coverImageUrl: camry,
    images: [camry],
  },
];

export const allMakes = Array.from(new Set(listings.map((l) => l.make))).sort();
export const modelsByMake: Record<string, string[]> = listings.reduce((acc, l) => {
  acc[l.make] = Array.from(new Set([...(acc[l.make] || []), l.model])).sort();
  return acc;
}, {} as Record<string, string[]>);

export function getListingBySlug(slug: string) {
  return listings.find((l) => l.slug === slug);
}
