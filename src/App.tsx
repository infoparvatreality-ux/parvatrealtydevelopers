import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Phone, 
  Mail, 
  Building2, 
  ArrowRight, 
  X, 
  Search,
  CheckCircle2, 
  Menu, 
  Calendar,
  Layers,
  Map,
  Compass,
  FileCheck2,
  Users2,
  ChevronDown,
  MessageSquare,
  PhoneCall,
  Award,
  ExternalLink,
  Linkedin,
  Instagram,
  Twitter,
  Facebook,
  Share2,
  Play,
  Zap,
  Droplet,
  Shield
} from 'lucide-react';

const getAmenityDetails = (amenity: string) => {
  let Icon = Compass;
  let bgClass = "bg-slate-500/10 hover:bg-slate-500/20 text-slate-300 border-slate-500/20";
  let iconColor = "text-slate-400";

  const lower = amenity.toLowerCase();
  if (lower.includes('electricity') || lower.includes('power')) {
    Icon = Zap;
    bgClass = "bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/20";
    iconColor = "text-amber-400";
  } else if (lower.includes('water')) {
    Icon = Droplet;
    bgClass = "bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border-blue-500/20";
    iconColor = "text-blue-400";
  } else if (lower.includes('road') || lower.includes('access')) {
    Icon = Map;
    bgClass = "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border-emerald-500/20";
    iconColor = "text-emerald-400";
  } else if (lower.includes('fencing') || lower.includes('shield') || lower.includes('security')) {
    Icon = Shield;
    bgClass = "bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border-indigo-500/20";
    iconColor = "text-indigo-400";
  }

  return { Icon, bgClass, iconColor };
};

const DEFAULT_SLIDES = [
  {
    url: '/banner1.png',
    title: 'SECURE YOUR LAND NEAR UPCOMING INFRASTRUCTURE',
    subtitle: 'MUMBAI 3.0 CONNECTIVITY',
    tagline: 'Premium plots located near Navi Mumbai Airport and highways.'
  },
  {
    url: '/banner2.png',
    title: 'BUNGALOW, RESIDENTIAL & COMMERCIAL PLOTS',
    subtitle: 'PREMIUM PLOT VARIETIES',
    tagline: 'From luxury bungalow locations to high-yielding commercial lands, we provide clear-title plots tailored for growth.'
  },
  {
    url: '/banner3.png',
    title: 'CLEAR TITLE & COMPLETELY VERIFIED LAND PARCELS',
    subtitle: '100% LEGAL TRANSPARENCY',
    tagline: 'Every plot undergoes strict legal vetting with government clearances, offering you absolute peace of mind.'
  },
  {
    url: '/banner4.png',
    title: 'INVEST IN THE BOOMING NAVI MUMBAI AIRPORT ZONE',
    subtitle: 'FUTURE INVESTMENT SPOTLIGHT',
    tagline: 'Maximize your wealth by securing premium plots in the high-growth Third Mumbai region before prices skyrocket.'
  }
];

const PROPERTIES = [
  {
    id: 'p1',
    title: 'Highway Touch NA Plot',
    location: 'MUMBAI',
    size: '1.2 Acres',
    price: '₹ 85 Lakhs',
    tag: 'Hot Seller',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    desc: 'Golden opportunity near expansion corridor. Clean title, high appreciation.'
  },
  {
    id: 'p2',
    title: 'Premium Hilltop Ridge Estates',
    location: 'PUNE',
    size: '2.5 Acres',
    price: '₹ 1.4 Crores',
    tag: 'Mountain View',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    desc: 'Breathtaking 360 views with concrete road touch & ready borewell connectivity.'
  },
  {
    id: 'p3',
    title: 'Greenfield Industrial NA Parcel',
    location: 'NAVI MUMBAI',
    size: '5.0 Acres',
    price: '₹ 3.2 Crores',
    tag: 'High Yield',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    desc: 'Situated directly on proposed logistics ring road. Fully fenced boundary.'
  },
  {
    id: 'p4',
    title: 'Sunset Ranch Country Meadows',
    location: 'PUNE',
    size: '1.8 Acres',
    price: '₹ 95 Lakhs',
    tag: 'Nature Centric',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
    desc: 'Encircled by natural streams, organic rich soil, ready electricity connection.'
  },
  {
    id: 'p5',
    title: 'Seaside Horizon Orchard Lands',
    location: 'MUMBAI',
    size: '0.9 Acres',
    price: '₹ 1.1 Crores',
    tag: 'Exclusive',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    desc: 'Water-facing luxury orchard space. Ready with mature mango tree plantations.'
  },
  {
    id: 'p6',
    title: 'Metro Hub Commercial Plot',
    location: 'NAVI MUMBAI',
    size: '2.1 Acres',
    price: '₹ 2.5 Crores',
    tag: 'VIP Listing',
    image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80',
    desc: 'Close vicinity to international airport transit zone. Prime commercial potential.'
  }
];

const DEFAULT_BROCHURES = [
  {
    id: 'b1',
    title: 'Parvat Grandeur Phase-I Brochure',
    subtitle: 'Detailed architectural plans, floor heights, and premium amenity layouts',
    fileSize: '4.8 MB',
    downloads: '1.2k+'
  },
  {
    id: 'b2',
    title: 'Nature Meadows Layout Blueprint Plan',
    subtitle: 'N/A plots and physical layout boundaries certified by the town planner',
    fileSize: '6.2 MB',
    downloads: '850+'
  },
  {
    id: 'b3',
    title: 'Sunrise Valley Legal Title Certificates',
    subtitle: 'Clear verification certificates, registry records, and ownership logs',
    fileSize: '11.5 MB',
    downloads: '2.4k+'
  }
];

