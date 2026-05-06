'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Phone, Mail, MapPin, Instagram, Menu, X, 
  ArrowRight, CheckCheck, Loader2, ImageOff, 
  Leaf, ShieldCheck, Zap, Package, Users, Sun, 
  UtensilsCrossed, ChefHat, Timer, Flame, ShoppingBag
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-RULE
// Typography Personality: refined

// --- UI COMPONENTS ---

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-primary/60 to-accent/10 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image 
      src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} 
    />
  );
}

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

// --- DATA ---

const brand = {
  name: "Food Hub by Centia",
  tagline: "The Soul of Onitsha's Traditional Kitchen",
  description: "Authentic Nigerian foodstuff, processed with care and delivered fresh. From giant snails to premium seafood and essential spices, we bridge the gap between the local harvest and your home.",
  industry: "food",
  region: "nigeria"
};

const contact = {
  whatsapp: "2340000000000",
  instagram: "@foodhub_by_centia",
  email: "",
  address: "Onitsha, Anambra State, Nigeria"
};

const products = [
  { name: "Jumbo Dried Snails", description: "Specially cleaned and dehydrated giant African snails, preserved to retain flavor.", price: "₦45,000", image: "https://picsum.photos/seed/food2/800/600" },
  { name: "Seafood Power Mix", description: "A premium blend of cleaned prawns, periwinkles, and dried crayfish.", price: "₦28,500", image: "https://picsum.photos/seed/food3/800/600" },
  { name: "Traditional Soup Starter", description: "Premium hand-picked Ogbono and authentic local spices for the perfect draw.", price: "₦15,000", image: "https://picsum.photos/seed/food4/800/600" },
  { name: "Local Proteins Bundle", description: "A selection of dehydrated vegetables, cocoyam powder, and assorted proteins.", price: "₦52,000", image: "https://picsum.photos/seed/food5/800/600" }
];

const features = [
  { title: "Natural Sourcing", description: "We source directly from local farmers to ensure 100% organic quality.", icon: Leaf },
  { title: "Hygienic Processing", description: "Modern packaging standards applied to traditional Nigerian foodstuff.", icon: ShieldCheck },
  { title: "Fast Delivery", description: "Swift logistics from Onitsha to your doorstep across the region.", icon: Zap }
];

const stats = [
  { number: '1,300+', label: 'Foodies Served', icon: Users },
  { number: '25+', label: 'Varieties', icon: Package },
  { number: '100%', label: 'Organic', icon: Sun }
];

const processSteps = [
  { number: "01", title: "Sourcing", description: "Selecting the finest snails and seafood from local Onitsha markets." },
  { number: "02", title: "Processing", description: "Traditional cleaning and dehydration to lock in natural nutrients." },
  { number: "03", title: "Packaging", description: "Airtight sealing to ensure long shelf life without preservatives." }
];

const testimonials = [
  { name: "Chidinma Okafor", text: "The cleanest snails I have ever bought online. Centia is now my permanent plug for seafood.", role: "Verified Customer" },
  { name: "Emeka Nnamdi", text: "Living away from home is easier when you can get authentic Ogbono and crayfish this fresh.", role: "Home Cook" }
];

const galleryImages = [
  "https://picsum.photos/seed/food6/800/600",
  "https://picsum.photos/seed/food7/800/1000",
  "https://picsum.photos/seed/food8/800/600",
  "https://picsum.photos/seed/food9/800/800",
  "https://picsum.photos/seed/food10/800/600",
  "https://picsum.photos/seed/food11/800/1200"
];

