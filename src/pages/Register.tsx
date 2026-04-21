


import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { User, Calendar, Phone, Mail, ArrowRight, ArrowLeft, Crown, Camera, Plus, MessageCircle, Check, Loader2, Lock, EyeOff, Eye } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useGetCityCategoryServiceQuery, useGetCurrentStepQuery, useManageProfileMutation, useSignupMutation, useUploadPhotosMutation } from "@/redux/api/authApiSlice";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();


  const [uploadPhotos, { isLoading: isUploading }] = useUploadPhotosMutation();
  const { data: setupData, isLoading: isLoadingLocation } = useGetCityCategoryServiceQuery();
  const { data: currentStep, isLoading: currentStepLoading } = useGetCurrentStepQuery();
  const [signup, { isLoading: isRegistering }] = useSignupMutation();
  const [manageProfile, { isLoading: isUpdating }] = useManageProfileMutation();

  const [isView, setIsView] = useState(false);
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    name: "riya", age: "20", phone: "8115809072", email: "", password: "12345678",
    city: "", category: "",
    bio: "", services: [] as string[],
    pricing: { hour: "", threeHour: "", night: "" },
    photos: [] as string[], whatsapp: "", agree: false,
  });

  // API data ko extract kar rahe hain
  const apiCities = setupData?.data?.cities || [];
  const apiCategories = setupData?.data?.categories || [];
  const apiServices = setupData?.data?.services || [];

  const stepValid = () => {
    if (step === 1) return data.name && data.age && data.phone && data.email;
    if (step === 2) return data.city && data.category;
    if (step === 3) return data.bio.length > 0 && data.services.length > 0;
    if (step === 4) return data.agree;
    return false;
  };

  const next = async () => {
    if (!stepValid()) return;

    try {
      if (step === 1) {
        const res = await signup({
          name: data.name,
          email: data.email,
          password: data.password,
          age: Number(data.age),
          phoneNumber: data.phone,
        }).unwrap();

        if (res.data?.token) {
          localStorage.setItem('call_accessToken', res?.data.token);
          toast.success(res.message);
          setStep(res?.data?.currentStep || 2);
        }
      }
      else if (step === 2) {
        await manageProfile({
          step: 2,
          data: { cityId: data.city, categoryId: data.category }
        }).unwrap();
        setStep(3);
      }
      else if (step === 3) {
        await manageProfile({
          step: 3,
          data: {
            bio: data.bio,
            servicesIds: data.services,
            pricing: {
              oneHour: Number(data.pricing.hour),
              threeHours: Number(data.pricing.threeHour),
              fullNight: Number(data.pricing.night)
            }
          }
        }).unwrap();
        setStep(4);
      }
    } catch (err: any) {
      alert(err?.data?.message || "Data store karne mein dikkat aayi.");
    }
  };



  const back = () => setStep(s => Math.max(1, s - 1));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await manageProfile({
        step: 4,
        data: {
          gallery: data.photos,
          whatsAppNumber: data.whatsapp,
          isVerifiedAge: data.agree
        }
      }).unwrap();

      toast.success("Profile created successfully!");
      navigate({ to: "/" });
    } catch (err: any) {
      alert(err?.data?.message || "Final step failed");
    }
  };

  const toggleService = (id: string) =>
    setData(d => ({
      ...d,
      services: d.services.includes(id) ? d.services.filter(x => x !== id) : [...d.services, id]
    }));

  const isLoading = isRegistering || isUpdating;
  useEffect(() => {
    setStep(Number(currentStep?.data?.currentStep || 1))
  }, [currentStep])
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <section className="flex-1 py-12 px-6 gradient-soft">
        <div className="max-w-2xl mx-auto">
          {/* Header section remains same */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 mx-auto rounded-3xl gradient-hero flex items-center justify-center shadow-glow mb-4">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl">Join as Provider</h1>
            <p className="text-muted-foreground mt-2">Create your profile and start earning</p>
          </div>

          {/* Stepper remains same */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition ${step >= n ? "gradient-primary text-primary-foreground shadow-glow" : "bg-accent text-muted-foreground"}`}>
                  {step > n ? <Check className="w-4 h-4" /> : n}
                </div>
                {n < 4 && <div className={`w-12 md:w-20 h-1 rounded-full ${step > n ? "bg-primary" : "bg-accent"}`} />}
              </div>
            ))}
          </div>

          <form onSubmit={submit} className="bg-card rounded-3xl shadow-card p-8 border border-border">
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-xl font-extrabold">Basic Information</h2>
                <Field label="Display Name" icon={User}>
                  <input value={data.name} onChange={e => setData({ ...data, name: e.target.value })} placeholder="Your name" className="bg-transparent outline-none py-3 w-full text-sm" />
                </Field>
                <Field label="Age" icon={Calendar}>
                  <input type="number" min="18" value={data.age} onChange={e => setData({ ...data, age: e.target.value })} placeholder="21" className="bg-transparent outline-none py-3 w-full text-sm" />
                </Field>
                <Field label="Phone Number" icon={Phone}>
                  <span className="text-sm text-muted-foreground">+91</span>
                  <input value={data.phone} onChange={e => setData({ ...data, phone: e.target.value })} placeholder="98765 43210" className="bg-transparent outline-none py-3 w-full text-sm" />
                </Field>
                <Field label="Email" icon={Mail}>
                  <input type="email" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} placeholder="you@example.com" className="bg-transparent outline-none py-3 w-full text-sm" />
                </Field>
                <Field label="Password" icon={Lock}>
                  <input
                    type={isView ? "text" : "password"}
                    value={data.password}
                    onChange={e => setData({ ...data, password: e.target.value })}
                    placeholder="Password"
                    className="bg-transparent outline-none py-3 w-full text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setIsView(!isView)}
                    className="p-2 hover:bg-accent rounded-lg transition text-muted-foreground"
                  >
                    {isView ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </Field>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-extrabold">Location & Category</h2>
                {isLoadingLocation ? <div className="text-center py-4"><Loader2 className="animate-spin mx-auto" /></div> : (
                  <>
                    <div>
                      <label className="text-sm font-semibold mb-3 block">City</label>
                      <div className="grid grid-cols-3 gap-2">
                        {apiCities.map((c: any) => (
                          <button type="button" key={c._id} onClick={() => setData({ ...data, city: c._id })}
                            className={`px-3 py-3 rounded-xl text-sm font-semibold transition ${data.city === c._id ? "gradient-primary text-primary-foreground shadow-glow" : "bg-accent hover:bg-primary/10"}`}>{c.name}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-3 block">Category</label>
                      <div className="grid grid-cols-2 gap-2">
                        {apiCategories.map((c: any) => (
                          <button type="button" key={c._id} onClick={() => setData({ ...data, category: c._id })}
                            className={`px-3 py-3 rounded-xl text-sm font-semibold transition ${data.category === c._id ? "gradient-primary text-primary-foreground shadow-glow" : "bg-accent hover:bg-primary/10"}`}>{c.name}</button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-extrabold">About You & Services</h2>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Bio / Description</label>
                  <textarea maxLength={500} value={data.bio} onChange={e => setData({ ...data, bio: e.target.value })}
                    rows={4} placeholder="Tell clients about yourself..."
                    className="bg-input rounded-xl p-4 w-full text-sm outline-none resize-none" />
                  <div className="text-xs text-muted-foreground text-right mt-1">{data.bio.length}/500</div>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-3 block">Services Offered</label>
                  {isLoadingLocation ? <Loader2 className="animate-spin" /> : (
                    <div className="flex flex-wrap gap-2">
                      {apiServices.map((s: any) => (
                        <button type="button" key={s._id} onClick={() => toggleService(s._id)}
                          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${data.services.includes(s._id) ? "gradient-primary text-primary-foreground" : "bg-accent hover:bg-primary/10"}`}>{s.name}</button>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-semibold mb-3 block">Pricing (₹)</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(["hour", "threeHour", "night"] as const).map(k => (
                      <div key={k}>
                        <div className="text-xs text-muted-foreground mb-1">{k === "hour" ? "1 Hour" : k === "threeHour" ? "3 Hours" : "Full Night"}</div>
                        <input value={data.pricing[k]} onChange={e => setData({ ...data, pricing: { ...data.pricing, [k]: e.target.value } })}
                          placeholder={k === "hour" ? "3000" : k === "threeHour" ? "8000" : "20000"}
                          className="bg-input rounded-xl px-3 py-2.5 w-full text-sm outline-none" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-extrabold">Photos & Verification</h2>

                <div>
                  <label className="text-sm font-semibold mb-3 block">Profile Photos</label>

                  {/* 🟢 Hidden Input Field */}
                  <input
                    type="file"
                    id="photo-upload"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const files = e.target.files;
                      if (!files || files.length === 0) return;

                      const formData = new FormData();
                      Array.from(files).forEach((file) => {
                        formData.append("photos", file); // 'photos' must match backend upload.array('photos')
                      });

                      try {
                        // API Call to upload
                        const res = await uploadPhotos(formData).unwrap();
                        if (res.success) {
                          // Backend se aaye paths ko state mein save karein
                          setData({ ...data, photos: [...data.photos, ...res.paths] });
                          toast.success("Photos uploaded successfully!");
                        }
                      } catch (err: any) {
                        toast.error(err?.data?.message || "Upload failed");
                      }
                    }}
                  />

                  <div className="grid grid-cols-3 gap-3">
                    {/* 🟢 Upload Button Linked to Hidden Input */}
                    <button
                      type="button"
                      onClick={() => document.getElementById('photo-upload')?.click()}
                      disabled={isUploading}
                      className="aspect-square bg-accent border-2 border-dashed border-primary/30 rounded-2xl flex flex-col items-center justify-center text-primary hover:bg-primary/5 transition disabled:opacity-50"
                    >
                      {isUploading ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        <>
                          <Camera className="w-6 h-6 mb-1" />
                          <span className="text-xs font-semibold">Add Photos</span>
                        </>
                      )}
                    </button>

                    {/* 🟢 Preview Uploaded Images */}
                    {data.photos.map((url, idx) => (
                      <div key={idx} className="relative aspect-square">
                        <img
                          src={`${url}`}
                          alt="preview"
                          className="w-full h-full object-cover rounded-2xl border border-border"
                        />
                        <button
                          type="button"
                          onClick={() => setData({ ...data, photos: data.photos.filter((_, i) => i !== idx) })}
                          className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 shadow-lg"
                        >
                          <Plus className="w-3 h-3 rotate-45" />
                        </button>
                      </div>
                    ))}

                    {/* Placeholder if empty slots */}
                    {data.photos.length < 2 && (
                      <div className="aspect-square bg-accent/50 border-2 border-dashed border-border rounded-2xl flex items-center justify-center text-muted-foreground">
                        <Plus className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Upload at least 1 photo. Max 10 photos.</p>
                </div>

                <Field label="WhatsApp Number" icon={MessageCircle}>
                  <input
                    value={data.whatsapp}
                    onChange={e => setData({ ...data, whatsapp: e.target.value })}
                    placeholder="Same as phone or different"
                    className="bg-transparent outline-none py-3 w-full text-sm"
                  />
                </Field>

                <label className="flex items-start gap-3 bg-accent/50 p-4 rounded-xl text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.agree}
                    onChange={e => setData({ ...data, agree: e.target.checked })}
                    className="accent-primary mt-1"
                  />
                  <span>
                    I confirm that I am 18+ years old and agree to the
                    <a className="text-primary font-semibold ml-1">Terms of Service</a> and
                    <a className="text-primary font-semibold ml-1">Privacy Policy</a>.
                  </span>
                </label>
              </div>
            )}

            {/* Buttons section remains same */}
            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <button type="button" onClick={back} className="flex-1 bg-card border border-border font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-accent transition">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              )}
              {step < 4 ? (
                <button type="button" onClick={next} disabled={!stepValid() || isLoading}
                  className="flex-1 gradient-primary text-primary-foreground font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition shadow-glow disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed">
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Continue <ArrowRight className="w-4 h-4" /></>}
                </button>
              ) : (
                <button type="submit" disabled={!stepValid() || isLoading}
                  className="flex-1 gradient-primary text-primary-foreground font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition shadow-glow disabled:opacity-50">
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Check className="w-4 h-4" /> Create Profile</>}
                </button>
              )}
            </div>
          </form>

          <p className="text-center mt-6 text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary font-bold">Login</Link>
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function Field({ label, icon: Icon, children }: { label: string; icon: any; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm font-semibold mb-2 block">{label}</label>
      <div className="flex items-center gap-2 bg-input rounded-xl px-4">
        <Icon className="w-4 h-4 text-muted-foreground" />
        {children}
      </div>
    </div>
  );
}