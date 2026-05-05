'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Leaf, 
  Package, 
  Truck, 
  Instagram, 
  ShoppingBag, 
  CheckCircle, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  Loader2, 
  CheckCheck, 
  ImageOff,
  Menu,
  X,
  ChefHat,
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
  tagline: "The Soul of Nigerian Flavors, Delivered Naturally.",
  description: "Premium, organic, and expertly processed Nigerian ingredients sourced directly from the heart of Onitsha to your kitchen.",
  industry: "food",
  region: "nigeria",
  currency: "₦"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=2574&auto=format&fit=crop",
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
      <div className={`flex items-center justify-center bg-gradient-to-br from-[var(--primary)]/60 to-[var(--accent)]/10 ${className}`}>
        <ImageOff size={28} className="text-white/20" />
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
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent" />
    <span className="text-[var(--accent)] font-mono text-xs tracking-[0.4em] uppercase whitespace-nowrap opacity-70">
      {BRAND.tagline}
    </span>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent" />
  </div>
);

// --- SECTIONS ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-[var(--primary)]/95 backdrop-blur-xl shadow-2xl py-4' : 'bg-transparent py-7'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--accent)] flex items-center justify-center text-[var(--primary)] font-black text-xl">FHB</div>
          <span className="font-heading text-xl font-bold tracking-tight text-white hidden sm:block">Food Hub</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          {['Home', 'Products', 'Process', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-white/80 hover:text-[var(--accent)] transition-colors uppercase tracking-widest">{item}</a>
          ))}
          <a href="#contact" className="bg-[var(--accent)] text-[var(--primary)] px-6 py-2.5 text-sm font-bold hover:brightness-110 transition-all">Shop Collection</a>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-[var(--primary)] z-[110] transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex justify-between items-center">
          <div className="w-10 h-10 bg-[var(--accent)] flex items-center justify-center text-[var(--primary)] font-black text-xl">FHB</div>
          <button onClick={() => setIsOpen(false)}><X size={32} className="text-white" /></button>
        </div>
        <div className="flex flex-col gap-8 p-8 mt-12">
          {['Home', 'Products', 'Process', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-4xl font-heading font-black text-white hover:text-[var(--accent)]">{item}</a>
          ))}
          <a href="#contact" onClick={() => setIsOpen(false)} className="mt-8 bg-[var(--accent)] text-[var(--primary)] px-8 py-4 text-xl font-black text-center">Shop Now</a>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="home" ref={ref} className="min-h-screen grid md:grid-cols-[1fr_1fr] items-stretch bg-[var(--primary)] overflow-hidden">
      <div className="flex flex-col justify-center px-8 md:px-20 py-32">
        <p className={`text-[var(--accent)] font-mono text-xs tracking-[0.4em] uppercase mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          Est. Onitsha, Nigeria
        </p>
        <h1 className={`font-heading text-5xl md:text-7xl font-bold text-white leading-[0.95] tracking-tight transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8'}`}>
          The Soul of Nigerian <span className="italic text-[var(--accent)]">Flavors</span>.
        </h1>
        <p className={`text-white/50 mt-8 text-lg max-w-md leading-relaxed transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {BRAND.description}
        </p>
        <div className={`flex gap-4 mt-12 flex-wrap transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <a href="#products" className="bg-[var(--accent)] text-[var(--primary)] px-10 py-4 font-bold text-base hover:brightness-110 hover:scale-105 transition-all">Shop Collection</a>
          <a href="#process" className="border border-white/20 text-white px-10 py-4 font-medium text-base hover:bg-white/5 transition-all">Our Craft</a>
        </div>
      </div>
      <div className={`relative min-h-[50vh] md:min-h-full transition-all duration-1000 ease-out overflow-hidden ${isVisible ? 'max-w-full opacity-100' : 'max-w-0 opacity-0'}`}>
        <SafeImage src={IMAGES.hero} alt="Nigerian Kitchen Staples" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] via-transparent to-transparent md:block hidden" />
      </div>
    </section>
  );
};