const getBrochures = () => {
  try {
    const saved = localStorage.getItem('parvat_brochures');
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return DEFAULT_BROCHURES;
};

const DEFAULT_PROJECTS = [
  {
    id: 'proj1',
    title: 'Highway Touch Commercial Land',
    location: 'MUMBAI 3.0',
    locationCategoryTag: 'MUMBAI 3.0',
    size: '85,000 Sq.Ft.',
    price: '₹ 4.8 Crores',
    tag: 'Highway Touch',
    zone: 'Commercial Land',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
    desc: 'Premium commercial frontage perfect for warehousing, fuel stations, or large corporate showrooms. Excellent 6-lane road touch.',
    amenities: ['Electricity', 'Road Access'],
    showOnHome: true
  },
  {
    id: 'proj2',
    title: 'Residential NA Gated Plot',
    location: 'PANVEL',
    locationCategoryTag: 'PANVEL',
    size: '12,500 Sq.Ft.',
    price: '₹ 65 Lakhs',
    tag: 'Gated Villa Plot',
    zone: 'Residential Plot',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    desc: 'Fully sanctioned Collector NA villa plots with 100% legal titles. Premium clubhouse amenities, concrete internal roads & individual water connections.',
    amenities: ['Electricity', 'Road Access', 'Fencing', 'Water Supply'],
    showOnHome: true
  },
  {
    id: 'proj3',
    title: 'Airport Perimeter Plot',
    location: 'MUMBAI 3.0',
    locationCategoryTag: 'MUMBAI 3.0',
    size: '42,000 Sq.Ft.',
    price: '₹ 2.9 Crores',
    tag: 'Transit Hub',
    zone: 'Residential Plot',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    desc: 'High-appreciation parcel located in the immediate vicinity of the proposed international airport. Ideal for cargo transit structures or corporate leasing.',
    amenities: ['Electricity', 'Road Access'],
    showOnHome: true
  },
  {
    id: 'proj4',
    title: 'Scenic Pali Holiday Home Plot',
    location: 'PALI',
    locationCategoryTag: 'PALI',
    size: '35,000 Sq.Ft.',
    price: '₹ 5.5 Crores',
    tag: 'Sea Facing',
    zone: 'Farmhouse Land',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80',
    desc: 'Luxury holiday parcel offering panoramic valley views and private gate access. Ready with mature coconut palm plantations.',
    amenities: ['Road Access', 'Fencing', 'Water Supply'],
    showOnHome: true
  },
  {
    id: 'proj5',
    title: 'Commercial Warehousing Land',
    location: 'PEN',
    locationCategoryTag: 'PEN',
    size: '45,000 Sq.Ft.',
    price: '₹ 1.2 Crores',
    tag: 'Valley View',
    zone: 'Commercial Land',
    image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1000&q=80',
    desc: 'Magnificent mountain-facing plot offering round-the-clock cool breezes. Includes finished perimeter stone walls and natural waterfall boundary.',
    amenities: ['Electricity', 'Road Access', 'Fencing', 'Water Supply'],
    showOnHome: true
  },
  {
    id: 'proj6',
    title: 'Golden Oasis Agro Farmstead',
    location: 'MANGAON',
    locationCategoryTag: 'MANGAON',
    size: '90,000 Sq.Ft.',
    price: '₹ 1.9 Crores',
    tag: 'Agro Farms',
    zone: 'Agricultural Land',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80',
    desc: 'Deep alluvial rich agricultural acreage. Comes with pre-installed drip irrigation systems, functional borewell, and organic farming assistance.',
    amenities: ['Electricity', 'Road Access', 'Water Supply'],
    showOnHome: true
  },
  {
    id: 'proj7',
    title: 'High-Elevation Ridge Meadows',
    location: 'KHOPOLI',
    locationCategoryTag: 'KHOPOLI',
    size: '54,000 Sq.Ft.',
    price: '₹ 2.1 Crores',
    tag: 'Hill Station',
    zone: 'Commercial Land',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    desc: 'Overlooking a scenic lake reservoir, this peak estate plot is perfectly secure, clear-demarcated, and ready for private retreat construction.',
    amenities: ['Electricity', 'Road Access', 'Fencing', 'Water Supply'],
    showOnHome: true
  },
  {
    id: 'proj8',
    title: 'Sunset Ranch Country Meadows',
    location: 'KARJAT',
    locationCategoryTag: 'KARJAT',
    size: '40,000 Sq.Ft.',
    price: '₹ 95 Lakhs',
    tag: 'Nature Centric',
    zone: 'Farmhouse Land',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    desc: 'Slick riverfront ranch parcel ready for weekend holiday makers. Instant registry & 7/12 land records ready for transfer.',
    amenities: ['Electricity', 'Road Access', 'Water Supply'],
    showOnHome: true
  }
];

const getProjects = () => {
  try {
    const saved = localStorage.getItem('parvat_projects');
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return DEFAULT_PROJECTS;
};

const DEFAULT_BANNERS = [
  {
    id: 'pb1',
    title: 'Exclusive Launch: 40-Acre Greenfield Luxury Plots in Navi Mumbai',
    description: 'Surrounded by pure natural reserves, ready with modern grid water and power hookups.',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    ctaLink: '#projects',
    insertAfter: 2,
    active: true
  }
];

const getBanners = () => {
  try {
    const saved = localStorage.getItem('parvat_promo_banners');
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return DEFAULT_BANNERS;
};

function ScrollRevealCard({ children, className = '', index = 0 }: { children: React.ReactNode; className?: string; index?: number; key?: string | number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const delayClass = [
    'delay-[0ms]',
    'delay-[100ms]',
    'delay-[200ms]',
    'delay-[300ms]',
    'delay-[400ms]',
    'delay-[500ms]'
  ][index % 6] || 'delay-[0ms]';

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out transform ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-12 scale-95'
      } ${delayClass}`}
    >
      {children}
    </div>
  );
}

interface NewsMediaGalleryProps {
  item: {
    title: string;
    image?: string;
    videoLink?: string;
    media?: Array<{ type: string; data: string; name?: string }>;
  };
}

function getEmbedUrl(url: string) {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    let videoId = '';
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    } else if (url.includes('v=')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    } else if (url.includes('embed/')) {
      videoId = url.split('embed/')[1]?.split('?')[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  }
  return url;
}

function NewsMediaGallery({ item }: NewsMediaGalleryProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  // Extract all images
  const images: string[] = [];
  if (item.image) {
    images.push(item.image);
  }
  if (item.media && item.media.length > 0) {
    item.media.forEach((m: any) => {
      if (m.type && m.type.startsWith('image/') && !images.includes(m.data)) {
        images.push(m.data);
      }
    });
  }

  // Extract all videos
  const videos: string[] = [];
  if (item.videoLink) {
    videos.push(item.videoLink);
  }
  if (item.media && item.media.length > 0) {
    item.media.forEach((m: any) => {
      if (m.type && m.type.startsWith('video/') && !videos.includes(m.data)) {
        videos.push(m.data);
      }
    });
  }

  const hasImage = images.length > 0;
  const hasVideo = videos.length > 0;

  const nextImage = () => {
    setActiveIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-6">
      {/* 1. Image section at the top if available */}
      {hasImage && (
        <div className="relative w-full rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-950 group">
          {images.length === 1 ? (
            <img 
              src={images[0]} 
              alt={item.title} 
              className="w-full h-auto max-h-[70vh] object-contain mx-auto block animate-in fade-in duration-300"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="relative bg-neutral-950 aspect-video md:aspect-[21/9] flex items-center justify-center">
              {/* Image Container */}
              <div className="w-full h-full relative">
                <img 
                  src={images[activeIdx]} 
                  alt={`${item.title} - ${activeIdx + 1}`} 
                  className="w-full h-full object-contain mx-auto block transition-all duration-300 animate-in fade-in"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Navigation Arrows */}
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-neutral-900/80 border border-neutral-850 text-white flex items-center justify-center hover:bg-neutral-800 hover:text-amber-500 transition-colors z-10 shadow-lg cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-neutral-900/80 border border-neutral-850 text-white flex items-center justify-center hover:bg-neutral-800 hover:text-amber-500 transition-colors z-10 shadow-lg cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Dots and Count Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-neutral-800">
                <div className="flex gap-1.5 mr-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIdx(idx)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${idx === activeIdx ? 'bg-amber-500 w-3' : 'bg-neutral-500'}`}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-amber-500 font-mono">
                  {activeIdx + 1} / {images.length}
                </span>
              </div>
            </div>
          )}
          {/* Subtle elegant gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/20 via-transparent to-transparent pointer-events-none" />
        </div>
      )}

      {/* 2. Video section or action button directly below image */}
      {hasVideo && (
        <div className="pt-2 animate-fadeIn">
          {hasImage ? (
            /* Both media available: Premium Action Button directly below the image */
            <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg hover:border-amber-500/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                  <Play className="w-6 h-6 animate-pulse" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] text-amber-500 font-mono uppercase tracking-widest block font-bold">Media Coverage Available</span>
                  <h4 className="text-sm font-semibold text-white mt-0.5">Exclusive video walkthrough is ready to view</h4>
                </div>
              </div>
              
              <div className="w-full sm:w-auto">
                {isPlaying ? (
                  <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden border border-neutral-800 shadow-2xl">
                      <button 
                        onClick={() => setIsPlaying(false)} 
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 text-white flex items-center justify-center hover:bg-neutral-800 hover:text-amber-500 transition-colors z-50 shadow-lg text-lg font-bold"
                      >
                        &times;
                      </button>
                      {videos[0].includes('youtube.com') || videos[0].includes('youtu.be') ? (
                        <iframe 
                          src={getEmbedUrl(videos[0])} 
                          className="w-full h-full object-contain" 
                          allowFullScreen 
                          title="Video Coverage"
                        />
                      ) : (
                        <video src={videos[0]} controls autoPlay className="w-full h-full object-contain" />
                      )}
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={() => setIsPlaying(true)} 
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs tracking-widest uppercase rounded transition-colors shadow-lg cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" /> WATCH VIDEO COVERAGE
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Only video available: Embed video player directly */
            <div className="w-full rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-950">
              {videos[0].includes('youtube.com') || videos[0].includes('youtu.be') ? (
                <div className="aspect-video bg-neutral-950">
                  <iframe 
                    src={getEmbedUrl(videos[0])} 
                    className="w-full h-full object-contain" 
                    allowFullScreen 
                    title="Video Coverage"
                  />
                </div>
              ) : (
                <video src={videos[0]} controls className="w-full h-auto max-h-[70vh] bg-black mx-auto object-contain block" />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PremiumHousingGallery({ proj }: { proj: any }) {
  const [activeImageIdx, setActiveImageIdx] = useState<number | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Extract all images
  const images: string[] = [];
  if (proj.image) {
    images.push(proj.image);
  }
  if (proj.media && proj.media.length > 0) {
    proj.media.forEach((m: any) => {
      if (m.type && m.type.startsWith('image/') && !images.includes(m.data)) {
        images.push(m.data);
      }
    });
  }

  // Extract videos
  const videos: string[] = [];
  if (proj.videoLink) {
    videos.push(proj.videoLink);
  }
  if (proj.media && proj.media.length > 0) {
    proj.media.forEach((m: any) => {
      if (m.type && m.type.startsWith('video/') && !videos.includes(m.data)) {
        videos.push(m.data);
      }
    });
  }

  const hasVideo = videos.length > 0;
  const mainCover = images[0] || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80';
  const secondaryImage = images[1] || images[0];
  const tertiaryImage = images[2] || images[1] || images[0];
  const remainingCount = images.length > 2 ? images.length - 2 : 0;

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    let videoId = '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      videoId = match[2];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    return url;
  };

  return (
    <div className="space-y-4">
      {/* 3-Column Split View Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 h-[250px] md:h-[380px] w-full rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950">
        {/* Left: Large cover image */}
        <div 
          onClick={() => setActiveImageIdx(0)}
          className="md:col-span-2 h-full relative cursor-pointer group overflow-hidden"
        >
          <img 
            src={mainCover} 
            alt="Main Cover" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <span className="absolute bottom-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md border border-neutral-800 text-[10px] uppercase font-bold tracking-widest text-amber-500 rounded">
            Cover View
          </span>
        </div>

        {/* Right Stack */}
        <div className="hidden md:flex flex-col gap-3 h-full">
          {/* Top-Right: Video or Secondary view */}
          <div className="flex-1 relative overflow-hidden rounded-lg border border-neutral-850 bg-neutral-900 group">
            {hasVideo ? (
              <div 
                onClick={() => setIsVideoPlaying(true)}
                className="w-full h-full cursor-pointer relative"
              >
                <img 
                  src={secondaryImage} 
                  alt="Video Thumbnail Background" 
                  className="w-full h-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors group-hover:bg-black/50">
                  <div className="w-12 h-12 rounded-full bg-red-600/90 border border-red-500 flex items-center justify-center text-white shadow-xl transform transition-transform group-hover:scale-110">
                    <Play className="w-5 h-5 fill-current translate-x-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-3 left-3 px-2 py-0.5 bg-red-600 text-[9px] uppercase font-bold tracking-wider text-white rounded">
                  Watch Video
                </span>
              </div>
            ) : (
              <div 
                onClick={() => setActiveImageIdx(images.length > 1 ? 1 : 0)}
                className="w-full h-full cursor-pointer"
              >
                <img 
                  src={secondaryImage} 
                  alt="Secondary View" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            )}
          </div>

          {/* Bottom-Right: Image overlay */}
          <div 
            onClick={() => setActiveImageIdx(images.length > 2 ? 2 : 0)}
            className="flex-1 relative overflow-hidden rounded-lg border border-neutral-850 bg-neutral-900 cursor-pointer group"
          >
            <img 
              src={tertiaryImage} 
              alt="Additional view" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-neutral-950/70 flex flex-col items-center justify-center transition-colors group-hover:bg-neutral-950/60 p-4 text-center">
              <span className="text-2xl font-serif font-bold text-amber-500">
                +{remainingCount + 1}
              </span>
              <span className="text-[10px] text-neutral-300 font-bold uppercase tracking-widest mt-1">
                More Photos
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Clean horizontal summary bar inspired by housing.com */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 md:p-5 bg-neutral-950/80 border border-neutral-850 rounded-xl divide-y sm:divide-y-0 sm:divide-x divide-neutral-850 text-center sm:text-left shadow-lg">
        <div className="flex flex-col justify-center py-2 sm:py-0 sm:px-4 first:pl-0">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-500 font-bold font-mono">Configuration</span>
          <span className="text-white text-xs sm:text-sm font-semibold mt-1 truncate">{proj.zone || proj.tag || 'Plots'}</span>
        </div>
        <div className="flex flex-col justify-center py-2 sm:py-0 sm:px-4">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-500 font-bold font-mono">Possession Starts</span>
          <span className="text-amber-500 text-xs sm:text-sm font-bold mt-1 truncate">{proj.possession || 'Immediate'}</span>
        </div>
        <div className="flex flex-col justify-center py-2 sm:py-0 sm:px-4">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-500 font-bold font-mono">Avg. Price</span>
          <span className="text-white text-xs sm:text-sm font-semibold mt-1 truncate">{proj.pricePerUnit || proj.price || 'On Request'}</span>
        </div>
        <div className="flex flex-col justify-center py-2 sm:py-0 sm:px-4 last:pr-0">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-500 font-bold font-mono">Sizes / Range</span>
          <span className="text-white text-xs sm:text-sm font-semibold mt-1 truncate">{proj.sizeRange || proj.size || 'Varies'}</span>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImageIdx !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-fadeIn">
          <button 
            onClick={() => setActiveImageIdx(null)}
            className="absolute top-4 right-4 p-2 bg-neutral-900 border border-neutral-800 text-white hover:text-amber-500 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-5xl w-full flex flex-col items-center justify-center">
            <img 
              src={images[activeImageIdx]} 
              alt={`Gallery view ${activeImageIdx + 1}`} 
              className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl"
              referrerPolicy="no-referrer"
            />
            {images.length > 1 && (
              <div className="flex items-center gap-6 mt-6">
                <button 
                  onClick={() => setActiveImageIdx((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : 0))}
                  className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 text-white flex items-center justify-center hover:bg-amber-500 hover:text-neutral-950 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <span className="text-sm font-mono text-amber-500">
                  {activeImageIdx + 1} / {images.length}
                </span>
                <button 
                  onClick={() => setActiveImageIdx((prev) => (prev !== null ? (prev + 1) % images.length : 0))}
                  className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 text-white flex items-center justify-center hover:bg-amber-500 hover:text-neutral-950 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Video Overlay Modal */}
      {isVideoPlaying && hasVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-fadeIn">
          <button 
            onClick={() => setIsVideoPlaying(false)}
            className="absolute top-4 right-4 p-2 bg-neutral-900 border border-neutral-800 text-white hover:text-amber-500 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-2xl border border-neutral-800 bg-black">
            <iframe 
              src={getEmbedUrl(videos[0])} 
              className="w-full h-full border-0" 
              allow="autoplay; encrypted-media; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

const SAMPLE_NEWS = [];

export default function App() {
  const [allNews, setAllNews] = useState<any[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('parvat_news');
        if (saved) {
          return JSON.parse(saved);
        }
      } catch (e) {}
    }
    return [];
  });

  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      // Check pathname first (e.g. /news/n1)
      const path = window.location.pathname;
      const pathParts = path.split('/');
      const newsIndex = pathParts.findIndex(part => part.toLowerCase() === 'news');
      if (newsIndex !== -1 && pathParts[newsIndex + 1]) {
        return pathParts[newsIndex + 1];
      }

      // Check hash (e.g. #news-n1)
      const hash = window.location.hash;
      if (hash.startsWith('#news-')) {
        return hash.replace('#news-', '');
      }
      if (hash.startsWith('#news/')) {
        return hash.replace('#news/', '');
      }
    }
    return null;
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<any[]>(() => {
    let loadedSlides = [...DEFAULT_SLIDES];
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('parvat_slides');
        if (saved) {
          loadedSlides = JSON.parse(saved);
        }
      } catch (e) {}
    }
    // Force update all slides directly in code to ensure they are not stale from localStorage
    if (loadedSlides && loadedSlides.length >= 4) {
      loadedSlides[0] = {
        ...loadedSlides[0],
        url: '/banner1.png',
        title: 'SECURE YOUR LAND NEAR UPCOMING INFRASTRUCTURE',
        subtitle: 'MUMBAI 3.0 CONNECTIVITY',
        tagline: 'Premium plots located near Navi Mumbai Airport and highways.'
      };
      loadedSlides[1] = {
        ...loadedSlides[1],
        url: '/banner2.png',
        title: 'BUNGALOW, RESIDENTIAL & COMMERCIAL PLOTS',
        subtitle: 'PREMIUM PLOT VARIETIES',
        tagline: 'From luxury bungalow locations to high-yielding commercial lands, we provide clear-title plots tailored for growth.'
      };
      loadedSlides[2] = {
        ...loadedSlides[2],
        url: '/banner3.png',
        title: 'CLEAR TITLE & COMPLETELY VERIFIED LAND PARCELS',
        subtitle: '100% LEGAL TRANSPARENCY',
        tagline: 'Every plot undergoes strict legal vetting with government clearances, offering you absolute peace of mind.'
      };
      loadedSlides[3] = {
        ...loadedSlides[3],
        url: '/banner4.png',
        title: 'INVEST IN THE BOOMING NAVI MUMBAI AIRPORT ZONE',
        subtitle: 'FUTURE INVESTMENT SPOTLIGHT',
        tagline: 'Maximize your wealth by securing premium plots in the high-growth Third Mumbai region before prices skyrocket.'
      };
      // Keep localStorage in sync
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('parvat_slides', JSON.stringify(loadedSlides));
        } catch (e) {}
      }
    }
    return loadedSlides;
  });
  const [whatsappChannelUrl, setWhatsappChannelUrl] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('parvat_whatsapp_channel_url') || 'https://whatsapp.com/channel/0029Va9xyz';
    }
    return 'https://whatsapp.com/channel/0029Va9xyz';
  });
  const [isEnquireOpen, setIsEnquireOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeProjects, setActiveProjects] = useState<any[]>(() => {
    if (typeof window !== 'undefined') {
      return getProjects();
    }
    return DEFAULT_PROJECTS;
  });

  // Active page state for multi-page simulation
  const [activePage, setActivePage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      // Prioritize pathname check for clean URLs (e.g. /projects or /about)
      const path = window.location.pathname.toLowerCase();
      if (path.includes('projects')) return 'projects';
      if (path.includes('news')) return 'news';
      if (path.includes('about')) return 'about';
      if (path.includes('journey')) return 'journey';
      if (path.includes('contact')) return 'contact';
      if (path.includes('login')) return 'login';
      if (path.includes('enquire')) return 'enquire';
      if (path.includes('property')) return 'property';

      // Fallback to explicit injected initialPage
      if ((window as any).__initialPage) return (window as any).__initialPage;
      
      const hash = window.location.hash.toLowerCase();
      if (hash === '#enquire') return 'enquire';
      if (hash === '#projects') return 'projects';
      if (hash === '#news') return 'news';
      if (hash === '#about') return 'about';
      if (hash === '#journey') return 'journey';
      if (hash === '#contact') return 'contact';
      if (hash.startsWith('#property')) return 'property';
    }
    return 'home';
  });
  
  // Enquire form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plotType: 'Residential',
    message: ''
  });

  // Standalone Corporate Enquiry page form state
  const [corporateForm, setCorporateForm] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    gender: 'Male',
    message: ''
  });
  const [isCorporateSuccess, setIsCorporateSuccess] = useState(false);

  // Appointment states
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlId = urlParams.get('id');
      if (urlId) return urlId;
      const hash = window.location.hash;
      if (hash.startsWith('#property-')) {
        return hash.replace('#property-', '');
      }
      return localStorage.getItem('parvat_selected_project_id');
    }
    return null;
  });
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isAppointmentSuccess, setIsAppointmentSuccess] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({
    name: '',
    mobile: '',
    email: '',
    interest: 'Buy Farmhouse Land'
  });

  // Contact info modals
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [promoVideoUrl, setPromoVideoUrl] = useState<string | null>(null);

  // Join Our Family registration states
  const [isJoinSuccess, setIsJoinSuccess] = useState(false);
  const [joinFamilyForm, setJoinFamilyForm] = useState({
    name: '',
    phone: '',
    email: '',
    preferredProperty: 'Residential Plots'
  });

  // Hot Properties Tab filter state
  const [activePropertyTab, setActivePropertyTab] = useState<string>('MUMBAI 3.0');

  // Selected Property Type Filter (for homepage and projects page)
  const [activeTypeTab, setActiveTypeTab] = useState<string>('ALL');

  // Helper to read property types from localStorage
  const getPropertyTypes = () => {
    const defaultTypes = [
      { id: 'type_1', name: 'Residential Plot', image: 'https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&w=600&q=80' },
      { id: 'type_2', name: 'Commercial Land', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80' },
      { id: 'type_3', name: 'Agricultural Land', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80' },
      { id: 'type_4', name: 'Farmhouse Land', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80' }
    ];
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('parvat_property_types', JSON.stringify(defaultTypes));
      } catch (e) {}
    }
    return defaultTypes;
  };

  // Brochure download feedback state
  const [downloadingBrochure, setDownloadingBrochure] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Synchronize active property tab category with our actual focus areas
  useEffect(() => {
    const categories = ['MUMBAI 3.0', 'PANVEL', 'PEN', 'PALI', 'MANGAON', 'KARJAT', 'KHOPOLI'];
    if (!categories.includes(activePropertyTab.toUpperCase())) {
      setActivePropertyTab('MUMBAI 3.0');
    }
  }, [activePropertyTab]);

  // Sync WhatsApp Channel URL and other dynamic News configs on active page/view change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = localStorage.getItem('parvat_whatsapp_channel_url');
      if (url) {
        setWhatsappChannelUrl(url);
      }

      const savedCats = localStorage.getItem('parvat_news_categories');
      if (savedCats) {
        try {
          const parsed = JSON.parse(savedCats);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const cats = parsed.filter(c => c !== 'All');
            setNewsCategories(['All', ...cats]);
          }
        } catch (e) {}
      } else {
        setNewsCategories(['All', 'Land Launches', 'Market Updates', 'Corporate News']);
      }

      const title = localStorage.getItem('parvat_news_hero_title');
      const text = localStorage.getItem('parvat_news_hero_text');
      const image = localStorage.getItem('parvat_news_hero_image');
      setNewsHeroTitle(title || 'PARVAT MEDIA ROOM');
      setNewsHeroText(text || 'Expanding our greenfield residential luxury landscape footprint across India.');
      setNewsHeroImage(image);

      // Dynamic SEO Title, Description and Keywords Injection
      try {
        const DEFAULT_SEO: Record<string, { title: string, description: string, keywords: string }> = {
          home: {
            title: "Parvat Reality | Premium Greenfield Land & Luxury Plots",
            description: "Discover hand-picked premium greenfield residential land plots in India. Build your dream lifestyle with Parvat Reality's sustainable gated developments.",
            keywords: "parvat reality, premium plots, residential land, greenfield plots, real estate india, land investment"
          },
          projects: {
            title: "Our Projects Portfolio | Parvat Reality Greenfield Plots",
            description: "Explore Parvat Reality's range of ultra-premium greenfield plots and master-planned residential land developments across high-growth hubs in India.",
            keywords: "real estate portfolio, luxury estates, land investments, parvat plots, greenfield developments"
          },
          news: {
            title: "Media Room & Latest Updates | Parvat Reality",
            description: "Stay informed with the latest company news, project announcements, corporate updates, and media publications from Parvat Reality.",
            keywords: "parvat news, land launch updates, corporate updates, real estate news india, land developments"
          },
          about: {
            title: "About Us | Pioneer of Greenfield Developments | Parvat Reality",
            description: "Learn about Parvat Reality's core values, mission, and leadership team pioneering sustainable, high-growth luxury greenfield land developments.",
            keywords: "about parvat, land developer values, sustainable development, high-growth real estate"
          },
          journey: {
            title: "Our Legacy Journey | Parvat Reality",
            description: "Trace the historic milestones and corporate journey of Parvat Reality, transforming premium residential landscaping across Indian cities.",
            keywords: "corporate history, milestones, legacy journey, parvat land development"
          },
          contact: {
            title: "Contact Our Sales Office | Parvat Reality",
            description: "Get in touch with Parvat Reality's expert sales consultants. Request site visits, ask queries, and explore premium plots investment opportunities.",
            keywords: "contact parvat, customer support, real estate office, site visit request"
          },
          enquire: {
            title: "Premium Plot Inquiry | Parvat Reality",
            description: "Enquire today to receive exclusive pricing lists, plot availability brochures, and customized investment details from Parvat Reality.",
            keywords: "enquire land plots, buy land brochure, real estate inquiry, parvat investments"
          }
        };

        const seoSaved = localStorage.getItem('parvat_seo_settings');
        let currentSeo = DEFAULT_SEO[activePage] || DEFAULT_SEO['home'];

        if (seoSaved) {
          const parsed = JSON.parse(seoSaved);
          if (parsed && parsed[activePage]) {
            currentSeo = {
              title: parsed[activePage].title || currentSeo.title,
              description: parsed[activePage].description || currentSeo.description,
              keywords: parsed[activePage].keywords || currentSeo.keywords
            };
          }
        }

        // Override if we are viewing a specific news article for fully dynamic SEO
        if (activePage === 'news' && selectedNewsId) {
          const article = allNews.find((n: any) => n.id === selectedNewsId);
          if (article) {
            currentSeo = {
              title: `${article.title} | Parvat Reality News`,
              description: article.snippet || `Read the latest update: ${article.title} on Parvat Reality.`,
              keywords: `parvat news, ${article.category || 'real estate'}, ${article.title.toLowerCase().split(' ').slice(0, 5).join(', ')}`
            };
          }
        }

        // Inject dynamic title
        document.title = currentSeo.title;

        // Inject dynamic meta description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
          metaDesc = document.createElement('meta');
          metaDesc.setAttribute('name', 'description');
          document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', currentSeo.description);

        // Inject dynamic meta keywords
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
          metaKeywords = document.createElement('meta');
          metaKeywords.setAttribute('name', 'keywords');
          document.head.appendChild(metaKeywords);
        }
        metaKeywords.setAttribute('content', currentSeo.keywords);

        // Inject Dynamic OpenGraph tags for rich SEO crawling
        const ogTags = [
          { property: 'og:title', content: currentSeo.title },
          { property: 'og:description', content: currentSeo.description },
          { property: 'og:url', content: window.location.href },
          { property: 'og:type', content: activePage === 'news' && selectedNewsId ? 'article' : 'website' }
        ];

        // Find or create article details if applicable
        if (activePage === 'news' && selectedNewsId) {
          const article = allNews.find((n: any) => n.id === selectedNewsId);
          if (article && article.media && article.media.length > 0) {
            ogTags.push({ property: 'og:image', content: article.media[0].data });
          } else {
            ogTags.push({ property: 'og:image', content: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80' });
          }
        } else {
          ogTags.push({ property: 'og:image', content: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80' });
        }

        ogTags.forEach(tag => {
          let element = document.querySelector(`meta[property="${tag.property}"]`);
          if (!element) {
            element = document.createElement('meta');
            element.setAttribute('property', tag.property);
            document.head.appendChild(element);
          }
          element.setAttribute('content', tag.content);
        });

      } catch (e) {
        console.error("SEO synchronization failed:", e);
      }
    }
  }, [activePage, selectedNewsId, allNews]);

  const [newsSearchQuery, setNewsSearchQuery] = useState('');
  const [selectedNewsCategory, setSelectedNewsCategory] = useState('All');
  const [newsSliderIndex, setNewsSliderIndex] = useState(0);

  const [newsCategories, setNewsCategories] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('parvat_news_categories');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const cats = parsed.filter(c => c !== 'All');
            return ['All', ...cats];
          }
        } catch (e) {}
      }
    }
    return ['All', 'Land Launches', 'Market Updates', 'Corporate News'];
  });

  const [newsHeroTitle, setNewsHeroTitle] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('parvat_news_hero_title') || 'PARVAT MEDIA ROOM';
    }
    return 'PARVAT MEDIA ROOM';
  });

  const [newsHeroText, setNewsHeroText] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('parvat_news_hero_text') || 'Expanding our greenfield residential luxury landscape footprint across India.';
    }
    return 'Expanding our greenfield residential luxury landscape footprint across India.';
  });

  const [newsHeroImage, setNewsHeroImage] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('parvat_news_hero_image') || null;
    }
    return null;
  });

  const [storageUpdateKey, setStorageUpdateKey] = useState(0);

  // Real-time synchronization of categories and news between Admin and Public pages
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const syncFromStorage = () => {
      // Sync WhatsApp channel URL
      const url = localStorage.getItem('parvat_whatsapp_channel_url');
      if (url) {
        setWhatsappChannelUrl(url);
      }

      // Sync categories
      const savedCats = localStorage.getItem('parvat_news_categories');
      if (savedCats) {
        try {
          const parsed = JSON.parse(savedCats);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const cats = parsed.filter(c => c !== 'All');
            setNewsCategories(['All', ...cats]);
          }
        } catch (e) {}
      } else {
        setNewsCategories(['All', 'Land Launches', 'Market Updates', 'Corporate News']);
      }

      // Sync News Hero Title
      const title = localStorage.getItem('parvat_news_hero_title');
      const text = localStorage.getItem('parvat_news_hero_text');
      const image = localStorage.getItem('parvat_news_hero_image');
      setNewsHeroTitle(title || 'PARVAT MEDIA ROOM');
      setNewsHeroText(text || 'Expanding our greenfield residential luxury landscape footprint across India.');
      setNewsHeroImage(image);

      // Sync News
      try {
        const savedNews = localStorage.getItem('parvat_news');
        if (savedNews) {
          setAllNews(JSON.parse(savedNews));
        } else {
          setAllNews([]);
        }
      } catch (e) {
        setAllNews([]);
      }

      // Sync Active Projects
      try {
        const savedProjects = localStorage.getItem('parvat_projects');
        if (savedProjects) {
          setActiveProjects(JSON.parse(savedProjects));
        } else {
          setActiveProjects(DEFAULT_PROJECTS);
        }
      } catch (e) {}

      // Trigger a re-render
      setStorageUpdateKey(prev => prev + 1);
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key === 'parvat_news_categories' ||
        e.key === 'parvat_news' ||
        e.key === 'parvat_news_hero_title' ||
        e.key === 'parvat_news_hero_text' ||
        e.key === 'parvat_news_hero_image' ||
        e.key === 'parvat_whatsapp_channel_url' ||
        e.key === 'parvat_projects'
      ) {
        syncFromStorage();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', syncFromStorage);

    // Initial sync
    syncFromStorage();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', syncFromStorage);
    };
  }, []);

  // Reset selected category if it's no longer present
  useEffect(() => {
    if (!newsCategories.includes(selectedNewsCategory)) {
      setSelectedNewsCategory('All');
    }
  }, [newsCategories, selectedNewsCategory]);

  // Analytics Tracking Effect
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Get or generate unique session ID
    let sessionId = sessionStorage.getItem('parvat_visitor_session_id');
    if (!sessionId) {
      sessionId = 'sess_' + Math.random().toString(36).substring(2, 15) + '_' + Date.now();
      sessionStorage.setItem('parvat_visitor_session_id', sessionId);
    }

    const trackPageview = () => {
      // Send tracking request using standard fetch
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionId,
          page: activePage,
          path: window.location.pathname
        })
      }).catch(e => console.warn('Analytics tracking error:', e));
    };

    // Track on initial load and page changes
    trackPageview();

    // Setup heartbeat interval (every 30 seconds)
    const interval = setInterval(trackPageview, 30000);

    return () => clearInterval(interval);
  }, [activePage]);

  // Navigate function with dynamic routing using pushState and hash fallback
  const navigateTo = (page: string, id?: string) => {
    setActivePage(page);
    if (page === 'news') {
      setSelectedNewsId(id || null);
      setSelectedProjectId(null);
      const cleanPath = id ? `/news/${id}` : '/news';
      window.history.pushState({ page, id }, '', cleanPath);
    } else if (page === 'property') {
      setSelectedProjectId(id || null);
      if (id) {
        localStorage.setItem('parvat_selected_project_id', id);
      }
      const cleanPath = id ? `/property/${id}` : '/property';
      window.history.pushState({ page, id }, '', cleanPath);
    } else {
      setSelectedProjectId(null);
      setSelectedNewsId(null);
      const cleanPath = page === 'home' ? '/' : `/${page}`;
      window.history.pushState({ page }, '', cleanPath);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen to popstate and hash change for clean browser navigation
  useEffect(() => {
    const handleNavigation = () => {
      const path = window.location.pathname.toLowerCase();
      const pathParts = window.location.pathname.split('/');
      
      const newsIndex = pathParts.findIndex(part => part.toLowerCase() === 'news');
      const propertyIndex = pathParts.findIndex(part => part.toLowerCase() === 'property');

      if (newsIndex !== -1 && pathParts[newsIndex + 1]) {
        setActivePage('news');
        setSelectedNewsId(pathParts[newsIndex + 1]);
        setSelectedProjectId(null);
      } else if (propertyIndex !== -1 && pathParts[propertyIndex + 1]) {
        setActivePage('property');
        setSelectedProjectId(pathParts[propertyIndex + 1]);
        setSelectedNewsId(null);
      } else if (path.includes('projects')) {
        setActivePage('projects');
        setSelectedProjectId(null);
        setSelectedNewsId(null);
      } else if (path.includes('news')) {
        setActivePage('news');
        setSelectedNewsId(null);
        setSelectedProjectId(null);
      } else if (path.includes('about')) {
        setActivePage('about');
        setSelectedProjectId(null);
        setSelectedNewsId(null);
      } else if (path.includes('journey')) {
        setActivePage('journey');
        setSelectedProjectId(null);
        setSelectedNewsId(null);
      } else if (path.includes('contact')) {
        setActivePage('contact');
        setSelectedProjectId(null);
        setSelectedNewsId(null);
      } else if (path.includes('login')) {
        setActivePage('login');
        setSelectedProjectId(null);
        setSelectedNewsId(null);
      } else if (path.includes('enquire')) {
        setActivePage('enquire');
        setSelectedProjectId(null);
        setSelectedNewsId(null);
      } else {
        // Fallback to hash
        const rawHash = window.location.hash.replace('#', '');
        if (rawHash) {
          if (rawHash.startsWith('property-')) {
            const id = rawHash.replace('property-', '');
            setSelectedProjectId(id);
            setActivePage('property');
            setSelectedNewsId(null);
          } else if (rawHash.startsWith('news-')) {
            const id = rawHash.replace('news-', '');
            setSelectedNewsId(id);
            setActivePage('news');
            setSelectedProjectId(null);
          } else {
            setActivePage(rawHash);
            setSelectedProjectId(null);
            setSelectedNewsId(null);
          }
        } else {
          setActivePage('home');
          setSelectedProjectId(null);
          setSelectedNewsId(null);
        }
      }
    };

    window.addEventListener('popstate', handleNavigation);
    window.addEventListener('hashchange', handleNavigation);
    return () => {
      window.removeEventListener('popstate', handleNavigation);
      window.removeEventListener('hashchange', handleNavigation);
    };
  }, []);

  // Automated News Hero Slider
  useEffect(() => {
    const latestNews = allNews.slice(0, 3);
    if (activePage !== 'news' || selectedNewsId || latestNews.length === 0) return;
    const interval = setInterval(() => {
      setNewsSliderIndex((prev) => (prev + 1) % latestNews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activePage, selectedNewsId, allNews]);

  // Intercept all page link clicks to handle in-app transition
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href) {
          const cleanHref = href.toLowerCase().replace(/^\//, ''); // Normalize leading slash
          
          // Let clean URLs navigate normally. Only intercept hash links or section id clicks.
          if (cleanHref.startsWith('#')) {
            const sectionId = cleanHref.replace('#', '');
            if (sectionId === 'enquire') {
              e.preventDefault();
              navigateTo('enquire');
            } else if (['home', 'projects', 'news', 'about', 'journey', 'contact'].includes(sectionId)) {
              e.preventDefault();
              navigateTo(sectionId);
            }
          } else if (cleanHref === 'enquire.html' || cleanHref === 'enquire') {
            e.preventDefault();
            navigateTo('enquire');
          }
        }
      }
    };
    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, []);

  // Auto play slider
  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides]);

  const handlePrev = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Save lead to localStorage for Admin Portal compatibility
    try {
      const existingLeadsStr = localStorage.getItem('parvat_leads');
      const existingLeads = existingLeadsStr ? JSON.parse(existingLeadsStr) : [];
      const newLead = {
        id: 'lead_' + Date.now(),
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        age: 'N/A',
        gender: 'Enquiry',
        interest: formData.plotType || 'Buy Farmhouse Land',
        leadSource: 'Main Banner Modal',
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      };
      existingLeads.unshift(newLead);
      localStorage.setItem('parvat_leads', JSON.stringify(existingLeads));

      // Save to Hostinger MySQL Database via backend API (api.php)
      fetch('/api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          details: `Email: ${formData.email} | Source: Main Banner Modal | Interest: ${formData.plotType || 'Buy Farmhouse Land'} | Message: ${formData.message}`
        })
      }).catch(err => console.error("Failed to post lead to backend database:", err));
    } catch (err) {
      console.error("Error saving lead:", err);
    }

    setTimeout(() => {
      setIsSubmitted(false);
      setIsEnquireOpen(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        plotType: 'Residential',
        message: ''
      });
    }, 2500);
  };

  // Appointment Form submission handler
  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAppointmentSuccess(true);

    // Save lead to localStorage for Admin Portal compatibility
    try {
      const existingLeadsStr = localStorage.getItem('parvat_leads');
      const existingLeads = existingLeadsStr ? JSON.parse(existingLeadsStr) : [];
      const newLead = {
        id: 'lead_' + Date.now(),
        name: appointmentForm.name,
        phone: appointmentForm.mobile,
        email: appointmentForm.email,
        age: 'N/A',
        gender: 'Appointment',
        interest: appointmentForm.interest || 'Buy Farmhouse Land',
        leadSource: 'Main Banner Modal',
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      };
      existingLeads.unshift(newLead);
      localStorage.setItem('parvat_leads', JSON.stringify(existingLeads));

      // Save to Hostinger MySQL Database via backend API (api.php)
      fetch('/api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: appointmentForm.name,
          phone: appointmentForm.mobile,
          details: `Email: ${appointmentForm.email} | Source: Main Banner Modal | Interest: ${appointmentForm.interest || 'Buy Farmhouse Land'}`
        })
      }).catch(err => console.error("Failed to post lead to backend database:", err));
    } catch (err) {
      console.error("Error saving lead:", err);
    }
  };

  const handleAppointmentClose = () => {
    setIsAppointmentSuccess(false);
    setIsAppointmentOpen(false);
    setAppointmentForm({
      name: '',
      mobile: '',
      email: '',
      interest: 'Buy Farmhouse Land'
    });
  };

  // Join Our Family Form submission handler
  const handleJoinFamilySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate 10-digit number
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(joinFamilyForm.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    setIsJoinSuccess(true);

    // Save lead to localStorage for Admin Portal compatibility
    try {
      const existingLeadsStr = localStorage.getItem('parvat_leads');
      const existingLeads = existingLeadsStr ? JSON.parse(existingLeadsStr) : [];
      const newLead = {
        id: 'lead_' + Date.now(),
        name: joinFamilyForm.name,
        phone: joinFamilyForm.phone,
        email: joinFamilyForm.email,
        age: 'N/A',
        gender: 'Registration',
        interest: joinFamilyForm.preferredProperty || 'Residential Plots',
        leadSource: 'Bottom Registration Form',
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      };
      existingLeads.unshift(newLead);
      localStorage.setItem('parvat_leads', JSON.stringify(existingLeads));

      // Save to Hostinger MySQL Database via backend API (api.php)
      fetch('/api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: joinFamilyForm.name,
          phone: joinFamilyForm.phone,
          details: `Email: ${joinFamilyForm.email} | Source: Bottom Registration Form | Interest: ${joinFamilyForm.preferredProperty || 'Residential Plots'}`
        })
      }).catch(err => console.error("Failed to post lead to backend database:", err));
    } catch (err) {
      console.error("Error saving lead:", err);
    }

    setTimeout(() => {
      setIsJoinSuccess(false);
      setJoinFamilyForm({
        name: '',
        phone: '',
        email: '',
        preferredProperty: 'Residential Plots'
      });
    }, 4000);
  };

  const handleCorporateInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCorporateForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCorporateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(corporateForm.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    setIsCorporateSuccess(true);

    // Save lead to localStorage for Admin Portal compatibility
    try {
      const existingLeadsStr = localStorage.getItem('parvat_leads');
      const existingLeads = existingLeadsStr ? JSON.parse(existingLeadsStr) : [];
      const newLead = {
        id: 'lead_' + Date.now(),
        name: corporateForm.name,
        phone: corporateForm.phone,
        email: corporateForm.email,
        age: corporateForm.age || 'N/A',
        gender: corporateForm.gender || 'Corporate',
        interest: 'Corporate Enquiry',
        leadSource: 'Corporate Enquiry Form',
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      };
      existingLeads.unshift(newLead);
      localStorage.setItem('parvat_leads', JSON.stringify(existingLeads));

      // Save to Hostinger MySQL Database via backend API (api.php)
      fetch('/api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: corporateForm.name,
          phone: corporateForm.phone,
          details: `Email: ${corporateForm.email} | Source: Corporate Enquiry Form | Age: ${corporateForm.age || 'N/A'} | Gender: ${corporateForm.gender || 'Corporate'} | Message: ${corporateForm.message}`
        })
      }).catch(err => console.error("Failed to post lead to backend database:", err));
    } catch (err) {
      console.error("Error saving lead:", err);
    }
  };

  const handleCorporateClose = () => {
    setIsCorporateSuccess(false);
    setCorporateForm({
      name: '',
      phone: '',
      email: '',
      age: '',
      gender: 'Male',
      message: ''
    });
  };

  const handleDownloadBrochure = (title: string) => {
    setDownloadingBrochure(title);
    setTimeout(() => {
      setDownloadingBrochure(null);
      setDownloadSuccess(title);
      setTimeout(() => setDownloadSuccess(null), 3500);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-neutral-950 font-sans antialiased text-neutral-200">
      
      {/* FIXED NAVBAR */}
      <nav id="main-navbar" className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            
            {/* Left Side: Brand Logo Header */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {/* Main Logo: Click to navigate home with professional hover effects */}
                <a 
                  href="/index.html"
                  className="cursor-pointer transition-all duration-300 ease-out transform hover:scale-[1.04] hover:rotate-[-0.5deg] active:scale-[0.98] block"
                  title="Go to Home"
                >
                  <img src="/logo.png" alt="Parvat Reality Logo" className="h-14 md:h-16 w-auto object-contain rounded-lg border border-slate-100 shadow-sm" referrerPolicy="no-referrer" />
                </a>
              </div>
            </div>

            {/* Center: Visible links for desktop */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <a 
                href="/index.html" 
                className={`text-xs xl:text-sm font-semibold tracking-widest pb-1 transition-all duration-200 ${
                  activePage === 'home' 
                    ? 'text-blue-600 border-b-2 border-blue-600 font-bold' 
                    : 'text-slate-600 hover:text-blue-600 hover:border-b-2 hover:border-blue-600/50'
                }`}
              >
                HOME
              </a>
              <a 
                href="/projects" 
                className={`text-xs xl:text-sm font-semibold tracking-widest pb-1 transition-all duration-200 ${
                  activePage === 'projects' 
                    ? 'text-blue-600 border-b-2 border-blue-600 font-bold' 
                    : 'text-slate-600 hover:text-blue-600 hover:border-b-2 hover:border-blue-600/50'
                }`}
              >
                PROJECTS
              </a>
              <a 
                href="/news" 
                className={`text-xs xl:text-sm font-semibold tracking-widest pb-1 transition-all duration-200 ${
                  activePage === 'news' 
                    ? 'text-blue-600 border-b-2 border-blue-600 font-bold' 
                    : 'text-slate-600 hover:text-blue-600 hover:border-b-2 hover:border-blue-600/50'
                }`}
              >
                NEWS &amp; MEDIA
              </a>
              <a 
                href="/about" 
                className={`text-xs xl:text-sm font-semibold tracking-widest pb-1 transition-all duration-200 ${
                  activePage === 'about' 
                    ? 'text-blue-600 border-b-2 border-blue-600 font-bold' 
                    : 'text-slate-600 hover:text-blue-600 hover:border-b-2 hover:border-blue-600/50'
                }`}
              >
                ABOUT US
              </a>
              <a 
                href="/journey" 
                className={`text-xs xl:text-sm font-semibold tracking-widest pb-1 transition-all duration-200 ${
                  activePage === 'journey' 
                    ? 'text-blue-600 border-b-2 border-blue-600 font-bold' 
                    : 'text-slate-600 hover:text-blue-600 hover:border-b-2 hover:border-blue-600/50'
                }`}
              >
                OUR JOURNEY
              </a>
              <a 
                href="/contact" 
                className={`text-xs xl:text-sm font-semibold tracking-widest pb-1 transition-all duration-200 ${
                  activePage === 'contact' 
                    ? 'text-blue-600 border-b-2 border-blue-600 font-bold' 
                    : 'text-slate-600 hover:text-blue-600 hover:border-b-2 hover:border-blue-600/50'
                }`}
              >
                CONTACT
              </a>
              <a 
                href="/login" 
                className="text-xs xl:text-sm font-semibold tracking-widest pb-1 transition-all duration-200 text-slate-600 hover:text-blue-600 hover:border-b-2 hover:border-blue-600/50"
              >
                LOGIN
              </a>
            </div>

            {/* Right Side: Mobile Menu Toggle */}
            <div className="flex items-center space-x-3 md:space-x-4">

              {/* Mobile menu toggle */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-2xl animate-fadeIn">
            <a 
              href="/index.html" 
              className={`block px-3 py-2 rounded text-base font-medium tracking-wide transition-all ${
                activePage === 'home'
                  ? 'text-blue-600 bg-slate-50 border-l-4 border-blue-600 font-bold'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              HOME
            </a>
            <a 
              href="/projects" 
              className={`block px-3 py-2 rounded text-base font-medium tracking-wide transition-all ${
                activePage === 'projects'
                  ? 'text-blue-600 bg-slate-50 border-l-4 border-blue-600 font-bold'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              PROJECTS
            </a>
            <a 
              href="/news" 
              className={`block px-3 py-2 rounded text-base font-medium tracking-wide transition-all ${
                activePage === 'news'
                  ? 'text-blue-600 bg-slate-50 border-l-4 border-blue-600 font-bold'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              NEWS &amp; MEDIA
            </a>
            <a 
              href="/about" 
              className={`block px-3 py-2 rounded text-base font-medium tracking-wide transition-all ${
                activePage === 'about'
                  ? 'text-blue-600 bg-slate-50 border-l-4 border-blue-600 font-bold'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              ABOUT US
            </a>
            <a 
              href="/journey" 
              className={`block px-3 py-2 rounded text-base font-medium tracking-wide transition-all ${
                activePage === 'journey'
                  ? 'text-blue-600 bg-slate-50 border-l-4 border-blue-600 font-bold'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              OUR JOURNEY
            </a>
            <a 
              href="/contact" 
              className={`block px-3 py-2 rounded text-base font-medium tracking-wide transition-all ${
                activePage === 'contact'
                  ? 'text-blue-600 bg-slate-50 border-l-4 border-blue-600 font-bold'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              CONTACT
            </a>
            <a 
              href="/login" 
              className="block px-3 py-2 rounded text-base font-medium tracking-wide transition-all text-slate-600 hover:text-blue-600 hover:bg-slate-50"
            >
              LOGIN
            </a>
          </div>
        )}
      </nav>

      {activePage === 'home' && (
        <>
          {/* HERO SECTION */}
      <section id="hero-slider" className="relative h-screen w-full overflow-hidden bg-neutral-950" style={{ backgroundColor: '#fbfbf4' }}>
        
        {/* Carousel Slides */}
        <div className="absolute inset-0 w-full h-full">
          {slides.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div 
                key={index}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                {/* Background image zoom effect (Ken Burns) */}
                <div 
                  className={`absolute inset-0 bg-cover bg-center transition-transform duration-[6000ms] ease-out ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                  style={{ 
                    backgroundImage: `url('${slide.url}')`,
                    ...(index === 3 ? { backgroundColor: '#f1e6e6' } : {})
                  }}
                />
                
                {/* Dark Vignette and Gradient Overlay for Optimal Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/60" />
                <div className="absolute inset-0 bg-neutral-950/20 mix-blend-multiply" />
              </div>
            );
          })}
        </div>

        {/* Content Overlay */}
        <div className="relative z-20 flex flex-col justify-center items-center h-full max-w-6xl mx-auto px-4 md:px-6 text-center pt-24">
          <div className="space-y-6 max-w-4xl">
            
            {/* Tagline Badge */}
            {slides[currentSlide] && slides[currentSlide].subtitle && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 animate-pulse">
                <Compass className="w-4 h-4 text-amber-500" style={{ color: '#f2f3f6' }} />
                <span className="text-[11px] md:text-xs font-bold tracking-[0.25em] text-amber-400 uppercase" style={{ color: '#ffffff' }}>
                  {slides[currentSlide].subtitle}
                </span>
              </div>
            )}

            {/* Bold White Core Text */}
            {slides[currentSlide] && slides[currentSlide].title && (
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-md" style={{ color: '#d8dce5' }}>
                {slides[currentSlide].title}
              </h1>
            )}

            {/* Explanatory description */}
            {slides[currentSlide] && slides[currentSlide].tagline && (
              <p className="text-sm md:text-lg lg:text-xl text-neutral-300 font-light max-w-2xl mx-auto tracking-wide leading-relaxed" style={{ color: '#c4c5c7' }}>
                {slides[currentSlide].tagline}
              </p>
            )}



          </div>
        </div>

        {/* Manual navigation arrows */}
        <button 
          onClick={handlePrev}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-neutral-950/40 hover:bg-amber-50 hover:border-amber-500 hover:text-neutral-950 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-90 shadow-md group cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
        </button>

        <button 
          onClick={handleNext}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-neutral-950/40 hover:bg-amber-50 hover:border-amber-500 hover:text-neutral-950 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-90 shadow-md group cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
        </button>

        {/* Interactive Slide indicator dots */}
        <div className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-35 flex items-center space-x-2.5">
          {slides.map((_, index) => (
            <button 
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                index === currentSlide 
                  ? 'w-7 bg-white' 
                  : 'w-2 bg-white/45 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll hint Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 hidden flex-col items-center animate-bounce text-neutral-500">
          <span className="text-[9px] tracking-[0.3em] font-bold uppercase mb-1">SCROLL TO DISCOVER</span>
          <ChevronDown className="w-4 h-4 text-neutral-500" />
        </div>

      </section>

      {/* ACTION BUTTONS ROW */}
      <section id="action-buttons-row" className="relative z-40 px-3 sm:px-6 md:px-8 -mt-8 sm:-mt-10 md:-mt-12 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-1.5 sm:gap-4 md:gap-6">
            
            {/* Action 1: Book Appointment */}
            <div 
              onClick={() => setIsAppointmentOpen(true)}
              className="book-appointment-btn flex items-center justify-center gap-1.5 sm:gap-3 h-14 sm:h-16 md:h-20 bg-[#1b5bf7] hover:bg-[#124bce] text-white rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer font-sans font-extrabold text-[10px] sm:text-xs md:text-sm lg:text-base tracking-wider uppercase px-1 sm:px-4"
            >
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 shrink-0" />
              <span className="truncate">Book Appointment</span>
            </div>

            {/* Action 2: Call Now */}
            <div 
              onClick={() => setIsCallOpen(true)}
              className="call-now-btn flex items-center justify-center gap-1.5 sm:gap-3 h-14 sm:h-16 md:h-20 bg-white hover:bg-slate-50 text-[#112349] border-2 border-[#112349] rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer font-sans font-extrabold text-[10px] sm:text-xs md:text-sm lg:text-base tracking-wider uppercase px-1 sm:px-4"
            >
              <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 shrink-0" />
              <span className="truncate">Call Now</span>
            </div>

            {/* Action 3: WhatsApp Us */}
            <a 
              href="https://wa.me/918591668166"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn flex items-center justify-center gap-1.5 sm:gap-3 h-14 sm:h-16 md:h-20 bg-[#00c853] hover:bg-[#00963e] text-white rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer font-sans font-extrabold text-[10px] sm:text-xs md:text-sm lg:text-base tracking-wider uppercase px-1 sm:px-4"
            >
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 shrink-0" />
              <span className="truncate">WhatsApp Us</span>
            </a>

          </div>
        </div>
      </section>


      {/* JOIN OUR FAMILY REGISTRATION SECTION */}
      <section id="join-our-family" className="relative py-10 md:py-20 px-4 md:px-8 bg-slate-50 border-b border-slate-100">
        {/* Decorative background grids */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 md:p-10 shadow-xl">
            
            <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">
              <span className="text-blue-600 text-xs font-bold tracking-[0.25em] uppercase">REGISTRATION</span>
              <h2 className="text-xl md:text-3xl font-serif font-bold text-slate-900 tracking-wide">
                JOIN OUR FAMILY
              </h2>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                Unlock exclusive updates, layout draft files, direct developer pricing options, and invitation-only launch events before public listings open.
              </p>
            </div>

            {isJoinSuccess ? (
              <div className="py-12 text-center space-y-4 animate-scaleIn">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500/10 text-blue-600 rounded-full mb-2">
                  <CheckCircle2 className="w-12 h-12 animate-bounce" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-slate-900">Welcome to the Parvat Family!</h3>
                <p className="text-slate-500 text-sm font-light max-w-sm mx-auto">
                  Thank you for registering. You have been placed on our VIP list. We will send you priority layout documents shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleJoinFamilySubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Full Name
                    </label>
                    <input 
                      type="text"
                      required
                      value={joinFamilyForm.name}
                      onChange={(e) => setJoinFamilyForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full h-9 md:h-12 bg-white border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-800 rounded-lg px-3 md:px-4 py-1.5 md:py-3 text-xs md:text-sm transition-colors outline-none"
                    />
                  </div>

                  {/* 10-digit Phone Number */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                      10-Digit Phone Number
                    </label>
                    <input 
                      type="text"
                      required
                      maxLength={10}
                      pattern="\d{10}"
                      value={joinFamilyForm.phone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        setJoinFamilyForm(prev => ({ ...prev, phone: val }));
                      }}
                      placeholder="e.g. 9876543210"
                      className="w-full h-9 md:h-12 bg-white border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-800 rounded-lg px-3 md:px-4 py-1.5 md:py-3 text-xs md:text-sm transition-colors outline-none font-mono"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Email Address
                    </label>
                    <input 
                      type="email"
                      required
                      value={joinFamilyForm.email}
                      onChange={(e) => setJoinFamilyForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="e.g. name@example.com"
                      className="w-full h-9 md:h-12 bg-white border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-800 rounded-lg px-3 md:px-4 py-1.5 md:py-3 text-xs md:text-sm transition-colors outline-none"
                    />
                  </div>

                  {/* Preferred Property Select Dropdown */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Preferred Property
                    </label>
                    <select 
                      required
                      value={joinFamilyForm.preferredProperty}
                      onChange={(e) => setJoinFamilyForm(prev => ({ ...prev, preferredProperty: e.target.value }))}
                      className="w-full h-9 md:h-12 bg-white border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-800 rounded-lg px-3 md:px-4 py-1.5 md:py-3 text-xs md:text-sm transition-colors outline-none"
                    >
                      <option value="Farmhouse Plots">Farmhouse Plots</option>
                      <option value="Agricultural Land">Agricultural Land</option>
                      <option value="Commercial Land">Commercial Land</option>
                      <option value="Any Investment Plot">Any Investment Plot</option>
                    </select>
                  </div>

                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full h-9 md:h-12 relative overflow-hidden group bg-gradient-to-r from-blue-700 to-blue-600 text-white py-1.5 md:py-4 px-6 rounded-lg text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:from-blue-600 hover:to-blue-500 shadow-xl hover:shadow-[0_0_25px_rgba(37,99,235,0.25)] hover:-translate-y-0.5 cursor-pointer flex items-center justify-center"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Submit Registration
                      <Users2 className="w-4 h-4 stroke-[2.5]" />
                    </span>
                    <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-shine" />
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      </section>

      {/* HOT PROPERTIES WITH LOCATION TABS */}
      <section id="hot-properties" className="relative py-24 px-4 md:px-8 bg-neutral-950 border-b border-neutral-900" style={{ backgroundColor: '#f3f3ef' }}>
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold tracking-[0.25em] uppercase px-2 py-0.5 rounded" style={{ backgroundColor: '#0a59f6', color: '#e7eef3' }}>CURATED SELECTION</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-wide" style={{ color: '#0c0b0b' }}>
              HOT PROPERTIES
            </h2>
            <div className="w-16 h-1 mx-auto mt-3 rounded" style={{ color: '#111111', backgroundColor: '#0179ff' }}></div>
            <p className="text-sm font-light mt-3 leading-relaxed" style={{ color: '#0a0a0a' }}>
              Explore premium handpicked plots and development parcels with direct accessibility and high potential return on investment.
            </p>
          </div>

          {/* Interactive Location Tabs */}
          {(() => {
            const categories = ['Mumbai 3.0', 'Panvel', 'Pen', 'Pali', 'Mangaon', 'Karjat', 'Khopoli'];

            return (
              <div className="flex flex-col gap-6 mb-12">
                <div className="flex flex-row md:flex-wrap overflow-x-auto md:overflow-x-visible whitespace-nowrap md:whitespace-normal scrollbar-none snap-x gap-2 md:gap-3 md:justify-center md:items-center pb-2 md:pb-0 px-4 md:px-0">
                  {categories.map((tab) => {
                    const isActive = activePropertyTab.toUpperCase() === tab.toUpperCase();
                    return (
                      <button
                        key={tab}
                        onClick={() => setActivePropertyTab(tab.toUpperCase())}
                        className={`snap-center px-4 py-2 md:px-6 md:py-3 rounded text-[10px] md:text-xs font-bold tracking-widest uppercase transition-all duration-300 border cursor-pointer shrink-0 ${
                          isActive 
                            ? 'bg-amber-500 text-neutral-950 border-amber-500 shadow-lg shadow-amber-500/10 scale-105 font-bold'
                            : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700 font-bold'
                        }`}
                      >
                        {tab}
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic Property Type Filter Buttons */}
                <div className="border-t border-neutral-200/30 pt-6">
                  <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-4">Filter by Property Type</p>
                  <div className="flex flex-row md:flex-wrap overflow-x-auto md:overflow-x-visible whitespace-nowrap md:whitespace-normal scrollbar-none snap-x gap-2 md:gap-3 md:justify-center md:items-center pb-2 md:pb-0 px-4 md:px-0">
                    <button
                      onClick={() => setActiveTypeTab('ALL')}
                      className={`snap-center px-4 py-2 md:px-5 md:py-2.5 rounded text-[10px] md:text-xs font-bold tracking-widest uppercase transition-all duration-300 border cursor-pointer shrink-0 ${
                        activeTypeTab === 'ALL'
                          ? 'bg-amber-500 text-neutral-950 border-amber-500 shadow-lg shadow-amber-500/10 scale-105'
                          : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
                      }`}
                    >
                      All Types
                    </button>
                    {getPropertyTypes().map((type: any) => {
                      const isActive = activeTypeTab.toUpperCase() === type.name.toUpperCase();
                      return (
                        <button
                          key={type.id}
                          onClick={() => setActiveTypeTab(type.name)}
                          className={`snap-center flex items-center gap-1.5 md:gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded text-[10px] md:text-xs font-bold tracking-widest uppercase transition-all duration-300 border cursor-pointer shrink-0 ${
                            isActive
                              ? 'bg-amber-500 text-neutral-950 border-amber-500 shadow-lg shadow-amber-500/10 scale-105'
                              : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
                          }`}
                        >
                          {type.image && (
                            <img src={type.image} alt="" className="w-4 h-4 md:w-5 md:h-5 object-cover rounded-full shrink-0 border border-neutral-700/50" />
                          )}
                          {type.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Properties Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            {activeProjects
              .filter((proj: any) => proj.showOnHome !== false)
              .filter((proj: any) => {
                const tabUpper = activePropertyTab.toUpperCase();
                const projTag = (proj.locationCategoryTag || (() => {
                  const locUpper = (proj.location || '').toUpperCase();
                  if (locUpper.includes('NAVI MUMBAI')) return 'NAVI MUMBAI';
                  if (locUpper.includes('MUMBAI')) return 'MUMBAI';
                  if (locUpper.includes('PUNE')) return 'PUNE';
                  if (locUpper.includes('KARJAT')) return 'FARMHOUSE PLOTS';
                  return 'FARMHOUSE PLOTS';
                })()).trim().toUpperCase();

                return projTag === tabUpper;
              })
              .filter((proj: any) => {
                if (activeTypeTab === 'ALL') return true;
                const projZone = (proj.zone || 'Residential Plot').trim().toUpperCase();
                return projZone === activeTypeTab.toUpperCase();
              })
              .map((property, index) => (
              <ScrollRevealCard key={property.id} index={index} className="h-full">
                <div 
                  onClick={() => navigateTo('property', property.id)}
                  className="group flex flex-col h-full bg-neutral-900 border border-neutral-800 rounded-xl sm:rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
                >
                  {/* Image & Tag */}
                  <div className="relative h-32 sm:h-56 overflow-hidden">
                    <img 
                      src={property.image} 
                      alt={property.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 to-transparent" />
                    <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex flex-col gap-1 items-start z-10">
                      <span className="bg-amber-500 text-neutral-950 text-[8px] sm:text-[10px] font-bold tracking-widest uppercase px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded">
                        {property.tag}
                      </span>
                      {property.status && (
                        <span className={`text-[8px] sm:text-[10px] font-bold tracking-widest uppercase px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded ${
                          property.status === 'Available' ? 'bg-emerald-500 text-neutral-950' :
                          property.status === 'Sold Out' ? 'bg-rose-500 text-neutral-950' :
                          'bg-sky-500 text-white'
                        }`}>
                          {property.status}
                        </span>
                      )}
                    </div>
                    <span className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-neutral-950/80 border border-neutral-800 text-neutral-300 text-[8px] sm:text-[10px] font-mono px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded backdrop-blur-sm">
                      {property.location}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div 
                    className="flex-1 p-3 sm:p-6 flex flex-col justify-between space-y-2 sm:space-y-4"
                  >
                    <div className="space-y-1 sm:space-y-2">
                      <h3 className="text-xs sm:text-base md:text-xl font-bold font-serif text-white tracking-wide group-hover:text-amber-400 transition-colors line-clamp-1 sm:line-clamp-none">
                         {property.title}
                      </h3>
                      <p className="text-neutral-400 text-[10px] sm:text-xs font-light leading-relaxed line-clamp-2 sm:line-clamp-none">
                        {property.desc}
                      </p>
                    </div>

                    {/* Amenities Row */}
                    {property.amenities && property.amenities.length > 0 && (
                      <div className="space-y-1.5 pt-2 border-t border-neutral-800/60">
                        <div className="text-[8px] sm:text-[9px] font-bold text-neutral-400 uppercase tracking-widest">Available Amenities</div>
                        <div className="flex flex-wrap gap-1.5">
                          {property.amenities.map((amenity: string) => {
                            const { Icon, bgClass, iconColor } = getAmenityDetails(amenity);
                            return (
                              <span 
                                key={amenity} 
                                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[8px] sm:text-[10px] font-bold tracking-wide transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.15)] ${bgClass}`}
                              >
                                <Icon className={`w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 ${iconColor}`} />
                                {amenity}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="pt-2 border-t border-neutral-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                      <div>
                        <span className="text-[8px] sm:text-[10px] font-semibold text-neutral-500 uppercase tracking-widest block">Acreage / Size</span>
                        <span className="text-xs sm:text-sm font-medium text-white">{property.size}</span>
                      </div>
                      <div className="text-left sm:text-right">
                        <span className="text-[8px] sm:text-[10px] font-semibold text-neutral-500 uppercase tracking-widest block">Premium Price</span>
                        <span 
                          className="text-xs sm:text-sm md:text-base font-bold text-amber-500 font-mono"
                        >
                          {property.price}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 w-full pt-1">
                      {property.videoLink && (
                        <a
                          href={property.videoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 sm:py-3 px-2 rounded text-[9px] sm:text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-1"
                        >
                          <Play className="w-2.5 h-2.5 fill-current" /> WATCH
                        </a>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateTo('property', property.id);
                        }}
                        className={`${property.videoLink ? 'flex-1' : 'w-full'} bg-neutral-950 hover:bg-amber-500 hover:text-neutral-950 text-neutral-300 font-bold py-2 sm:py-3 px-2 sm:px-4 rounded text-[9px] sm:text-xs tracking-widest uppercase border border-neutral-800 hover:border-amber-500 transition-all duration-300 cursor-pointer`}
                      >
                        KNOW MORE
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollRevealCard>
            ))}
          </div>

        </div>
      </section>

            {/* VIEW BROCHURES & NEWS GRIDS */}
      <motion.section 
        id="brochures-news" 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative py-24 px-4 md:px-8 bg-neutral-900 border-b border-neutral-950" 
        style={{ backgroundColor: '#fffcfc' }}
      >
        <div className="max-w-7xl mx-auto space-y-24">
          
          {/* Sub-section: Brochures Download */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="space-y-5 lg:col-span-1">
              <span className="text-red-600 text-xs font-bold tracking-[0.25em] uppercase flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
                Official Materials
              </span>
              <h3 className="text-2xl md:text-4xl font-serif font-bold text-slate-900 tracking-wide leading-tight">
                Download Layout Plans &amp; Brochures
              </h3>
              <p className="text-slate-600 text-sm font-light leading-relaxed">
                Gain access to detailed spatial drawings, verified registry reports, legal documents, and premium catalogs instantly.
              </p>
              
              {downloadSuccess && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl animate-fadeIn">
                  Successfully requested download for <strong className="text-slate-950">{downloadSuccess}</strong>. The document has been prepared.
                </div>
              )}
            </div>

            <div className="lg:col-span-2 space-y-4">
              {getBrochures().map((brochure: any) => {
                const messageText = `Hi Parvat Reality, I am interested in ${brochure.title}. Please share the layout plan.`;
                const whatsappUrl = `https://wa.me/918591668166?text=${encodeURIComponent(messageText)}`;
                return (
                  <div 
                    key={brochure.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200/50 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      {/* Rich Crimson Gradient PDF Badge */}
                      <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-600 via-rose-600 to-red-800 text-white font-extrabold text-xs tracking-wider rounded-xl shadow-lg shadow-red-500/20 border border-red-500/10">
                        PDF
                      </div>
                      <div>
                        <h4 className="text-sm md:text-base font-bold text-slate-800">{brochure.title}</h4>
                        {brochure.subtitle && (
                          <p className="text-xs text-slate-500 font-light mt-0.5">{brochure.subtitle}</p>
                        )}
                        <p className="text-xs text-slate-400 font-mono mt-1 text-[11px]">Size: {brochure.fileSize} &bull; {brochure.downloads} downloads</p>
                      </div>
                    </div>

                    <motion.a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ 
                        scale: 1.05, 
                        boxShadow: "0 10px 20px -5px rgba(37, 99, 235, 0.4), 0 0 12px rgba(37, 99, 235, 0.3)" 
                      }}
                      whileTap={{ scale: 0.93 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="w-full sm:w-auto mt-4 sm:mt-0 px-6 py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-colors duration-200 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white border border-blue-500/30 shadow-lg text-center flex items-center justify-center"
                    >
                      DOWNLOAD FILE
                    </motion.a>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sub-section: Real Estate News */}
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-amber-500 text-xs font-bold tracking-[0.25em] uppercase">INSIGHTS &amp; ARCHIVES</span>
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-white tracking-wide" style={{ color: '#101010' }}>
                LATEST REAL ESTATE NEWS
              </h2>
              <div className="w-12 h-0.5 bg-amber-500 mx-auto mt-2"></div>
            </div>

            {allNews.filter((item: any) => item.status !== 'draft' && item.showOnHome !== false).length === 0 ? (
              <div className="col-span-full text-center py-12 px-4 border border-dashed border-neutral-800 rounded-xl bg-neutral-900/10">
                <p className="text-neutral-500 text-sm font-light">No announcements or news articles are currently published. Stay tuned for upcoming updates.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-8">
                {allNews.filter((item: any) => item.status !== 'draft' && item.showOnHome !== false).map((item, index) => (
                  <div 
                    key={item.id}
                    onClick={() => navigateTo('news', item.id)}
                    style={{ animationDelay: `${index * 120}ms` }}
                    className="bg-neutral-950/40 border border-neutral-800/60 hover:border-amber-500/40 rounded-lg sm:rounded-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden cursor-pointer group shadow-lg text-left animate-fade-in-up"
                  >
                    {item.media && item.media.length > 0 ? (
                      <div className="relative h-24 sm:h-48 w-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pointer-events-none">
                        {item.media.map((m: any, idx: number) => (
                          <div key={idx} className="min-w-full h-full flex-shrink-0 snap-center relative overflow-hidden">
                            {m.type.startsWith('video/') ? (
                               <video src={m.data} className="w-full h-full object-cover bg-black transition-transform duration-700 ease-out group-hover:scale-105" muted loop playsInline autoPlay />
                            ) : (
                               <img src={m.data} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                            )}
                          </div>
                        ))}
                        {item.media.length > 1 && (
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10 pointer-events-none">
                             {item.media.map((_: any, idx: number) => (
                                <div key={idx} className="w-1.5 h-1.5 rounded-full bg-white/70 shadow-sm" />
                             ))}
                          </div>
                        )}
                      </div>
                    ) : item.image ? (
                      <div className="relative h-24 sm:h-48 w-full overflow-hidden">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                        {item.videoLink && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/15 transition-all">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-500 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-md">
                              <Play className="w-3 h-3 sm:w-4.5 sm:h-4.5 ml-0.5 fill-current" />
                            </div>
                          </div>
                        )}
                      </div>
                    ) : null}
                    <div className="p-2 sm:p-6 space-y-2 sm:space-y-4 flex-1">
                      <div className="flex items-center justify-between text-[8px] sm:text-[10px] font-mono text-neutral-500">
                        <span>{item.date}</span>
                        <span className="text-amber-500/80 uppercase truncate max-w-[50px] sm:max-w-none">{item.author}</span>
                      </div>
                      <h4 className="text-xs sm:text-base font-serif font-bold text-white group-hover:text-amber-400 transition-colors leading-snug line-clamp-1 sm:line-clamp-none">
                        {item.title}
                      </h4>
                      <p className="text-neutral-400 text-[10px] sm:text-xs font-light leading-relaxed line-clamp-2 sm:line-clamp-none">
                        {item.snippet}
                      </p>
                    </div>
                    <div className="p-2 sm:px-6 sm:py-4 mt-auto border-t border-neutral-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                      <span className="text-[8px] sm:text-[10px] text-neutral-500 uppercase tracking-widest font-bold">News Report</span>
                      <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto mt-1 sm:mt-0">
                        <button 
                          onClick={(e) => { e.stopPropagation(); }} 
                          className="text-neutral-500 hover:text-amber-500 transition-colors p-1" 
                          title="Share" 
                          aria-label="Share"
                        >
                          <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                        <span 
                          className="text-[9px] sm:text-xs text-amber-500 font-bold group-hover:underline flex items-center gap-0.5 sm:gap-1"
                        >
                          Read &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </motion.section>

      {/* ADDITIONAL FEATURES & BRAND HIGHLIGHTS SHOWCASE */}
      <section id="features-showcase" className="relative py-24 px-4 md:px-8 bg-gradient-to-b from-neutral-950 to-neutral-900 border-t border-neutral-900" style={{ backgroundColor: '#f8eeee', borderColor: '#090909' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-amber-500 text-xs font-bold tracking-[0.2em] uppercase">LEGACY AND EXCELLENCE</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-wide" style={{ color: '#e4e7ec' }}>
              We Build The Foundations For Your Dreams
            </h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded"></div>
            <p className="text-neutral-400 font-light mt-4 leading-relaxed" style={{ color: '#f6f8ff' }}>
              At Parvat Reality &amp; Developers, we curate top-tier acreage and premium lands 
              with seamless titles, road accesses, and immense future value prospects.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-8">
            <div className="p-3 sm:p-6 md:p-8 rounded-lg sm:rounded-xl bg-neutral-900/50 border border-neutral-800/80 hover:border-amber-500/30 transition-all group hover:-translate-y-2 duration-300">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded bg-amber-500/10 flex items-center justify-center text-amber-500 mb-2 md:mb-6 group-hover:bg-amber-500 group-hover:text-neutral-950 transition-colors duration-300">
                <Layers className="w-4 h-4 md:w-6 md:h-6" />
              </div>
              <h3 className="text-xs sm:text-lg md:text-xl font-bold font-serif text-white mb-1 md:mb-3">Clear Land Titles</h3>
              <p className="text-neutral-400 text-[10px] sm:text-xs md:text-sm font-light leading-relaxed line-clamp-3 sm:line-clamp-none">
                Every square yard is meticulously vetted by our specialized legal team. Total transparency is guaranteed.
              </p>
            </div>

            <div className="p-3 sm:p-6 md:p-8 rounded-lg sm:rounded-xl bg-neutral-900/50 border border-neutral-800/80 hover:border-amber-500/30 transition-all group hover:-translate-y-2 duration-300">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded bg-amber-500/10 flex items-center justify-center text-amber-500 mb-2 md:mb-6 group-hover:bg-amber-500 group-hover:text-neutral-950 transition-colors duration-300">
                <Map className="w-4 h-4 md:w-6 md:h-6" />
              </div>
              <h3 className="text-xs sm:text-lg md:text-xl font-bold font-serif text-white mb-1 md:mb-3">Strategic Location</h3>
              <p className="text-neutral-400 text-[10px] sm:text-xs md:text-sm font-light leading-relaxed line-clamp-3 sm:line-clamp-none">
                High-appreciation parameters near proposed infrastructure, national highways, and premium Navi Mumbai investment hubs.
              </p>
            </div>

            <div className="p-3 sm:p-6 md:p-8 rounded-lg sm:rounded-xl bg-neutral-900/50 border border-neutral-800/80 hover:border-amber-500/30 transition-all group hover:-translate-y-2 duration-300 col-span-2 md:col-span-1">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded bg-amber-500/10 flex items-center justify-center text-amber-500 mb-2 md:mb-6 group-hover:bg-amber-500 group-hover:text-neutral-950 transition-colors duration-300">
                <FileCheck2 className="w-4 h-4 md:w-6 md:h-6" />
              </div>
              <h3 className="text-xs sm:text-lg md:text-xl font-bold font-serif text-white mb-1 md:mb-3">Ready Infrastructure</h3>
              <p className="text-neutral-400 text-[10px] sm:text-xs md:text-sm font-light leading-relaxed line-clamp-3 sm:line-clamp-none">
                Delivered with complete boundary fencing, direct blacktopped road connectivity, and rapid power-water integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="bg-neutral-950 py-16 px-4 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <p className="text-4xl md:text-5xl font-serif font-bold text-amber-500">1200+</p>
            <p className="text-xs md:text-sm font-semibold tracking-widest text-neutral-400 uppercase">Acres Developed</p>
          </div>
          <div className="space-y-2">
            <p className="text-4xl md:text-5xl font-serif font-bold text-amber-500">25+</p>
            <p className="text-xs md:text-sm font-semibold tracking-widest text-neutral-400 uppercase">Legacy Projects</p>
          </div>
          <div className="space-y-2">
            <p className="text-4xl md:text-5xl font-serif font-bold text-amber-500">4500+</p>
            <p className="text-xs md:text-sm font-semibold tracking-widest text-neutral-400 uppercase">Happy Investors</p>
          </div>
          <div className="space-y-2">
            <p className="text-4xl md:text-5xl font-serif font-bold text-amber-500">18+</p>
            <p className="text-xs md:text-sm font-semibold tracking-widest text-neutral-400 uppercase">Years of Journey</p>
          </div>
        </div>
      </section>
        </>
      )}

      {activePage === 'projects' && (
        <section className="pt-32 pb-24 px-4 md:px-8 bg-neutral-950">
          <div className="max-w-7xl mx-auto space-y-16">
            
            {/* Elegant Header Title Section */}
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <span className="text-amber-500 text-xs font-bold tracking-[0.3em] uppercase block animate-fadeIn">PREMIUM INVESTMENTS</span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-wide">
                OUR ACTIVE LAND PROJECTS
              </h1>
              <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed">
                Discover completely clear-title, legally vetted land parcels located in prime development corridors. Each property represents an heirloom asset built for significant long-term appreciation.
              </p>
              <div className="w-24 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mt-6" />
            </div>

            {/* Dynamic Location Filter Tabs */}
            {(() => {
              const categories = ['Mumbai 3.0', 'Panvel', 'Pen', 'Pali', 'Mangaon', 'Karjat', 'Khopoli'];

              return (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-row md:flex-wrap overflow-x-auto md:overflow-x-visible whitespace-nowrap md:whitespace-normal scrollbar-none snap-x gap-2 md:gap-3 md:justify-center md:items-center pb-2 md:pb-0 px-4 md:px-0">
                    {categories.map((tab) => {
                      const isActive = activePropertyTab.toUpperCase() === tab.toUpperCase();
                      return (
                        <button
                          key={tab}
                          onClick={() => setActivePropertyTab(tab.toUpperCase())}
                          className={`snap-center px-4 py-2 md:px-6 md:py-3 rounded text-[10px] md:text-xs font-bold tracking-widest uppercase transition-all duration-300 border cursor-pointer shrink-0 ${
                            isActive 
                              ? 'bg-amber-500 text-neutral-950 border-amber-500 shadow-lg shadow-amber-500/10 scale-105 font-bold'
                              : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700 font-bold'
                          }`}
                        >
                          {tab}
                        </button>
                      );
                    })}
                  </div>

                  {/* Dynamic Property Type Filter Buttons for Projects Page */}
                  <div className="border-t border-neutral-850 pt-6">
                    <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-4">Filter by Property Type</p>
                    <div className="flex flex-row md:flex-wrap overflow-x-auto md:overflow-x-visible whitespace-nowrap md:whitespace-normal scrollbar-none snap-x gap-2 md:gap-3 md:justify-center md:items-center pb-2 md:pb-0 px-4 md:px-0">
                      <button
                        onClick={() => setActiveTypeTab('ALL')}
                        className={`snap-center px-4 py-2 md:px-5 md:py-2.5 rounded text-[10px] md:text-xs font-bold tracking-widest uppercase transition-all duration-300 border cursor-pointer shrink-0 ${
                          activeTypeTab === 'ALL'
                            ? 'bg-amber-500 text-neutral-950 border-amber-500 shadow-lg shadow-amber-500/10 scale-105'
                            : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
                        }`}
                      >
                        All Types
                      </button>
                      {getPropertyTypes().map((type: any) => {
                        const isActive = activeTypeTab.toUpperCase() === type.name.toUpperCase();
                        return (
                          <button
                            key={type.id}
                            onClick={() => setActiveTypeTab(type.name)}
                            className={`snap-center flex items-center gap-1.5 md:gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded text-[10px] md:text-xs font-bold tracking-widest uppercase transition-all duration-300 border cursor-pointer shrink-0 ${
                              isActive
                                ? 'bg-amber-500 text-neutral-950 border-amber-500 shadow-lg shadow-amber-500/10 scale-105'
                                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
                            }`}
                          >
                            {type.image && (
                              <img src={type.image} alt="" className="w-4 h-4 md:w-5 md:h-5 object-cover rounded-full shrink-0 border border-neutral-700/50" />
                            )}
                            {type.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Catalogue Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
              {activeProjects
                .filter((proj: any) => proj.showOnHome !== false)
                .filter((proj: any) => {
                  const tabUpper = activePropertyTab.toUpperCase();
                  const projTag = (proj.locationCategoryTag || (() => {
                    const locUpper = (proj.location || '').toUpperCase();
                    if (locUpper.includes('NAVI MUMBAI')) return 'NAVI MUMBAI';
                    if (locUpper.includes('MUMBAI')) return 'MUMBAI';
                    if (locUpper.includes('PUNE')) return 'PUNE';
                    if (locUpper.includes('KARJAT')) return 'FARMHOUSE PLOTS';
                    return 'FARMHOUSE PLOTS';
                  })()).trim().toUpperCase();

                  return projTag === tabUpper;
                })
                .filter((proj: any) => {
                  if (activeTypeTab === 'ALL') return true;
                  const projZone = (proj.zone || 'Residential Plot').trim().toUpperCase();
                  return projZone === activeTypeTab.toUpperCase();
                })
                .map((proj) => (
                <div 
                  key={proj.id} 
                  onClick={() => navigateTo('property', proj.id)}
                  className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-amber-500/40 transition-all duration-300 flex flex-col group hover:-translate-y-2 shadow-lg cursor-pointer"
                >
                  
                  {/* Image Holder */}
                  <div className="relative h-28 sm:h-48 md:h-56 w-full overflow-hidden">
                    <img 
                      src={proj.image} 
                      alt={proj.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-amber-500 text-neutral-950 text-[8px] sm:text-[10px] font-bold tracking-widest uppercase px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded">
                      {proj.tag}
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-2.5 sm:p-6 flex flex-col flex-grow justify-between space-y-2.5 sm:space-y-4">
                    <div className="space-y-2 sm:space-y-4">
                      <div className="space-y-1 sm:space-y-2 text-left">
                        <div className="flex items-center gap-1.5 text-[9px] sm:text-xs font-mono text-amber-500">
                          <MapPin className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 text-amber-500 shrink-0" />
                          <span className="tracking-wider truncate">{proj.location}</span>
                        </div>
                        <h3 className="text-sm sm:text-lg md:text-xl font-serif font-bold text-white tracking-wide group-hover:text-amber-400 transition-colors line-clamp-1 sm:line-clamp-none">
                          {proj.title}
                        </h3>
                        <p className="text-neutral-400 text-[10px] sm:text-sm font-light leading-relaxed line-clamp-2 sm:line-clamp-none">
                          {proj.desc}
                        </p>
                      </div>

                      {/* Amenities Row */}
                      {proj.amenities && proj.amenities.length > 0 && (
                        <div className="space-y-1 sm:space-y-1.5 pt-1.5 sm:pt-3 border-t border-neutral-800/60">
                          <div className="text-[8px] sm:text-[9px] font-bold text-neutral-400 uppercase tracking-widest">Available Amenities</div>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {proj.amenities.map((amenity: string) => {
                              const { Icon, bgClass, iconColor } = getAmenityDetails(amenity);
                              return (
                                <span 
                                  key={amenity} 
                                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[8px] sm:text-[10px] font-bold tracking-wide transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.15)] ${bgClass}`}
                                >
                                  <Icon className={`w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 ${iconColor}`} />
                                  {amenity}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 sm:space-y-4 pt-1.5 sm:pt-2 border-t border-neutral-800/80">
                      <div className="flex justify-between items-center text-[9px] sm:text-xs">
                        <div className="text-neutral-500 uppercase tracking-widest font-semibold text-[8px] sm:text-[10px]">Total Extent</div>
                        <div className="text-white font-mono font-medium">{proj.size}</div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-neutral-500 uppercase tracking-widest font-semibold text-[8px] sm:text-[10px]">Price Parameter</div>
                        <div className="text-amber-400 font-serif font-bold text-xs sm:text-base md:text-lg">{proj.price}</div>
                      </div>

                      <div className="flex gap-1.5 sm:gap-2 w-full">
                        {proj.videoLink && (
                          <a
                            href={proj.videoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-1.5 sm:py-3 px-1 sm:px-2 rounded text-[9px] sm:text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-1 sm:gap-1.5"
                          >
                            <Play className="w-2 sm:w-3 h-2 sm:h-3 fill-current" /> WATCH
                          </a>
                        )}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateTo('property', proj.id);
                          }}
                          className={`${proj.videoLink ? 'flex-1' : 'w-full'} py-1.5 sm:py-3 bg-neutral-950 border border-neutral-800 hover:border-amber-500 text-white hover:text-amber-400 text-[9px] sm:text-xs font-bold tracking-widest uppercase rounded transition-all duration-300 cursor-pointer`}
                        >
                          KNOW MORE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom subscription banner that links directly to WhatsApp Channel */}
            <div className="bg-neutral-900 border-2 border-emerald-500/30 rounded-2xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 mt-16 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_60%)] pointer-events-none" />
              <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
              
              <div className="space-y-3 max-w-2xl relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] tracking-widest uppercase font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Instant Updates
                </span>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-wide">
                  Subscribe to Our WhatsApp Channel
                </h3>
                <p className="text-neutral-200 text-sm font-light leading-relaxed">
                  Join our private broadcasting list for live land launches, premium farmhouse opportunities, market pricing updates, and legal advice. Zero spam, exit anytime.
                </p>
              </div>

              <a 
                href={whatsappChannelUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="relative z-10 inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 hover:scale-[1.02] transition-all duration-300 rounded-xl font-mono font-bold text-xs tracking-wider uppercase cursor-pointer shadow-lg shadow-emerald-500/20 whitespace-nowrap"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.557-5.338 11.897-11.95 11.897-2.003 0-3.974-.502-5.733-1.458L0 24zm6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654zm11.167-7.964c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                </svg>
                Join WhatsApp Channel
              </a>
            </div>
          </div>
        </section>
      )}

      {activePage === 'enquire' && (
        <section className="pt-32 pb-24 px-4 md:px-8 bg-neutral-950 min-h-[80vh] flex items-center">
          <div className="max-w-4xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Info Text Left Side */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <span className="text-amber-500 text-xs font-bold tracking-[0.3em] uppercase block">VIP REGISTRATION</span>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-wide">
                  SECURE YOUR LAND RESERVATION
                </h1>
                <p className="text-neutral-400 text-sm font-light leading-relaxed">
                  Fill in your complete profile to book a premium site tour, access exclusive pre-launch rate catalogs, or consult directly with our legal advisory board regarding clear-title verifications.
                </p>
              </div>

              <div className="space-y-4 border-t border-neutral-800/80 pt-6">
                <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono">
                  <div className="w-8 h-8 rounded bg-amber-500/10 text-amber-500 flex items-center justify-center">
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white font-semibold uppercase tracking-wider text-[10px]">100% Legally Verified</p>
                    <p className="text-neutral-500 text-[9px] mt-0.5">Title deed clearance guaranteed</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono">
                  <div className="w-8 h-8 rounded bg-amber-500/10 text-amber-500 flex items-center justify-center">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white font-semibold uppercase tracking-wider text-[10px]">Complimentary Chauffeur Tour</p>
                    <p className="text-neutral-500 text-[9px] mt-0.5">Free weekend site visits from Pune/Mumbai</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stands Form Right Side */}
            <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 shadow-2xl relative">
              <form onSubmit={handleCorporateSubmit} className="space-y-5">
                
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={corporateForm.name}
                    onChange={handleCorporateInputChange}
                    placeholder="e.g. John Doe" 
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white rounded-lg px-4 py-3 text-sm transition-all duration-300 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                      Phone Number (10-digit)
                    </label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      pattern="\d{10}"
                      value={corporateForm.phone}
                      onChange={handleCorporateInputChange}
                      placeholder="e.g. 9922110001" 
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white rounded-lg px-4 py-3 text-sm transition-all duration-300 outline-none"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={corporateForm.email}
                      onChange={handleCorporateInputChange}
                      placeholder="e.g. user@example.com" 
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white rounded-lg px-4 py-3 text-sm transition-all duration-300 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                      Age
                    </label>
                    <input 
                      type="number" 
                      name="age"
                      required
                      min="18"
                      max="100"
                      value={corporateForm.age}
                      onChange={handleCorporateInputChange}
                      placeholder="e.g. 35" 
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white rounded-lg px-4 py-3 text-sm transition-all duration-300 outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                      Gender
                    </label>
                    <div className="flex gap-4 pt-2">
                      <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                        <input 
                          type="radio" 
                          name="gender" 
                          value="Male"
                          checked={corporateForm.gender === 'Male'}
                          onChange={handleCorporateInputChange}
                          className="accent-amber-500 w-4 h-4 cursor-pointer"
                        />
                        Male
                      </label>
                      <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                        <input 
                          type="radio" 
                          name="gender" 
                          value="Female"
                          checked={corporateForm.gender === 'Female'}
                          onChange={handleCorporateInputChange}
                          className="accent-amber-500 w-4 h-4 cursor-pointer"
                        />
                        Female
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                    Your Message / Target Plot & Size
                  </label>
                  <textarea 
                    name="message"
                    required
                    rows={4}
                    value={corporateForm.message}
                    onChange={handleCorporateInputChange}
                    placeholder="Describe which prime project you are interested in (e.g., Highway Touch, Sea-Facing Block) or specific hectare preferences..." 
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white rounded-lg px-4 py-3 text-sm transition-all duration-300 outline-none resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold py-4 px-6 rounded-lg text-xs md:text-sm tracking-widest uppercase transition-colors duration-200 mt-2"
                >
                  SUBMIT RESERVATION REQUEST
                </button>
              </form>
            </div>

          </div>
        </section>
      )}

      {activePage === 'about' && (
        <section className="pt-32 pb-24 px-4 md:px-8 bg-neutral-950">
          <div className="max-w-7xl mx-auto space-y-16">
            
            {/* Elegant Header Title Section */}
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <span className="text-amber-500 text-xs font-bold tracking-[0.3em] uppercase block animate-fadeIn">WHO WE ARE</span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-wide">
                ABOUT PARVAT REALITY
              </h1>
              <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed">
                A Trustworthy Developer Built on Transparency, Vision &amp; Growth
              </p>
              <div className="w-24 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mt-6" />
            </div>

            {/* Section 1: About Company */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Side: Modern Development/Office Image */}
              <div className="lg:col-span-5 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000" />
                <div className="relative bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80" 
                    alt="Parvat Reality Corporate Head Office" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-xs font-mono text-amber-400 tracking-wider uppercase font-semibold">Parvat Corporate Center</p>
                    <p className="text-white text-base font-serif font-bold mt-1">Establishing Generations of Appreciating Legacy</p>
                  </div>
                </div>
              </div>

              {/* Right Side: Elaborate Corporate Story */}
              <div className="lg:col-span-7 space-y-6 text-neutral-300">
                <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase inline-block">
                  TRUSTED DEVELOPER
                </span>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-wide">
                  Pioneering Land Innovations in Maharashtra's Booming Zones
                </h3>
                
                <p className="text-sm md:text-base font-light leading-relaxed">
                  Parvat Reality is a highly trustworthy real estate developer specializing in high-growth, strategic plot developments across <span className="text-amber-400 font-semibold">Mumbai 3.0, Pen, and Pali</span>. We acquire and develop clean-title, premium land parcels located immediately near major upcoming megastructure networks.
                </p>

                <p className="text-sm md:text-base font-light leading-relaxed">
                  Our portfolio is selectively situated to benefit from monumental infrastructure projects such as the new <span className="text-white font-semibold">Navi Mumbai International Airport</span>, the record-breaking <span className="text-white font-semibold">Mumbai Trans Harbour Link (MTHL)</span>, and expanding high-speed <span className="text-white font-semibold">Metro lines</span>. This places your investments right in the path of unparalleled growth and commercial advancement.
                </p>

                <div className="pt-2 border-l-2 border-amber-500 pl-4 italic text-amber-400/90 font-serif text-sm md:text-base">
                  "We specialize in providing high-growth, fully demarcated land options backed by 100% legal title protection to establish lifelong, secure family wealth."
                </div>
              </div>
            </div>

            {/* Section 2: Plots We Have (Grid Layout) */}
            <div className="space-y-10 pt-12 border-t border-neutral-900">
              <div className="text-center space-y-2">
                <span className="text-amber-500 text-xs font-bold tracking-[0.2em] uppercase block">DIVERSE HOLDINGS</span>
                <h2 className="text-3xl font-serif font-bold text-white tracking-wide">PLOTS WE HAVE</h2>
                <p className="text-neutral-400 text-xs md:text-sm max-w-xl mx-auto font-light">
                  A premium, carefully categorized collection of clean-title land options tailored to every requirement.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {[
                  { title: "Bungalow Plots", bg: "from-amber-500/10 to-transparent", hoverBorder: "hover:border-amber-500/40", icon: "🏡" },
                  { title: "Investment Plots", bg: "from-blue-500/10 to-transparent", hoverBorder: "hover:border-blue-500/40", icon: "📈" },
                  { title: "Warehouse Plots", bg: "from-emerald-500/10 to-transparent", hoverBorder: "hover:border-emerald-500/40", icon: "🏭" },
                  { title: "Farmhouse Plots", bg: "from-teal-500/10 to-transparent", hoverBorder: "hover:border-teal-500/40", icon: "🌳" },
                  { title: "Residential Plots", bg: "from-purple-500/10 to-transparent", hoverBorder: "hover:border-purple-500/40", icon: "🏢" },
                  { title: "Commercial Plots", bg: "from-indigo-500/10 to-transparent", hoverBorder: "hover:border-indigo-500/40", icon: "🏬" },
                  { title: "Agriculture Plots", bg: "from-orange-500/10 to-transparent", hoverBorder: "hover:border-orange-500/40", icon: "🌾" }
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className={`relative overflow-hidden rounded-2xl bg-gradient-to-b ${item.bg} bg-neutral-900 border border-neutral-800/80 p-5 flex flex-col items-center justify-center text-center hover:scale-105 ${item.hoverBorder} transition-all duration-300 group shadow-md`}
                  >
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-full bg-neutral-800/80 flex items-center justify-center text-2xl shadow-inner mx-auto group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <h4 className="text-white font-serif font-bold text-xs md:text-sm leading-tight tracking-wide group-hover:text-amber-400 transition-colors">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Core Locations */}
            <div className="space-y-10 pt-12 border-t border-neutral-900">
              <div className="text-center space-y-2">
                <span className="text-amber-500 text-xs font-bold tracking-[0.2em] uppercase block">GEOGRAPHIC CORRIDORS</span>
                <h2 className="text-3xl font-serif font-bold text-white tracking-wide">OUR CORE LOCATIONS</h2>
                <p className="text-neutral-400 text-xs md:text-sm max-w-xl mx-auto font-light">
                  We focus our expert acquisitions in high-potential, heavily integrated infrastructure hubs across Maharashtra.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {[
                  { name: "Mumbai 3.0", highlight: "Prime Corridor", connectivity: "MTHL & Metro Touch" },
                  { name: "Panvel", highlight: "Airport Gateway", connectivity: "Transit-Oriented" },
                  { name: "Pen", highlight: "Logistics Node", connectivity: "Highway Proximity" },
                  { name: "Pali", highlight: "Scenic Estates", connectivity: "Excellent State Highway" },
                  { name: "Mangaon", highlight: "Industrial Belt", connectivity: "Key Railway Access" },
                  { name: "Karjat", highlight: "Luxury Escapes", connectivity: "Rapid Rail Connect" },
                  { name: "Khopoli", highlight: "Commercial Hub", connectivity: "Expressway Frontage" },
                ].map((loc, idx) => (
                  <div 
                    key={idx}
                    className="relative rounded-2xl bg-neutral-900/40 border border-neutral-800/60 p-4 space-y-3 hover:border-amber-500/20 transition-all duration-300 hover:bg-neutral-900/70 text-center group"
                  >
                    <div className="flex items-center justify-center text-amber-500 mx-auto">
                      <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-white font-serif font-bold text-sm tracking-wide group-hover:text-amber-400 transition-colors">
                        {loc.name}
                      </h4>
                      <p className="text-neutral-400 text-[11px] font-medium font-sans">
                        {loc.highlight}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-neutral-800/80 text-[9px] text-neutral-500 font-mono tracking-tight leading-relaxed">
                      {loc.connectivity}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: Property Exchange Offer Highlight Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 p-8 md:p-12 shadow-[0_15px_40px_rgba(0,0,0,0.04)]">
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <span className="px-3 py-1 bg-amber-500/10 text-amber-700 border border-amber-500/25 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase inline-block">
                    LIMITED TIME PROPERTY EXCHANGE OFFER
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif font-extrabold text-slate-900 tracking-wide leading-tight uppercase">
                    Trade Existing Property for Premium Land
                  </h3>
                  <p className="text-slate-700 text-sm md:text-base font-light leading-relaxed max-w-2xl">
                    Unlock capital from stagnant assets! Trade <span className="text-slate-900 font-semibold">any existing property in Maharashtra</span> for an appreciating, premium clear-title plot in the booming, highly-coveted <span className="text-amber-600 font-semibold">Sea Link Mahamumbai area</span>.
                  </p>
                  <div className="flex flex-wrap gap-6 pt-2 text-xs font-mono text-slate-600">
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Commercial properties welcome</span>
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Transparent direct-value adjustments</span>
                  </div>
                </div>
                <div className="lg:col-span-4 text-left lg:text-right">
                  <button 
                    onClick={() => setIsAppointmentOpen(true)}
                    className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 hover:bg-slate-900 text-neutral-950 hover:text-white font-bold text-xs tracking-widest uppercase rounded-lg transition-all duration-300 shadow-[0_4px_15px_rgba(245,158,11,0.25)] hover:shadow-[0_4px_20px_rgba(15,23,42,0.2)] cursor-pointer"
                  >
                    APPLY FOR EXCHANGE VALUE AUDIT
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* High-End Call To Action Section */}
            <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 p-10 md:p-16 text-center space-y-8 max-w-4xl mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.05),transparent_50%)]" />
              
              <div className="relative space-y-4">
                <span className="text-amber-600 text-xs font-bold tracking-[0.25em] uppercase px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/25 inline-block font-mono">
                  PREMIUM CONSULTATION
                </span>
                <h3 className="text-2xl md:text-4xl font-serif font-extrabold text-slate-800 tracking-wide leading-tight">
                  Ready to secure your strategic land asset?
                </h3>
                <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-light">
                  Coordinate a private site tour with our relationship desks, complete with luxury chauffeured transit options from major urban hubs.
                </p>
              </div>

              <div className="relative pt-4">
                <button 
                  onClick={() => setIsAppointmentOpen(true)}
                  className="relative inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-amber-500 hover:bg-slate-900 text-neutral-950 hover:text-white font-extrabold text-xs md:text-sm tracking-widest uppercase rounded-lg transition-all duration-300 shadow-[0_4px_15px_rgba(245,158,11,0.3)] hover:shadow-[0_4px_20px_rgba(15,23,42,0.25)] hover:-translate-y-0.5 cursor-pointer font-mono border border-transparent"
                >
                  SPEAK WITH OUR EXPERTS
                  <svg className="w-4 h-4 text-current transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </section>
      )}

      {activePage === 'journey' && (
        <section className="pt-32 pb-24 px-4 md:px-8 bg-neutral-950">
          <div className="max-w-7xl mx-auto space-y-16">
            
            {/* Elegant Header Title Section */}
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <span className="text-amber-500 text-xs font-bold tracking-[0.3em] uppercase block animate-fadeIn">OUR LEGACY</span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-wide">
                OUR GLORIOUS JOURNEY
              </h1>
              <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed">
                A Visual Timeline of Trust &amp; Progress
              </p>
              <div className="w-24 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mt-6" />
            </div>

            {/* Vertical Timeline */}
            <div className="max-w-4xl mx-auto space-y-10">
              <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:w-0.5 before:bg-neutral-800">
                {[
                  { 
                    year: '2008', 
                    title: 'The Genesis', 
                    desc: 'Inception of Parvat Developers with strategic small-scale agricultural land consolidations in high-demand Pune outer corridors, building a solid foundation of trust.' 
                  },
                  { 
                    year: '2014', 
                    title: 'Milestone Reach', 
                    desc: 'Successfully crossed 500+ satisfied individual land investors and completed critical non-agricultural (NA) conversion projects inside the emerging Navi Mumbai growth zone.' 
                  },
                  { 
                    year: '2020', 
                    title: 'Digital Governance', 
                    desc: 'Pioneered clear-title electronic registry tracking systems, rendering all boundary allocations completely visible and secure for client-side digital audits.' 
                  },
                  { 
                    year: '2026', 
                    title: '1,200+ Acres Legacy', 
                    desc: 'Consolidating state-of-the-art clear-title high-elevation ranch lands and expanding premium eco-meadow development corridors with fully integrated physical infrastructure.' 
                  }
                ].map((step, idx) => (
                  <div key={idx} className={`relative pl-12 md:pl-0 flex flex-col md:flex-row items-start ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    
                    {/* Centered Timeline Dot */}
                    <div className="absolute left-2.5 md:left-1/2 top-1.5 w-4 h-4 rounded-full bg-amber-500 ring-4 ring-neutral-950 md:-translate-x-2 z-10" />
                    
                    {/* Timeline Content Block */}
                    <div className="w-full md:w-[45%] bg-neutral-900/60 border border-neutral-900 rounded-2xl p-6 md:p-8 space-y-3 hover:border-amber-500/20 transition-colors duration-300">
                      <span className="text-amber-500 font-mono text-sm font-bold tracking-widest block">{step.year}</span>
                      <h3 className="text-xl font-bold text-white font-serif tracking-wide">{step.title}</h3>
                      <p className="text-neutral-400 text-xs md:text-sm font-light leading-relaxed">{step.desc}</p>
                    </div>

                    {/* Spacer for Medium Screens */}
                    <div className="hidden md:block w-[10%]" />
                    <div className="hidden md:block w-[45%]" />
                  </div>
                ))}
              </div>
            </div>

            {/* Expanded Gallery Grid - 4 Columns */}
            <div className="space-y-10 pt-16 border-t border-neutral-900">
              <div className="text-center space-y-2">
                <span className="text-amber-500 text-xs font-bold tracking-widest uppercase block">PHOTO EVIDENCE</span>
                <h2 className="text-3xl font-serif font-bold text-white tracking-wide">MILESTONES IN PICTURES</h2>
                <p className="text-neutral-400 text-xs md:text-sm font-light max-w-xl mx-auto">
                  A glimpse into our landmark events, on-site celebrations, and community engagement.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "Annual Excellence Meet",
                    desc: "Celebration of corporate achievements, milestones, and recognizing outstanding team contributions.",
                    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80"
                  },
                  {
                    title: "On-Site Plot Handover",
                    desc: "A visual testament to our clear-title promise with happy land owners receiving official possession.",
                    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80"
                  },
                  {
                    title: "Future Investor Summit",
                    desc: "Elite investor gathering discussing emerging high-yield land-corridor opportunities in Western India.",
                    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80"
                  },
                  {
                    title: "Customer Advisory Meet",
                    desc: "Collaborating directly with our patrons to refine our infrastructure and demarcation processes.",
                    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-amber-500/40 transition-all duration-300 flex flex-col group shadow-lg">
                    <div className="relative h-48 w-full overflow-hidden bg-neutral-950">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
                    </div>
                    <div className="p-5 flex-grow flex flex-col justify-between space-y-2">
                      <h4 className="text-sm font-serif font-bold text-white tracking-wide group-hover:text-amber-400 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-neutral-400 text-[11px] font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Call To Action Block */}
            <div 
              className="relative rounded-2xl overflow-hidden p-8 md:p-12 text-center space-y-6 max-w-4xl mx-auto border-0 shadow-sm"
              style={{ backgroundColor: '#f4f0f0' }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.06),transparent_50%)]" />
              <div className="relative space-y-3">
                <span className="text-amber-800 text-xs font-bold tracking-[0.2em] uppercase block">JOIN OUR COMMUNITY</span>
                <h3 className="text-2xl md:text-3xl font-serif font-bold tracking-wide" style={{ color: '#0f172a' }}>
                  Be a Part of Our Future
                </h3>
                <p className="text-slate-700 text-xs md:text-sm max-w-xl mx-auto leading-relaxed font-normal">
                  Join our upcoming premium land launch summits or book a detailed physical tour of our landmark meadows.
                </p>
              </div>

              <div className="relative pt-2">
                <button 
                  onClick={() => setIsAppointmentOpen(true)}
                  className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs md:text-sm tracking-widest uppercase rounded-lg transition-all duration-300 shadow-md cursor-pointer"
                >
                  Be a Part of Our Future
                </button>
              </div>
            </div>

          </div>
        </section>
      )}

      {activePage === 'news' && (
        <section className="pt-32 pb-24 px-4 md:px-8 bg-neutral-950 min-h-screen">
          <div className="max-w-5xl mx-auto space-y-12">
            {!selectedNewsId ? (
              <>
                {/* Clean Top Header Text */}
                <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
                  <span className="text-amber-500 text-xs font-bold tracking-[0.3em] uppercase block animate-fadeIn">
                    PARVAT REALITY JOURNAL
                  </span>
                  <h1 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-wide">
                    PARVAT MEDIA CORRIDOR
                  </h1>
                  <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed">
                    The official digital registry of verified greenfield developments, land launch intelligence, and luxury farmhouse market studies.
                  </p>
                  <div className="w-24 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mt-6" />
                </div>

                {/* Clean Automated Hero Slider for Latest News */}
                {(() => {
                  let sliderNews = allNews.filter((item: any) => item.featured === true || item.featured === 'true');
                  if (sliderNews.length === 0) {
                    sliderNews = allNews.slice(0, 3);
                  }
                  if (sliderNews.length === 0) return null;

                  return (
                    <div className="relative w-full h-[380px] sm:h-[450px] rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-950 group mb-12">
                      {sliderNews.map((item: any, idx: number) => {
                        const isActive = idx === newsSliderIndex;
                        return (
                          <div
                            key={item.id}
                            onClick={() => navigateTo('news', item.id)}
                            className={`absolute inset-0 transition-all duration-1000 ease-in-out cursor-pointer flex flex-col justify-end p-6 sm:p-8 ${
                              isActive 
                                ? 'opacity-100 scale-100 pointer-events-auto z-10' 
                                : 'opacity-0 scale-95 pointer-events-none z-0'
                            }`}
                          >
                            {/* Background image or themed gradient */}
                            <div className="absolute inset-0 bg-neutral-950">
                              {item.media && item.media.length > 0 ? (
                                <img 
                                  src={item.media[0].data} 
                                  alt={item.title} 
                                  className="w-full h-full object-contain opacity-100 transition-transform duration-[10000ms] ease-out"
                                />
                              ) : item.image ? (
                                <img 
                                  src={item.image} 
                                  alt={item.title} 
                                  className="w-full h-full object-contain opacity-100 transition-transform duration-[10000ms] ease-out"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-neutral-950 via-neutral-900 to-amber-950/20 opacity-90" />
                              )}
                            </div>

                            {/* Slider Action Button at the bottom */}
                            <div className="relative z-20 flex justify-center w-full">
                              <span className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-mono font-bold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-xl shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95">
                                Read Full Article &rarr;
                              </span>
                            </div>
                          </div>
                        );
                      })}

                      {/* Controls */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          const len = sliderNews.length;
                          setNewsSliderIndex((prev) => (prev - 1 + len) % len);
                        }}
                        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/25 hover:bg-white/15 hover:scale-105 active:scale-95 flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 shadow-lg shadow-black/20 cursor-pointer"
                        aria-label="Previous Slide"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          const len = sliderNews.length;
                          setNewsSliderIndex((prev) => (prev + 1) % len);
                        }}
                        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/25 hover:bg-white/15 hover:scale-105 active:scale-95 flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 shadow-lg shadow-black/20 cursor-pointer"
                        aria-label="Next Slide"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      {/* Dots */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                        {sliderNews.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              setNewsSliderIndex(idx);
                            }}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              idx === newsSliderIndex 
                                ? 'bg-amber-500 w-6' 
                                : 'bg-white/30 hover:bg-white/60'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* Search Bar & Category Filters */}
                <div className="space-y-6 bg-neutral-900/30 p-6 rounded-2xl border border-neutral-900/80">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search news, land updates, legal guides..."
                      value={newsSearchQuery}
                      onChange={(e) => setNewsSearchQuery(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white rounded-xl pl-12 pr-10 py-3.5 text-sm transition-all duration-300 outline-none"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    {newsSearchQuery && (
                      <button 
                        onClick={() => setNewsSearchQuery('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {newsCategories.map((category) => {
                      const isActive = selectedNewsCategory === category;
                      return (
                        <button
                          key={category}
                          onClick={() => setSelectedNewsCategory(category)}
                          className={`px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                            isActive
                              ? 'bg-amber-500 text-neutral-950 border-amber-500 shadow-md shadow-amber-500/25 font-extrabold'
                              : 'bg-neutral-950 text-white border-neutral-800 hover:border-amber-500 hover:bg-neutral-900 hover:text-amber-500'
                          }`}
                        >
                          {category}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* News Grid (filtered) */}
                {(() => {
                  const filteredNews = allNews
                    .filter((item: any) => {
                      // Filter out draft posts from public news tab
                      if (item.status === 'draft') return false;

                      const itemCategory = item.category || 'Corporate News';
                      const matchesSearch = item.title.toLowerCase().includes(newsSearchQuery.toLowerCase()) || 
                                            item.snippet.toLowerCase().includes(newsSearchQuery.toLowerCase());
                      const matchesCategory = selectedNewsCategory === 'All' || itemCategory === selectedNewsCategory;
                      return matchesSearch && matchesCategory;
                    })
                    .sort((a: any, b: any) => {
                      const aPinned = !!a.pinned;
                      const bPinned = !!b.pinned;
                      if (aPinned && !bPinned) return -1;
                      if (!aPinned && bPinned) return 1;
                      return 0; // maintain default date ordering
                    });

                  if (filteredNews.length === 0) {
                    return (
                      <div className="py-16 text-center text-neutral-500 border border-neutral-900 rounded-xl bg-neutral-900/10 font-light">
                        No news articles matched your search or category filter.
                      </div>
                    );
                  }

                  return (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-8">
                      {(() => {
                        const elements: React.ReactNode[] = [];
                        const banners = getBanners().filter((b: any) => b.active === true || b.active === 'true');

                        filteredNews.forEach((item: any, index: number) => {
                          // Push the standard news card
                          elements.push(
                            <div 
                              key={item.id} 
                              onClick={() => navigateTo('news', item.id)}
                              style={{ animationDelay: `${index * 120}ms` }}
                              className="bg-neutral-900 border border-neutral-800 hover:border-amber-500/40 rounded-xl flex flex-col overflow-hidden hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group shadow-lg text-left animate-fade-in-up"
                            >
                              {item.media && item.media.length > 0 ? (
                                <div className="relative h-28 sm:h-36 md:h-48 w-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pointer-events-none">
                                  {item.media.map((m: any, idx: number) => (
                                    <div key={idx} className="min-w-full h-full flex-shrink-0 snap-center relative overflow-hidden">
                                      {m.type.startsWith('video/') ? (
                                         <video src={m.data} className="w-full h-full object-cover bg-black transition-transform duration-700 ease-out group-hover:scale-105" muted loop playsInline autoPlay />
                                      ) : (
                                         <img src={m.data} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                                      )}
                                    </div>
                                  ))}
                                  {item.media.length > 1 && (
                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10 pointer-events-none">
                                       {item.media.map((_: any, idx: number) => (
                                          <div key={idx} className="w-1.5 h-1.5 rounded-full bg-white/70 shadow-sm" />
                                       ))}
                                    </div>
                                  )}
                                </div>
                              ) : item.image ? (
                                <div className="relative h-28 sm:h-36 md:h-48 w-full overflow-hidden">
                                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                                  {item.videoLink && (
                                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md rounded-md p-1.5">
                                      <Play className="w-4 h-4 text-amber-500" />
                                    </div>
                                  )}
                                </div>
                              ) : null}
                              <div className="p-3 sm:p-4 md:p-6 space-y-2.5 sm:space-y-4 flex-1 flex flex-col justify-between">
                                <div className="space-y-1.5 sm:space-y-3">
                                  <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                                    {item.pinned && (
                                      <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[9px] font-mono font-bold tracking-wider text-amber-400 bg-amber-400/15 border border-amber-400/30 rounded animate-pulse">
                                        📌 PINNED
                                      </span>
                                    )}
                                    {item.category && (
                                      <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[9px] font-mono font-bold tracking-wider text-neutral-300 bg-neutral-800 border border-neutral-700 rounded">
                                        🏷️ {item.category}
                                      </span>
                                    )}
                                    <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[9px] font-mono font-bold tracking-wider text-amber-500 bg-amber-500/10 border border-amber-500/20 rounded">
                                      ⏱️ {item.readingTime || '2 min read'}
                                    </span>
                                  </div>
                                  <h3 className="text-xs sm:text-sm md:text-base font-serif font-bold text-white group-hover:text-amber-400 transition-colors leading-snug line-clamp-2">{item.title}</h3>
                                  <p className="text-neutral-400 text-[10px] sm:text-xs font-light leading-relaxed line-clamp-2 md:line-clamp-3">{item.snippet}</p>
                                </div>
                                <div className="flex items-center justify-end pt-2 sm:pt-4 mt-auto border-t border-neutral-800/50">
                                  <span className="text-[10px] sm:text-xs text-amber-500 font-bold group-hover:underline flex items-center gap-1">
                                    Read Article &rarr;
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        });

                        return elements;
                      })()}
                    </div>
                  );
                })()}

                {/* Custom subscription banner that links directly to WhatsApp Channel */}
                <div className="bg-neutral-900 border-2 border-emerald-500/30 rounded-2xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 mt-16 shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_60%)] pointer-events-none" />
                  <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
                  
                  <div className="space-y-3 max-w-2xl relative z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] tracking-widest uppercase font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Instant Updates
                    </span>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-wide">
                      Subscribe to Our WhatsApp Channel
                    </h3>
                    <p className="text-neutral-200 text-sm font-light leading-relaxed">
                      Join our private broadcasting list for live land launches, premium farmhouse opportunities, market pricing updates, and legal advice. Zero spam, exit anytime.
                    </p>
                  </div>

                  <a 
                    href={whatsappChannelUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="relative z-10 inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 hover:scale-[1.02] transition-all duration-300 rounded-xl font-mono font-bold text-xs tracking-wider uppercase cursor-pointer shadow-lg shadow-emerald-500/20 whitespace-nowrap"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.557-5.338 11.897-11.95 11.897-2.003 0-3.974-.502-5.733-1.458L0 24zm6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654zm11.167-7.964c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                    </svg>
                    Join WhatsApp Channel
                  </a>
                </div>

                {/* Promotional registry banners placed directly underneath the WhatsApp Banner */}
                {(() => {
                  const activeBanners = getBanners().filter((b: any) => b.active === true || b.active === 'true');
                  if (activeBanners.length === 0) return null;
                  return (
                    <div className="mt-8 space-y-6 w-full">
                      {activeBanners.map((banner: any) => (
                        <div 
                          key={banner.id}
                          className="w-full bg-gradient-to-r from-neutral-900 to-neutral-950 border border-amber-500/20 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative group/banner text-left animate-fade-in-up"
                        >
                          <div className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-overlay transition-transform duration-700 group-hover/banner:scale-105" style={{ backgroundImage: `url(${banner.imageUrl})` }} />
                          
                          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10 w-full">
                            <div className="w-full md:w-48 h-28 rounded-xl overflow-hidden flex-shrink-0 border border-neutral-800 shadow-md">
                              <img src={banner.imageUrl} alt={banner.title} className="w-full h-full object-cover transition-transform duration-700 group-hover/banner:scale-105" />
                            </div>
                            <div className="space-y-2 text-center md:text-left flex-1">
                              <span className="text-[10px] font-mono tracking-[0.3em] text-amber-500 uppercase font-bold">PROMOTIONAL REGISTRY</span>
                              <h4 className="text-lg md:text-2xl font-serif font-bold text-white tracking-wide leading-tight group-hover/banner:text-amber-400 transition-colors">
                                {banner.title}
                              </h4>
                              {banner.description && (
                                <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed mt-1.5">
                                  {banner.description}
                                </p>
                              )}
                            </div>
                          </div>
                          
                          <div className="relative z-10 flex-shrink-0 w-full md:w-auto flex flex-col sm:flex-row items-center gap-3">
                            {banner.youtubeUrl && (
                              <button
                                onClick={() => setPromoVideoUrl(banner.youtubeUrl)}
                                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-mono font-bold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 w-full sm:w-auto justify-center cursor-pointer"
                              >
                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                                Watch Video
                              </button>
                            )}

                            {banner.ctaLink.startsWith('#') ? (
                              <button
                                onClick={() => {
                                  const target = banner.ctaLink.substring(1);
                                  navigateTo(target as any);
                                }}
                                className={`inline-flex items-center gap-2 px-5 py-3 text-xs font-mono font-bold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 w-full sm:w-auto justify-center cursor-pointer ${
                                  banner.youtubeUrl 
                                    ? 'text-amber-500 hover:text-amber-400 border border-amber-500/30 hover:border-amber-400/50 bg-transparent' 
                                    : 'text-neutral-950 bg-amber-500 hover:bg-amber-400 shadow-lg'
                                }`}
                              >
                                Learn More &rarr;
                              </button>
                            ) : (
                              <a 
                                href={banner.ctaLink}
                                className={`inline-flex items-center gap-2 px-5 py-3 text-xs font-mono font-bold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 w-full sm:w-auto justify-center cursor-pointer ${
                                  banner.youtubeUrl 
                                    ? 'text-amber-500 hover:text-amber-400 border border-amber-500/30 hover:border-amber-400/50 bg-transparent' 
                                    : 'text-neutral-950 bg-amber-500 hover:bg-amber-400 shadow-lg'
                                }`}
                              >
                                Learn More &rarr;
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </>
            ) : (
              (() => {
                const item = allNews.find(n => n.id === selectedNewsId);
                if (!item) return null;
                return (
                  <div className="space-y-8 animate-fadeIn max-w-3xl mx-auto">
                    <button 
                      onClick={() => setSelectedNewsId(null)} 
                      className="inline-flex items-center gap-2.5 px-5 py-2.5 text-xs font-mono font-bold text-neutral-400 hover:text-amber-500 bg-neutral-900/90 hover:bg-neutral-900 border border-neutral-800 hover:border-amber-500/40 rounded-xl shadow-lg transition-all duration-300 group mb-8 cursor-pointer"
                    >
                      <span className="inline-block transform group-hover:-translate-x-1 transition-transform duration-300">&larr;</span> 
                      <span>BACK TO NEWS</span>
                    </button>
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-amber-500 text-sm font-mono tracking-widest">{item.date}</span>
                        {item.category && (
                          <>
                            <span className="text-neutral-600 text-xs">•</span>
                            <span className="text-neutral-400 text-xs font-mono">🏷️ {item.category}</span>
                          </>
                        )}
                        <span className="text-neutral-600 text-xs">•</span>
                        <span className="text-amber-500/80 text-xs font-mono">⏱️ {item.readingTime || '2 min read'}</span>
                      </div>
                      <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">{item.title}</h1>
                      <div className="flex items-center gap-4 pt-4 border-t border-neutral-800/50 mt-4">
                         <span className="text-neutral-400 text-xs uppercase tracking-widest font-bold">Share:</span>
                         <button className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-amber-500 hover:border-amber-500 transition-all">
                           <Share2 className="w-3.5 h-3.5" />
                         </button>
                         <button className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-green-500 hover:border-green-500 transition-all" onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(item.title + ' - ' + window.location.href)}`, '_blank')}>
                           <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                         </button>
                         <button className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-amber-500 hover:border-amber-500 transition-all" onClick={() => navigator.clipboard.writeText(window.location.href)} title="Copy Link">
                           <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                         </button>
                      </div>
                    </div>
                    
                    <NewsMediaGallery item={item} />

                    <div className="prose prose-invert prose-amber max-w-none text-neutral-300 font-light leading-relaxed pt-8 pb-12 border-t border-neutral-800/30 mt-8">
                      <p className="text-lg md:text-xl text-white font-medium mb-8 border-l-2 border-amber-500 pl-6 py-2">
                        {item.snippet}
                      </p>
                      <p>
                        The real estate landscape is continually evolving to meet the demands of modern investors who seek security, luxury, and long-term appreciation. As market dynamics shift, our commitment to delivering uncompromising quality and vetted opportunities remains steadfast.
                      </p>
                      <p className="mt-4">
                        This update highlights our proactive measures and upcoming initiatives designed to enhance the value of your portfolio. By leveraging cutting-edge market analysis and maintaining rigorous legal standards, we ensure that every property we curate offers exceptional peace of mind.
                      </p>
                      <p className="mt-4 text-neutral-400 italic">
                        For further details or to discuss how this news impacts your specific investments, please reach out to our advisory team.
                      </p>
                    </div>

                    {/* Dynamic Link Back to Main Property Views */}
                    <div className="relative rounded-2xl bg-neutral-900/60 border border-neutral-800 p-6 md:p-8 space-y-4 shadow-xl">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-2">
                          <h4 className="text-lg font-serif font-bold text-white">Looking for Strategic Land Opportunities Featured in our News?</h4>
                          <p className="text-neutral-400 text-sm font-light max-w-2xl">
                            Explore Parvat Reality's premium, clear-title plot developments near the Navi Mumbai International Airport and scenic Pali/Pen corridors.
                          </p>
                        </div>
                        <button
                          onClick={() => navigateTo('projects')}
                          className="px-6 py-3 bg-amber-500 hover:bg-white text-neutral-950 font-mono font-bold text-xs tracking-widest uppercase rounded-xl transition-all duration-300 shrink-0 cursor-pointer shadow-md"
                        >
                          EXPLORE ALL PLOTS
                        </button>
                      </div>
                    </div>

                    {/* Premium Recommendation Section */}
                    <div className="pt-16 border-t border-neutral-900 mt-16 space-y-10">
                      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div className="space-y-2">
                          <span className="text-amber-500 text-[10px] font-mono tracking-[0.3em] uppercase block font-bold">Recommended Reading</span>
                          <h3 className="text-2xl font-serif font-bold text-white tracking-wide">More News &amp; Updates</h3>
                        </div>
                        <button 
                          onClick={() => {
                            setSelectedNewsId(null);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="text-xs text-amber-500 hover:text-amber-400 font-mono tracking-widest uppercase flex items-center gap-1 hover:underline cursor-pointer transition-all self-start md:self-auto"
                        >
                          View All Articles &rarr;
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {allNews
                          .filter((n: any) => n.id !== item.id)
                          .slice(0, 3)
                          .map((otherItem: any, index: number) => (
                            <div 
                              key={otherItem.id}
                              onClick={() => navigateTo('news', otherItem.id)}
                              style={{ animationDelay: `${index * 120}ms` }}
                              className="bg-neutral-900 border border-neutral-800/80 hover:border-amber-500/30 rounded-xl flex flex-col overflow-hidden hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group shadow-lg text-left animate-fade-in-up"
                            >
                              {otherItem.media && otherItem.media.length > 0 ? (
                                <div className="relative h-40 w-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pointer-events-none bg-neutral-950">
                                  {otherItem.media.map((m: any, idx: number) => (
                                    <div key={idx} className="min-w-full h-full flex-shrink-0 snap-center relative overflow-hidden">
                                      {m.type.startsWith('video/') ? (
                                         <video src={m.data} className="w-full h-full object-cover bg-black transition-transform duration-700 ease-out group-hover:scale-105" muted loop playsInline autoPlay />
                                      ) : (
                                         <img src={m.data} alt={otherItem.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                                      )}
                                    </div>
                                  ))}
                                  {otherItem.media.length > 1 && (
                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10 pointer-events-none">
                                       {otherItem.media.map((_: any, idx: number) => (
                                          <div key={idx} className="w-1 h-1 rounded-full bg-white/70 shadow-sm" />
                                       ))}
                                    </div>
                                  )}
                                </div>
                              ) : otherItem.image ? (
                                <div className="relative h-40 w-full bg-neutral-950 overflow-hidden">
                                  <img src={otherItem.image} alt={otherItem.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                                  {otherItem.videoLink && (
                                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md rounded-md p-1">
                                      <Play className="w-3.5 h-3.5 text-amber-500 fill-current" />
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="h-40 w-full bg-neutral-950/60 border-b border-neutral-800/50 flex items-center justify-center">
                                  <span className="text-neutral-600 font-serif text-sm italic">Parvat Insights</span>
                                </div>
                              )}
                              
                              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                                <div className="space-y-2">
                                  <span className="text-[9px] text-amber-500 font-mono tracking-widest block">{otherItem.date}</span>
                                  <h4 className="text-sm font-serif font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">{otherItem.title}</h4>
                                  <p className="text-neutral-400 text-[11px] font-light line-clamp-2 leading-relaxed">{otherItem.snippet}</p>
                                </div>
                                <div className="flex items-center justify-between pt-3 mt-auto border-t border-neutral-800/40">
                                  <span className="text-[9px] text-neutral-500 font-mono uppercase tracking-widest">Read Article</span>
                                  <span className="text-xs text-amber-500 font-bold group-hover:translate-x-1 transition-transform">&rarr;</span>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                );
              })()
            )}
          </div>
        </section>
      )}

      {activePage === 'contact' && (
        <section className="pt-32 pb-24 px-4 md:px-8 bg-neutral-950">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <span className="text-amber-500 text-xs font-bold tracking-[0.3em] uppercase block">GET IN TOUCH</span>
              <h1 className="text-4xl font-serif font-bold text-white tracking-wide">CONTACT DESK</h1>
              <div className="w-20 h-0.5 bg-amber-500 mx-auto mt-4" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 space-y-6">
                <h3 className="text-xl font-bold text-white font-serif">Head Office Details</h3>
                <p className="text-neutral-400 text-sm font-light leading-relaxed">
                  Office no. 507, A wing Krukeja Plaza,<br />
                  Plot No 45, 46 And 55, Sector 11,<br />
                  CBD Belapur, Navi Mumbai, Maharashtra 400614
                </p>
                <div className="space-y-3 text-xs font-mono pt-4 border-t border-neutral-800">
                  <div className="space-y-1">
                    <p className="text-amber-400">📞 Phone 1: +91 85916 68166</p>
                    <p className="text-amber-400">📞 Phone 2: +91 85918 18166</p>
                  </div>
                  <p className="text-amber-400">✉️ Email: Info.parvatreality@gmail.com</p>
                </div>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 space-y-6">
                <h3 className="text-xl font-bold text-white font-serif">Quick Inquiry Form</h3>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Thank you! Our team will contact you shortly.");
                    (e.target as HTMLFormElement).reset();
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. John Doe" 
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white rounded-lg px-4 py-3 text-xs transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400">Phone Number</label>
                    <input 
                      type="tel" 
                      required 
                      pattern="\d{10}"
                      placeholder="e.g. 9922110001" 
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white rounded-lg px-4 py-3 text-xs transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400">Your Message</label>
                    <textarea 
                      required 
                      rows={3}
                      placeholder="Enter your query here..." 
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white rounded-lg px-4 py-3 text-xs transition-all outline-none resize-none"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs tracking-widest uppercase rounded-lg transition-colors duration-200 mt-2"
                  >
                    Submit Enquiry
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}

      {activePage === 'property' && (
        <section className="pt-32 pb-24 px-4 md:px-8 bg-neutral-950 min-h-screen">
          <div className="max-w-5xl mx-auto space-y-12">
            {(() => {
              const activeProjects = getProjects();
              const proj = activeProjects.find((p: any) => p.id === selectedProjectId);
              if (!proj) {
                return (
                  <div className="text-center py-24 space-y-6">
                    <h2 className="text-2xl font-serif text-white">Property details are not available.</h2>
                    <p className="text-neutral-400 max-w-md mx-auto text-sm">Please go back to the Projects catalog to select from our active premium land projects.</p>
                    <button 
                      onClick={() => navigateTo('projects')}
                      className="px-6 py-3 bg-amber-500 text-neutral-950 font-bold uppercase text-xs tracking-widest rounded-lg hover:bg-amber-400 transition-colors cursor-pointer"
                    >
                      Browse Projects
                    </button>
                  </div>
                );
              }

              // Filter recommended projects (all other projects, limited to 3)
              const recommendations = activeProjects
                .filter((p: any) => p.id !== proj.id)
                .slice(0, 3);

              return (
                <div className="space-y-10 animate-fadeIn text-left">
                  {/* Back button */}
                  <div>
                    <button 
                      onClick={() => navigateTo('projects')}
                      className="inline-flex items-center gap-2.5 px-5 py-2.5 text-xs font-mono font-bold text-neutral-400 hover:text-amber-500 bg-neutral-900/90 hover:bg-neutral-900 border border-neutral-800 hover:border-amber-500/40 rounded-xl shadow-lg transition-all duration-300 group cursor-pointer"
                    >
                      <span className="inline-block transform group-hover:-translate-x-1 transition-transform duration-300">&larr;</span> 
                      <span>BACK TO PROJECTS</span>
                    </button>
                  </div>

                  {/* 1. TOP SECTION: Clean Title, Location Tag, and Split Gallery */}
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[9px] font-mono font-bold tracking-widest text-amber-500 bg-amber-500/10 border border-amber-500/20 rounded uppercase">
                            {proj.tag || 'Exclusive Land'}
                          </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-wide">{proj.title}</h1>
                        <div className="flex items-center gap-1.5 text-neutral-400 text-sm">
                          <MapPin className="w-4 h-4 text-amber-500" />
                          <span className="uppercase tracking-wider font-mono text-xs">{proj.location}</span>
                        </div>
                      </div>

                      {/* Clean Share & Inquire CTAs */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        <button 
                          onClick={() => {
                            setIsAppointmentOpen(true);
                            setAppointmentForm(prev => ({
                              ...prev,
                              interest: `Enquire: ${proj.title}`
                            }));
                          }}
                          className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs tracking-widest uppercase rounded-lg transition-all duration-300 shadow-lg cursor-pointer flex items-center gap-2"
                        >
                          <PhoneCall className="w-3.5 h-3.5" /> Book Site Visit
                        </button>
                        <button 
                          className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-amber-500 hover:border-amber-500 transition-all cursor-pointer"
                          onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            alert("Link copied to clipboard!");
                          }}
                          title="Copy Property Link"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Full Premium Housing Gallery Component */}
                    <div className="pt-2">
                      <PremiumHousingGallery proj={proj} />
                    </div>
                  </div>

                  {/* 2. MIDDLE SECTION: Summary, Description, and Amenities */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6 border-t border-neutral-900/60">
                    {/* Left: Detailed Description & Amenities */}
                    <div className="lg:col-span-2 space-y-8">
                      <div className="space-y-4">
                        <h3 className="text-xl font-serif font-bold text-amber-500 border-b border-neutral-900 pb-2">
                          Project Description
                        </h3>
                        <p className="text-neutral-300 text-sm md:text-base font-light leading-relaxed whitespace-pre-line">
                          {proj.desc || 'No description available for this premium land development.'}
                          {"\n\n"}This exclusive property is certified by Parvat Reality. We guarantee completely clear legal titles, physical demarcations, and robust access facilities. It represents a premier opportunity to construct a bespoke private retreat, farmstead, or capture extraordinary strategic appreciation in highly active growth vectors.
                        </p>
                      </div>

                      {/* Amenities with Mini-Icons */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-serif font-bold text-amber-500 border-b border-neutral-900 pb-2">
                          Project Amenities
                        </h3>
                        {proj.amenities && proj.amenities.length > 0 ? (
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {proj.amenities.map((amenity: string) => {
                              const { Icon, bgClass, iconColor } = getAmenityDetails(amenity);
                              let descText = 'Premium physical feature';
                              let borderHover = 'hover:border-amber-500/20';
                              let iconBgHover = 'group-hover:bg-amber-500/10 group-hover:border-amber-500/30';
                              let dynamicTextColor = 'text-amber-500';

                              const lower = amenity.toLowerCase();
                              if (lower.includes('electricity') || lower.includes('power')) {
                                descText = 'High voltage grid ready';
                                borderHover = 'hover:border-amber-500/30';
                                iconBgHover = 'group-hover:bg-amber-500/10 group-hover:border-amber-500/30';
                                dynamicTextColor = 'text-amber-500';
                              } else if (lower.includes('water')) {
                                descText = 'Continuous source connectivity';
                                borderHover = 'hover:border-blue-500/30';
                                iconBgHover = 'group-hover:bg-blue-500/10 group-hover:border-blue-500/30';
                                dynamicTextColor = 'text-blue-400';
                              } else if (lower.includes('road') || lower.includes('access')) {
                                descText = 'Wide concrete access touch';
                                borderHover = 'hover:border-emerald-500/30';
                                iconBgHover = 'group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30';
                                dynamicTextColor = 'text-emerald-400';
                              } else if (lower.includes('fencing') || lower.includes('shield') || lower.includes('security')) {
                                descText = 'Complete boundary protection';
                                borderHover = 'hover:border-indigo-500/30';
                                iconBgHover = 'group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30';
                                dynamicTextColor = 'text-indigo-400';
                              } else {
                                borderHover = 'hover:border-slate-500/30';
                                iconBgHover = 'group-hover:bg-slate-500/10 group-hover:border-slate-500/30';
                                dynamicTextColor = 'text-slate-400';
                              }

                              return (
                                <div 
                                  key={amenity}
                                  className={`p-4 bg-neutral-900/40 border border-neutral-900 rounded-xl space-y-2.5 transition-all duration-300 group ${borderHover}`}
                                >
                                  <div className={`w-10 h-10 rounded-lg bg-neutral-950 flex items-center justify-center border border-neutral-850 transition-colors ${iconBgHover}`}>
                                    <Icon className={`w-5 h-5 ${dynamicTextColor}`} />
                                  </div>
                                  <div>
                                    <div className="text-xs font-bold text-white tracking-wider uppercase font-mono">{amenity}</div>
                                    <div className="text-[10px] text-neutral-500 mt-0.5">{descText}</div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="text-neutral-500 text-xs italic">No specific amenities are registered yet for this land asset. Inquire for customized infrastructure options.</p>
                        )}
                      </div>
                    </div>

                    {/* Right Side: Quick Enquiry Box Card */}
                    <div className="h-fit bg-neutral-900/60 border border-neutral-850 p-6 rounded-2xl space-y-6">
                      <div className="space-y-2">
                        <span className="text-amber-500 text-[10px] font-mono tracking-widest uppercase font-bold block">Assisted Purchase</span>
                        <h4 className="text-lg font-serif font-bold text-white">Instant Advisory Callback</h4>
                        <p className="text-neutral-400 text-xs leading-relaxed">Submit your contact info and our specialized regional manager will call you back with verified layout sheets within 15 minutes.</p>
                      </div>

                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          const target = e.currentTarget;
                          const nameInput = target.elements.namedItem('adv_name') as HTMLInputElement;
                          const phoneInput = target.elements.namedItem('adv_phone') as HTMLInputElement;
                          const nameVal = nameInput ? nameInput.value.trim() : '';
                          const phoneVal = phoneInput ? phoneInput.value.trim() : '';

                          if (!nameVal || !phoneVal) return;

                          try {
                            const existingLeadsStr = localStorage.getItem('parvat_leads');
                            const existingLeads = existingLeadsStr ? JSON.parse(existingLeadsStr) : [];
                            const newLead = {
                              id: 'lead_' + Date.now(),
                              name: nameVal,
                              phone: phoneVal,
                              email: 'N/A',
                              age: 'N/A',
                              gender: 'Enquiry',
                              interest: proj ? proj.title : 'General Land Asset',
                              leadSource: 'Property Page Callback',
                              date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                            };
                            existingLeads.unshift(newLead);
                            localStorage.setItem('parvat_leads', JSON.stringify(existingLeads));

                            // Save to Hostinger MySQL Database via backend API (api.php)
                            fetch('/api.php', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                name: nameVal,
                                phone: phoneVal,
                                details: `Source: Property Page Callback | Interest: ${proj ? proj.title : 'General Land Asset'}`
                              })
                            }).catch(err => console.error("Failed to post lead to backend database:", err));
                          } catch (err) {
                            console.error("Error saving property lead:", err);
                          }

                          alert("Success! A land coordinator has been assigned and will call you shortly.");
                          target.reset();
                        }}
                        className="space-y-4"
                      >
                        <div className="space-y-1.5">
                          <label className="block text-[9px] font-bold uppercase tracking-widest text-neutral-400">Full Name</label>
                          <input 
                            type="text" 
                            name="adv_name"
                            required 
                            placeholder="Your Name" 
                            className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white rounded-lg px-4 py-3 text-xs transition-all outline-none"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-[9px] font-bold uppercase tracking-widest text-neutral-400">Phone Number</label>
                          <input 
                            type="tel" 
                            name="adv_phone"
                            required 
                            pattern="\d{10}"
                            placeholder="e.g. 9922110001" 
                            className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white rounded-lg px-4 py-3 text-xs transition-all outline-none"
                          />
                        </div>
                        <button 
                          type="submit" 
                          className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs tracking-widest uppercase rounded-lg transition-colors duration-200 cursor-pointer"
                        >
                          Request Callback
                        </button>
                      </form>
                      <div className="pt-4 border-t border-neutral-850/60 text-center">
                        <span className="text-[10px] text-neutral-500 font-mono">ID: {proj.id} • Title verified</span>
                      </div>
                    </div>
                  </div>

                  {/* 3. BOTTOM SECTION: More Active Projects Recommendation */}
                  {recommendations.length > 0 && (
                    <div className="pt-12 border-t border-neutral-900/60 space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div className="space-y-1.5">
                          <span className="text-amber-500 text-[10px] font-mono tracking-widest uppercase font-bold block">Exclusive Collections</span>
                          <h3 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-wide">
                            More Active Projects
                          </h3>
                        </div>
                        <button 
                          onClick={() => navigateTo('projects')}
                          className="text-amber-500 text-xs font-mono font-bold tracking-wider uppercase hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          View Entire Catalog &rarr;
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {recommendations.map((rec: any) => (
                          <div 
                            key={rec.id}
                            onClick={() => navigateTo('property', rec.id)}
                            className="bg-neutral-900 border border-neutral-800 hover:border-amber-500/40 rounded-xl flex flex-col overflow-hidden hover:-translate-y-1 transition-all duration-300 cursor-pointer group shadow-lg"
                          >
                            <div className="relative h-40 w-full overflow-hidden">
                              <img src={rec.image} alt={rec.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-0.5 border border-neutral-800 rounded">
                                <span className="text-amber-500 font-mono text-[9px] uppercase font-bold">{rec.tag || 'Plot'}</span>
                              </div>
                            </div>
                            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                              <div className="space-y-1 text-left">
                                <div className="flex items-center gap-1 text-[10px] text-neutral-400 uppercase tracking-wider font-mono">
                                  <MapPin className="w-3 h-3 text-amber-500" />
                                  <span className="truncate">{rec.location}</span>
                                </div>
                                <h4 className="text-sm font-bold text-white group-hover:text-amber-500 transition-colors truncate">{rec.title}</h4>
                              </div>
                              <div className="flex justify-between items-center pt-2 border-t border-neutral-850">
                                <div className="text-left">
                                  <span className="text-[8px] text-neutral-500 uppercase tracking-widest block">Sizes</span>
                                  <span className="text-xs text-white font-medium">{rec.size}</span>
                                </div>
                                <div className="text-right">
                                  <span className="text-[8px] text-neutral-500 uppercase tracking-widest block">Price</span>
                                  <span className="text-xs text-amber-500 font-mono font-bold">{rec.price}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </section>
      )}

      {isCorporateSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 md:p-8 text-center space-y-6 animate-scaleIn">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 text-amber-500 rounded-full">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-serif font-bold text-white">Thank you! Our team will contact you shortly.</h3>
              <p className="text-neutral-400 text-sm font-light leading-relaxed">
                Your reservation profile has been received and verified. One of our Senior Portfolio Managers will contact you within the next 2 hours to share detailed land layouts, title documents, and pricing catalogs.
              </p>
            </div>
            <button 
              onClick={handleCorporateClose}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs tracking-wider uppercase rounded-lg transition-colors"
            >
              Close Window
            </button>
          </div>
        </div>
      )}

      {/* CORPORATE ROYAL BLUE FOOTER */}
      <footer className="premium-footer pt-20 pb-12 px-4 md:px-8 relative z-30">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Column 1: Company Profile & Core values + Social Media Icons */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-white text-xs font-bold tracking-[0.25em] block opacity-80">PREMIUM LANDS</span>
                <h4 className="text-xl font-serif font-extrabold text-white tracking-widest uppercase">
                  PARVAT REALITY
                </h4>
                <p className="text-white/70 text-[10px] uppercase font-mono tracking-widest mt-0.5">And Developers</p>
              </div>
              
              <p className="text-white/90 text-xs font-light leading-relaxed">
                Parvat Reality and Developers is a premier land consolidation and plotted development brand. Over 18 years, we have delivered secure, legally vetted, clear-title agricultural and NA acreage.
              </p>

              {/* White Social Media Icons right under the logo block */}
              <div className="pt-4 border-t border-white/20 space-y-2.5">
                <h5 className="text-[10px] font-bold text-white uppercase tracking-wider opacity-90">
                  Connect with us
                </h5>
                <div className="flex gap-3">
                  <a href="#" className="social-icon-btn w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300" title="LinkedIn" aria-label="LinkedIn">
                    <Linkedin className="w-4 h-4 text-white" />
                  </a>
                  <a 
                    href="https://www.facebook.com/share/1DqihkWgEj/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="social-icon-btn w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300" 
                    title="Facebook" 
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4 text-white" />
                  </a>
                  <a href="#" className="social-icon-btn w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300" title="Instagram" aria-label="Instagram">
                    <Instagram className="w-4 h-4 text-white" />
                  </a>
                  <a href="#" className="social-icon-btn w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300" title="Twitter/X" aria-label="Twitter/X">
                    <Twitter className="w-4 h-4 text-white" />
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Directory Navigation */}
            <div className="space-y-6">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/20 pb-3">
                Quick Directory
              </h4>
              <ul className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs font-light">
                <li>
                  <a href="index.html" className="text-white/90 hover:text-white transition-colors flex items-center gap-1.5">
                    <span>&bull;</span> Home Page
                  </a>
                </li>
                <li>
                  <a href="projects.html" className="text-white/90 hover:text-white transition-colors flex items-center gap-1.5">
                    <span>&bull;</span> Projects
                  </a>
                </li>
                <li>
                  <a href="news.html" className="text-white/90 hover:text-white transition-colors flex items-center gap-1.5">
                    <span>&bull;</span> News &amp; Media
                  </a>
                </li>
                <li>
                  <a href="about.html" className="text-white/90 hover:text-white transition-colors flex items-center gap-1.5">
                    <span>&bull;</span> About Us
                  </a>
                </li>
                <li>
                  <a href="journey.html" className="text-white/90 hover:text-white transition-colors flex items-center gap-1.5">
                    <span>&bull;</span> Our Journey
                  </a>
                </li>
                <li>
                  <a href="contact.html" className="text-white/90 hover:text-white transition-colors flex items-center gap-1.5">
                    <span>&bull;</span> Contact Desk
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Corporate Awards & Accreditation */}
            <div className="space-y-6">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/20 pb-3">
                Awards &amp; Accolades
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-7 h-7 rounded bg-white/10 text-white flex items-center justify-center flex-shrink-0">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">Best Land Developer 2025</h5>
                    <p className="text-[10px] text-white/80 font-light mt-0.5">Awarded at the West India Real Estate Summit</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-7 h-7 rounded bg-white/10 text-white flex items-center justify-center flex-shrink-0">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">Transparency Excellence</h5>
                    <p className="text-[10px] text-white/80 font-light mt-0.5">ISO 9001:2015 Premium Quality Systems Certified</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 4: Headquarters Contact Desk */}
            <div className="space-y-6">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/20 pb-3">
                Headquarters Office
              </h4>
              <p className="text-white/90 text-xs font-light leading-relaxed">
                Office no. 507, A wing Krukeja Plaza,<br />
                Plot No 45, 46 And 55, Sector 11,<br />
                CBD Belapur, Navi Mumbai, Maharashtra 400614
              </p>
              <div className="space-y-2.5 text-xs font-mono pt-2">
                <a href="tel:+918591668166" className="flex items-center gap-2 text-white/90 hover:text-white transition-all duration-300">
                  <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>+91 85916 68166</span>
                </a>
                <a href="tel:+918591818166" className="flex items-center gap-2 text-white/90 hover:text-white transition-all duration-300">
                  <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>+91 85918 18166</span>
                </a>
                <a href="mailto:Info.parvatreality@gmail.com" className="flex items-center gap-2 text-white/90 hover:text-white transition-all duration-300 pt-1">
                  <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Info.parvatreality@gmail.com</span>
                </a>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/70">
            <p>&copy; 2026 Parvat Reality &amp; Developers. All rights reserved across global territories.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Charter</a>
              <a href="#" className="hover:text-white transition-colors">Legal Disclaimers</a>
              <a href="#" className="hover:text-white transition-colors">Digital Site Terms</a>
            </div>
          </div>

        </div>
      </footer>

      {/* PERSISTENT FLOATING WHATSAPP CHAT WIDGET */}
      <a 
        href="https://wa.me/918591668166"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full shadow-[0_4px_20px_rgba(16,185,129,0.4)] transition-all duration-300 hover:scale-110 group cursor-pointer"
        aria-label="Chat with us on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-45 group-hover:opacity-0 transition-opacity" />
        <svg 
          className="w-7 h-7 relative z-10 fill-current" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* PREMIUM ENQUIRE MODAL OVERLAY */}
      {isEnquireOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 animate-scaleIn scrollbar-none">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsEnquireOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="py-8 sm:py-12 text-center space-y-3 sm:space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-amber-500/10 text-amber-500 rounded-full mb-1 sm:mb-2">
                  <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce" />
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">Inquiry Received Successfully</h3>
                <p className="text-neutral-400 text-xs sm:text-sm font-light max-w-sm mx-auto">
                  Our Relationship Executive will get in touch with you shortly on your phone/email to share the layout plans and prices.
                </p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-5">
                <div>
                  <h3 className="text-lg sm:text-2xl font-serif font-bold text-white">Enquire About Premium Land</h3>
                  <p className="text-neutral-400 text-[11px] sm:text-sm font-light mt-0.5 sm:mt-1">
                    Complete this brief request form and secure early launch-pricing invites.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1 sm:mb-1.5">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe" 
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white rounded px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm transition-colors outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1 sm:mb-1.5">
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. user@example.com" 
                        className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white rounded px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm transition-colors outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1 sm:mb-1.5">
                        Phone Number
                      </label>
                      <input 
                        type="tel" 
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. +91 98765 43210" 
                        className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white rounded px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm transition-colors outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1 sm:mb-1.5">
                      Preferred Plot Type
                    </label>
                    <select 
                      name="plotType"
                      value={formData.plotType}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white rounded px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm transition-colors outline-none cursor-pointer"
                    >
                      <option value="Residential">Residential Estate Plots</option>
                      <option value="Agricultural">Premium Agricultural Acres</option>
                      <option value="Commercial">High-Growth Commercial Parcels</option>
                      <option value="Mountain">High-Elevation Mountain Views</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1 sm:mb-1.5">
                      Your Message / Preferred Location
                    </label>
                    <textarea 
                      name="message"
                      rows={2}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Share your specific size preferences, budget, or timeline..." 
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white rounded px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm transition-colors outline-none resize-none"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold py-2.5 sm:py-3.5 px-3 sm:px-4 rounded text-[10px] sm:text-xs md:text-sm tracking-widest uppercase transition-colors duration-200 mt-2 cursor-pointer"
                  >
                    Submit Enquiry / Reservation Request
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
      )}

      {/* APPOINTMENT MODAL OVERLAY */}
      {isAppointmentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-md">
          <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 animate-scaleIn scrollbar-none">
            
            {/* Close Button */}
            <button 
              onClick={handleAppointmentClose}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {isAppointmentSuccess ? (
              <div className="py-6 sm:py-8 text-center space-y-3 sm:space-y-4 animate-scaleIn">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-amber-500/10 text-amber-500 rounded-full mb-1 sm:mb-2">
                  <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce" />
                </div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-white">Thank you! Our team will contact you shortly.</h3>
                <p className="text-neutral-400 text-xs sm:text-sm font-light max-w-xs mx-auto">
                  Your appointment booking slot has been secured. Our support desk will reach out to confirm your date &amp; transportation arrangements.
                </p>
                <button 
                  onClick={handleAppointmentClose}
                  className="mt-3 sm:mt-4 px-5 py-2 sm:px-6 sm:py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-[10px] sm:text-xs tracking-wider uppercase rounded transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-5">
                <div>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white">Book Private Consultation</h3>
                  <p className="text-neutral-400 text-[11px] sm:text-xs font-light mt-0.5 sm:mt-1">
                    Please provide your contact information to reserve a slot.
                  </p>
                </div>

                <form onSubmit={handleAppointmentSubmit} className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1 sm:mb-1.5">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      required
                      value={appointmentForm.name}
                      onChange={(e) => setAppointmentForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. John Doe" 
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white rounded px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm transition-colors outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1 sm:mb-1.5">
                      Mobile Number
                    </label>
                    <input 
                      type="text" 
                      required
                      maxLength={10}
                      pattern="\d{10}"
                      value={appointmentForm.mobile}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        setAppointmentForm(prev => ({ ...prev, mobile: val }));
                      }}
                      placeholder="e.g. 9876543210" 
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white rounded px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm transition-colors outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1 sm:mb-1.5">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      required
                      value={appointmentForm.email}
                      onChange={(e) => setAppointmentForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="e.g. name@example.com" 
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white rounded px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm transition-colors outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1 sm:mb-1.5">
                      Interested In
                    </label>
                    <select 
                      required
                      value={appointmentForm.interest}
                      onChange={(e) => setAppointmentForm(prev => ({ ...prev, interest: e.target.value }))}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white rounded px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm transition-colors outline-none cursor-pointer"
                    >
                      <option value="Buy Farmhouse Land">Buy Farmhouse Land</option>
                      <option value="Buy NA / Commercial Plot">Buy NA / Commercial Plot</option>
                      <option value="Long-term Investment">Long-term Investment</option>
                      <option value="Request Site Visit">Request Site Visit</option>
                    </select>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold py-2.5 sm:py-3.5 px-3 sm:px-4 rounded text-[10px] sm:text-xs md:text-sm tracking-widest uppercase transition-colors duration-200 mt-2 cursor-pointer"
                  >
                    Submit Enquiry / Reservation Request
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
      )}

      {/* CALL NOW OVERLAY DIALOG */}
      {isCallOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 md:p-8 animate-scaleIn">
            
            {/* Close */}
            <button 
              onClick={() => setIsCallOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-amber-500">
                <PhoneCall className="w-6 h-6" />
                <h3 className="text-xl font-serif font-bold text-white">Direct Sales Desk</h3>
              </div>
              <p className="text-neutral-400 text-xs font-light leading-relaxed">
                Connect directly with our relationship manager for rapid query resolution and verified site plans.
              </p>

              <div className="space-y-4">
                <a 
                  href="tel:+918591668166"
                  className="flex items-center justify-between p-4 rounded-xl bg-neutral-950 hover:bg-neutral-950/40 border border-neutral-800 hover:border-amber-500/40 transition-all duration-200 group"
                >
                  <div className="text-left">
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Official Sales Support</p>
                    <p className="text-sm font-semibold text-white mt-1">+91 85916 68166</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-amber-500/15 text-amber-500 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-neutral-950 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                </a>

                <a 
                  href="tel:+918591818166"
                  className="flex items-center justify-between p-4 rounded-xl bg-neutral-950 hover:bg-neutral-950/40 border border-neutral-800 hover:border-amber-500/40 transition-all duration-200 group"
                >
                  <div className="text-left">
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Official Sales Support 2</p>
                    <p className="text-sm font-semibold text-white mt-1">+91 85918 18166</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-amber-500/15 text-amber-500 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-neutral-950 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                </a>
              </div>

              <p className="text-[10px] text-center text-neutral-500 font-mono">
                24/7 Call Support
              </p>
            </div>

          </div>
        </div>
      )}

      {/* WHATSAPP US DIALOG */}
      {isWhatsAppOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 md:p-8 animate-scaleIn">
            
            {/* Close */}
            <button 
              onClick={() => setIsWhatsAppOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-emerald-500">
                <MessageSquare className="w-6 h-6" />
                <h3 className="text-xl font-serif font-bold text-white">Instant WhatsApp Help</h3>
              </div>
              <p className="text-neutral-400 text-xs font-light leading-relaxed">
                Receive premium property catalogs, site tour videos, and direct layouts in high resolution PDF formats.
              </p>

              <div className="space-y-3">
                <a 
                  href="https://wa.me/918591668166?text=Hello%20Parvat%20Reality%2C%20I%20am%20interested%20in%20premium%20land%20details."
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsWhatsAppOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-950 hover:bg-emerald-500/10 border border-neutral-800 hover:border-emerald-500/40 transition-all duration-200 text-left"
                >
                  <div>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">Inquire Layout Pricing</span>
                    <span className="text-neutral-400 text-xs font-light mt-0.5 block">Get immediate rate quotation cards</span>
                  </div>
                  <span className="text-xs font-bold text-neutral-500">&rarr;</span>
                </a>

                <a 
                  href="https://wa.me/918591668166?text=Hello%20Parvat%20Reality%2C%20please%20send%20me%20the%20legal%20documents%20and%207/12%20abstract."
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsWhatsAppOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-950 hover:bg-emerald-500/10 border border-neutral-800 hover:border-emerald-500/40 transition-all duration-200 text-left"
                >
                  <div>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">Request Legal Docs</span>
                    <span className="text-neutral-400 text-xs font-light mt-0.5 block">Download 7/12 land abstracts</span>
                  </div>
                  <span className="text-xs font-bold text-neutral-500">&rarr;</span>
                </a>
              </div>

              <div className="flex justify-center">
                <a 
                  href="https://wa.me/918591668166?text=Hello%20Parvat%20Reality%2C%20I%20would%20like%20to%20chat."
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsWhatsAppOpen(false)}
                  className="w-full text-center bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold py-3 px-4 rounded text-xs tracking-wider uppercase transition-colors"
                >
                  Open General Chat
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* PROMOTIONAL VIDEO DIALOG */}
      {promoVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/90 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden animate-scaleIn">
            
            {/* Close Button */}
            <button 
              onClick={() => setPromoVideoUrl(null)}
              className="absolute top-4 right-4 z-10 p-2 text-neutral-400 hover:text-white rounded-lg bg-neutral-950/40 hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-video w-full">
              <iframe
                src={getEmbedUrl(promoVideoUrl)}
                title="Promo Video"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
