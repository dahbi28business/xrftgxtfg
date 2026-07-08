import { Service, PricingPlan, PricingColorStyle, ChooseFeature, ProcessStep, Testimonial } from './types';

export const services: Service[] = [
  {
    icon: "ri-code-box-line",
    title: "Website Design",
    description: "Custom, modern website designs that capture your brand essence and convert visitors into customers.",
    gradient: "from-primary-500 to-secondary-500"
  },
  {
    icon: "ri-smartphone-line",
    title: "Mobile Optimization",
    description: "Responsive designs that look perfect and function flawlessly on all devices and screen sizes.",
    gradient: "from-accent-500 to-accent-400"
  },
  {
    icon: "ri-search-line",
    title: "SEO Optimization",
    description: "Search engine optimization to help your website rank higher and attract more organic traffic.",
    gradient: "from-secondary-500 to-primary-500"
  },
  {
    icon: "ri-rocket-line",
    title: "Reviews",
    description: "Authentic client testimonials and automated review collection to boost your credibility and skyrocket your Google ranking.",
    gradient: "from-secondary-400 to-accent-500"
  },
  {
    icon: "ri-robot-line",
    title: "AI Chatbot",
    description: "Intelligent, 24/7 automated assistance to engage visitors instantly, answer questions, and capture leads while you sleep.",
    gradient: "from-accent-400 to-secondary-500"
  },
  {
    icon: "ri-customer-service-2-line",
    title: "24/7 Support",
    description: "Round-the-clock technical support and maintenance to keep your website running smoothly.",
    gradient: "from-primary-500 to-accent-400"
  }
];

export const pricingPlans: PricingPlan[] = [
  {
    icon: "ri-layout-masonry-line",
    title: "Web Design",
    description: "Custom-built, high-converting websites tailored to your brand",
    price: "Starting at $497",
    period: "per project",
    features: [
      "Custom UI/UX design",
      "Responsive on all devices",
      "SEO-optimized structure",
      "Up to 5 pages included",
      "2 revision rounds",
      "Launch support included"
    ],
    cta: "Get a Quote",
    color: "primary",
    popular: false
  },
  {
    icon: "ri-server-line",
    title: "Hosting",
    description: "Ultra-fast, secure, and reliable server hosting with 99.9% uptime",
    price: "$37",
    period: "/month",
    features: [
      "SSD NVMe storage",
      "Free SSL certificate",
      "Daily automated backups",
      "99.9% uptime guarantee",
      "CDN included worldwide",
      "24/7 server monitoring"
    ],
    cta: "Start Hosting",
    color: "accent",
    popular: false
  },
  {
    icon: "ri-search-eye-line",
    title: "Reviews",
    description: "Boost your local SEO to rank higher on Google and be the first that pops up",
    price: "$197",
    period: "/month",
    features: [
      "Google Business optimization",
      "Review generation strategy",
      "Local citation building",
      "Monthly ranking reports",
      "Competitor analysis included",
      "Dedicated SEO specialist"
    ],
    cta: "Boost Rankings",
    color: "secondary",
    popular: true
  },
  {
    icon: "ri-robot-2-line",
    title: "AI Chatbot",
    description: "24/7 automated customer support to capture and convert leads instantly",
    price: "$397",
    period: "/month",
    features: [
      "Custom AI training",
      "Lead capture automation",
      "Multi-language support",
      "CRM integration ready",
      "Analytics dashboard",
      "Unlimited conversations"
    ],
    cta: "Try AI Chatbot",
    color: "primary",
    popular: false
  },
  {
    icon: "ri-tools-line",
    title: "Maintenance",
    description: "Regular updates, security patches, and hands-on technical support",
    price: "$0",
    period: "/month",
    features: [
      "Weekly plugin updates",
      "Security vulnerability scans",
      "Uptime monitoring 24/7",
      "Content updates included",
      "Monthly backup & restore",
      "Priority support queue"
    ],
    cta: "Get Maintenance",
    color: "accent",
    popular: false
  }
];

