export interface Service {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

export interface PricingPlan {
  icon: string;
  title: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  color: 'primary' | 'accent' | 'secondary';
  popular: boolean;
}

export interface PricingColorStyle {
  bg: string;
  border: string;
  text: string;
  hover: string;
  checkBg: string;
  checkText: string;
}

export interface ChooseFeature {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

export interface ProcessStep {
  icon: string;
  title: string;
  description: string;
  gradient: string;
  number: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}
