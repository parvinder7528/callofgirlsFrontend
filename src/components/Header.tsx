// import { Link } from "@tanstack/react-router";
// import { Logo } from "./Logo";
// import { useAppSelector } from "@/hooks/reduxHook";

// export function Header() {
//   const { user, isAuthenticated } = useAppSelector((state) => state.auth);
//   return (
//     <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
//       <div className="container mx-auto px-6 py-4 flex items-center justify-between">
//         <Link to="/" className="flex items-center gap-2">
//           <Logo size={44} />
//           <span className="font-extrabold text-xl tracking-tight hidden sm:inline">LuxeCompanions</span>
//         </Link>
//         <nav className="hidden md:flex items-center gap-8">
//           <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }} className="text-sm font-semibold hover:text-primary transition">Home</Link>
//           <Link to="/explore" activeProps={{ className: "text-primary" }} className="text-sm font-semibold hover:text-primary transition">Explore</Link>
//           <Link to="/categories" activeProps={{ className: "text-primary" }} className="text-sm font-semibold hover:text-primary transition">Categories</Link>
//         </nav>
//         <div className="flex items-center gap-3">
//           <Link to="/login" className="text-sm font-semibold text-primary hover:opacity-80 transition px-3 py-2">Login</Link>
//           <Link to="/register" className="gradient-primary text-primary-foreground text-sm font-bold px-5 py-2.5 rounded-full shadow-glow hover:scale-105 transition">
//             Join as Provider
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }


import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { useAppSelector } from "@/hooks/reduxHook";
import { User } from "lucide-react"; // Fallback icon ke liye

export function Header() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo size={44} />
          <span className="font-extrabold text-xl tracking-tight hidden sm:inline">LuxeCompanions</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }} className="text-sm font-semibold hover:text-primary transition">Home</Link>
          <Link to="/explore" activeProps={{ className: "text-primary" }} className="text-sm font-semibold hover:text-primary transition">Explore</Link>
          <Link to="/categories" activeProps={{ className: "text-primary" }} className="text-sm font-semibold hover:text-primary transition">Categories</Link>
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            /* 🟢 Logged In State: Show Profile Image/Icon */
            <Link 
              to="/myprofile" 
              className="flex items-center gap-3 group p-1 pr-3 rounded-full hover:bg-accent transition"
            >
              <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden shadow-glow group-hover:scale-105 transition">
                {user?.gallery && user.gallery.length > 0 ? (
                  <img 
                    src={user.gallery[0]} 
                    alt={user.name} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="w-full h-full bg-accent flex items-center justify-center">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold capitalize leading-none">{user?.name || "Profile"}</p>
                <p className="text-[10px] text-primary font-medium mt-1">Online</p>
              </div>
            </Link>
          ) : (
            /* 🔴 Logged Out State: Show Login/Register */
            <>
              <Link to="/login" className="text-sm font-semibold text-primary hover:opacity-80 transition px-3 py-2">Login</Link>
              <Link to="/register" className="gradient-primary text-primary-foreground text-sm font-bold px-5 py-2.5 rounded-full shadow-glow hover:scale-105 transition">
                Join as Provider
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}