export const pricingColors: Record<'primary' | 'accent' | 'secondary', PricingColorStyle> = {
  primary: {
    bg: "from-primary-500 to-primary-600",
    border: "border-primary-300",
    text: "text-primary-700",
    hover: "from-primary-500 to-primary-600",
    checkBg: "bg-primary-100",
    checkText: "text-primary-700"
  },
  accent: {
    bg: "from-accent-500 to-accent-600",
    border: "border-accent-300",
    text: "text-accent-700",
    hover: "from-accent-500 to-accent-600",
    checkBg: "bg-accent-100",
    checkText: "text-accent-700"
  },
  secondary: {
    bg: "from-secondary-500 to-secondary-600",
    border: "border-secondary-300",
    text: "text-secondary-700",
    hover: "from-secondary-500 to-secondary-600",
    checkBg: "bg-secondary-100",
    checkText: "text-secondary-700"
  }
};

export const chooseFeatures: ChooseFeature[] = [
  {
    icon: "ri-flashlight-line",
    title: "Lightning Fast Performance",
    description: "Optimized for speed with load times under 3 seconds, ensuring better user experience and SEO rankings.",
    gradient: "from-primary-500 to-secondary-500"
  },
  {
    icon: "ri-palette-line",
    title: "Custom Design Solutions",
    description: "Tailored designs that perfectly match your brand identity and business goals, not generic templates.",
    gradient: "from-accent-500 to-accent-400"
  },
  {
    icon: "ri-shield-check-line",
    title: "Enterprise-Grade Security",
    description: "SSL certificates, regular security updates, and robust hosting infrastructure to protect your business.",
    gradient: "from-secondary-500 to-primary-500"
  },
  {
    icon: "ri-team-line",
    title: "Expert Team Support",
    description: "Dedicated team of designers, developers, and marketing specialists working on your success.",
    gradient: "from-secondary-400 to-accent-500"
  }
];

export const processSteps: ProcessStep[] = [
  {
    icon: "ri-message-3-line",
    title: "Discovery Call",
    description: "We discuss your business goals, target audience, and design preferences to create the perfect strategy.",
    gradient: "from-primary-500 to-secondary-500",
    number: "1"
  },
  {
    icon: "ri-pencil-ruler-2-line",
    title: "Design & Planning",
    description: "Our team creates wireframes and mockups, ensuring every element aligns with your brand and objectives.",
    gradient: "from-accent-500 to-accent-400",
    number: "2"
  },
  {
    icon: "ri-code-s-slash-line",
    title: "Development",
    description: "We build your website using the latest technologies, ensuring it's fast, secure, and mobile-responsive.",
    gradient: "from-secondary-500 to-primary-500",
    number: "3"
  },
  {
    icon: "ri-rocket-line",
    title: "Launch & Support",
    description: "We launch your website and provide ongoing support, analytics, and optimization to ensure success.",
    gradient: "from-secondary-400 to-accent-500",
    number: "4"
  }
];

export const testimonials: Testimonial[] = [
  {
    quote: "Our conversion rate jumped by 340% in the first two months. The landing page they built for us didn't just look stunning — it genuinely turned visitors into customers. Absolutely worth every penny.",
    name: "Sarah Mitchell",
    role: "CEO, GreenLeaf Organic",
    avatar: "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20confident%20female%20business%20executive%20in%20her%2030s%20with%20warm%20smile%2C%20natural%20lighting%2C%20clean%20neutral%20background%2C%20high%20quality%20portrait%20photography&width=200&height=200&seq=testimonial-avatar-01&orientation=squarish"
  },
  {
    quote: "I've worked with five different agencies before, and this is the first team that truly delivered on time with zero compromises on quality. The site is fast, mobile-perfect, and our leads tripled.",
    name: "David Chen",
    role: "Marketing Director, Apex Analytics",
    avatar: "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20an%20Asian%20male%20marketing%20director%20in%20his%2040s%20wearing%20a%20smart%20casual%20blazer%2C%20friendly%20expression%2C%20soft%20studio%20lighting%2C%20neutral%20background%2C%20editorial%20portrait%20style&width=200&height=200&seq=testimonial-avatar-02&orientation=squarish"
  },
  {
    quote: "They nailed our brand identity from day one. The design process was collaborative, the communication was crystal clear, and the final result exceeded every expectation we had.",
    name: "Elena Rodriguez",
    role: "Founder, Bloom Interiors",
    avatar: "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20Latina%20female%20entrepreneur%20in%20her%2030s%20with%20creative%20style%2C%20warm%20genuine%20smile%2C%20soft%20natural%20light%2C%20minimal%20background%2C%20modern%20editorial%20portrait%20photography&width=200&height=200&seq=testimonial-avatar-03&orientation=squarish"
  }
];
