'use client';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-STAT
// Typography Personality: refined

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Leaf, 
  Package, 
  ChefHat, 
  Zap, 
  ShoppingBag, 
  Users, 
  CheckCircle, 
  Mail, 
  MapPin, 
  Phone, 
  ArrowRight, 
  Loader2, 
  CheckCheck, 
  ImageOff,
  Menu,
  X,
  Instagram,
  UtensilsCrossed,
  Truck
} from 'lucide-react';

// --- Types ---
interface NavLink { name: string; href: string; }
interface Stat { number: string; label: string; }
interface Feature { title: string; description: string; icon: string; }
interface Product { name: string; description: string; price: string; image_url: string; }
interface Testimonial { name: string; role: string; text: string; }
interface Step { number: string; title: string; description: string; }

// --- Components ---

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-primary/10 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-primary/20" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
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

// --- DATA FROM BRIEF ---
const BRAND = {
  name: "Food Hub by Centia",
  tagline: "Authentic Flavors, Expertly Packaged",
  description: "Onitsha's premier source for natural, organic local foodstuff. We specialize in the meticulous processing and packaging of premium Nigerian ingredients, from oven-dried snails to artisanal food flours.",
  industry: "Food Processing",
  region: "Nigeria"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1660386802158-275dd85c7431",
  products: [
    "https://images.unsplash.com/photo-1689015269546-0c2f4b78aa68",
    "https://images.unsplash.com/photo-1723237870877-be2c20bea7d5",
    "https://images.unsplash.com/photo-1603284738824-26dabef1b567",
    "https://images.unsplash.com/photo-1777838609518-1b66098625d5"
  ]
};

const FEATURES: Feature[] = [
  { title: "Natural & Organic", description: "Zero additives or artificial preservatives in all our processed ingredients.", icon: "Leaf" },
  { title: "Expert Packaging", description: "Airtight, travel-ready packaging designed for long shelf-life.", icon: "Package" },
  { title: "Chef-Grade Quality", description: "Sourced from the best farms and processed under strict hygienic conditions.", icon: "ChefHat" },
  { title: "Fast Nationwide Delivery", description: "Sharp delivery, nationwide across Nigeria.", icon: "Truck" }
];

const ICON_MAP: any = {
  Leaf: <Leaf size={24} />,
  Package: <Package size={24} />,
  ChefHat: <ChefHat size={24} />,
  Truck: <Truck size={24} />
};

const PRODUCTS: Product[] = [
  { name: "Jumbo Oven-Dried Snails", description: "Perfectly cleaned and dehydrated jumbo snails, ready for stews.", price: "₦45,000", image_url: IMAGES.products[0] },
  { name: "Export Grade Crayfish & Ogbono", description: "Stone-free, sand-free, and finely blended for soup perfection.", price: "₦12,500", image_url: IMAGES.products[1] },
  { name: "Premium White Cocoyam Powder", description: "Smooth thickener for Oha and Onugbu soups.", price: "₦8,000", image_url: IMAGES.products[2] },
  { name: "Dehydrated Vegetable Bundle", description: "Mix of Ugu, Uziza, and Bitterleaf, processed for nutrient retention.", price: "₦5,500", image_url: IMAGES.products[3] }
];

const STEPS: Step[] = [
  { number: "01", title: "Strict Sourcing", description: "We hand-select only the freshest snails, seafood, and vegetables from local farmers." },
  { number: "02", title: "Hygienic Processing", description: "Ingredients are cleaned and oven-dehydrated using traditional yet modern methods." },
  { number: "03", title: "Premium Packaging", description: "Items are moisture-sealed and labeled to ensure they reach you in peak condition." }
];

const TESTIMONIALS: Testimonial[] = [
  { name: "Chioma Adeleke", text: "The crayfish is so clean! No sand at all. It has completely changed the taste of my Jollof.", role: "Lagos Customer" },
  { name: "Emeka Nwosu", text: "Their packaging for snails is top-notch. I took them with me to the UK and they stayed fresh.", role: "Frequent Buyer" },
  { name: "Amina Bello", text: "The cocoyam powder is a lifesaver. No more pounding, and the taste is exactly like fresh.", role: "Restaurant Owner" }
];

