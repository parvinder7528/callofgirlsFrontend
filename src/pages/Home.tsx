import { Link } from "@tanstack/react-router";
import { Search, MapPin, Sparkles, Shield, Zap, Star, Headphones, Users, Loader2, MapIcon } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProfileCard } from "@/components/ProfileCard";
import { useGetAllCategoriesQuery, useGetAllProfilesQuery } from "@/redux/api/providerApiSlice";

export default function Home() {
  // API Hooks
  const { data: profileRes, isLoading: isAllProfileLoading } = useGetAllProfilesQuery();
  const { data: catRes, isLoading: isCatLoading } = useGetAllCategoriesQuery();

  // Data mapping from API
  const allProfiles = profileRes?.data || [];
  const categories = catRes?.data || [];

  const featured = allProfiles.slice(0, 5);
  const trending = [...allProfiles].reverse().slice(0, 5);

  // Loading State
  if (isAllProfileLoading || isCatLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className="text-muted-foreground font-medium animate-pulse">Loading Premium Experience...</p>
        </div>
      </div>
    );
  }
  const img = `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop&auto=format`;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* --- Hero Section --- */}
      <section className="relative gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_50%,white,transparent_50%)]" />
        <div className="container mx-auto px-6 py-16 lg:py-24 relative grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur px-4 py-2 rounded-full text-sm mb-6 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              558 Companions Online Now
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight">
              Find Premium <span className="block text-white/70">Companions</span> Near You
            </h1>
            <p className="mt-6 text-lg text-white/90 max-w-md">
              Discover verified, elite companions for any occasion. Discreet, elegant, and always available.
            </p>

            {/* --- Dynamic Search Box --- */}
            {/* <div className="mt-8 bg-white/15 backdrop-blur-xl rounded-2xl p-2 flex flex-col sm:flex-row gap-2 max-w-2xl border border-white/20 shadow-2xl">
              <div className="flex items-center gap-2 px-4 flex-1">
                <MapPin className="w-4 h-4 text-white/70" />
                <input 
                  placeholder="Enter city or location..." 
                  className="bg-transparent outline-none text-white placeholder:text-white/60 py-3 w-full text-sm" 
                />
              </div>
              <div className="hidden sm:block w-px bg-white/20" />
              <div className="flex items-center gap-2 px-4 flex-1">
                <Sparkles className="w-4 h-4 text-white/70" />
                <select className="bg-transparent outline-none text-white py-3 w-full text-sm appearance-none cursor-pointer">
                  <option className="text-foreground" value="">All Categories</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id} className="text-foreground">
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <Link to="/explore" className="bg-white text-primary font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-white/90 active:scale-95 transition-all">
                <Search className="w-4 h-4" /> Search
              </Link>
            </div> */}

            {/* --- Hero Stats --- */}
            <div className="mt-12 flex flex-wrap gap-10">
              <div><div className="text-3xl font-extrabold tracking-tighter">10K+</div><div className="text-xs uppercase tracking-widest text-white/70">Verified</div></div>
              <div><div className="text-3xl font-extrabold tracking-tighter">50+</div><div className="text-xs uppercase tracking-widest text-white/70">Cities</div></div>
              <div><div className="text-3xl font-extrabold tracking-tighter">4.8★</div><div className="text-xs uppercase tracking-widest text-white/70">Rating</div></div>
            </div>
          </div>

          {/* --- Right Side Floating Cards (Dynamic) --- */}
          <div className="hidden lg:flex flex-col gap-4 items-end">
            {allProfiles.slice(0, 3).map((p, i) => (
              <div
                key={p._id}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 flex items-center gap-4 w-80 hover:bg-white/20 transition-all cursor-default shadow-xl"
                style={{ marginRight: `${i * 40}px` }}
              >
                <img src={p.gallery[0]} alt={p?.name} className="w-16 h-16 rounded-xl object-cover shadow-lg" />
                <div className="text-white flex-1">
                  <div className="font-bold text-lg leading-tight capitalize">{p.name}</div>
                  <div className="text-xs opacity-80 flex items-center gap-1">
                    <MapIcon className="w-3 h-3" /> {p.city?.name || "Premium City"}
                  </div>
                  <div className="flex items-center gap-1 text-xs mt-1.5">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> 4.9
                    <span className="ml-auto w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Featured Section --- */}
      <section className="py-20 container mx-auto px-6">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <div className="text-primary font-bold text-xs tracking-[0.2em] mb-2 uppercase">Top Rated Selection</div>
            <h2 className="text-4xl md:text-5xl font-black">Featured <span className="text-gradient-primary">Companions</span></h2>
            <p className="text-muted-foreground mt-3 max-w-xl text-lg">Hand-picked, verified profiles with high professionalism.</p>
          </div>
          <Link to="/explore" className="text-primary font-bold flex items-center gap-2 group transition-all">
            View All <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {featured.map(p => <ProfileCard profile={p} />)}
        </div>
      </section>

      {/* --- Category Browse (Dynamic) --- */}
      <section className="py-20 container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="text-primary font-bold text-sm tracking-widest mb-2">BROWSE</div>
          <h2 className="text-4xl md:text-5xl">Browse by <span className="text-gradient-primary">Category</span></h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Find exactly what you're looking for across our curated service categories.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map(c => (
            <Link key={c.id} to={`/categories?catId=${c?._id}`} className="group relative aspect-square rounded-3xl overflow-hidden shadow-card hover:shadow-glow transition">
              <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <h3 className="text-2xl font-extrabold">{c.name}</h3>
                <p className="text-sm opacity-90">{c.count} profiles</p>
              </div>
              <div className="absolute bottom-5 right-5 w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white group-hover:bg-primary transition">→</div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- Trending Section --- */}
      <section className="py-20 container mx-auto px-6">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <div className="text-orange-500 font-bold text-xs tracking-[0.2em] mb-2 uppercase flex items-center gap-2">
              <Zap className="w-4 h-4 fill-current" /> HOT RIGHT Now
            </div>
            <h2 className="text-4xl md:text-5xl font-black">Trending <span className="text-gradient-primary">Profiles</span></h2>
          </div>
          <Link to="/explore" className="text-primary font-bold flex items-center gap-2 group transition-all">
            See All <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {trending.map(p => <ProfileCard key={p._id} profile={p} />)}
        </div>
      </section>

      {/* --- Features Section --- */}
      <section className="py-24 container mx-auto px-6 border-t border-border">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: "Verified Profiles", desc: "Every companion goes through a multi-step verification process to ensure authenticity." },
            { icon: Users, title: "Total Privacy", desc: "Your personal data is never stored or shared. We prioritize discretion above all else." },
            { icon: Zap, title: "Instant Access", desc: "Connect directly via WhatsApp or Phone. No middlemen, no waiting, no commission." },
          ].map((f) => (
            <div key={f.title} className="bg-card p-10 rounded-[3rem] border border-border hover:border-primary/30 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <f.icon className="w-8 h-8 text-primary group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-black mb-3">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed italic">"{f.desc}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="container mx-auto px-6 pb-24">
        <div className="gradient-hero rounded-[4rem] p-12 md:p-20 text-white text-center relative overflow-hidden shadow-glow shadow-primary/20">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_70%_30%,white,transparent_50%)]" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-6">Experience True Luxury</h2>
            <p className="text-white/80 max-w-xl mx-auto mb-10 text-lg font-medium">
              Join the most exclusive directory of premium companions today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/explore" className="bg-white text-primary font-black px-10 py-4 rounded-full hover:scale-105 transition-transform shadow-xl">
                Start Exploring
              </Link>
              <Link to="/register" className="bg-white/10 backdrop-blur-md border border-white/30 text-white font-black px-10 py-4 rounded-full hover:bg-white/20 transition-all">
                Join as Provider
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// export default function Home() {
//   const {profileRes,isLoading:isAllProfileLoading}=useGetAllProfilesQuery()
//   const {catRes,isLoading:isCatLoading}=useGetAllCategoriesQuery()
// console.log(profileRes,"profileResprofileRes")
//   const featured = profiles.filter(p => p.featured).slice(0, 5);
//   const trending = profiles.filter(p => p.trending);

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       <section className="relative gradient-hero overflow-hidden">
//         <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_50%,white,transparent_50%)]" />
//         <div className="container mx-auto px-6 py-20 lg:py-28 relative grid lg:grid-cols-2 gap-12 items-center">
//           <div className="text-white">
//             <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur px-4 py-2 rounded-full text-sm mb-6">
//               <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
//               558 Companions Online Now
//             </div>
//             <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight">
//               Find Premium <span className="block text-white/70">Companions</span> Near You
//             </h1>
//             <p className="mt-6 text-lg text-white/90 max-w-md">
//               Discover verified, elite companions for any occasion. Discreet, elegant, and always available.
//             </p>

