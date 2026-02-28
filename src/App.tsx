import { useEffect, useRef, useState } from 'react';
import { 
  Sparkles, 
  Search, 
  BarChart3, 
  TrendingUp, 
  Zap, 
  Brain,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Starfield Component
function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let stars: { x: number; y: number; size: number; opacity: number; speed: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const numStars = Math.floor((canvas.width * canvas.height) / 3000);
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.02 + 0.01,
        });
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        // Twinkle effect
        star.opacity += (Math.random() - 0.5) * 0.02;
        star.opacity = Math.max(0.2, Math.min(0.8, star.opacity));

        // Slow drift
        star.y -= star.speed;
        if (star.y < 0) star.y = canvas.height;
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="starfield"
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}
    />
  );
}

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Research', href: '#research' },
    { label: 'Intelligence', href: '#intelligence' },
    { label: 'Comparison', href: '#comparison' },
    { label: 'About', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass-strong py-3' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-wider text-white">
              RAJORA<span className="gradient-text">.AI</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 glass-strong rounded-xl p-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-white/70 hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white">
              Get Started
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}

// Hero Section
function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePos({ x: x * 15, y: y * 15 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="section min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Nebula effects */}
      <div className="nebula top-1/4 left-1/4 opacity-60" />
      <div className="nebula bottom-1/4 right-1/4 opacity-40" style={{ animationDelay: '-10s' }} />

      <div className="section-content w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white/80">Next-Gen AI Intelligence</span>
            </div>

            <h1 className="text-hero font-display font-bold text-white mb-6 leading-tight">
              COSMIC
              <br />
              <span className="gradient-text">INTELLIGENCE</span>
              <br />
              ENGINE
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-8 max-w-xl mx-auto lg:mx-0">
              The next evolution of AI-driven tools discovery and intelligence. 
              Explore, compare, and harness the power of cutting-edge digital tools.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#research" className="btn-primary inline-flex items-center justify-center gap-2">
                Enter the Void
                <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#intelligence" className="btn-outline inline-flex items-center justify-center gap-2">
                Learn More
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
              <div>
                <div className="text-2xl md:text-3xl font-bold gradient-text">500+</div>
                <div className="text-sm text-white/60">AI Tools</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold gradient-text">37</div>
                <div className="text-sm text-white/60">Categories</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold gradient-text">100%</div>
                <div className="text-sm text-white/60">Verified</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative flex items-center justify-center">
            <div
              className="relative animate-float"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
                transition: 'transform 0.1s ease-out',
              }}
            >
              {/* Glow effect behind robot */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-400/30 rounded-full blur-3xl scale-75" />
              
              <img
                src="/hero-robot.png"
                alt="AI Robot"
                className="relative z-10 w-full max-w-lg mx-auto drop-shadow-2xl"
              />
            </div>

            {/* Floating elements */}
            <div className="absolute top-10 right-10 glass px-4 py-2 rounded-lg animate-float" style={{ animationDelay: '-2s' }}>
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-mono text-white/80">AI Powered</span>
              </div>
            </div>

            <div className="absolute bottom-20 left-0 glass px-4 py-2 rounded-lg animate-float" style={{ animationDelay: '-4s' }}>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-mono text-white/80">Real-time</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-white/50 font-mono">SCROLL TO EXPLORE</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

// Research Section
function ResearchSection() {
  const cards = [
    {
      title: 'AI-Powered Discovery',
      description: 'Find the perfect tools using natural language queries. Our AI understands your needs and matches them with the best solutions.',
      image: '/card-discovery.jpg',
      icon: Search,
    },
    {
      title: 'Intelligent Comparison',
      description: 'Compare features, pricing, and performance side-by-side. Make informed decisions with comprehensive analysis.',
      image: '/card-comparison.jpg',
      icon: BarChart3,
    },
    {
      title: 'Real-time Intelligence',
      description: 'Stay updated with the latest tool releases, updates, and trends in the ever-evolving AI landscape.',
      image: '/card-intelligence.jpg',
      icon: TrendingUp,
    },
  ];

  return (
    <section id="research" className="section relative py-32">
      <div className="section-content">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-blue-400 font-mono text-sm tracking-wider">EXPLORE</span>
          <h2 className="text-section font-display font-bold text-white mt-2">
            RESEARCH
          </h2>
          <p className="text-white/60 mt-4 max-w-2xl text-lg">
            Explore the frontier of digital tools with our comprehensive intelligence platform.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={card.title}
              className="group glass rounded-2xl overflow-hidden card-hover"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                    <card.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">{card.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{card.description}</p>
                <button className="mt-4 flex items-center gap-2 text-blue-400 text-sm font-medium group-hover:gap-3 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Intelligence Hub Section
function IntelligenceHubSection() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: 'Semantic Search',
      description: 'Find tools by describing what you need. Our AI understands context, intent, and requirements to deliver precise results.',
      image: '/feature-search.jpg',
    },
    {
      title: 'Smart Recommendations',
      description: 'Get personalized tool suggestions based on your workflow, preferences, and industry. The more you use it, the smarter it gets.',
      image: '/feature-recommendations.jpg',
    },
    {
      title: 'Trend Analysis',
      description: 'Discover emerging tools before they trend. Stay ahead of the curve with predictive analytics and market insights.',
      image: '/feature-trends.jpg',
    },
  ];

  return (
    <section id="intelligence" className="section relative py-32">
      <div className="nebula top-1/2 right-0 opacity-30" />
      
      <div className="section-content">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="text-cyan-400 font-mono text-sm tracking-wider">POWERED BY AI</span>
          <h2 className="text-section font-display font-bold text-white mt-2">
            INTELLIGENCE
          </h2>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto text-lg">
            Advanced algorithms that learn, adapt, and deliver insights tailored to your needs.
          </p>
        </div>

        {/* Accordion Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Feature List */}
          <div className="lg:w-1/3 space-y-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`accordion-item ${activeFeature === index ? 'active' : ''}`}
                onClick={() => setActiveFeature(index)}
              >
                <h3 className={`text-xl font-semibold transition-colors ${activeFeature === index ? 'text-white' : 'text-white/60'}`}>
                  {feature.title}
                </h3>
                <p className={`text-sm mt-2 transition-all duration-300 ${activeFeature === index ? 'text-white/70 max-h-20' : 'text-white/40 max-h-0 overflow-hidden'}`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Feature Image */}
          <div className="lg:w-2/3">
            <div className="relative h-[500px] glass rounded-2xl overflow-hidden">
              {features.map((feature, index) => (
                <img
                  key={feature.title}
                  src={feature.image}
                  alt={feature.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                    activeFeature === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Active feature label */}
              <div className="absolute bottom-6 left-6">
                <div className="glass px-4 py-2 rounded-lg">
                  <span className="text-white font-medium">{features[activeFeature].title}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Comparison Section
function ComparisonSection() {
  const blocks = [
    {
      title: 'Feature Matrix',
      description: 'Side-by-side feature comparison with detailed breakdowns of capabilities, integrations, and limitations.',
      icon: BarChart3,
    },
    {
      title: 'Pricing Analysis',
      description: 'Transparent pricing breakdowns with total cost of ownership calculations and value assessments.',
      icon: TrendingUp,
    },
    {
      title: 'Performance Metrics',
      description: 'Real-world performance data from benchmarks, user reviews, and independent testing.',
      icon: Zap,
    },
  ];

  return (
    <section id="comparison" className="section relative py-32">
      <div className="section-content">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-blue-400 font-mono text-sm tracking-wider">DECISION SUPPORT</span>
          <h2 className="text-section font-display font-bold text-white mt-2">
            COMPARISON
          </h2>
          <p className="text-white/60 mt-4 max-w-2xl text-lg">
            Make informed decisions with comprehensive analysis and transparent data.
          </p>
        </div>

        {/* Sticky Blocks */}
        <div className="space-y-8">
          {blocks.map((block, index) => (
            <div
              key={block.title}
              className="glass rounded-2xl p-8 md:p-12 hover:border-blue-500/50 transition-all duration-500 group"
              style={{
                position: 'sticky',
                top: `${100 + index * 20}px`,
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-400/20 flex items-center justify-center group-hover:from-blue-500/40 group-hover:to-cyan-400/40 transition-all">
                  <block.icon className="w-8 h-8 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-2">{block.title}</h3>
                  <p className="text-white/60 text-lg">{block.description}</p>
                </div>
                <ArrowRight className="w-6 h-6 text-white/40 group-hover:text-blue-400 group-hover:translate-x-2 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact/Footer Section
function ContactSection() {
  const [email, setEmail] = useState('');

  return (
    <section id="contact" className="section relative py-32">
      <div className="nebula bottom-0 left-1/2 -translate-x-1/2 opacity-40" />
      
      <div className="section-content">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-cyan-400 font-mono text-sm tracking-wider">STAY CONNECTED</span>
          <h2 className="text-section font-display font-bold text-white mt-2 mb-4">
            JOIN THE MISSION
          </h2>
          <p className="text-white/60 text-lg mb-12">
            Stay updated with the latest in AI tools intelligence. Subscribe to our newsletter for weekly insights.
          </p>

          {/* Email Form */}
          <form className="flex flex-col sm:flex-row gap-4 mb-16" onSubmit={(e) => e.preventDefault()}>
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 py-6 bg-white/5 border-white/10 text-white placeholder:text-white/40 input-glow rounded-lg"
              />
            </div>
            <Button className="btn-primary py-6">
              Subscribe
            </Button>
          </form>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-16">
            {[
              { icon: Twitter, label: 'Twitter' },
              { icon: Linkedin, label: 'LinkedIn' },
              { icon: Github, label: 'GitHub' },
            ].map((social) => (
              <a
                key={social.label}
                href="#"
                className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all hover:scale-110"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Footer */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <span className="font-display font-bold text-lg tracking-wider text-white">
                RAJORA<span className="gradient-text">.AI</span>
              </span>
            </div>
            <p className="text-white/40 text-sm">
              © 2025 Rajora.AI. All rights reserved. | Cosmic Intelligence Engine
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main App
function App() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Starfield Background */}
      <Starfield />
      
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        <HeroSection />
        <ResearchSection />
        <IntelligenceHubSection />
        <ComparisonSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