// --- Main Page ---

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="relative overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-primary py-3 shadow-xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center font-heading font-black text-primary text-xl transition-transform group-hover:rotate-6">F</div>
            <span className={`font-heading font-bold text-xl tracking-tight transition-colors ${scrolled ? 'text-white' : 'text-white'}`}>FOOD HUB</span>
          </a>
          
          <div className="hidden md:flex items-center gap-10">
            {['Home', 'Process', 'Shop', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className={`text-sm font-medium tracking-widest uppercase transition-colors hover:text-accent ${scrolled ? 'text-white/80' : 'text-white/80'}`}>
                {item}
              </a>
            ))}
            <a href="#products" className="bg-accent text-primary px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-all">Shop Now</a>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[60] bg-primary transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex justify-end">
          <button onClick={() => setIsMenuOpen(false)} className="text-white"><X size={32} /></button>
        </div>
        <div className="flex flex-col items-center gap-8 pt-20">
          {['Home', 'Process', 'Shop', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-3xl font-heading font-bold text-white hover:text-accent transition-colors">
              {item}
            </a>
          ))}
          <a href="#products" onClick={() => setIsMenuOpen(false)} className="mt-8 bg-accent text-primary px-10 py-4 rounded-full font-black text-lg">Shop Now</a>
        </div>
      </div>

      {/* Hero Section (HR-B) */}
      <section id="home" className="min-h-screen relative flex items-end pb-24 px-6 md:px-16 overflow-hidden">
        <SafeImage src={IMAGES.hero} alt={BRAND.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent" />
        <div className="relative z-10 max-w-4xl">
          <h1 className="font-heading text-6xl md:text-[6.5rem] font-black text-white leading-[0.9] tracking-tight">The Heart of Authentic Nigerian Kitchens</h1>
          <p className="text-white/70 mt-8 text-xl max-w-2xl leading-relaxed">From the markets of Onitsha to your doorstep. We process, package, and deliver the finest local proteins and organic spices.</p>
          <div className="flex flex-col sm:flex-row gap-5 mt-10">
            <a href="#products" className="bg-accent text-primary px-10 py-4 font-black hover:brightness-110 transition-all rounded-full flex items-center justify-center gap-2">
              Shop the Collection <ArrowRight size={20} />
            </a>
            <a href="#process" className="text-white border border-white/30 px-10 py-4 font-medium rounded-full hover:bg-white/10 transition-all text-center">
              Our Process
            </a>
          </div>
        </div>
      </section>

      {/* Features Section (F-ICON-GRID) */}
      <section id="features" className="py-32 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div>
              <span className="text-primary/60 font-mono text-xs tracking-[0.4em] uppercase block mb-4">Why Choose Us</span>
              <h2 className="font-heading text-5xl md:text-6xl font-black text-primary">Quality You Can Taste</h2>
            </div>
            <p className="text-primary/50 max-w-xs text-lg">We bridge the gap between rural freshness and urban convenience.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f, i) => (
              <div key={i} className="p-10 rounded-3xl border border-primary/10 bg-white/50 hover:bg-white hover:shadow-2xl hover:border-accent/30 transition-all duration-500 group">
                <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-8 group-hover:bg-accent group-hover:text-primary transition-colors duration-300">
                  {ICON_MAP[f.icon]}
                </div>
                <h3 className="font-heading font-black text-primary text-xl leading-tight">{f.title}</h3>
                <p className="text-primary/50 text-sm mt-4 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider: D-STAT */}
      <div className="bg-primary py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center">
          {[
            { number: '1,300+', label: 'Organic Followers' },
            { number: '50+', label: 'Product Varieties' },
            { number: '100%', label: 'Natural Sourcing' }
          ].map((s, i) => (
            <div key={i} className="px-8 py-8 md:py-4">
              <p className="text-5xl font-black text-accent tracking-tight">{s.number}</p>
              <p className="text-white/60 text-sm mt-2 font-medium uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Process Section (Bonus) */}
      <section id="process" className="py-32 px-6 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 blur-[120px] rounded-full" />
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-primary font-mono text-xs tracking-[0.4em] uppercase">Harvest to Home</span>
            <h2 className="font-heading text-5xl md:text-6xl font-black text-primary mt-4">Our Processing Timeline</h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-primary/10" />
            <div className="space-y-20">
              {STEPS.map((step, i) => (
                <div key={i} className={`flex flex-col md:flex-row items-center gap-8 relative ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="w-full md:w-1/2" />
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-accent border-4 border-secondary flex items-center justify-center z-10 shadow-lg">
                    <span className="font-black text-primary text-sm">{step.number}</span>
                  </div>
                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${i % 2 === 0 ? 'md:pr-12 text-left md:text-right' : 'md:pl-12 text-left'}`}>
                    <h3 className="font-heading text-2xl font-black text-primary">{step.title}</h3>
                    <p className="text-primary/60 mt-3 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Section (P-STAGGER) */}
      <section id="shop" className="py-32 px-6 bg-primary overflow-hidden">
        <div className="max-w-7xl mx-auto mb-20">
          <div className="text-center">
            <h2 className="font-heading text-5xl md:text-7xl font-black text-white">Bestsellers</h2>
            <p className="text-accent mt-4 font-mono uppercase tracking-[0.3em] text-sm">Natural Organic Ingredients</p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto space-y-32">
          {PRODUCTS.map((p, i) => {
             const { ref, isVisible } = useScrollReveal();
             return (
              <div key={i} ref={ref} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-12'}`}>
                <div className="w-full md:w-1/2 relative group">
                  <div className="aspect-[4/5] relative rounded-3xl overflow-hidden shadow-[30px_30px_0px_rgba(244,180,26,0.1)] group-hover:shadow-[15px_15px_0px_rgba(244,180,26,0.2)] transition-all duration-500">
                    <SafeImage src={p.image_url} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                  </div>
                </div>
                <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                  <span className="font-mono text-accent text-xs font-bold tracking-widest uppercase mb-4 block">0{i + 1} — Premium Export</span>
                  <h3 className="font-heading text-4xl md:text-5xl font-black text-white leading-tight">{p.name}</h3>
                  <p className="text-white/50 mt-6 text-lg leading-relaxed">{p.description}</p>
                  <div className="mt-8 flex flex-col gap-6">
                    <span className="text-4xl font-black text-accent">{p.price}</span>
                    <a href="#contact" className="bg-accent text-primary px-10 py-4 rounded-full font-black w-fit hover:scale-105 transition-all shadow-xl">Order via WhatsApp</a>
                  </div>
                </div>
              </div>
             );
          })}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 relative">
             <div className="aspect-square bg-primary/5 rounded-full absolute -top-10 -left-10 w-full h-full -z-0" />
             <div className="relative z-10 p-4 border border-primary/10 rounded-3xl bg-white shadow-2xl">
                <SafeImage src="https://images.unsplash.com/photo-1726177974744-5f33cea4f16d" alt="Packaging Process" width={600} height={600} className="rounded-2xl" />
             </div>
          </div>
          <div className="w-full md:w-1/2">
            <span className="text-primary/40 font-mono text-xs tracking-[0.4em] uppercase block mb-4">Our Heritage</span>
            <h2 className="font-heading text-5xl font-black text-primary mb-8">The Centia Story</h2>
            <p className="text-primary/60 text-xl leading-relaxed mb-8">
              Food Hub by Centia was born out of a passion for preserving the rich culinary heritage of Nigeria. We bridge the gap between rural freshness and urban convenience by ensuring that every household has access to well-packaged, sand-free, and nutrient-dense local foodstuff.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-primary/10">
              <div>
                <p className="font-heading text-3xl font-black text-primary">Onitsha</p>
                <p className="text-primary/40 text-xs uppercase tracking-widest mt-1">Origin Point</p>
              </div>
              <div>
                <p className="font-heading text-3xl font-black text-primary">Global</p>
                <p className="text-primary/40 text-xs uppercase tracking-widest mt-1">Ready for Export</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials (T-SPOTLIGHT) */}
      <section className="py-32 px-6 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-accent font-mono text-xs tracking-[0.4em] uppercase mb-4 block">Kind Words</span>
          <h2 className="font-heading text-5xl md:text-6xl font-black text-white mb-20">Loved by Home Chefs</h2>
          <div className="space-y-12">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="relative py-12 px-8 rounded-[2rem] border border-white/5 bg-white/[0.03] backdrop-blur-sm group hover:border-accent/30 transition-all duration-500">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-primary text-2xl font-black leading-none">“</span>
                </div>
                <p className="text-white/80 text-2xl font-heading italic leading-relaxed">{t.text}</p>
                <div className="mt-10 flex items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center font-heading font-black text-accent text-xl">
                    {t.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-white text-lg">{t.name}</p>
                    <p className="text-accent/60 text-sm font-medium">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section (C3) */}
      <section id="contact" className="py-32 px-6 bg-secondary">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-primary/60 font-mono text-xs tracking-[0.4em] uppercase mb-4 block">Order Now</span>
          <h2 className="font-heading text-5xl md:text-6xl font-black text-primary mb-6">Get Fresh Ingredients Today</h2>
          <p className="text-primary/50 mb-16 text-xl leading-relaxed">Whether you are in Onitsha or anywhere else, we ensure your authentic ingredients arrive perfectly packaged and ready for use.</p>
          
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-primary/5 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -mr-10 -mt-10" />
            <ContactForm />
          </div>
          
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10">
             <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-primary mb-4">
                   <Instagram size={24} />
                </div>
                <p className="font-bold text-primary">Follow our Journey</p>
                <a href="#" className="text-primary/50 hover:text-accent transition-colors">@foodhub_by_centia</a>
             </div>
             <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-primary mb-4">
                   <MapPin size={24} />
                </div>
                <p className="font-bold text-primary">Visit Our Hub</p>
                <p className="text-primary/50">Onitsha, Anambra State, Nigeria</p>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary pt-24 pb-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <a href="#" className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center font-heading font-black text-primary text-xl">F</div>
                <span className="font-heading font-bold text-2xl text-white tracking-tight">FOOD HUB</span>
              </a>
              <p className="text-white/40 max-w-sm text-lg leading-relaxed">
                Empowering kitchens with the finest, most authentic Nigerian foodstuff. Processed with care, delivered with speed.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4">
                {['Home', 'Process', 'Shop', 'Contact'].map(link => (
                  <li key={link}><a href={`#${link.toLowerCase()}`} className="text-white/50 hover:text-accent transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Legal</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-white/50 hover:text-accent transition-colors">Shipping Policy</a></li>
                <li><a href="#" className="text-white/50 hover:text-accent transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-white/50 hover:text-accent transition-colors">Refund Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-sm">© {new Date().getFullYear()} Food Hub by Centia. All rights reserved.</p>
            <p className="text-white/30 text-sm">Made with love in Onitsha.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function ContactForm() {
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
      <div className="flex flex-col items-center justify-center py-10 text-center animate-scaleIn">
        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6 border border-accent/40">
          <CheckCheck size={32} className="text-primary" />
        </div>
        <h3 className="font-heading text-3xl font-black text-primary mb-3">Order Received</h3>
        <p className="text-primary/60 max-w-xs text-lg">Thank you. We will contact you shortly to confirm your selection and delivery details.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(['name', 'email'] as const).map(field => (
          <div key={field} className="relative group">
            <label className="text-[10px] uppercase tracking-widest text-primary/40 font-bold mb-1.5 block">{field}</label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              value={form[field]}
              onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
              required
              className="w-full bg-primary/5 border border-primary/10 rounded-xl px-5 py-4 text-primary outline-none transition-all focus:border-accent group-hover:border-primary/20"
            />
          </div>
        ))}
      </div>
      <div className="relative group">
        <label className="text-[10px] uppercase tracking-widest text-primary/40 font-bold mb-1.5 block">Phone Number</label>
        <input
          type="tel"
          value={form.phone}
          onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
          required
          className="w-full bg-primary/5 border border-primary/10 rounded-xl px-5 py-4 text-primary outline-none transition-all focus:border-accent group-hover:border-primary/20"
        />
      </div>
      <div className="relative group">
        <label className="text-[10px] uppercase tracking-widest text-primary/40 font-bold mb-1.5 block">Your Order / Inquiry</label>
        <textarea rows={4}
          value={form.message}
          onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
          required
          className="w-full bg-primary/5 border border-primary/10 rounded-xl px-5 py-4 text-primary outline-none resize-none transition-all focus:border-accent group-hover:border-primary/20"
        />
      </div>
      <button type="submit" disabled={loading}
        className="w-full mt-6 bg-primary text-white py-5 rounded-xl font-black text-lg hover:bg-primary/90 hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center gap-3">
        {loading ? <Loader2 className="animate-spin" size={24} /> : <>Place Order <ArrowRight size={20} /></>}
      </button>
    </form>
  );
}