//             <div className="mt-8 bg-white/15 backdrop-blur-xl rounded-2xl p-2 flex flex-col sm:flex-row gap-2 max-w-2xl">
//               <div className="flex items-center gap-2 px-4 flex-1">
//                 <MapPin className="w-4 h-4 text-white/70" />
//                 <input placeholder="Enter city or location..." className="bg-transparent outline-none text-white placeholder:text-white/60 py-3 w-full text-sm" />
//               </div>
//               <div className="hidden sm:block w-px bg-white/20" />
//               <div className="flex items-center gap-2 px-4 flex-1">
//                 <Sparkles className="w-4 h-4 text-white/70" />
//                 <select className="bg-transparent outline-none text-white py-3 w-full text-sm appearance-none">
//                   <option className="text-foreground">All Categories</option>
//                   {categories.map(c => <option key={c.id} className="text-foreground">{c.name}</option>)}
//                 </select>
//               </div>
//               <Link to="/explore" className="bg-white text-primary font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:scale-105 transition">
//                 <Search className="w-4 h-4" /> Search
//               </Link>
//             </div>

//             <div className="mt-8 flex flex-wrap gap-3">
//               <Link to="/explore" className="bg-white text-primary font-bold px-6 py-3 rounded-full shadow-glow hover:scale-105 transition">Explore Profiles</Link>
//               <Link to="/register" className="bg-white/15 backdrop-blur text-white font-bold px-6 py-3 rounded-full border border-white/30 hover:bg-white/25 transition">Join as Provider</Link>
//             </div>