const Features = () => {
  const { ref, isVisible } = useScrollReveal();
  const features = [
    { title: "Natural Organic", desc: "Zero preservatives. Just pure, farm-sourced Nigerian ingredients processed the traditional way.", icon: Leaf },
    { title: "Expert Packaging", desc: "Double-sealed and moisture-protected packaging to ensure long-shelf life and freshness.", icon: Package },
    { title: "Swift Logistics", desc: "Direct delivery from Onitsha to your doorstep with real-time order tracking.", icon: Truck }
  ];

  return (
    <section id="features" ref={ref} className="py-28 px-6 bg-[var(--secondary)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-heading text-5xl font-bold text-[var(--primary)] mb-4 italic">The Centia Quality</h2>
          <p className="text-[var(--primary)]/60 text-lg uppercase tracking-widest font-medium">Why top chefs choose our organic staples</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <div 
              key={i} 
              className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="w-20 h-20 bg-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-8 text-[var(--accent)]">
                <f.icon size={32} />
              </div>
              <h3 className="font-heading text-2xl font-bold text-[var(--primary)] mb-4">{f.title}</h3>
              <p className="text-[var(--primary)]/70 leading-relaxed">{f.desc}</p>
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
    { name: "Jumbo Forest Snails", desc: "Expertly cleaned and oven-dried giant African land snails, preserved for peak flavor.", price: "₦25,000" },
    { name: "Premium Ogbono Seeds", desc: "High-draw wild bush mango seeds, hand-picked and sun-dried for authentic consistency.", price: "₦12,500" },
    { name: "Seafood Medley Bundle", desc: "A curated mix of dehydrated prawns, periwinkles, and smoked crayfish for rich native soups.", price: "₦45,000" },
    { name: "Artisanal Food Flours", desc: "Stone-ground cocoyam powder and yam flour, processed without additives.", price: "₦8,500" }
  ];

  return (
    <section id="products" ref={ref} className="py-28 px-6 bg-[var(--primary)] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-24">
          <h2 className="font-heading text-5xl md:text-6xl font-bold text-white max-w-sm">Bestselling Staples</h2>
          <p className="text-white/40 max-w-xs text-right hidden md:block uppercase tracking-widest text-sm">Premium staples and local proteins</p>
        </div>
        <div className="space-y-32">
          {products.map((p, i) => (
            <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-20`}>
              <div className={`w-full md:w-1/2 relative transition-all duration-700 ease-out ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`} style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="aspect-[4/3] relative rounded-lg overflow-hidden shadow-2xl group">
                  <SafeImage src={IMAGES.products[i]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                </div>
                <div className={`absolute -bottom-6 ${i % 2 === 0 ? '-right-6' : '-left-6'} w-1/2 h-1/2 bg-[var(--accent)]/10 rounded-lg -z-10 blur-2xl`} />
              </div>
              <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                <span className="font-mono text-[var(--accent)] text-xs font-bold tracking-widest uppercase mb-4 block">Selection — 0{i + 1}</span>
                <h3 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight mb-4">{p.name}</h3>
                <p className="text-white/50 mt-5 text-lg leading-relaxed mb-8">{p.desc}</p>
                <div className={`flex items-center gap-8 ${i % 2 === 0 ? 'justify-start' : 'md:justify-end'}`}>
                  <span className="text-3xl font-bold text-[var(--accent)]">{p.price}</span>
                  <a href="#contact" className="bg-white/10 hover:bg-white text-white hover:text-[var(--primary)] px-8 py-3 font-bold transition-all border border-white/20">Order Now</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const { ref, isVisible } = useScrollReveal();
  const steps = [
    { number: "01", title: "Sourcing", desc: "We partner with local farmers in the South-East for the freshest seasonal harvest." },
    { number: "02", title: "Preparation", desc: "Traditional cleaning and dehydration methods that lock in nutrients and flavor." },
    { number: "03", title: "Packaging", desc: "Airtight, labeled packaging designed for global shipping and local storage." }
  ];

  return (
    <section id="process" ref={ref} className="py-28 px-6 bg-[var(--secondary)] relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className="font-heading text-5xl font-bold text-[var(--primary)] mb-16 italic">Our Processing Craft</h2>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--primary)]/20 via-[var(--accent)]/40 to-transparent hidden md:block" />
          <div className="space-y-20">
            {steps.map((step, i) => (
              <div 
                key={i} 
                className={`flex gap-8 items-start group transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center shrink-0 relative z-10 border-4 border-[var(--secondary)] shadow-lg">
                  <span className="font-mono font-black text-[var(--primary)] text-sm">{step.number}</span>
                </div>
                <div className="pt-2">
                  <h3 className="font-heading text-3xl font-bold text-[var(--primary)] mb-4">{step.title}</h3>
                  <p className="text-[var(--primary)]/60 text-lg leading-relaxed max-w-2xl">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-20 text-[var(--primary)]/40 font-mono text-xs uppercase tracking-widest">Direct from the source. No long thing.</p>
      </div>
    </section>
  );
};

const About = () => {
  const { ref, isVisible } = useScrollReveal();
  const stats = [
    { number: "1.3k+", label: "Instagram Followers", icon: Instagram },
    { number: "100%", label: "Organic Certified", icon: CheckCircle },
    { number: "50+", label: "Staple Varieties", icon: ShoppingBag }
  ];

  return (
    <section ref={ref} className="py-28 px-6 bg-[var(--primary)]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
          <h2 className="font-heading text-5xl font-bold text-white mb-8 italic">Rooted in Tradition</h2>
          <p className="text-white/60 text-lg leading-relaxed mb-12">
            Food Hub by Centia was born from a desire to make authentic Nigerian ingredients accessible without compromising on organic standards. We specialize in the meticulous processing of local proteins and spices that form the backbone of our rich culinary heritage.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {stats.map((s, i) => (
              <div key={i} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                <p className="font-heading text-4xl font-bold text-[var(--accent)]">{s.number}</p>
                <p className="text-white/40 text-xs uppercase tracking-widest mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={`relative aspect-square transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          <div className="absolute inset-0 border border-[var(--accent)]/20 translate-x-6 translate-y-6" />
          <SafeImage src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=2670&auto=format&fit=crop" alt="Tradition" fill className="object-cover relative z-10" />
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const { ref, isVisible } = useScrollReveal();
  const items = [
    { name: "Nneka Okoro", role: "Home Cook", text: "The crayfish and ogbono are the cleanest I've ever bought in Onitsha. No sand, just pure flavor." },
    { name: "Chef Emeka", role: "Executive Chef", text: "The dehydrated vegetables retain their color and taste perfectly. Excellent for my restaurant's logistics." }
  ];

  return (
    <section ref={ref} className="py-28 px-6 bg-[var(--accent)]/10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-heading text-5xl font-bold text-white mb-20 italic">Voices from the Kitchen</h2>
        <div className="space-y-12">
          {items.map((t, i) => (
            <div 
              key={i} 
              className={`bg-[var(--primary)]/40 p-10 rounded-2xl border border-white/5 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <p className="text-2xl text-white/90 italic leading-relaxed mb-10">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--accent)] text-[var(--primary)] flex items-center justify-center font-black">
                  {t.name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-bold text-white">{t.name}</p>
                  <p className="text-[var(--accent)] text-xs uppercase tracking-widest">{t.role}</p>
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
      <div className="flex flex-col items-center justify-center p-12 text-center animate-scaleIn bg-black/20 rounded-2xl border border-white/10">
        <div className="w-20 h-20 rounded-full bg-[var(--accent)]/20 flex items-center justify-center mb-6 border border-[var(--accent)]/40">
          <CheckCheck size={32} className="text-[var(--accent)]" />
        </div>
        <h3 className="font-heading text-3xl font-bold text-white mb-3">Order Received</h3>
        <p className="text-white/60">We will reach out on WhatsApp to finalize your delivery details.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-black/30 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
      <h3 className="font-heading text-2xl font-bold text-white mb-6">Send an Inquiry</h3>
      {(['name', 'email', 'phone'] as const).map(field => (
        <input
          key={field}
          type={field === 'email' ? 'email' : 'text'}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={form[field]}
          onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
          required={field !== 'phone'}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-5 py-4 text-white placeholder-white/30 text-sm outline-none focus:border-[var(--accent)] transition-all"
        />
      ))}
      <textarea 
        rows={4} 
        placeholder="Which staples are you interested in?"
        value={form.message}
        onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
        required
        className="w-full bg-white/5 border border-white/10 rounded-lg px-5 py-4 text-white placeholder-white/30 text-sm outline-none resize-none focus:border-[var(--accent)] transition-all"
      />
      <button type="submit" disabled={loading} className="w-full bg-[var(--accent)] text-[var(--primary)] py-4 rounded-lg font-bold hover:brightness-110 transition-all flex justify-center items-center gap-3">
        {loading ? <Loader2 className="animate-spin" /> : <>Place Order <ArrowRight size={18} /></>}
      </button>
    </form>
  );
};

const Contact = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="contact" ref={ref} className="relative overflow-hidden py-32 bg-[var(--primary)]">
      <div className="absolute inset-0 bg-[var(--accent)]" />
      <div className="absolute inset-0 bg-[var(--primary)] [clip-path:polygon(0_0,65%_0,50%_100%,0_100%)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h2 className="font-heading text-6xl md:text-7xl font-bold text-white leading-none mb-8">Place Your <span className="italic text-[var(--accent)]">Order</span> Today</h2>
          <div className="space-y-6 mt-12">
            <div className="flex items-center gap-4 text-white/70 hover:text-[var(--accent)] transition-colors">
              <Phone size={20} />
              <span className="font-bold">Share on WhatsApp</span>
            </div>
            <div className="flex items-center gap-4 text-white/70 hover:text-[var(--accent)] transition-colors">
              <Instagram size={20} />
              <span className="font-bold">@foodhub_by_centia</span>
            </div>
            <div className="flex items-center gap-4 text-white/70">
              <MapPin size={20} />
              <span className="font-bold">Onitsha, Anambra State, Nigeria</span>
            </div>
          </div>
        </div>
        <div className="w-full max-w-md ml-auto">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-[var(--primary)] pt-20 pb-10 px-6 border-t border-white/5">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[var(--accent)] flex items-center justify-center text-[var(--primary)] font-black text-xl">FHB</div>
            <span className="font-heading text-2xl font-bold text-white tracking-tight">Food Hub by Centia</span>
          </div>
          <p className="text-white/40 max-w-sm leading-relaxed uppercase tracking-widest text-xs">
            Premium Nigerian Staples. Expertise in organic processing. Delivered globally from the heart of Onitsha.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Navigation</h4>
          <ul className="space-y-3 text-white/50 text-sm">
            <li><a href="#home" className="hover:text-[var(--accent)] transition-colors">Home</a></li>
            <li><a href="#products" className="hover:text-[var(--accent)] transition-colors">Products</a></li>
            <li><a href="#process" className="hover:text-[var(--accent)] transition-colors">Our Process</a></li>
            <li><a href="#contact" className="hover:text-[var(--accent)] transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Social</h4>
          <ul className="space-y-3 text-white/50 text-sm">
            <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-[var(--accent)] transition-colors">WhatsApp</a></li>
            <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Facebook</a></li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
        <p className="text-white/30 text-xs uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} Food Hub by Centia. All Rights Reserved.
        </p>
        <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] text-white/20">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </div>
  </footer>
);

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Divider />
      <Products />
      <Process />
      <Divider />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}