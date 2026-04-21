// import { useState } from "react";
// import { Search } from "lucide-react";
// import { Header } from "@/components/Header";
// import { Footer } from "@/components/Footer";
// import { ProfileCard } from "@/components/ProfileCard";
// import { profiles, cities, categories } from "@/lib/data";
// import { useGetAllCityCategoryServiceQuery, useGetAllProfilesQuery } from "@/redux/api/providerApiSlice";

// export default function Explore() {

//   const [city, setCity] = useState("");
//   const [category, setCategory] = useState("");
//   const [q, setQ] = useState("");
//   const profile=[]
  
//   // const { data: locationData, isLoading: isLoadingLocationData } = useGetAllCityCategoryServiceQuery();

//   const filtered = profiles.filter(p =>
//     (!city || p.city === city) &&
//     (!category || p.category === category) &&
//     (!q || p.name.toLowerCase().includes(q.toLowerCase()))
//   );

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
//       <section className="gradient-hero py-16">
//         <div className="container mx-auto px-6 text-white text-center">
//           <h1 className="text-4xl md:text-6xl">Explore <span className="text-white/70">Companions</span></h1>
//           <p className="mt-3 text-white/90">{filtered.length} profiles available</p>
//         </div>
//       </section>

//       <section className="container mx-auto px-6 py-10">
//         <div className="bg-card shadow-card rounded-2xl p-4 flex flex-col md:flex-row gap-3 mb-8">
//           <div className="flex items-center gap-2 px-3 flex-1 bg-input rounded-xl">
//             <Search className="w-4 h-4 text-muted-foreground" />
//             <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name..." className="bg-transparent outline-none py-3 w-full text-sm" />
//           </div>
//           <select value={city} onChange={e => setCity(e.target.value)} className="bg-input rounded-xl px-4 py-3 text-sm outline-none">
//             <option value="">All Cities</option>
//             {cities.map(c => <option key={c} value={c}>{c}</option>)}
//           </select>
//           <select value={category} onChange={e => setCategory(e.target.value)} className="bg-input rounded-xl px-4 py-3 text-sm outline-none">
//             <option value="">All Categories</option>
//             {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
//           </select>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//           {filtered.map(p => <ProfileCard key={p.id} profile={p} />)}
//         </div>
//         {filtered.length === 0 && (
//           <div className="text-center py-20 text-muted-foreground">No profiles match your filters.</div>
//         )}
//       </section>

//       <Footer />
//     </div>
//   );
// }


import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProfileCard } from "@/components/ProfileCard";
import { useGetAllCityCategoryServiceQuery, useGetAllProfilesQuery } from "@/redux/api/providerApiSlice";

export default function Explore() {
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [q, setQ] = useState("");

  // 1. Fetching Data
  const { data: profileRes, isLoading: isAllProfileLoading } = useGetAllProfilesQuery({ all: true });
  const { data: locationData } = useGetAllCityCategoryServiceQuery();

  const allProfiles = profileRes?.data || [];
  const cities = locationData?.data?.cities || [];
  const categories = locationData?.data?.categories || [];

  // 2. Filter logic (Object structure ke hisaab se)
  const filtered = allProfiles.filter(p => {
    // City Filter: profile.city._id match karein
    const matchesCity = !city || p.city?._id === city;

    // Category Filter: profile.category._id match karein
    const matchesCategory = !category || p.category?._id === category;

    // Name Search
    const matchesName = !q || p.name.toLowerCase().includes(q.toLowerCase());

    return matchesCity && matchesCategory && matchesName;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="gradient-hero py-16">
        <div className="container mx-auto px-6 text-white text-center">
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter">
            Explore <span className="text-white/70">Companions</span>
          </h1>
          <p className="mt-3 text-white/90 font-medium">
            {isAllProfileLoading ? "Finding profiles..." : `${filtered.length} profiles available`}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 py-10">
        {/* Filter Bar */}
        <div className="bg-card shadow-card rounded-2xl p-4 flex flex-col md:flex-row gap-3 mb-8 border border-border">
          <div className="flex items-center gap-2 px-4 flex-1 bg-secondary/50 rounded-xl border border-border">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input 
              value={q} 
              onChange={e => setQ(e.target.value)} 
              placeholder="Search by name..." 
              className="bg-transparent outline-none py-3 w-full text-sm" 
            />
          </div>

          {/* 🟢 City Select: Value should be ID */}
          <select 
            value={city} 
            onChange={e => setCity(e.target.value)} 
            className="bg-secondary/50 border border-border rounded-xl px-4 py-3 text-sm outline-none cursor-pointer focus:border-primary"
          >
            <option value="">All Cities</option>
            {cities.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>

          {/* 🟢 Category Select: Value should be ID */}
          <select 
            value={category} 
            onChange={e => setCategory(e.target.value)} 
            className="bg-secondary/50 border border-border rounded-xl px-4 py-3 text-sm outline-none cursor-pointer focus:border-primary"
          >
            <option value="">All Categories</option>
            {categories.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Profiles Grid */}
        {isAllProfileLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">Loading premium profiles...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map(p => (
                <ProfileCard key={p._id} profile={p} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20 bg-secondary/20 rounded-3xl border-2 border-dashed border-border mt-10">
                <p className="text-muted-foreground font-medium">No profiles match your filters.</p>
                <button 
                   onClick={() => { setCity(""); setCategory(""); setQ(""); }}
                   className="text-primary font-bold mt-2 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <Footer />
    </div>
  );
}