//             <div className="mt-12 flex gap-10">
//               <div><div className="text-3xl font-extrabold">10K+</div><div className="text-sm text-white/80">Verified Profiles</div></div>
//               <div><div className="text-3xl font-extrabold">50+</div><div className="text-sm text-white/80">Cities Covered</div></div>
//               <div><div className="text-3xl font-extrabold">4.8★</div><div className="text-sm text-white/80">Average Rating</div></div>
//             </div>
//           </div>

//           <div className="hidden lg:flex flex-col gap-4 items-end">
//             {featured.slice(0, 3).map((p, i) => (
//               <div key={p.id} className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl p-3 flex items-center gap-3 w-72 hover:scale-105 transition" style={{ marginRight: `${i * 30}px` }}>
//                 <img src={p.image} alt={p.name} className="w-14 h-14 rounded-xl object-cover" />
//                 <div className="text-white flex-1">
//                   <div className="font-bold">{p.name}</div>
//                   <div className="text-xs opacity-80">{p.city}</div>
//                   <div className="flex items-center gap-1 text-xs mt-0.5">
//                     <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {p.rating}
//                     <span className="ml-2 w-2 h-2 rounded-full bg-green-400" />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-20 container mx-auto px-6">
//         <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
//           <div>
//             <div className="text-primary font-bold text-sm tracking-widest mb-2">TOP RATED</div>
//             <h2 className="text-4xl md:text-5xl">Featured <span className="text-gradient-primary">Companions</span></h2>
//             <p className="text-muted-foreground mt-3 max-w-xl">Hand-picked, verified profiles with the highest ratings and most bookings.</p>
//           </div>
//           <Link to="/explore" className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">View All →</Link>
//         </div>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
//           {featured.map(p => <ProfileCard key={p.id} profile={p} />)}
//         </div>
//       </section>

