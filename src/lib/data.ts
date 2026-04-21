export type Profile = {
  id: string;
  name: string;
  age: number;
  city: string;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  services: string[];
  bio: string;
  online: boolean;
  featured?: boolean;
  vip?: boolean;
  trending?: boolean;
  pricing: { hour: number; threeHour: number; night: number };
  whatsapp: string;
};

const img = (seed: string) =>
  `https://images.unsplash.com/photo-${seed}?w=600&h=800&fit=crop&auto=format`;
img("1531746020798-e6953c6e8e04")
img("1494790108377-be9c29b29330")
 img("1534528741775-53994a69daeb")
  img("1488426862026-3ee34a7d66df")
export const profiles: Profile[] = [
  {
    id: "sophia-rose",
    name: "Sophia Rose", age: 24, city: "Mumbai", rating: 4.9, reviews: 128,
    image: img("1531746020798-e6953c6e8e04"),
    category: "VIP Companion",
    services: ["Dinner Date", "Social Events", "Travel Companion"],
    bio: "Elegant, well-traveled companion for sophisticated occasions. Fluent in three languages with a passion for fine dining and the arts.",
    online: true, featured: true, vip: true, trending: true,
    pricing: { hour: 5000, threeHour: 12000, night: 30000 },
    whatsapp: "+919876543210",
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma", age: 22, city: "Delhi", rating: 4.8, reviews: 96,
    image: img("1494790108377-be9c29b29330"),
    category: "Escort",
    services: ["Escort", "Dinner Date"],
    bio: "Charming and graceful, perfect company for evenings and intimate gatherings.",
    online: true, featured: true,
    pricing: { hour: 4000, threeHour: 10000, night: 25000 },
    whatsapp: "+919876543211",
  },
  {
    id: "ananya-kapoor",
    name: "Ananya Kapoor", age: 26, city: "Bangalore", rating: 4.7, reviews: 74,
    image: img("1534528741775-53994a69daeb"),
    category: "Massage",
    services: ["Massage", "Relaxation"],
    bio: "Certified therapist offering premium relaxation and wellness experiences.",
    online: true, featured: true, trending: true,
    pricing: { hour: 3500, threeHour: 9000, night: 22000 },
    whatsapp: "+919876543212",
  },
  {
    id: "meera-nair",
    name: "Meera Nair", age: 23, city: "Chennai", rating: 4.6, reviews: 58,
    image: img("1488426862026-3ee34a7d66df"),
    category: "Escort",
    services: ["Escort", "Beach Dates"],
    bio: "Sun-kissed and sweet — your perfect coastal getaway companion.",
    online: true, featured: true,
    pricing: { hour: 3500, threeHour: 9000, night: 22000 },
    whatsapp: "+919876543213",
  },
  {
    id: "riya-malhotra",
    name: "Riya Malhotra", age: 25, city: "Pune", rating: 4.8, reviews: 89,
    image: img("1524504388940-b1c1722653e1"),
    category: "VIP Companion",
    services: ["VIP Experience", "Luxury Events"],
    bio: "Glamorous, refined, and ready for the spotlight at any high-profile event.",
    online: true, featured: true, vip: true, trending: true,
    pricing: { hour: 6000, threeHour: 15000, night: 35000 },
    whatsapp: "+919876543214",
  },
  {
    id: "nisha-patel",
    name: "Nisha Patel", age: 23, city: "Surat", rating: 4.6, reviews: 52,
    image: img("1438761681033-6461ffad8d80"),
    category: "Call Girl",
    services: ["Call Girl", "Dinner Date"],
    bio: "Bubbly personality, instant chemistry. Let's make memories.",
    online: true, trending: true,
    pricing: { hour: 3000, threeHour: 8000, night: 20000 },
    whatsapp: "+919876543215",
  },
  {
    id: "aisha-khan",
    name: "Aisha Khan", age: 25, city: "Jaipur", rating: 4.9, reviews: 112,
    image: img("1509967419530-da38b4704bc6"),
    category: "VIP Companion",
    services: ["VIP Experience", "Cultural Tours"],
    bio: "Royal grace meets modern charm. Discover the Pink City with elegance.",
    online: true, featured: true, vip: true,
    pricing: { hour: 5500, threeHour: 13000, night: 32000 },
    whatsapp: "+919876543216",
  },
  {
    id: "tara-singh",
    name: "Tara Singh", age: 24, city: "Hyderabad", rating: 4.7, reviews: 67,
    image: img("1517841905240-472988babdf9"),
    category: "Massage",
    services: ["Massage", "Spa", "Relaxation"],
    bio: "Healing hands, warm presence. Unwind in complete bliss.",
    online: true, featured: true,
    pricing: { hour: 3500, threeHour: 9000, night: 22000 },
    whatsapp: "+919876543217",
  },
];

export const categories = [
  { id: "escort", name: "Escort", count: 248, image: img("1524504388940-b1c1722653e1"), icon: "heart" },
  { id: "call-girl", name: "Call Girl", count: 183, image: img("1494790108377-be9c29b29330"), icon: "phone" },
  { id: "massage", name: "Massage", count: 127, image: img("1540555700478-4be289fbecef"), icon: "hand-heart" },
  { id: "vip", name: "VIP Companion", count: 94, image: img("1509967419530-da38b4704bc6"), icon: "crown" },
];

export const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Pune", "Hyderabad", "Kolkata", "Jaipur", "Ahmedabad", "Surat", "Other"];
export const allServices = ["Dinner Date", "Social Events", "Travel Companion", "Massage", "VIP Experience", "City Tours", "Private Parties", "Overnight"];
