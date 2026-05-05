'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Leaf, 
  Truck, 
  Settings, 
  Package, 
  Users, 
  CheckCircle, 
  Menu, 
  X, 
  Phone, 
  Instagram, 
  Mail, 
  MapPin, 
  ArrowRight, 
  Loader2, 
  CheckCheck,
  ImageOff,
  ChefHat,
  UtensilsCrossed,
  Timer
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-RULE
// Typography Personality: refined

const brand = {
  name: "Food Hub by Centia",
  tagline: "Purely Natural. Traditionally Processed. Freshly Delivered.",
  description: "Onitsha's premier source for organic Nigerian foodstuff. We specialize in the meticulous processing and packaging of local proteins, spices, and seafood to bring the authentic taste of home to your kitchen.",
  industry: "food",
  region: "nigeria",
  currency: "₦"
};

const IMAGES = {
  hero: "https://picsum.photos/seed/food1/1920/1080",
  products: [
    "https://picsum.photos/seed/food2/800/1000",
    "https://picsum.photos/seed/food3/800/1000",
    "https://picsum.photos/seed/food4/800/1000",
    "https://picsum.photos/seed/food5/800/1000"
  ]
};

const products = [
  { name: "Premium Dried Snails", description: "Expertly cleaned and dehydrated jumbo snails, preserved to retain full flavor and nutritional value.", price: "₦25,500" },
  { name: "Hand-Picked Crayfish (Large Bag)", description: "Dust-free, premium quality crayfish sourced directly from the coastal waters, sun-dried to perfection.", price: "₦18,000" },
  { name: "Authentic Ogbono Seeds", description: "High-viscosity wild mango seeds, processed and packaged to ensure the perfect draw for your soups.", price: "₦12,500" },
  { name: "Seafood Combo Pack", description: "A curated mix of prawns, periwinkles, and dried fish, cleaned and ready for the pot.", price: "₦45,000" }
];

const features = [
  { title: "Natural Sourcing", description: "We source directly from local farms to ensure every ingredient is 100% organic and fresh.", icon: Leaf },
  { title: "Expert Processing", description: "Our hygiene-first packaging preserves the natural aroma and shelf life of your foodstuff.", icon: Settings },
  { title: "Swift Delivery", description: "From our hub in Onitsha to your doorstep, we ensure your proteins arrive in perfect condition.", icon: Truck }
];

const processSteps = [
  { number: "01", title: "Sourcing", description: "Selecting the finest snails, seafood, and spices from local organic producers." },
  { number: "02", title: "Cleaning", description: "Rigorous hygienic cleaning processes to ensure food safety and purity." },
  { number: "03", title: "Packaging", description: "Custom dehydration and sealing techniques to lock in freshness for longer." }
];

const testimonials = [
  { name: "Chiamaka O.", text: "The cleanest snails I have ever bought in Onitsha. No sand, just pure meat!", role: "Home Chef" },
  { name: "Emeka N.", text: "Their ogbono draws like no other. You can tell it was processed with care.", role: "Restaurant Owner" }
];