// --- SECTIONS ---

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-primary/95 backdrop-blur-xl shadow-xl py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-accent text-primary flex items-center justify-center font-heading font-black text-xl rounded-lg group-hover:scale-110 transition-transform">
            FH
          </div>
          <span className="text-white font-heading text-2xl font-bold tracking-tight hidden sm:block">Centia</span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {['Our Shop', 'From Farm to Pack', 'Our Journey', 'Happy Kitchens'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} 
               className="text-white/70 hover:text-accent transition-colors text-sm font-medium uppercase tracking-widest">
              {item}
            </a>
          ))}
          <a href="#contact" className="bg-accent text-primary px-6 py-2.5 rounded-full font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-accent/10">
            Shop the Harvest
          </a>
        </nav>

        <button className="md:hidden text-white" onClick={() => setMobileMenu(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-primary z-[100] transition-transform duration-500 flex flex-col p-8 ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center mb-16">
          <div className="text-accent font-heading text-3xl font-black">FH</div>
          <button onClick={() => setMobileMenu(false)} className="text-white"><X size={32} /></button>
        </div>
        <nav className="flex flex-col gap-8">
          {['Our Shop', 'From Farm to Pack', 'Our Journey', 'Happy Kitchens'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} 
               onClick={() => setMobileMenu(false)}
               className="text-white text-4xl font-heading font-bold border-b border-white/10 pb-4">
              {item}
            </a>
          ))}
          <a href="#contact" onClick={() => setMobileMenu(false)} 
             className="bg-accent text-primary py-5 rounded-xl font-bold text-xl text-center mt-4">
            Shop the Harvest
          </a>
        </nav>
      </div>
    </header>
  );
};

