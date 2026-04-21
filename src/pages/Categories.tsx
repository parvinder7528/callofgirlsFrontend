import { Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { categories, profiles } from "@/lib/data";
import { ProfileCard } from "@/components/ProfileCard";
import { useGetAllProfilesQuery } from "@/redux/api/providerApiSlice";
import { useSearch } from "@tanstack/react-router";
export default function Categories() {
  const search: string = useSearch({ from: '/categories' });
  console.log(search, "search")
  const categoryId = search.catId;
  const params = { categoryId: categoryId, city: "" }
  const { data: profileRes, isLoading: isAllProfileLoading } = useGetAllProfilesQuery(params);
  const profileData = profileRes?.data || []



  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="gradient-hero py-16 text-white text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl">Browse by <span className="text-white/70">Category</span></h1>
          <p className="mt-3 text-white/90">Find exactly what you're looking for.</p>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {categories.map(c => (
            <Link key={c.id} to="/explore" className="group relative aspect-square rounded-3xl overflow-hidden shadow-card hover:shadow-glow transition">
              <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <h3 className="text-2xl font-extrabold">{c.name}</h3>
                <p className="text-sm opacity-90">{c.count} profiles</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mb-12">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-3xl">{profileData[0]?.category.name}</h2>
            <Link to="/explore" className="text-primary font-bold text-sm">See all →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {profileData?.map(p => <ProfileCard key={p._id} profile={p} />)}
          </div>
        </div>
       
      </section>

      <Footer />
    </div>
  );
}
