import { 
  MessageCircle, Phone, MapPin, Star, ShieldCheck, 
  Clock, Calendar, Award, CheckCircle2, ChevronLeft, 
  Loader2,
  LogOut
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useGetProfileQuery } from "@/redux/api/authApiSlice";
import { Header } from "@/components/Header";

export default function ProfilePage() {
    const { data: response, isLoading: meIsLoading, isError } = useGetProfileQuery();
const userData = response?.userData;
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("call_accessToken"); 
   window.location.href = "/";
  };
if (meIsLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
    </div>
  );
}
  return (
    <>
    <Header />
    <div className="min-h-screen bg-background pb-12">
      {/* --- Header / Cover Section --- */}
      <div className="h-64 md:h-80 w-full gradient-hero relative">
        <button 
          onClick={() => navigate({ to: "/" })}
          className="absolute top-6 left-6 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
            onClick={handleLogout}
            className="absolute top-6 right-6 px-4 py-2 bg-red-500/20 backdrop-blur-md border border-red-500/50 rounded-full text-red-100 font-bold flex items-center gap-2 hover:bg-red-500 transition"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <div className="relative -mt-24 md:-mt-32 flex flex-col md:flex-row gap-8 items-start">
          
          {/* --- Left Column: Photo & Quick Actions --- */}
          <div className="w-full md:w-80 space-y-6">
            <div className="relative group">
              <img 
                src={userData?.gallery[0]} 
                alt={userData?.name}
                className="w-full aspect-[3/4] object-cover rounded-[2rem] shadow-2xl border-4 border-card"
              />
              <div className="absolute top-4 right-4 bg-green-500 w-4 h-4 rounded-full border-2 border-white shadow-glow animate-pulse"></div>
            </div>

            <div className="bg-card rounded-3xl p-6 shadow-card border border-border space-y-4">
              <button className="w-full gradient-primary text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-glow hover:scale-[1.02] transition">
                <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
              </button>
              <button className="w-full bg-accent text-foreground font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-accent/80 transition">
                <Phone className="w-5 h-5" /> Call Now
              </button>
            </div>
          </div>

          {/* --- Right Column: Details --- */}
          <div className="flex-1 space-y-8 pt-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl md:text-5xl font-black capitalize">{userData.name}</h1>
                <ShieldCheck className="w-8 h-8 text-primary shadow-glow" />
              </div>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground font-medium">
                <span className="flex items-center gap-1.5 bg-accent px-3 py-1 rounded-full text-sm">
                  <Calendar className="w-4 h-4" /> {userData.age} Years
                </span>
                <span className="flex items-center gap-1.5 bg-accent px-3 py-1 rounded-full text-sm">
                  <MapPin className="w-4 h-4" /> Mumbai
                </span>
                <span className="flex items-center gap-1.5 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" /> 4.9 (Verified)
                </span>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "1 Hour", price: userData.pricing.oneHour, icon: Clock },
                { label: "3 Hours", price: userData.pricing.threeHours, icon: Award },
                { label: "Full Night", price: userData.pricing.fullNight, icon: Star },
              ].map((p, i) => (
                <div key={i} className="bg-card border border-border p-5 rounded-3xl shadow-sm hover:border-primary/50 transition cursor-default">
                  <p className="text-muted-foreground text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                    <p.icon className="w-3 h-3" /> {p.label}
                  </p>
                  <p className="text-2xl font-black text-primary">₹{p.price.toLocaleString()}</p>
                </div>
              ))}
            </div>

            {/* About Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <div className="w-2 h-8 gradient-primary rounded-full"></div>
                About Me
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg italic">
                "{userData.bio}"
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <div className="w-2 h-8 gradient-primary rounded-full"></div>
                Gallery
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {userData.gallery.map((img: string, i: number) => (
                  <img 
                    key={i} 
                    src={img} 
                    className="w-full aspect-square object-cover rounded-3xl border border-border hover:opacity-90 transition cursor-zoom-in"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}


