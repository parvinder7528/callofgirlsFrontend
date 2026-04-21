import { Link } from "@tanstack/react-router";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-extrabold text-gradient-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist.</p>
        <Link to="/" className="inline-flex mt-6 items-center justify-center rounded-full gradient-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-glow">
          Go home
        </Link>
      </div>
    </div>
  );
}
