// import { Link } from "@tanstack/react-router";
// import { Star, MapPin, Phone, MessageCircle, Shield, Clock, CheckCircle2, Crown } from "lucide-react";
// import { Header } from "@/components/Header";
// import { Footer } from "@/components/Footer";
// import type { Profile as ProfileType } from "@/lib/data";

// export default function Profile({ profile }: { profile: ProfileType }) {
//   const wa = `https://wa.me/${profile.whatsapp.replace(/\D/g, "")}`;
//   const tel = `tel:${profile.whatsapp}`;

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
//       <section className="container mx-auto px-6 py-10">
//         <div className="grid lg:grid-cols-5 gap-8">
//           <div className="lg:col-span-3">
//             <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-card relative">
//               <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
//               {profile.online && (
//                 <span className="absolute top-4 right-4 bg-black/60 backdrop-blur text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-2">
//                   <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Online Now
//                 </span>
//               )}
//             </div>
//           </div>

//           <div className="lg:col-span-2 space-y-6">
//             <div>
//               <div className="flex flex-wrap items-center gap-2 mb-3">
//                 {profile.featured && <span className="gradient-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"><Star className="w-3 h-3 fill-current" /> Featured</span>}
//                 {profile.vip && <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"><Crown className="w-3 h-3 fill-current" /> VIP</span>}
//                 <span className="bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"><Shield className="w-3 h-3" /> Verified</span>
//               </div>
//               <h1 className="text-4xl">{profile.name}, <span className="text-muted-foreground">{profile.age}</span></h1>
//               <div className="flex items-center gap-4 mt-3 text-muted-foreground">
//                 <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {profile.city}</span>
//                 <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> {profile.rating} ({profile.reviews} reviews)</span>
//               </div>
//             </div>

//             <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
//               <h3 className="font-extrabold mb-3">About</h3>
//               <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
//             </div>

//             <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
//               <h3 className="font-extrabold mb-3">Services</h3>
//               <div className="flex flex-wrap gap-2">
//                 {profile.services.map((s: string) => (
//                   <span key={s} className="bg-accent text-accent-foreground text-sm px-3 py-1.5 rounded-full flex items-center gap-1">
//                     <CheckCircle2 className="w-3 h-3 text-primary" /> {s}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
//               <h3 className="font-extrabold mb-4 flex items-center gap-2"><Clock className="w-4 h-4" /> Pricing</h3>
//               <div className="grid grid-cols-3 gap-3 text-center">
//                 <div className="bg-secondary rounded-xl p-3">
//                   <div className="text-xs text-muted-foreground">1 Hour</div>
//                   <div className="font-extrabold text-lg text-primary">₹{profile.pricing.hour.toLocaleString()}</div>
//                 </div>
//                 <div className="bg-secondary rounded-xl p-3">
//                   <div className="text-xs text-muted-foreground">3 Hours</div>
//                   <div className="font-extrabold text-lg text-primary">₹{profile.pricing.threeHour.toLocaleString()}</div>
//                 </div>
//                 <div className="bg-secondary rounded-xl p-3">
//                   <div className="text-xs text-muted-foreground">Full Night</div>
//                   <div className="font-extrabold text-lg text-primary">₹{profile.pricing.night.toLocaleString()}</div>
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-3">
//               <a href={wa} target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition shadow-card">
//                 <MessageCircle className="w-5 h-5" /> WhatsApp
//               </a>
//               <a href={tel} className="gradient-primary text-primary-foreground font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-105 transition shadow-glow">
//                 <Phone className="w-5 h-5" /> Call Now
//               </a>
//             </div>
//             <p className="text-xs text-muted-foreground text-center">Direct contact. No middlemen. 100% discreet.</p>
//             <div className="text-center"><Link to="/explore" className="text-primary font-semibold text-sm">← Back to Explore</Link></div>
//           </div>
//         </div>
//       </section>
//       <Footer />
//     </div>
//   );
// }


import { Link } from "@tanstack/react-router";
import { Star, MapPin, Phone, MessageCircle, Shield, Clock, CheckCircle2, Crown } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Profile({ profile }: { profile: any }) {
  // 🟢 Fixed: whatsAppNumber undefined check
  const waNumber = profile?.whatsAppNumber || "";
  const wa = `https://wa.me/${waNumber.replace(/\D/g, "")}`;
  const tel = `tel:${waNumber}`;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-card relative">
              {/* 🟢 Fixed: gallery is an array, showing first image */}
              <img 
                src={Array.isArray(profile.gallery) ? profile.gallery[0] : profile.gallery} 
                alt={profile.name} 
                className="w-full h-full object-cover" 
              />
              <span className="absolute top-4 right-4 bg-black/60 backdrop-blur text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Online Now
              </span>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-extrabold capitalize">{profile.name}, <span className="text-muted-foreground">{profile.age}</span></h1>
              <div className="flex items-center gap-4 mt-3 text-muted-foreground">
                {/* 🟢 FIXED: profile.city is an object, using .name */}
                <span className="flex items-center gap-1 font-medium">
                  <MapPin className="w-4 h-4" /> {profile.city?.name || "Premium City"}
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> 4.9 (Verified)
                </span>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
              <h3 className="font-extrabold mb-3">About</h3>
              <p className="text-muted-foreground leading-relaxed italic">"{profile.bio}"</p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
              <h3 className="font-extrabold mb-3">Services</h3>
              <div className="flex flex-wrap gap-2">
                {/* 🟢 FIXED: services are objects, using .name */}
                {profile.services?.map((s: any) => (
                  <span key={s._id} className="bg-accent text-accent-foreground text-sm px-3 py-1.5 rounded-full flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3 h-3 text-primary" /> {s.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
              <h3 className="font-extrabold mb-4 flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Pricing</h3>
              <div className="grid grid-cols-3 gap-3 text-center">
                {/* 🟢 FIXED: pricing keys matched with backend (oneHour, threeHours, fullNight) */}
                <div className="bg-secondary rounded-xl p-3">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">1 Hour</div>
                  <div className="font-extrabold text-lg text-primary">₹{profile.pricing?.oneHour || 0}</div>
                </div>
                <div className="bg-secondary rounded-xl p-3">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">3 Hours</div>
                  <div className="font-extrabold text-lg text-primary">₹{profile.pricing?.threeHours || 0}</div>
                </div>
                <div className="bg-secondary rounded-xl p-3">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Full Night</div>
                  <div className="font-extrabold text-lg text-primary">₹{profile.pricing?.fullNight || 0}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a href={wa} target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition shadow-card active:scale-95">
                <MessageCircle className="w-5 h-5" /> WhatsApp
              </a>
              <a href={tel} className="gradient-primary text-primary-foreground font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-105 transition shadow-glow active:scale-95">
                <Phone className="w-5 h-5" /> Call Now
              </a>
            </div>
            <p className="text-xs text-muted-foreground text-center font-medium">Direct contact. No middlemen. 100% discreet.</p>
            <div className="text-center"><Link to="/explore" className="text-primary font-bold text-sm hover:underline">← Back to Explore</Link></div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}