const stats = [
  { number: "1,300+", label: "Social Followers" },
  { number: "100%", label: "Natural Organic" },
  { number: "50+", label: "Food Items" }
];

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

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const heroReveal = useScrollReveal(0.1);
  const featuresReveal = useScrollReveal(0.2);
  const processReveal = useScrollReveal(0.2);
  const productsReveal = useScrollReveal(0.15);
  const aboutReveal = useScrollReveal(0.2);
  const testimonialsReveal = useScrollReveal(0.2);
  const contactReveal = useScrollReveal(0.2);

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <div className="min-h-screen bg-secondary text-primary selection:bg-accent/30">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-primary py-3 shadow-2xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-accent flex items-center justify-center rounded-sm font-heading font-bold text-xl text-primary transition-transform group-hover:scale-110">
              F
            </div>
            <span className={`font-heading text-xl font-bold tracking-tight transition-colors ${scrolled ? 'text-secondary' : 'text-secondary md:text-secondary'}`}>
              Food Hub
            </span>
          </a>

          <div className="hidden md:flex items-center gap-10">
            {['Home', 'Products', 'Our Process', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`} 
                className={`text-sm font-medium uppercase tracking-widest transition-colors ${scrolled ? 'text-secondary/70 hover:text-accent' : 'text-secondary/80 hover:text-accent'}`}
              >
                {item}
              </a>
            ))}
            <a href="#products" className="bg-accent text-primary px-6 py-2.5 rounded-full font-bold text-sm hover:brightness-110 transition-all">
              Shop Foodstuff
            </a>
          </div>

          <button className="md:hidden text-secondary" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[60] bg-primary transition-transform duration-500 transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex justify-between items-center mb-16">
            <span className="font-heading text-2xl font-bold text-secondary">Food Hub</span>
            <button onClick={() => setMobileMenuOpen(false)} className="text-secondary"><X size={32} /></button>
          </div>
          <div className="flex flex-col gap-8 text-3xl font-heading text-secondary/60">
            {['Home', 'Products', 'Our Process', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={() => setMobileMenuOpen(false)} className="hover:text-accent transition-colors">
                {item}
              </a>
            ))}
          </div>
          <div className="mt-auto pt-10 border-t border-secondary/10 text-secondary/40 text-sm tracking-widest">
            ONITSHA, NIGERIA
          </div>
        </div>
      </div>

      {/* HERO-B: Full-bleed image + gradient */}
      <section id="home" ref={heroReveal.ref} className="min-h-screen relative flex items-end pb-32 px-6 md:px-16 overflow-hidden">
        <SafeImage src={IMAGES.hero} alt={brand.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-transparent to-transparent" />
        
        <div className={`relative z-10 max-w-4xl transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="font-heading text-6xl md:text-[8rem] font-bold text-secondary leading-[0.85] tracking-tighter">
            Purely <br /> <span className="text-accent italic">Natural.</span>
          </h1>
          <p className="text-secondary/70 mt-8 text-xl max-w-xl leading-relaxed font-light">
            {brand.description}
          </p>
          <div className="flex flex-wrap gap-6 mt-12">
            <a href="#products" className="bg-accent text-primary px-10 py-4 font-bold text-lg hover:brightness-110 transition rounded-full">
              Shop Foodstuff
            </a>
            <a href="#our-process" className="text-secondary border-b-2 border-secondary/30 pb-1 hover:border-accent hover:text-accent transition-all font-medium self-end">
              Our Processing Heritage →
            </a>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="py-16 flex items-center gap-8 px-8 max-w-6xl mx-auto">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <span className="text-primary font-mono text-xs tracking-[0.4em] uppercase opacity-40">
          Traditional Excellence
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      {/* FEATURES: F-ICON-GRID */}
      <section id="features" ref={featuresReveal.ref} className="py-28 px-6 bg-secondary text-primary">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="font-heading text-5xl md:text-6xl font-bold">Why Choose Food Hub?</h2>
            <p className="text-primary/60 mt-4 text-lg">Quality you can taste, packaging you can trust.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div 
                key={i} 
                className={`p-10 rounded-2xl border border-primary/5 bg-primary/5 hover:bg-primary/10 transition-all duration-500 group cursor-default ${featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="mb-6 text-primary/30 group-hover:text-accent transition-colors">
                  <f.icon size={48} strokeWidth={1} />
                </div>
                <h3 className="font-heading font-bold text-2xl leading-tight mb-4">{f.title}</h3>
                <p className="text-primary/60 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS: Our Processing Heritage */}
      <section id="our-process" ref={processReveal.ref} className="py-28 px-6 bg-primary text-secondary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-accent/5 rounded-full blur-[120px] -z-0 translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className={`mb-16 transition-all duration-700 ${processReveal.isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8'}`}>
            <h2 className="font-heading text-5xl md:text-6xl font-bold mb-4">Our Processing Heritage</h2>
            <p className="text-secondary/40 text-lg">How we move from the farm to your kitchen.</p>
          </div>
          
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-accent/10 to-transparent hidden md:block" />
            <div className="space-y-16">
              {processSteps.map((step, i) => (
                <div 
                  key={i} 
                  className={`flex gap-10 items-start group transition-all duration-1000 ${processReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                  style={{ transitionDelay: `${i * 200}ms` }}
                >
                  <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center shrink-0 relative z-10 group-hover:bg-accent group-hover:border-accent transition-all duration-300 shadow-[0_0_15px_rgba(234,179,8,0.1)]">
                    <span className="font-mono font-black text-accent group-hover:text-primary transition-colors text-sm">
                      {step.number}
                    </span>
                  </div>
                  <div className="pt-1">
                    <h3 className="font-heading text-3xl font-bold text-secondary mb-3">{step.title}</h3>
                    <p className="text-secondary/50 text-lg leading-relaxed max-w-2xl">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS: P-STAGGER */}
      <section id="products" ref={productsReveal.ref} className="py-28 px-6 bg-secondary text-primary overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-32">
          <div className="text-center mb-24">
            <h2 className="font-heading text-6xl md:text-7xl font-bold">Market Favorites</h2>
            <p className="text-primary/40 mt-4 text-xl tracking-tight uppercase font-mono">Clean • Organic • Fresh</p>
          </div>

          {products.map((p, i) => (
            <div 
              key={i} 
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 transition-all duration-1000 ${productsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-full md:w-1/2 relative group">
                <div className="aspect-[4/5] relative rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(45,90,39,0.3)] bg-primary/10">
                  <SafeImage 
                    src={IMAGES.products[i]} 
                    alt={p.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-1000" 
                  />
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className={`absolute -bottom-10 ${i % 2 === 0 ? '-right-10' : '-left-10'} w-40 h-40 bg-accent/20 rounded-full blur-[60px] -z-10`} />
              </div>
              <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right md:items-end'} flex flex-col`}>
                <span className="font-mono text-accent text-sm font-bold tracking-[0.3em] uppercase mb-4 block">
                  Product 0{i + 1}
                </span>
                <h3 className="font-heading text-4xl md:text-6xl font-bold text-primary leading-tight mb-6">{p.name}</h3>
                <p className="text-primary/60 text-xl leading-relaxed mb-10 max-w-md">
                  {p.description}
                </p>
                <div className={`flex flex-col gap-6 ${i % 2 === 0 ? 'items-start' : 'items-start md:items-end'}`}>
                  <span className="text-4xl font-heading font-bold text-primary border-b border-accent/40 pb-2">{p.price}</span>
                  <a href="#contact" className="bg-primary text-secondary px-10 py-4 rounded-full font-bold hover:bg-primary/90 transition-all flex items-center gap-2 group">
                    Order Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT: With Stats */}
      <section id="about" ref={aboutReveal.ref} className="py-28 px-6 bg-primary text-secondary">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <h2 className="font-heading text-5xl md:text-7xl font-bold leading-[0.9] mb-10">Our Story</h2>
            <div className="space-y-6 text-lg text-secondary/70 leading-relaxed max-w-xl">
              <p>Centia started Food Hub with a simple mission: to make high-quality, clean, and traditionally processed Nigerian foodstuff accessible to everyone.</p>
              <p>Located in the vibrant trade heart of Onitsha, we bridge the gap between local farms and modern kitchens. Every snail we clean and every bag of crayfish we dry is handled with the same care we would give our own families.</p>
            </div>
            
            <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-8 pt-10 border-t border-secondary/10">
              {stats.map((s, i) => (
                <div 
                  key={i}
                  className={`transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${500 + (i * 150)}ms` }}
                >
                  <p className="font-heading text-4xl font-bold text-accent mb-1">{s.number}</p>
                  <p className="text-secondary/40 text-xs uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={`relative aspect-[3/4] rounded-[4rem] overflow-hidden group transition-all duration-1000 delay-300 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <SafeImage src="https://picsum.photos/seed/about/800/1200" alt="Tradition" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
            <div className="absolute inset-0 bg-primary/20" />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS: T-MASONRY */}
      <section id="testimonials" ref={testimonialsReveal.ref} className="py-28 px-6 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-5xl font-bold text-primary text-center mb-16">What Our Kitchens Say</h2>
          <div className="columns-1 md:columns-2 gap-8 space-y-8">
            {testimonials.map((t, i) => (
              <div 
                key={i} 
                className={`break-inside-avoid bg-secondary p-10 rounded-[2.5rem] border border-primary/5 shadow-sm relative overflow-hidden group hover:border-accent/30 transition-all duration-500 ${testimonialsReveal.isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="flex gap-1.5 mb-6">
                  {[1,2,3,4,5].map(n => <div key={n} className="w-2 h-2 rounded-full bg-accent" />)}
                </div>
                <p className="text-primary text-2xl font-heading leading-relaxed mb-10">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center justify-between border-t border-primary/5 pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold font-heading text-xl">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-primary">{t.name}</p>
                      <p className="text-primary/40 text-xs uppercase tracking-widest">{t.role}</p>
                    </div>
                  </div>
                  <UtensilsCrossed size={20} className="text-accent/30" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT: C3 Minimal Centered */}
      <section id="contact" ref={contactReveal.ref} className="py-32 px-6 bg-primary text-secondary">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-accent font-mono text-xs tracking-[0.4em] uppercase mb-6 opacity-80">Place Your Order</p>
          <h2 className="font-heading text-6xl md:text-8xl font-bold mb-6">Let's Stock Your <span className="italic">Kitchen</span></h2>
          <p className="text-secondary/50 mb-16 text-xl leading-relaxed">
            Sharp delivery, nationwide. Send us a message and we'll handle the rest.
          </p>

          <div className={`text-left transition-all duration-1000 ${contactReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {sent ? (
              <div className="flex flex-col items-center justify-center p-16 text-center animate-scaleIn bg-primary border border-secondary/10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-50" />
                <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mb-8 border border-accent/40 relative z-10">
                  <CheckCheck size={40} className="text-accent" />
                </div>
                <h3 className="font-heading text-4xl font-bold text-secondary mb-4 relative z-10">Message Sent</h3>
                <p className="text-secondary/60 max-w-sm text-lg relative z-10">Centia or one of our team members will be in touch shortly to finalize your order.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 bg-secondary/5 p-8 md:p-12 rounded-[3rem] border border-secondary/10 shadow-2xl relative overflow-hidden backdrop-blur-sm">
                <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 blur-[100px] rounded-full pointer-events-none" />
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(['name', 'email', 'phone'] as const).map(field => (
                    <div key={field} className={field === 'phone' ? 'md:col-span-2' : ''}>
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={form[field]}
                        onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                        required={field !== 'phone'}
                        className="w-full bg-secondary/5 border border-secondary/10 rounded-2xl px-6 py-5 text-secondary placeholder-secondary/30 text-base outline-none transition-all duration-300 focus:bg-secondary/10 focus:border-accent focus:ring-1 focus:ring-accent"
                      />
                    </div>
                  ))}
                  <div className="md:col-span-2">
                    <textarea rows={4} placeholder="Your order or inquiry details..."
                      value={form.message}
                      onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                      required
                      className="w-full bg-secondary/5 border border-secondary/10 rounded-2xl px-6 py-5 text-secondary placeholder-secondary/30 text-base outline-none resize-none transition-all duration-300 focus:bg-secondary/10 focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                  </div>
                </div>
                <button type="submit" disabled={loading}
                  className="w-full mt-6 bg-accent text-primary py-5 rounded-2xl font-bold text-lg hover:brightness-110 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center gap-3 group">
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={24} /> Processing Order...
                    </>
                  ) : (
                    <>
                      Send Inquiry <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="mt-20 flex flex-wrap justify-center gap-12 text-secondary/40">
            <a href="https://wa.me/message/FOODHUB" target="_blank" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone size={20} /> <span className="font-medium">WhatsApp</span>
            </a>
            <a href="https://instagram.com/foodhub_by_centia" target="_blank" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Instagram size={20} /> <span className="font-medium">Instagram</span>
            </a>
            <div className="flex items-center gap-2">
              <MapPin size={20} /> <span className="font-medium">Onitsha, Nigeria</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-secondary border-t border-primary/5 text-primary">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-sm font-heading font-bold text-lg text-secondary">
                F
              </div>
              <span className="font-heading text-xl font-bold">Food Hub</span>
            </div>
            <p className="text-primary/40 text-sm">© {new Date().getFullYear()} Food Hub by Centia. All rights reserved.</p>
          </div>
          
          <div className="flex gap-10 text-xs font-bold uppercase tracking-widest text-primary/60">
            <a href="#home" className="hover:text-accent transition-colors">Privacy</a>
            <a href="#home" className="hover:text-accent transition-colors">Terms</a>
            <a href="#home" className="hover:text-accent transition-colors">Sitemap</a>
          </div>
        </div>
      </footer>

    </div>
  );
}