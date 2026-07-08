import { 
  Code, 
  Smartphone, 
  Search, 
  Rocket, 
  Bot, 
  Headphones, 
  Layout, 
  Server, 
  Eye, 
  Wrench, 
  Zap, 
  Palette, 
  ShieldCheck, 
  Users, 
  MessageSquare, 
  PenTool, 
  Code2, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Phone, 
  Mail, 
  MapPin, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  Trophy, 
  Check, 
  Menu, 
  X,
  HelpCircle
} from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function Icon({ name, className = '', size }: IconProps) {
  // Map Remix Icon names to Lucide components
  const cleanName = name.replace('ri-', '').replace('-line', '').replace('-fill', '');
  
  // Custom sizing mapping if size is not provided
  const iconProps = size ? { size, className } : { className };

  switch (cleanName) {
    case 'code-box':
    case 'code-s-slash':
      return <Code {...iconProps} />;
    case 'smartphone':
      return <Smartphone {...iconProps} />;
    case 'search':
      return <Search {...iconProps} />;
    case 'rocket':
      return <Rocket {...iconProps} />;
    case 'robot':
    case 'robot-2':
      return <Bot {...iconProps} />;
    case 'customer-service-2':
      return <Headphones {...iconProps} />;
    case 'layout-masonry':
      return <Layout {...iconProps} />;
    case 'server':
      return <Server {...iconProps} />;
    case 'search-eye':
      return <Eye {...iconProps} />;
    case 'tools':
      return <Wrench {...iconProps} />;
    case 'flashlight':
      return <Zap {...iconProps} />;
    case 'palette':
      return <Palette {...iconProps} />;
    case 'shield-check':
      return <ShieldCheck {...iconProps} />;
    case 'team':
      return <Users {...iconProps} />;
    case 'message-3':
      return <MessageSquare {...iconProps} />;
    case 'pencil-ruler-2':
      return <PenTool {...iconProps} />;
    case 'facebook':
      return <Facebook {...iconProps} />;
    case 'twitter-x':
      return <Twitter {...iconProps} />;
    case 'linkedin':
      return <Linkedin {...iconProps} />;
    case 'instagram':
      return <Instagram {...iconProps} />;
    case 'phone':
      return <Phone {...iconProps} />;
    case 'mail':
      return <Mail {...iconProps} />;
    case 'map-pin':
      return <MapPin {...iconProps} />;
    case 'star':
      return <Star {...iconProps} />;
    case 'arrow-left-s':
      return <ChevronLeft {...iconProps} />;
    case 'arrow-right-s':
      return <ChevronRight {...iconProps} />;
    case 'verified-badge':
      return <CheckCircle {...iconProps} />;
    case 'trophy':
      return <Trophy {...iconProps} />;
    case 'check':
      return <Check {...iconProps} />;
    case 'menu':
      return <Menu {...iconProps} />;
    case 'close':
      return <X {...iconProps} />;
    default:
      return <HelpCircle {...iconProps} />;
  }
}
