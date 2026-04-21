

import { useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, Crown } from "lucide-react";
import { toast } from "react-toastify";
import { useLoginMutation } from "@/redux/api/authApiSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      
      if (res.success) {
        localStorage.setItem("call_accessToken", res.data.token);
        toast.success("Welcome back!");
        
        if (res.data) {
          navigate({ to: "/" });
        } else {
          navigate({ to: "/register" });
        }
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Login failed. Please check credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto rounded-2xl gradient-hero flex items-center justify-center shadow-glow mb-4">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Login to manage your profile</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 bg-card p-8 rounded-[2.5rem] shadow-card border border-border">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-sm font-semibold ml-1">Email Address</label>
            <div className="flex items-center gap-3 bg-input rounded-2xl px-4 py-1 border border-transparent focus-within:border-primary/50 transition">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="riya@gmail.com"
                className="bg-transparent outline-none py-3 w-full text-sm"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-semibold ml-1">Password</label>
            <div className="flex items-center gap-3 bg-input rounded-2xl px-4 py-1 border border-transparent focus-within:border-primary/50 transition">
              <Lock className="w-5 h-5 text-muted-foreground" />
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-transparent outline-none py-3 w-full text-sm"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-primary transition"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="text-right">
            <Link className="text-xs font-bold text-primary hover:underline">Forgot Password?</Link>
          </div>

          {/* Login Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full gradient-primary text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-glow hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-70"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Login Now <ArrowRight className="w-5 h-5" /></>}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-muted-foreground font-medium">
          Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Join as Provider</Link>
        </p>
      </div>
    </div>
  );
}