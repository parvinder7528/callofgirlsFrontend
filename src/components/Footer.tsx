import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50 mt-20">
      <div className="container mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Logo size={36} />
            <span className="font-extrabold text-lg">LuxeCompanions</span>
          </div>
          <p className="text-sm text-muted-foreground">Premium companion directory. Verified, discreet, elegant.</p>
        </div>
        <div>
          <h4 className="font-bold mb-3 text-sm">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/explore" className="hover:text-primary">All Profiles</Link></li>
            <li><Link to="/categories" className="hover:text-primary">Categories</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3 text-sm">Account</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/login" className="hover:text-primary">Login</Link></li>
            <li><Link to="/register" className="hover:text-primary">Join as Provider</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3 text-sm">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>18+ Only</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © 2026 LuxeCompanions. All rights reserved. Adults 18+ only.
      </div>
    </footer>
  );
}