const Hero = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="home" ref={ref} className="min-h-screen relative flex items-end pb-24 px-6 md:px-16 overflow-hidden">
      <SafeImage src="https://picsum.photos/seed/food0/1920/1080" alt={brand.name} fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent" />
      
      <div className={`relative z-10 max-w-4xl transition-all duration-1000 ${isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8'}`}>
        <h1 className="font-heading text-6xl md:text-[6.5rem] font-black text-white leading-[0.9] tracking-tight">
          Authentic Flavors, <br />
          <span className="text-accent">Expertly Processed.</span>
        </h1>
        <p className="text-white/80 mt-8 text-xl max-w-xl leading-relaxed font-medium">
          Premium foodstuff delivery from the heart of Onitsha. Organic, fresh, and packaged for the modern Nigerian home.
        </p>
        <div className="flex flex-wrap gap-6 mt-12">
          <a href="#contact" className="bg-accent text-primary px-10 py-5 font-black text-lg
            hover:brightness-110 transition-all rounded-full shadow-2xl shadow-accent/20">
            Shop the Harvest
          </a>
          <a href="#our-shop" className="text-white flex items-center gap-3 border-b-2 border-accent/30 pb-1
            hover:border-accent hover:text-accent transition-all font-bold tracking-widest uppercase text-sm self-center">
            View Staples <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="features" ref={ref} className="py-28 px-6 bg-secondary text-primary">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <h2 className="font-heading text-5xl font-black mb-4">Why Choose Centia?</h2>
          <p className="text-primary/60 text-lg">Quality you can taste, packaging you can trust. Sharp delivery, nationwide.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} 
                 style={{ transitionDelay: `${i * 150}ms` }}
                 className={`bg-white/50 backdrop-blur-sm p-10 rounded-[2.5rem] border border-primary/5
                            hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group
                            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-16 h-16 rounded-2xl bg-primary text-accent flex items-center justify-center mb-8
                              group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                <f.icon size={32} />
              </div>
              <h3 className="font-heading text-3xl font-bold mb-4">{f.title}</h3>
              <p className="text-primary/70 leading-relaxed text-lg">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="from-farm-to-pack" ref={ref} className="py-28 px-6 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className="font-heading text-5xl font-black text-white mb-20 text-center">From Farm to Pack</h2>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent hidden md:block" />
          <div className="space-y-16">
            {processSteps.map((step, i) => (
              <div key={i} 
                   className={`flex gap-8 items-start group transition-all duration-1000 
                              ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                   style={{ transitionDelay: `${i * 200}ms` }}>
                <div className="w-14 h-14 rounded-full bg-accent/15 border border-accent/30
                  flex items-center justify-center shrink-0 relative z-10
                  group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                  <span className="font-mono font-black text-accent group-hover:text-primary transition-colors text-lg">
                    {step.number}
                  </span>
                </div>
                <div className="pt-2">
                  <h3 className="font-heading text-3xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-white/60 text-lg leading-relaxed max-w-2xl">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Products = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="our-shop" ref={ref} className="py-28 px-6 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="font-heading text-5xl md:text-6xl font-black text-primary leading-tight">Traditional Staples</h2>
            <p className="text-primary/50 text-xl mt-4">Hand-selected and prepared to order.</p>
          </div>
          <div className="hidden md:block w-32 h-px bg-primary/20 mb-6" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className={`md:col-span-7 group relative rounded-[2rem] overflow-hidden shadow-xl
                          transition-all duration-700 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <div className="relative h-[500px]">
              <SafeImage src={products[0].image} alt={products[0].name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
              <div className="absolute bottom-0 p-10">
                <span className="inline-block bg-accent text-primary text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4">Top Seller</span>
                <h3 className="font-heading text-4xl font-black text-white">{products[0].name}</h3>
                <p className="text-white/70 text-lg mt-3 max-w-md">{products[0].description}</p>
                <div className="flex items-center gap-6 mt-6">
                  <span className="text-accent font-black text-3xl">{products[0].price}</span>
                  <a href="#contact" className="bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-accent transition-all">Order Now</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-5 grid grid-rows-2 gap-6">
            {products.slice(1, 3).map((p, i) => (
              <div key={i} 
                   style={{ transitionDelay: `${(i + 1) * 200}ms` }}
                   className={`group relative rounded-[2rem] overflow-hidden shadow-lg transition-all duration-700
                              ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                <div className="relative h-[238px]">
                  <SafeImage src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
                  <div className="absolute bottom-0 p-6">
                    <h3 className="font-heading text-2xl font-bold text-white">{p.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-accent font-black text-xl">{p.price}</span>
                      <a href="#contact" className="text-white/80 font-bold hover:text-accent transition-colors text-sm underline underline-offset-4">Select</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="gallery" ref={ref} className="py-28 px-6 bg-accent/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-5xl font-black text-primary text-center mb-16">The Centia Pantry</h2>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryImages.map((src, i) => (
            <div key={i} 
                 style={{ transitionDelay: `${i * 100}ms` }}
                 className={`break-inside-avoid group relative rounded-3xl overflow-hidden shadow-lg
                            transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'}`}>
              <SafeImage src={src} alt={`Gallery ${i + 1}`} width={600} height={400}
                className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="our-journey" ref={ref} className="py-28 px-6 bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
          <div className="relative">
            <div className="aspect-square relative rounded-[3rem] overflow-hidden border-8 border-accent/10">
              <SafeImage src="https://picsum.photos/seed/food14/800/800" alt="About Centia" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent rounded-3xl p-6 shadow-2xl animate-float hidden md:flex flex-col justify-center text-primary">
              <span className="font-heading text-4xl font-black">100%</span>
              <span className="font-bold uppercase tracking-widest text-xs mt-2">Organic Heritage</span>
            </div>
          </div>
        </div>
        
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          <h2 className="font-heading text-5xl md:text-6xl font-black text-white leading-tight mb-8">Preserving Our Heritage</h2>
          <p className="text-white/70 text-xl leading-relaxed mb-12">
            At Food Hub by Centia, we believe that distance shouldn't stop you from enjoying authentic local proteins and spices. 
            Our mission is to modernize the processing of traditional foodstuffs while keeping the natural flavors intact.
          </p>
          
          <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/10">
            {stats.map((s, i) => (
              <div key={i} 
                   style={{ transitionDelay: `${i * 150}ms` }}
                   className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <p className="font-heading text-4xl font-black text-accent">{s.number}</p>
                <p className="text-white/40 text-xs uppercase tracking-[0.2em] mt-2 font-bold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="happy-kitchens" ref={ref} className="py-28 px-6 bg-secondary">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-heading text-5xl font-black text-primary mb-20">Happy Kitchens</h2>
        <div className="space-y-10">
          {testimonials.map((t, i) => (
            <div key={i} 
                 style={{ transitionDelay: `${i * 120}ms` }}
                 className={`relative py-12 px-8 rounded-[3rem] border border-primary/10 bg-white/40 backdrop-blur-sm
                            hover:border-accent/40 transition-all duration-500
                            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full
                bg-accent flex items-center justify-center shadow-lg">
                <span className="text-primary text-2xl font-black leading-none">&ldquo;</span>
              </div>
              <p className="text-primary/80 text-2xl font-medium leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
              <div className="mt-10 flex items-center justify-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-primary text-accent flex items-center justify-center font-black text-xl">
                  {t.name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-heading font-bold text-primary text-xl">{t.name}</p>
                  <p className="text-primary/40 text-sm font-bold uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center animate-scaleIn bg-primary rounded-[2.5rem] border border-accent/20 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-50" />
        <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mb-8 border border-accent/40 relative z-10">
          <CheckCheck size={40} className="text-accent" />
        </div>
        <h3 className="font-heading text-4xl font-black text-white mb-4 relative z-10">Order Received</h3>
        <p className="text-white/60 max-w-sm text-lg relative z-10 font-medium">Thank you. Our kitchen team will review your order and contact you for sharp delivery.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-primary/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[80px] rounded-full pointer-events-none" />
      <div className="relative z-10">
        <h3 className="font-heading text-3xl font-bold text-primary mb-8">Send an Inquiry</h3>
        <div className="space-y-4">
          {(['name', 'email', 'phone'] as const).map(field => (
            <input
              key={field}
              type={field === 'email' ? 'email' : 'text'}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
              required={field !== 'phone'}
              className="w-full bg-primary/5 border border-transparent rounded-2xl px-6 py-4 text-primary placeholder-primary/30 text-base outline-none transition-all duration-300 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent"
            />
          ))}
          <textarea rows={4} placeholder="What can we get for you today?"
            value={form.message}
            onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
            required
            className="w-full bg-primary/5 border border-transparent rounded-2xl px-6 py-4 text-primary placeholder-primary/30 text-base outline-none resize-none transition-all duration-300 focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>
        <button type="submit" disabled={loading}
          className="w-full mt-8 bg-primary text-accent py-5 rounded-2xl font-black text-lg hover:brightness-125 hover:shadow-2xl transition-all duration-300 disabled:opacity-60 flex justify-center items-center gap-3">
          {loading ? (
            <span className="flex items-center gap-2"><Loader2 className="animate-spin" size={24} /> Processing...</span>
          ) : (
            <>Place Your Order <ArrowRight size={22} /></>
          )}
        </button>
      </div>
    </form>
  );
};

const Contact = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="contact" ref={ref} className="py-28 px-6 bg-primary">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-16 transition-all duration-1000">
          <p className="text-accent font-mono text-xs tracking-[0.4em] uppercase mb-4 font-bold">Contact Us</p>
          <h2 className={`font-heading text-6xl font-black text-white mb-6 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            Order Your Fresh Supplies
          </h2>
          <p className="text-white/50 text-xl leading-relaxed">
            From Onitsha to your home. We process your favorites with expert care.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <ContactForm />
        </div>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-t border-white/10 pt-16">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4">
              <Phone size={24} />
            </div>
            <p className="text-white/60 text-sm uppercase tracking-widest mb-1">WhatsApp</p>
            <a href={`https://wa.me/${contact.whatsapp}`} className="text-white font-bold text-lg hover:text-accent transition-colors">+{contact.whatsapp}</a>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4">
              <Instagram size={24} />
            </div>
            <p className="text-white/60 text-sm uppercase tracking-widest mb-1">Instagram</p>
            <p className="text-white font-bold text-lg">{contact.instagram}</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4">
              <MapPin size={24} />
            </div>
            <p className="text-white/60 text-sm uppercase tracking-widest mb-1">Location</p>
            <p className="text-white font-bold text-lg">{contact.address}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-primary border-t border-white/5 py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="w-12 h-12 bg-accent text-primary flex items-center justify-center font-heading font-black text-2xl rounded-xl mb-4">
            FH
          </div>
          <p className="text-white/30 text-sm max-w-xs leading-relaxed">
            Bridging the gap between the traditional local harvest and your modern home. Freshness processed with integrity.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-10 text-sm font-bold uppercase tracking-widest text-white/40">
          {['Home', 'Shop', 'Process', 'Testimonials'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-accent transition-colors">{link}</a>
          ))}
        </div>
        
        <div className="text-center md:text-right">
          <p className="text-white/60 font-medium">© {new Date().getFullYear()} {brand.name}</p>
          <p className="text-white/20 text-[10px] uppercase tracking-[0.3em] mt-2">The Soul of Onitsha</p>
        </div>
      </div>
    </footer>
  );
};

const SectionDivider = () => (
  <div className="py-16 flex items-center gap-8 px-8 max-w-6xl mx-auto bg-transparent">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
    <span className="text-accent font-mono text-xs tracking-[0.4em] uppercase whitespace-nowrap opacity-70">
      Centia Harvest
    </span>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
  </div>
);

export default function Home() {
  return (
    <main className="bg-primary">
      <Header />
      <Hero />
      <SectionDivider />
      <Features />
      <Process />
      <SectionDivider />
      <Products />
      <Gallery />
      <About />
      <SectionDivider />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}