'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Leaf, 
  PackageCheck, 
  Truck, 
  Mail, 
  MapPin, 
  Instagram, 
  Phone, 
  CheckCheck, 
  ArrowRight, 
  Loader2, 
  ImageOff, 
  Menu, 
  X,
  Users,
  ShoppingBag,
  Timer,
  UtensilsCrossed
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-RULE
// Typography Personality: refined

// --- CONSTANTS ---

const BRAND = {
  name: "Food Hub by Centia",
  tagline: "Nature’s Pantry, Processed with Precision",
  description: "Premium delivery service bringing the finest organic snails, local proteins, and carefully packaged foodstuff from Onitsha to your kitchen.",
  industry: "Food & Beverage",
  region: "Nigeria",
  currency: "₦"
};

const IMAGES = {
  hero: "https://picsum.photos/seed/food0/1920/1080",
  products: [
    "https://picsum.photos/seed/food2/800/600",
    "https://picsum.photos/seed/food3/800/600",
    "https://picsum.photos/seed/food4/800/600",
    "https://picsum.photos/seed/food5/800/600"
  ]
};

// --- HOOKS ---

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

// --- COMPONENTS ---

function SafeImage({ src, alt, fill, width, height, className, priority }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-100 ${className}`}>
        <ImageOff size={24} className="text-zinc-300" />
      </div>
    );
  }
  return (
    <Image 
      src={src} 
      alt={alt} 
      fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} 
      priority={priority}
      onError={() => setError(true)} 
    />
  );
}

const Divider = () => (
  <div className="py-16 flex items-center gap-8 px-8 max-w-6xl mx-auto">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    <span className="text-primary font-mono text-[10px] tracking-[0.4em] uppercase whitespace-nowrap opacity-70">
      {BRAND.tagline}
    </span>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
  </div>
);

// --- SECTIONS ---

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-primary py-3 shadow-2xl' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-accent text-primary flex items-center justify-center font-heading font-bold text-xl rounded-sm">
              FC
            </div>
            <span className={`font-heading font-bold text-xl tracking-wide ${scrolled ? 'text-white' : 'text-white'}`}>
              Centia
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {['Process', 'Products', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-white/80 hover:text-accent transition-colors text-sm font-medium tracking-widest uppercase"
              >
                {item}
              </a>
            ))}
            <a 
              href="#contact" 
              className="bg-accent text-primary px-6 py-2.5 font-bold text-sm rounded-full hover:scale-105 transition-transform"
            >
              Order Now
            </a>
          </nav>

          <button className="md:hidden text-white" onClick={() => setMobileOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[60] transition-transform duration-500 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary p-10 flex flex-col">
          <button className="self-end text-white mb-12" onClick={() => setMobileOpen(false)}>
            <X size={32} />
          </button>
          <nav className="flex flex-col gap-8">
            {['Process', 'Products', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileOpen(false)}
                className="text-white text-2xl font-heading font-bold hover:text-accent"
              >
                {item}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setMobileOpen(false)}
              className="bg-accent text-primary px-8 py-4 font-black text-center rounded-xl mt-8"
            >
              Order Now
            </a>
          </nav>
        </div>
      </div>
    </>
  );
};

const Hero = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="hero" className="min-h-screen relative flex items-end pb-24 px-6 md:px-16 overflow-hidden">
      <SafeImage src={IMAGES.hero} alt={BRAND.name} fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-transparent" />
      <div ref={ref} className={`relative z-10 max-w-4xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <h1 className="font-heading text-6xl md:text-[8rem] font-bold text-white leading-[0.85] tracking-tight">
          Authentic Flavors,<br />
          <span className="text-accent italic font-light">Hygienically</span> Packaged
        </h1>
        <p className="text-white/70 mt-8 text-xl max-w-xl leading-relaxed font-light">
          From local proteins to premium spices, we deliver the heart of Nigerian cuisine directly to your kitchen.
        </p>
        <div className="flex flex-wrap gap-6 mt-12">
          <a href="#products" className="bg-accent text-primary px-10 py-4 font-black text-lg
            hover:brightness-110 hover:scale-105 transition-all rounded-full shadow-2xl">
            Shop the Collection
          </a>
          <a href="#process" className="text-white border-b-2 border-white/30 pb-1
            hover:border-accent hover:text-accent transition-all font-medium self-end text-lg">
            Our Standards →
          </a>
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const { ref, isVisible } = useScrollReveal();
  const steps = [
    { number: "01", title: "Ethical Sourcing", description: "We hand-pick only the finest proteins and grains from trusted local farmers." },
    { number: "02", title: "Hygienic Processing", description: "All items are cleaned and processed in a sterile environment using modern standards." },
    { number: "03", title: "Airtight Packaging", description: "Our specialized packaging ensures long-lasting freshness without chemical preservatives." }
  ];

  return (
    <section id="process" ref={ref} className="py-28 px-6 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <span className="text-primary font-mono text-xs tracking-[0.4em] uppercase mb-4 block">Precision standards</span>
            <h2 className="font-heading text-5xl md:text-6xl font-bold text-primary leading-tight mb-8">
              Our Processing <br />Standards
            </h2>
            <div className="space-y-12 mt-12">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-8 group">
                  <span className="font-heading text-4xl font-bold text-accent/30 group-hover:text-accent transition-colors">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-primary mb-2">{step.title}</h3>
                    <p className="text-primary/60 leading-relaxed max-w-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={`relative aspect-[4/5] rounded-3xl overflow-hidden shadow-[40px_-40px_0px_#2d5a2710] transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <SafeImage src="https://picsum.photos/seed/process1/800/1000" alt="Processing" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const { ref, isVisible } = useScrollReveal();
  const features = [
    { title: "Natural & Organic", description: "Sourced directly from local farms ensuring 100% organic quality ingredients.", icon: Leaf },
    { title: "Expert Packaging", description: "Modern processing techniques that keep your foodstuff fresh and shelf-stable.", icon: PackageCheck },
    { title: "Onitsha's Finest", description: "Reliable delivery service rooted in the heart of Anambra's food hub.", icon: Truck }
  ];

  return (
    <section id="features" ref={ref} className="py-28 px-6 bg-primary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-heading text-5xl font-bold text-white mb-6">Why Choose Centia?</h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">Setting the standard for foodstuff delivery in Nigeria.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div 
              key={i} 
              style={{ transitionDelay: `${i * 150}ms` }}
              className={`bg-white/5 border border-white/10 p-10 rounded-3xl hover:bg-white/10 transition-all group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <f.icon className="text-primary" size={32} />
              </div>
              <h3 className="font-heading text-2xl font-bold text-white mb-4">{f.title}</h3>
              <p className="text-white/40 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Products = () => {
  const { ref, isVisible } = useScrollReveal();
  const products = [
    { name: "Giant African Snails", description: "Expertly cleaned and hygienically packaged giant snails, ready for your favorite recipes.", price: "₦15,000", image: IMAGES.products[0] },
    { name: "Premium Ogbono Seeds", description: "High-grade, sun-dried Ogbono seeds for that perfect draw and rich flavor.", price: "₦8,500", image: IMAGES.products[1] },
    { name: "Dehydrated Ugu Leaves", description: "Farm-fresh pumpkin leaves, dehydrated to preserve nutrients and taste.", price: "₦5,000", image: IMAGES.products[2] },
    { name: "Luxury Seafood Platter", description: "A mix of fresh periwinkles, jumbo prawns, and premium crayfish.", price: "₦35,000", image: IMAGES.products[3] }
  ];

  return (
    <section id="products" ref={ref} className="py-28 px-6 bg-secondary overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="font-heading text-6xl font-bold text-primary">Today&apos;s Fresh Picks</h2>
          <p className="text-primary/50 font-mono tracking-widest text-sm uppercase">Priced ₦5,000 — ₦100,000</p>
        </div>
        
        {products.map((p, i) => (
          <div 
            key={i} 
            className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-20 transition-all duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
          >
            <div className="w-full md:w-1/2 relative group">
              <div className="aspect-[4/3] relative rounded-[2rem] overflow-hidden shadow-2xl">
                <SafeImage src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className={`absolute -bottom-6 ${i % 2 === 0 ? '-right-6' : '-left-6'} w-32 h-32 bg-accent/20 rounded-full blur-2xl -z-10`} />
            </div>
            <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
              <span className="text-accent font-mono text-xs font-bold tracking-[0.4em] uppercase mb-4 block">0{i+1} — Collection</span>
              <h3 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6">{p.name}</h3>
              <p className="text-primary/60 text-lg leading-relaxed mb-8 max-w-md ml-auto mr-auto md:ml-0 md:mr-0">{p.description}</p>
              <div className={`flex flex-col gap-6 ${i % 2 === 0 ? 'items-start' : 'items-start md:items-end'}`}>
                <span className="text-4xl font-heading font-bold text-primary">{p.price}</span>
                <a href="#contact" className="bg-primary text-white px-10 py-4 rounded-full font-bold hover:bg-accent hover:text-primary transition-all">
                  Order Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const About = () => {
  const { ref, isVisible } = useScrollReveal();
  const stats = [
    { number: "1.3k+", label: "Instagram Followers", icon: Users },
    { number: "50+", label: "Food Products", icon: ShoppingBag },
    { number: "100%", label: "Organic Guarantee", icon: UtensilsCrossed }
  ];

  return (
    <section id="about" ref={ref} className="py-28 px-6 bg-white border-y border-zinc-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="relative aspect-square rounded-full overflow-hidden border-[12px] border-secondary shadow-2xl">
              <SafeImage src="https://picsum.photos/seed/centia_about/800/800" alt="About Centia" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-accent rounded-3xl flex flex-col items-center justify-center p-6 shadow-xl animate-float">
              <span className="font-heading text-5xl font-black text-primary">0%</span>
              <span className="text-primary/60 font-mono text-[10px] tracking-widest uppercase text-center mt-2 leading-tight">Preservatives Added</span>
            </div>
          </div>
          <div>
            <h2 className="font-heading text-5xl md:text-6xl font-bold text-primary mb-8 leading-tight">The Centia Story</h2>
            <p className="text-primary/60 text-lg leading-relaxed mb-8">
              Food Hub by Centia was born out of a passion for natural ingredients and a need for reliable, clean food processing. Based in Onitsha, we bridge the gap between the farm and your modern kitchen.
            </p>
            <p className="text-primary font-medium italic mb-12">
              Sharp delivery, nationwide.
            </p>
            <div className="grid grid-cols-3 gap-4 border-t border-zinc-100 pt-12">
              {stats.map((s, i) => (
                <div 
                  key={i} 
                  style={{ transitionDelay: `${i * 150}ms` }}
                  className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  <p className="font-heading text-3xl font-bold text-primary leading-none mb-2">{s.number}</p>
                  <p className="text-primary/40 text-[10px] uppercase tracking-widest font-bold leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const { ref, isVisible } = useScrollReveal();
  const items = [
    { name: "Nneka Okoye", text: "The cleaned snails are a lifesaver. No stress, just straight into the pot. Centia is the best in Onitsha!", role: "Home Chef" },
    { name: "Chidi Benson", text: "Finally, a place where I can get authentic Ogbono and prawns that actually taste fresh and look clean.", role: "Restaurant Owner" }
  ];

  return (
    <section id="testimonials" ref={ref} className="py-28 px-6 bg-secondary overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-heading text-5xl font-bold text-primary mb-20">Happy Cooks</h2>
        <div className="space-y-12">
          {items.map((t, i) => (
            <div 
              key={i} 
              style={{ transitionDelay: `${i * 150}ms` }}
              className={`relative py-12 px-10 rounded-3xl border border-primary/5 bg-white shadow-xl transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'}`}
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-accent rounded-full flex items-center justify-center text-primary text-2xl font-black">
                &ldquo;
              </div>
              <p className="text-primary/70 text-2xl font-heading leading-relaxed mb-8 italic">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center justify-center gap-4 border-t border-zinc-50 pt-8">
                <div className="w-12 h-12 rounded-full bg-primary text-accent flex items-center justify-center font-bold text-xl font-heading">
                  {t.name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-bold text-primary">{t.name}</p>
                  <p className="text-primary/40 text-xs tracking-widest uppercase">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const { ref, isVisible } = useScrollReveal();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden py-32 bg-accent">
      <div className="absolute inset-0 bg-primary [clip-path:polygon(0_0,60%_0,45%_100%,0_100%)] hidden md:block" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8'}`}>
          <h2 className="font-heading text-7xl md:text-9xl font-bold text-white md:text-white leading-[0.8] mb-8">
            Place Your <br />Order
          </h2>
          <p className="text-white/70 text-xl max-w-sm mb-12">
            Nature’s Pantry, Processed with Precision
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-white">
              <Instagram size={24} />
              <span className="font-medium">@foodhub_by_centia</span>
            </div>
            <div className="flex items-start gap-4 text-white">
              <MapPin size={24} className="shrink-0 mt-1" />
              <span className="font-medium">Onitsha, Anambra State</span>
            </div>
          </div>
        </div>
        
        <div className="w-full max-w-md ml-auto">
          {sent ? (
            <div className="flex flex-col items-center justify-center p-12 text-center animate-scaleIn bg-white rounded-3xl border border-zinc-100 shadow-2xl relative overflow-hidden">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 border border-primary/20 relative z-10">
                <CheckCheck size={32} className="text-primary" />
              </div>
              <h3 className="font-heading text-3xl font-bold text-primary mb-3">Order Received</h3>
              <p className="text-primary/60 max-w-sm text-lg">Thank you! We will contact you shortly to confirm your order details.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden border border-zinc-100">
              <h3 className="font-heading text-3xl font-bold text-primary mb-8">Order Form</h3>
              <div className="space-y-4">
                {['name', 'email', 'phone'].map(field => (
                  <input
                    key={field}
                    type={field === 'email' ? 'email' : 'text'}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={(form as any)[field]}
                    onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                    required={field !== 'email'}
                    className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-5 py-4 text-primary placeholder-zinc-400 text-sm outline-none transition-all focus:bg-white focus:border-primary"
                  />
                ))}
                <textarea 
                  rows={4} 
                  placeholder="Items you'd like to order..."
                  value={form.message}
                  onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                  required
                  className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-5 py-4 text-primary placeholder-zinc-400 text-sm outline-none resize-none transition-all focus:bg-white focus:border-primary"
                />
              </div>
              <button type="submit" disabled={loading}
                className="w-full mt-8 bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-accent hover:text-primary transition-all disabled:opacity-60 flex justify-center items-center gap-3 group">
                {loading ? <Loader2 className="animate-spin" size={24} /> : "Send Order Request"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-primary text-white py-20 px-6 border-t border-white/10">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-accent text-primary flex items-center justify-center font-heading font-bold text-xl rounded-sm">
            FC
          </div>
          <span className="font-heading font-bold text-2xl">Centia</span>
        </div>
        <p className="text-white/40 max-w-sm text-lg leading-relaxed mb-8">
          Delivering premium organic snails and foodstuff from the heart of Onitsha to your modern kitchen. Precision standards, authentic flavors.
        </p>
        <div className="flex gap-4">
          <a href="https://instagram.com/foodhub_by_centia" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-primary transition-all">
            <Instagram size={20} />
          </a>
        </div>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-6 text-accent">Quick Links</h4>
        <ul className="space-y-4 text-white/50">
          <li><a href="#hero" className="hover:text-white transition-colors">Home</a></li>
          <li><a href="#process" className="hover:text-white transition-colors">Our Process</a></li>
          <li><a href="#products" className="hover:text-white transition-colors">Our Products</a></li>
          <li><a href="#about" className="hover:text-white transition-colors">The Story</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-6 text-accent">Contact Info</h4>
        <ul className="space-y-4 text-white/50">
          <li className="flex items-center gap-3">
            <Instagram size={16} /> @foodhub_by_centia
          </li>
          <li className="flex items-start gap-3">
            <MapPin size={16} className="shrink-0 mt-1" /> Onitsha, Anambra State
          </li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-xs tracking-widest uppercase">
      <p>© {new Date().getFullYear()} Food Hub by Centia. All Rights Reserved.</p>
      <p>Processed with Precision in Nigeria</p>
    </div>
  </footer>
);

export default function Page() {
  return (
    <main>
      <Header />
      <Hero />
      <Process />
      <Divider />
      <Features />
      <About />
      <Products />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}