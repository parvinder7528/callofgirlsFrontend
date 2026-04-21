// import { createFileRoute, Link, notFound } from "@tanstack/react-router";
// import Profile from "@/pages/Profile";
// import { profiles } from "@/lib/data";

// export const Route = createFileRoute("/profile/$id")({
  
//   loader: ({ params }) => {
//     const profile = profiles.find(p => p.id === params.id);
//     if (!profile) throw notFound();
//     return { profile };
//   },
//   head: ({ loaderData }) => ({
//     meta: loaderData ? [
//       { title: `${loaderData.profile.name}, ${loaderData.profile.age} — ${loaderData.profile.city} | LuxeCompanions` },
//       { name: "description", content: loaderData.profile.bio },
//       { property: "og:image", content: loaderData.profile.image },
//     ] : [],
//   }),
//   component: ProfileRoute,
//   notFoundComponent: () => (
//     <div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-3xl font-bold">Profile not found</h1><Link to="/explore" className="text-primary mt-4 inline-block">Browse profiles →</Link></div></div>
//   ),
// });

// function ProfileRoute() {
//   const { profile } = Route.useLoaderData();
//   return <Profile profile={profile} />;
// }



import { createFileRoute, Link } from "@tanstack/react-router";
import Profile from "@/pages/Profile";
import { useGetProfileByIdQuery } from "@/redux/api/providerApiSlice";
import { Loader2, ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/profile/$id")({
  // Loader sirf params ko return karega, data fetch hum component mein karenge
  loader: ({ params }) => {
    return { id: params.id };
  },
  component: ProfileRoute,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Profile not found</h1>
        <Link to="/explore" className="text-primary mt-4 inline-block font-bold">
          Browse profiles →
        </Link>
      </div>
    </div>
  ),
});

function ProfileRoute() {
  // 1. Loader se ID nikalen
  const { id } = Route.useLoaderData();

  const { data: response, isLoading, isError } = useGetProfileByIdQuery(id);
  const profileData = response?.data;
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground font-medium italic">Fetching premium profile...</p>
      </div>
    );
  }

  // 4. Error ya Not Found State
  if (isError || !profileData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-black mb-4">Oops! Profile disappeared.</h2>
        <Link to="/" className="gradient-primary text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-glow">
          <ChevronLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    );
  }

  // 5. Success: Main Profile Page ko data pass karein
  return <Profile profile={profileData} />;
}