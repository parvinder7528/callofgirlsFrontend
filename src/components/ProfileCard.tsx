// import { Link } from "@tanstack/react-router";
// import { Star, MapPin, Heart, Crown, Flame } from "lucide-react";
// import type { Profile } from "@/lib/data";

// export function ProfileCard({ profile }: { profile: Profile }) {
//   return (
//     <div className="group bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
//       <div className="relative aspect-[3/4] overflow-hidden">
//         <img src={profile.gallery[0]} alt={profile.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

//         <div className="absolute top-3 left-3 flex flex-col gap-1.5">
//           {profile.featured && (
//             <span className="gradient-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 w-fit">
//               <Star className="w-3 h-3 fill-current" /> Featured
//             </span>
//           )}
//           {profile.vip && (
//             <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 w-fit">
//               <Crown className="w-3 h-3 fill-current" /> VIP
//             </span>
//           )}
//           {profile.trending && (
//             <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 w-fit">
//               <Flame className="w-3 h-3 fill-current" /> Trending
//             </span>
//           )}
//         </div>

//         {profile.online && (
//           <span className="absolute top-3 right-3 bg-black/60 backdrop-blur text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5">
//             <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Online
//           </span>
//         )}

//         <button className="absolute top-12 right-3 w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition">
//           <Heart className="w-4 h-4" />
//         </button>

//         <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
//           <div className="flex items-end justify-between">
//             <div>
//               <h3 className="font-extrabold text-lg leading-tight">{profile.name}, {profile.age}</h3>
//               <div className="flex items-center gap-1 text-xs opacity-90 mt-0.5">
//                 <MapPin className="w-3 h-3" /> {profile.city}
//               </div>
//             </div>
//             <div className="flex items-center gap-1 bg-black/40 backdrop-blur px-2 py-1 rounded-full">
//               <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
//               <span className="text-xs font-bold">{profile.rating}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="p-4 flex items-center justify-between gap-2">
//         <div className="flex flex-wrap gap-1 flex-1">
//           {profile.services.slice(0, 2).map(s => (
//             <span key={s} className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">{s}</span>
//           ))}
//         </div>
//         <Link to="/profile/$id" params={{ id: profile.id }} className="gradient-primary text-primary-foreground text-xs font-bold px-4 py-2 rounded-full hover:scale-105 transition shrink-0">
//           View Profile
//         </Link>
//       </div>
//     </div>
//   );
// }

import { Link } from "@tanstack/react-router";
import { Star, Crown, Flame, MapPin, Heart } from "lucide-react";

export function ProfileCard({ profile }: { profile: any }) {
  return (
    <div className="group bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-[3/4] overflow-hidden">
        {/* Main Photo from Gallery */}
        <img 
          src={profile.gallery?.[0]} 
          alt={profile.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
          loading="lazy" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* --- Badges Overlay (VIP, Trending, Featured) --- */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {/* Featured Badge (Based on isVerifiedAge or data) */}
          {(profile.featured || profile.isVerifiedAge) && (
            <span className="gradient-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 w-fit">
              <Star className="w-3 h-3 fill-current" /> Featured
            </span>
          )}

          {/* VIP Badge */}
          {!profile.vip && (
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 w-fit">
              <Crown className="w-3 h-3 fill-current" /> VIP
            </span>
          )}

          {/* Trending Badge */}
          {!profile.trending && (
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 w-fit">
              <Flame className="w-3 h-3 fill-current" /> Trending
            </span>
          )}
        </div>

        {/* Online Status Badge */}
        {/* Agar backend me 'online' field nahi hai, to isVerifiedAge ko indicator ki tarah use kar sakte hain ya static dikha sakte hain */}
        {(!profile.online || true) && (
          <span className="absolute top-3 right-3 bg-black/60 backdrop-blur text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Online
          </span>
        )}

        {/* Favorite/Heart Button */}
        <button className="absolute top-12 right-3 w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition shadow-lg">
          <Heart className="w-4 h-4" />
        </button>

        {/* Info Overlay (Name, Age, City, Rating) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="font-extrabold text-lg leading-tight capitalize">
                {profile.name}, {profile.age}
              </h3>
              <div className="flex items-center gap-1 text-xs opacity-90 mt-0.5">
                <MapPin className="w-3 h-3" /> 
                {/* City Object Fix */}
                {profile.city?.name || "Premium City"}
              </div>
            </div>
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur px-2 py-1 rounded-full">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              {/* Rating static 4.9 ya data se */}
              <span className="text-xs font-bold">{profile.rating || "4.9"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Footer (Services & CTA) --- */}
      <div className="p-4 flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1 flex-1">
          {/* Services Object Array Fix */}
          {profile.services?.slice(0, 2).map((s: any) => (
            <span key={s._id} className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
              {s.name}
            </span>
          ))}
        </div>
        
        {/* Navigation Link Fix */}
        <Link 
          to="/profile/$id" 
          params={{ id: profile._id }} 
          className="gradient-primary text-primary-foreground text-xs font-bold px-4 py-2 rounded-full hover:scale-105 transition shrink-0"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}