//       <section className="py-20 container mx-auto px-6">
//         <div className="text-center mb-12">
//           <div className="text-primary font-bold text-sm tracking-widest mb-2">BROWSE</div>
//           <h2 className="text-4xl md:text-5xl">Browse by <span className="text-gradient-primary">Category</span></h2>
//           <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Find exactly what you're looking for across our curated service categories.</p>
//         </div>
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
//           {categories.map(c => (
//             <Link key={c.id} to="/categories" className="group relative aspect-square rounded-3xl overflow-hidden shadow-card hover:shadow-glow transition">
//               <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" loading="lazy" />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
//               <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
//                 <h3 className="text-2xl font-extrabold">{c.name}</h3>
//                 <p className="text-sm opacity-90">{c.count} profiles</p>
//               </div>
//               <div className="absolute bottom-5 right-5 w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white group-hover:bg-primary transition">→</div>
//             </Link>
//           ))}
//         </div>
//       </section>

//       <section className="py-20 bg-rose-soft">
//         <div className="container mx-auto px-6">
//           <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
//             <div>
//               <div className="text-orange-500 font-bold text-sm tracking-widest mb-2 flex items-center gap-2">🔥 HOT RIGHT NOW</div>
//               <h2 className="text-4xl md:text-5xl">Trending <span className="text-gradient-primary">Profiles</span></h2>
//             </div>
//             <Link to="/explore" className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">See All →</Link>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
//             {trending.slice(0, 5).map(p => <ProfileCard key={p.id} profile={p} />)}
//           </div>
//         </div>
//       </section>

//       <section className="py-20 container mx-auto px-6">
//         <div className="text-center mb-12">
//           <div className="text-primary font-bold text-sm tracking-widest mb-2">WHY US</div>
//           <h2 className="text-4xl md:text-5xl">Why Choose <span className="text-gradient-primary">LuxeCompanions</span></h2>
//           <p className="text-muted-foreground mt-3 max-w-xl mx-auto">We set the gold standard for companion directories — safe, elegant, and effortlessly connected.</p>
//         </div>
//         <div className="grid md:grid-cols-3 gap-5">
//           {[
//             { icon: Shield, title: "Verified Profiles", desc: "Every profile goes through a strict verification process. We ensure authenticity and safety for all users." },
//             { icon: Users, title: "Privacy Protection", desc: "Your data and interactions are fully encrypted. We never share personal information with third parties." },
//             { icon: Zap, title: "Fast Connection", desc: "Connect with companions instantly via WhatsApp or direct call. No delays, no middlemen." },
//             { icon: Star, title: "Premium Quality", desc: "Only the highest-rated, most professional companions make it to our featured listings." },
//             { icon: MapPin, title: "Nationwide Coverage", desc: "Find companions in 50+ cities across India. From metros to tier-2 cities, we've got you covered." },
//             { icon: Headphones, title: "24/7 Support", desc: "Our dedicated support team is available around the clock to assist with any queries or concerns." },
//           ].map((f) => (
//             <div key={f.title} className="bg-secondary/40 rounded-3xl p-7 hover:shadow-glow transition border border-border">
//               <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-4">
//                 <f.icon className="w-6 h-6 text-primary" />
//               </div>
//               <h3 className="text-xl font-extrabold mb-2">{f.title}</h3>
//               <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="container mx-auto px-6 pb-20">
//         <div className="gradient-hero rounded-3xl p-12 md:p-16 text-white text-center relative overflow-hidden shadow-glow">
//           <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_70%_30%,white,transparent_50%)]" />
//           <div className="relative">
//             <h2 className="text-4xl md:text-5xl mb-4">Ready to Get Started?</h2>
//             <p className="text-white/90 max-w-md mx-auto mb-8">Join thousands of satisfied users today.</p>
//             <div className="flex flex-wrap justify-center gap-3">
//               <Link to="/explore" className="bg-white text-primary font-bold px-8 py-3.5 rounded-full hover:scale-105 transition">Explore Profiles</Link>
//               <Link to="/register" className="bg-white/15 backdrop-blur border border-white/30 text-white font-bold px-8 py-3.5 rounded-full hover:bg-white/25 transition">Join as Provider</Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }
