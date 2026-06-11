import { useEffect, useRef, useState } from "react";
import {
  styled,
  keyframes,
  Button,
  Icon,
  Accordion,
} from "@washingtonpost/wpds-ui-kit";
import Phone from "@washingtonpost/wpds-assets/asset/phone";
import Check from "@washingtonpost/wpds-assets/asset/check";
import StarFull from "@washingtonpost/wpds-assets/asset/star-full";
import Menu from "@washingtonpost/wpds-assets/asset/menu";
import Close from "@washingtonpost/wpds-assets/asset/close";

// ── Animations ───────────────────────────────────────────────────────

const fadeUp = keyframes({
  from: { opacity: 0, transform: "translateY(40px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const slideRight = keyframes({
  from: { opacity: 0, transform: "translateX(-40px)" },
  to: { opacity: 1, transform: "translateX(0)" },
});

const slideLeft = keyframes({
  from: { opacity: 0, transform: "translateX(40px)" },
  to: { opacity: 1, transform: "translateX(0)" },
});

const flicker = keyframes({
  "0%, 100%": { opacity: 1 },
  "50%": { opacity: 0.82 },
});

const scaleIn = keyframes({
  from: { opacity: 0, transform: "scale(0.92)" },
  to: { opacity: 1, transform: "scale(1)" },
});

// ── Scroll-reveal hook ────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ── Layout ────────────────────────────────────────────────────────────

const SiteWrapper = styled("div", {
  fontFamily: "$meta",
  backgroundColor: "$background",
  color: "$primary",
  overflowX: "hidden",
});

// ── Navbar ────────────────────────────────────────────────────────────

const NavBar = styled("header", {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: "$shell",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  px: "$200",
  height: "64px",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  transition: "background 0.3s ease, box-shadow 0.3s ease",
  "@sm": { px: "$100" },
  variants: {
    scrolled: {
      true: {
        backgroundColor: "rgba(255,255,255,0.93)",
        boxShadow: "$300",
      },
      false: {
        backgroundColor: "transparent",
      },
    },
  },
});

const LogoText = styled("a", {
  fontFamily: "$headline",
  fontWeight: "$bold",
  fontSize: "$175",
  textDecoration: "none",
  letterSpacing: "-0.02em",
  transition: "color 0.3s ease",
  variants: {
    light: {
      true: { color: "#ffffff" },
      false: { color: "$primary" },
    },
  },
});

const DesktopNav = styled("nav", {
  display: "flex",
  gap: "$150",
  alignItems: "center",
  "@sm": { display: "none" },
  "@md": { display: "none" },
});

const NavLink = styled("a", {
  fontFamily: "$meta",
  fontWeight: "$regular",
  fontSize: "$087",
  textDecoration: "none",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  transition: "color 0.2s ease",
  "&:hover": { color: "$cta" },
  variants: {
    light: {
      true: { color: "rgba(255,255,255,0.85)", "&:hover": { color: "#ffffff" } },
      false: { color: "$primary" },
    },
  },
});

const HamburgerBtn = styled("button", {
  display: "none",
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: "$050",
  alignItems: "center",
  justifyContent: "center",
  "@sm": { display: "flex" },
  "@md": { display: "flex" },
});

const MobileOverlay = styled("div", {
  position: "fixed",
  inset: 0,
  zIndex: "$offer",
  backgroundColor: "$background",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "$250",
  transform: "translateX(100%)",
  transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
  variants: {
    open: {
      true: { transform: "translateX(0)" },
    },
  },
});

const MobileLink = styled("a", {
  fontFamily: "$headline",
  fontSize: "$250",
  fontWeight: "$bold",
  color: "$primary",
  textDecoration: "none",
  "&:hover": { color: "$cta" },
  "@sm": { fontSize: "$200" },
});

// ── Hero ──────────────────────────────────────────────────────────────

const HeroSection = styled("section", {
  position: "relative",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
});

const HeroBg = styled("div", {
  position: "absolute",
  inset: 0,
  backgroundImage: "url(/hero-chimney.webp)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(135deg, rgba(8,12,22,0.85) 0%, rgba(8,12,22,0.58) 60%, rgba(8,12,22,0.38) 100%)",
  },
});

const HeroContent = styled("div", {
  position: "relative",
  zIndex: 1,
  maxWidth: "780px",
  px: "$200",
  textAlign: "center",
  "@sm": { px: "$100" },
});

const Eyebrow = styled("p", {
  fontFamily: "$meta",
  fontWeight: "$bold",
  fontSize: "$075",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#f97316",
  marginBottom: "$100",
  animation: `${fadeIn} 0.8s ease 0.2s both`,
});

const HeroH1 = styled("h1", {
  fontFamily: "$headline",
  fontWeight: "$bold",
  fontSize: "$400",
  lineHeight: "$headline",
  color: "#ffffff",
  marginBottom: "$100",
  animation: `${fadeUp} 0.9s ease 0.3s both`,
  "@sm": { fontSize: "$250" },
  "@md": { fontSize: "$300" },
});

const HeroSub = styled("p", {
  fontFamily: "$subhead",
  fontWeight: "$regular",
  fontSize: "$125",
  lineHeight: "$body",
  color: "rgba(255,255,255,0.82)",
  marginBottom: "$200",
  animation: `${fadeUp} 0.9s ease 0.5s both`,
  "@sm": { fontSize: "$100" },
});

const HeroCtas = styled("div", {
  display: "flex",
  gap: "$100",
  justifyContent: "center",
  flexWrap: "wrap",
  animation: `${fadeUp} 0.9s ease 0.7s both`,
});

const FlameSpan = styled("span", {
  display: "inline-block",
  animation: `${flicker} 2.8s ease-in-out infinite`,
});

const ScrollIndicator = styled("div", {
  position: "absolute",
  bottom: "$150",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 1,
  animation: `${fadeIn} 1s ease 1.5s both`,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "$050",
});

const ScrollLine = styled("div", {
  width: "1px",
  height: "48px",
  background: "linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)",
});

// ── Trust Bar ─────────────────────────────────────────────────────────

const TrustBar = styled("div", {
  backgroundColor: "#0f172a",
  py: "$100",
  px: "$200",
  display: "flex",
  justifyContent: "center",
  gap: "$300",
  flexWrap: "wrap",
  "@sm": { gap: "$150", px: "$100" },
});

const TrustItem = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$075",
  color: "rgba(255,255,255,0.75)",
  fontFamily: "$meta",
  fontSize: "$087",
  fontWeight: "$bold",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
});

const Pip = styled("span", {
  display: "inline-block",
  width: "6px",
  height: "6px",
  borderRadius: "$round",
  backgroundColor: "#f97316",
  flexShrink: 0,
});

// ── Section shell ─────────────────────────────────────────────────────

const SectionInner = styled("div", {
  maxWidth: "1200px",
  mx: "auto",
  px: "$200",
  py: "$500",
  "@sm": { px: "$100", py: "$300" },
});

const SectionLabel = styled("p", {
  fontFamily: "$meta",
  fontWeight: "$bold",
  fontSize: "$075",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#f97316",
  marginBottom: "$075",
});

const SectionH2 = styled("h2", {
  fontFamily: "$headline",
  fontWeight: "$bold",
  lineHeight: "$headline",
  color: "$primary",
  marginBottom: "$100",
  variants: {
    size: {
      lg: { fontSize: "$300", "@sm": { fontSize: "$200" } },
      md: { fontSize: "$250", "@sm": { fontSize: "$175" } },
    },
  },
  defaultVariants: { size: "lg" },
});

const SectionLead = styled("p", {
  fontFamily: "$body",
  fontSize: "$112",
  lineHeight: "$body",
  color: "$onBackground-subtle",
  maxWidth: "580px",
  "@sm": { fontSize: "$100" },
});

// ── Services grid ─────────────────────────────────────────────────────

const ServicesGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "$150",
  marginTop: "$300",
  "@sm": { gridTemplateColumns: "1fr" },
  "@md": { gridTemplateColumns: "1fr" },
});

const ServiceCard = styled("article", {
  borderRadius: "$075",
  border: "1px solid $outline",
  backgroundColor: "$surface",
  overflow: "hidden",
  transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s ease",
  "&:hover": { transform: "translateY(-6px)", boxShadow: "$400" },
  "&:hover .svc-img": { transform: "scale(1.05)" },
});

const SvcImg = styled("div", {
  height: "240px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)",
  "@sm": { height: "180px" },
});

const SvcBody = styled("div", {
  padding: "$200",
  "@sm": { padding: "$150" },
});

const SvcTag = styled("span", {
  fontFamily: "$meta",
  fontSize: "$075",
  fontWeight: "$bold",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#f97316",
  display: "block",
  marginBottom: "$075",
});

const SvcH3 = styled("h3", {
  fontFamily: "$headline",
  fontWeight: "$bold",
  fontSize: "$175",
  lineHeight: "$headline",
  color: "$primary",
  marginBottom: "$075",
});

const SvcText = styled("p", {
  fontFamily: "$body",
  fontSize: "$100",
  lineHeight: "$body",
  color: "$onBackground-subtle",
  marginBottom: "$150",
});

const FeatureList = styled("ul", {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "$050",
});

const FeatureItem = styled("li", {
  display: "flex",
  alignItems: "center",
  gap: "$075",
  fontFamily: "$meta",
  fontSize: "$087",
  color: "$primary",
});

// ── Why us ────────────────────────────────────────────────────────────

const DarkBand = styled("section", {
  background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
});

const WhyGrid = styled("div", {
  maxWidth: "1200px",
  mx: "auto",
  px: "$200",
  py: "$500",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "$400",
  alignItems: "center",
  "@sm": { gridTemplateColumns: "1fr", px: "$100", py: "$300", gap: "$200" },
  "@md": { gridTemplateColumns: "1fr", gap: "$200" },
});

const WhyPhoto = styled("div", {
  borderRadius: "$075",
  overflow: "hidden",
  height: "500px",
  backgroundImage: "url(/about-team.webp)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative",
  flexShrink: 0,
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: "$075",
    border: "3px solid rgba(249,115,22,0.4)",
  },
  "@sm": { height: "260px" },
});

const WhyItems = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$150",
});

const WhyRow = styled("div", {
  display: "flex",
  gap: "$100",
  alignItems: "flex-start",
});

const WhyIconBox = styled("div", {
  flexShrink: 0,
  width: "44px",
  height: "44px",
  borderRadius: "$050",
  backgroundColor: "rgba(249,115,22,0.14)",
  border: "1px solid rgba(249,115,22,0.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#f97316",
});

const WhyTitle = styled("h4", {
  fontFamily: "$headline",
  fontWeight: "$bold",
  fontSize: "$125",
  color: "#ffffff",
  marginBottom: "$025",
});

const WhyText = styled("p", {
  fontFamily: "$body",
  fontSize: "$087",
  lineHeight: "$body",
  color: "rgba(255,255,255,0.62)",
});

// ── Process ───────────────────────────────────────────────────────────

const ProcessGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "$150",
  marginTop: "$300",
  "@sm": { gridTemplateColumns: "1fr" },
  "@md": { gridTemplateColumns: "repeat(2,1fr)" },
});

const StepWrap = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$100",
});

const StepNum = styled("div", {
  width: "52px",
  height: "52px",
  borderRadius: "$round",
  border: "2px solid #f97316",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "$headline",
  fontWeight: "$bold",
  fontSize: "$150",
  color: "#f97316",
  flexShrink: 0,
});

const StepTitle = styled("h4", {
  fontFamily: "$headline",
  fontWeight: "$bold",
  fontSize: "$125",
  color: "$primary",
});

const StepText = styled("p", {
  fontFamily: "$body",
  fontSize: "$087",
  lineHeight: "$body",
  color: "$onBackground-subtle",
});

// ── Testimonials ──────────────────────────────────────────────────────

const LightBand = styled("section", {
  backgroundColor: "$surface",
});

const TestGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "$150",
  marginTop: "$300",
  "@sm": { gridTemplateColumns: "1fr" },
  "@md": { gridTemplateColumns: "1fr" },
});

const TestCard = styled("div", {
  backgroundColor: "$background",
  borderRadius: "$075",
  padding: "$200",
  border: "1px solid $outline",
  display: "flex",
  flexDirection: "column",
  gap: "$100",
  transition: "box-shadow 0.3s ease, transform 0.3s ease",
  "&:hover": { boxShadow: "$300", transform: "translateY(-3px)" },
});

const StarRow = styled("div", {
  display: "flex",
  gap: "$025",
  color: "#f97316",
});

const TestQuote = styled("blockquote", {
  fontFamily: "$body",
  fontSize: "$100",
  lineHeight: "$body",
  color: "$primary",
  fontStyle: "italic",
  margin: 0,
});

const TestAuthor = styled("p", {
  fontFamily: "$meta",
  fontWeight: "$bold",
  fontSize: "$075",
  color: "$onBackground-subtle",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
});

// ── FAQ ───────────────────────────────────────────────────────────────

const FaqWrap = styled("div", {
  maxWidth: "760px",
  mx: "auto",
  px: "$200",
  py: "$500",
  "@sm": { px: "$100", py: "$300" },
});

// ── CTA Banner ────────────────────────────────────────────────────────

const CtaBand = styled("section", {
  background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
  py: "$400",
  px: "$200",
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    backgroundImage:
      "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(0,0,0,0.07) 0%, transparent 60%)",
  },
  "@sm": { py: "$300", px: "$100" },
});

const CtaH2 = styled("h2", {
  fontFamily: "$headline",
  fontWeight: "$bold",
  fontSize: "$300",
  color: "#ffffff",
  marginBottom: "$075",
  position: "relative",
  "@sm": { fontSize: "$200" },
});

const CtaSub = styled("p", {
  fontFamily: "$body",
  fontSize: "$125",
  color: "rgba(255,255,255,0.88)",
  marginBottom: "$200",
  position: "relative",
  "@sm": { fontSize: "$100" },
});

const CtaRow = styled("div", {
  display: "flex",
  gap: "$100",
  justifyContent: "center",
  flexWrap: "wrap",
  position: "relative",
});

// ── Footer ────────────────────────────────────────────────────────────

const FooterWrap = styled("footer", {
  backgroundColor: "#0f172a",
  py: "$400",
  px: "$200",
  "@sm": { px: "$100" },
});

const FooterGrid = styled("div", {
  maxWidth: "1200px",
  mx: "auto",
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr",
  gap: "$300",
  "@sm": { gridTemplateColumns: "1fr", gap: "$200" },
  "@md": { gridTemplateColumns: "1fr 1fr", gap: "$200" },
});

const FooterLogo = styled("p", {
  fontFamily: "$headline",
  fontWeight: "$bold",
  fontSize: "$200",
  color: "#ffffff",
  marginBottom: "$075",
});

const FooterBlurb = styled("p", {
  fontFamily: "$body",
  fontSize: "$087",
  lineHeight: "$body",
  color: "rgba(255,255,255,0.5)",
  maxWidth: "280px",
});

const FooterColHead = styled("h5", {
  fontFamily: "$meta",
  fontWeight: "$bold",
  fontSize: "$075",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#f97316",
  marginBottom: "$100",
});

const FooterList = styled("ul", {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "$075",
});

const FooterA = styled("a", {
  fontFamily: "$meta",
  fontSize: "$087",
  color: "rgba(255,255,255,0.62)",
  textDecoration: "none",
  transition: "color 0.2s ease",
  "&:hover": { color: "#f97316" },
});

const FooterBottom = styled("div", {
  borderTop: "1px solid rgba(255,255,255,0.1)",
  marginTop: "$300",
  paddingTop: "$150",
  maxWidth: "1200px",
  mx: "auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "@sm": { flexDirection: "column", gap: "$075", textAlign: "center" },
});

const FooterSmall = styled("p", {
  fontFamily: "$meta",
  fontSize: "$075",
  color: "rgba(255,255,255,0.38)",
});

// ── Animate wrapper ────────────────────────────────────────────────────

const AnimateDiv = styled("div", {
  opacity: 0,
  variants: {
    visible: {
      true: {},
    },
    anim: {
      fadeUp: {},
      slideRight: {},
      slideLeft: {},
      scaleIn: {},
    },
  },
  compoundVariants: [
    { visible: "true", anim: "fadeUp", css: { animation: `${fadeUp} 0.8s ease forwards` } },
    { visible: "true", anim: "slideRight", css: { animation: `${slideRight} 0.8s ease forwards` } },
    { visible: "true", anim: "slideLeft", css: { animation: `${slideLeft} 0.8s ease forwards` } },
    { visible: "true", anim: "scaleIn", css: { animation: `${scaleIn} 0.8s ease forwards` } },
  ],
});

function Animate({
  children,
  anim = "fadeUp",
  delay = 0,
}: {
  children: React.ReactNode;
  anim?: "fadeUp" | "slideRight" | "slideLeft" | "scaleIn";
  delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <AnimateDiv
      ref={ref}
      visible={inView ? "true" : undefined}
      anim={anim}
      css={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </AnimateDiv>
  );
}

// ── Data ──────────────────────────────────────────────────────────────

const services = [
  {
    tag: "Chimney",
    title: "Chimney Service & Sweep",
    desc: "Professional chimney sweeping and annual servicing to keep your flue clear, safe, and efficient. We remove soot, debris, and blockages with minimal mess.",
    image: "/hero-chimney.webp",
    features: ["Annual sweep & inspection", "Certificate of service", "Flue condition report", "Bird guard fitting"],
  },
  {
    tag: "Chimney",
    title: "Chimney Repair & Repointing",
    desc: "From cracked flaunching to crumbling mortar joints, our skilled masons restore your chimney stack to full structural integrity.",
    image: "/chimney-repair.webp",
    features: ["Repointing & flaunching", "Pot replacement", "Flashing repair", "Cowl installation"],
  },
  {
    tag: "Gas Hob",
    title: "Gas Hob Service",
    desc: "Comprehensive gas hob servicing including burner cleaning, ignition testing, and safety checks to keep your cooker performing like new.",
    image: "/gas-hob-service.webp",
    features: ["Full burner clean", "Gas pressure check", "Ignition system test", "Safety certificate"],
  },
  {
    tag: "Gas Hob",
    title: "Gas Hob Repair",
    desc: "Fast, reliable gas hob repairs by Gas Safe registered engineers. No ignition, uneven flames, or gas smell? We diagnose and fix it right.",
    image: "/gas-hob-service.webp",
    features: ["Same-day diagnosis", "Gas Safe registered", "All brands covered", "Parts supplied & fitted"],
  },
];

const whyItems = [
  {
    title: "Gas Safe Registered",
    text: "All our engineers hold a current Gas Safe registration card, shown on arrival for every job.",
  },
  {
    title: "25+ Years Experience",
    text: "Decades of hands-on expertise means we've seen every problem and know exactly how to solve it.",
  },
  {
    title: "Same-Day Availability",
    text: "Flexible scheduling including same-day and weekend appointments to fit around your life.",
  },
  {
    title: "Guaranteed Work",
    text: "Every job comes with a written guarantee. If it isn't right, we come back and fix it free of charge.",
  },
];

const steps = [
  { num: "1", title: "Book Online", text: "Fill in our quick booking form or give us a call. We'll confirm your slot within the hour." },
  { num: "2", title: "Free Quote", text: "Our engineer assesses the job and provides a transparent, fixed-price quote — no surprises." },
  { num: "3", title: "Expert Service", text: "Fully qualified engineers carry out the work to the highest standard with minimal disruption." },
  { num: "4", title: "Certificate", text: "You receive a signed service certificate and full warranty on all parts and labour." },
];

const testimonials = [
  { text: "Booked Haffele for a chimney sweep and couldn't be happier. Arrived on time, covered everything with dust sheets, left immaculate. Highly recommend.", author: "James T., Homeowner" },
  { text: "Had my gas hob repaired in under two hours. The engineer was professional, explained everything clearly, and the price was exactly as quoted. Brilliant.", author: "Sarah M., Customer" },
  { text: "Used Haffele for an annual chimney service two years running. Consistent quality and great peace of mind knowing it's done properly.", author: "Robert H., Customer" },
];

const faqs = [
  { q: "How often should I have my chimney swept?", a: "For regular wood-burning fires, at least once a year — ideally before the winter season. For gas fires, every two years is recommended." },
  { q: "Are your engineers Gas Safe registered?", a: "Yes. Every one of our engineers holds a current Gas Safe registration card, which they'll show you on arrival. All gas work is legally required to be carried out by a registered engineer." },
  { q: "How long does a chimney sweep take?", a: "A standard chimney sweep takes between 45 minutes and 1.5 hours. We use specialist dust-control equipment so there's virtually no mess left behind." },
  { q: "My gas hob burner isn't lighting — repair or replacement?", a: "In most cases this is a simple repair — igniter electrode or spark module. We diagnose on the first visit and give you an honest recommendation." },
  { q: "Do you provide a certificate after the service?", a: "Yes. All chimney sweeps and gas hob services come with a printed certificate you can use for insurance purposes." },
];

// ── App ───────────────────────────────────────────────────────────────

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goto = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navItems = [
    { label: "Services", id: "services" },
    { label: "Why Us", id: "why-us" },
    { label: "Process", id: "process" },
    { label: "Reviews", id: "reviews" },
    { label: "FAQ", id: "faq" },
  ];

  return (
    <SiteWrapper>
      {/* ─ Navbar ─ */}
      <NavBar scrolled={scrolled ? "true" : "false"}>
        <LogoText href="#" light={!scrolled ? "true" : "false"}>
          Haffele
        </LogoText>
        <DesktopNav>
          {navItems.map((n) => (
            <NavLink
              key={n.id}
              href={`#${n.id}`}
              light={!scrolled ? "true" : "false"}
              onClick={(e: React.MouseEvent) => { e.preventDefault(); goto(n.id); }}
            >
              {n.label}
            </NavLink>
          ))}
        </DesktopNav>
        <DesktopNav>
          <Button variant="cta" density="compact" onClick={() => goto("contact")}>
            Book Now
          </Button>
        </DesktopNav>
        <HamburgerBtn onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          <Icon size="150" label={menuOpen ? "Close" : "Menu"}>
            {menuOpen ? <Close /> : <Menu />}
          </Icon>
        </HamburgerBtn>
      </NavBar>

      {/* ─ Mobile menu ─ */}
      <MobileOverlay open={menuOpen ? "true" : undefined} aria-hidden={!menuOpen}>
        {navItems.map((n) => (
          <MobileLink key={n.id} href={`#${n.id}`} onClick={(e: React.MouseEvent) => { e.preventDefault(); goto(n.id); }}>
            {n.label}
          </MobileLink>
        ))}
        <Button variant="cta" onClick={() => goto("contact")}>
          Book Now
        </Button>
      </MobileOverlay>

      {/* ─ Hero ─ */}
      <HeroSection id="home" aria-label="Welcome to Haffele">
        <HeroBg aria-hidden />
        <HeroContent>
          <Eyebrow>Chimney &amp; Gas Hob Specialists</Eyebrow>
          <HeroH1>
            Expert Care for <FlameSpan>Every</FlameSpan> Flame in Your Home
          </HeroH1>
          <HeroSub>
            Professional chimney sweeping, repair, and gas hob servicing by Gas Safe registered engineers. Safe, reliable, and always on time.
          </HeroSub>
          <HeroCtas>
            <Button
              variant="cta"
              css={{ px: "$200", py: "$100", fontFamily: "$meta", fontWeight: "$bold", fontSize: "$100" }}
              onClick={() => goto("contact")}
            >
              Book a Service
            </Button>
            <Button
              variant="secondary"
              isOutline
              css={{
                px: "$200",
                py: "$100",
                fontFamily: "$meta",
                fontWeight: "$bold",
                fontSize: "$100",
                borderColor: "rgba(255,255,255,0.55)",
                color: "#ffffff",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)", borderColor: "#ffffff" },
              }}
              onClick={() => goto("services")}
            >
              Our Services
            </Button>
          </HeroCtas>
        </HeroContent>
        <ScrollIndicator aria-hidden>
          <ScrollLine />
        </ScrollIndicator>
      </HeroSection>

      {/* ─ Trust bar ─ */}
      <TrustBar role="list" aria-label="Trust signals">
        {["Gas Safe Registered", "25+ Years Experience", "Same-Day Available", "Fully Insured", "Free Quotes"].map(
          (t) => (
            <TrustItem key={t} role="listitem">
              <Pip aria-hidden />
              {t}
            </TrustItem>
          )
        )}
      </TrustBar>

      {/* ─ Services ─ */}
      <section id="services" aria-labelledby="services-h2">
        <SectionInner>
          <Animate>
            <SectionLabel>What We Do</SectionLabel>
            <SectionH2 id="services-h2">Our Services</SectionH2>
            <SectionLead>
              From annual chimney sweeps to emergency gas hob repairs — we handle it all with speed, safety, and craftsmanship.
            </SectionLead>
          </Animate>
          <ServicesGrid>
            {services.map((s, i) => (
              <Animate key={s.title} delay={i * 100}>
                <ServiceCard>
                  <SvcImg className="svc-img" style={{ backgroundImage: `url(${s.image})` }} role="img" aria-label={s.title} />
                  <SvcBody>
                    <SvcTag>{s.tag}</SvcTag>
                    <SvcH3>{s.title}</SvcH3>
                    <SvcText>{s.desc}</SvcText>
                    <FeatureList>
                      {s.features.map((f) => (
                        <FeatureItem key={f}>
                          <Icon size="100" label=""><Check /></Icon>
                          {f}
                        </FeatureItem>
                      ))}
                    </FeatureList>
                  </SvcBody>
                </ServiceCard>
              </Animate>
            ))}
          </ServicesGrid>
        </SectionInner>
      </section>

      {/* ─ Why us ─ */}
      <DarkBand id="why-us" aria-labelledby="why-h2">
        <WhyGrid>
          <Animate anim="slideRight">
            <WhyPhoto role="img" aria-label="Haffele professional engineers" />
          </Animate>
          <WhyItems>
            <Animate anim="slideLeft">
              <SectionLabel>Why Haffele</SectionLabel>
              <SectionH2 id="why-h2" css={{ color: "#ffffff" }}>
                The Trusted Choice for Home Safety
              </SectionH2>
            </Animate>
            {whyItems.map((w, i) => (
              <Animate key={w.title} anim="slideLeft" delay={i * 100}>
                <WhyRow>
                  <WhyIconBox aria-hidden>
                    <Icon size="100" label=""><Check /></Icon>
                  </WhyIconBox>
                  <div>
                    <WhyTitle>{w.title}</WhyTitle>
                    <WhyText>{w.text}</WhyText>
                  </div>
                </WhyRow>
              </Animate>
            ))}
          </WhyItems>
        </WhyGrid>
      </DarkBand>

      {/* ─ Process ─ */}
      <section id="process" aria-labelledby="process-h2">
        <SectionInner>
          <Animate>
            <SectionLabel>Simple Process</SectionLabel>
            <SectionH2 id="process-h2">How It Works</SectionH2>
            <SectionLead>Getting your chimney swept or gas hob repaired has never been easier.</SectionLead>
          </Animate>
          <ProcessGrid>
            {steps.map((s, i) => (
              <Animate key={s.num} delay={i * 120}>
                <StepWrap>
                  <StepNum>{s.num}</StepNum>
                  <StepTitle>{s.title}</StepTitle>
                  <StepText>{s.text}</StepText>
                </StepWrap>
              </Animate>
            ))}
          </ProcessGrid>
        </SectionInner>
      </section>

      {/* ─ Testimonials ─ */}
      <LightBand id="reviews" aria-labelledby="reviews-h2">
        <SectionInner>
          <Animate>
            <SectionLabel>What Customers Say</SectionLabel>
            <SectionH2 id="reviews-h2">Trusted by Homeowners</SectionH2>
          </Animate>
          <TestGrid>
            {testimonials.map((t, i) => (
              <Animate key={i} anim="scaleIn" delay={i * 130}>
                <TestCard>
                  <StarRow aria-label="5 out of 5 stars">
                    {[...Array(5)].map((_, j) => (
                      <Icon key={j} size="100" label=""><StarFull /></Icon>
                    ))}
                  </StarRow>
                  <TestQuote>"{t.text}"</TestQuote>
                  <TestAuthor>— {t.author}</TestAuthor>
                </TestCard>
              </Animate>
            ))}
          </TestGrid>
        </SectionInner>
      </LightBand>

      {/* ─ FAQ ─ */}
      <FaqWrap id="faq" aria-labelledby="faq-h2">
        <Animate>
          <SectionLabel>FAQ</SectionLabel>
          <SectionH2 id="faq-h2">Common Questions</SectionH2>
        </Animate>
        <Animate delay={150}>
          <Accordion.Root type="single" collapsible css={{ marginTop: "$200" }}>
            {faqs.map((faq, i) => (
              <Accordion.Item key={i} value={`faq-${i}`}>
                <Accordion.Trigger>{faq.q}</Accordion.Trigger>
                <Accordion.Content>
                  <p
                    style={{
                      fontFamily: "var(--wpds-fonts-body)",
                      fontSize: "var(--wpds-fontSizes-100)",
                      lineHeight: "var(--wpds-lineHeights-body)",
                      color: "var(--wpds-colors-primary)",
                      paddingBottom: "var(--wpds-space-150)",
                    }}
                  >
                    {faq.a}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Animate>
      </FaqWrap>

      {/* ─ CTA Banner ─ */}
      <CtaBand id="contact" aria-labelledby="cta-h2">
        <Animate anim="scaleIn">
          <CtaH2 id="cta-h2">Ready for a Safer Home?</CtaH2>
          <CtaSub>Book your chimney sweep or gas hob service today. Free quotes, no obligation.</CtaSub>
          <CtaRow>
            <Button
              variant="primary"
              css={{
                backgroundColor: "#ffffff",
                color: "#f97316",
                fontFamily: "$meta",
                fontWeight: "$bold",
                fontSize: "$100",
                px: "$200",
                py: "$100",
                "&:hover": { backgroundColor: "#f1f5f9" },
              }}
            >
              <Icon size="100" label=""><Phone /></Icon>
              Call Now
            </Button>
            <Button
              variant="primary"
              isOutline
              css={{
                borderColor: "#ffffff",
                color: "#ffffff",
                fontFamily: "$meta",
                fontWeight: "$bold",
                fontSize: "$100",
                px: "$200",
                py: "$100",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" },
              }}
            >
              Book Online
            </Button>
          </CtaRow>
        </Animate>
      </CtaBand>

      {/* ─ Footer ─ */}
      <FooterWrap>
        <FooterGrid>
          <div>
            <FooterLogo>Haffele</FooterLogo>
            <FooterBlurb>
              Professional chimney and gas hob service and repair. Gas Safe registered engineers you can trust.
            </FooterBlurb>
          </div>
          <div>
            <FooterColHead>Services</FooterColHead>
            <FooterList>
              {["Chimney Sweep", "Chimney Repair", "Gas Hob Service", "Gas Hob Repair"].map((s) => (
                <li key={s}><FooterA href="#">{s}</FooterA></li>
              ))}
            </FooterList>
          </div>
          <div>
            <FooterColHead>Contact</FooterColHead>
            <FooterList>
              <li><FooterA href="tel:+441234567890">0800 000 0000</FooterA></li>
              <li><FooterA href="mailto:hello@haffele.co.uk">hello@haffele.co.uk</FooterA></li>
              <li><FooterA href="#">Mon – Sat, 7am – 7pm</FooterA></li>
            </FooterList>
          </div>
        </FooterGrid>
        <FooterBottom>
          <FooterSmall>© {new Date().getFullYear()} Haffele. All rights reserved.</FooterSmall>
          <FooterSmall>Gas Safe Registered · Fully Insured</FooterSmall>
        </FooterBottom>
      </FooterWrap>
    </SiteWrapper>
  );
}
