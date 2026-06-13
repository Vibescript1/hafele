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

const pulse = keyframes({
  "0%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(249, 115, 22, 0.7)" },
  "70%": { transform: "scale(1.05)", boxShadow: "0 0 0 15px rgba(249, 115, 22, 0)" },
  "100%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(249, 115, 22, 0)" },
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

const HeaderWrap = styled("div", {
  position: "sticky",
  top: 0,
  zIndex: "$shell",
});

const marqueeScroll = keyframes({
  "0%": { transform: "translateX(0)" },
  "100%": { transform: "translateX(-50%)" },
});

const TopBar = styled("div", {
  backgroundColor: "#000000",
  color: "#ffffff",
  fontFamily: "$meta",
  fontSize: "$087",
  padding: "$050 0",
  overflow: "hidden",
  whiteSpace: "nowrap",
  display: "flex",
  alignItems: "center",
  width: "100%",
});

const MarqueeTrack = styled("div", {
  display: "flex",
  width: "max-content",
  animation: `${marqueeScroll} 40s linear infinite`,
  willChange: "transform",
  "&:hover": {
    animationPlayState: "paused",
  }
});

const MarqueeText = styled("span", {
  display: "inline-block",
  paddingRight: "50px",
  whiteSpace: "nowrap",
});

const NavBar = styled("header", {
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  px: "$100",
  height: "56px",
  backgroundColor: "#ffffff",
  transition: "box-shadow 0.3s ease",
  "@sm": { px: "$050", height: "48px" },
  variants: {
    scrolled: {
      true: {
        boxShadow: "$300",
      },
      false: {
        boxShadow: "none",
      },
    },
  },
});

const LogoText = styled("a", {
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
});

const LogoImg = styled("img", {
  height: "56px",
  objectFit: "contain",
  "@sm": { height: "44px" },
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
  color: "#000000",
  "&:hover": { color: "$cta" },
});

const IconGroup = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$075",
});

const IconButton = styled("button", {
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: "$025",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#000000",
  transition: "color 0.2s ease",
  "&:hover": { color: "$cta" },
});

const HamburgerBtn = styled("button", {
  display: "flex",
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: "$050",
  alignItems: "center",
  justifyContent: "center",
  color: "#000000",
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
  fontSize: "$150",
  fontWeight: "$bold",
  color: "$primary",
  textDecoration: "none",
  "&:hover": { color: "$cta" },
  "@sm": { fontSize: "$125" },
});

// ── Hero ──────────────────────────────────────────────────────────────

const HeroSection = styled("section", {
  position: "relative",
  minHeight: "60vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  overflow: "hidden",
  "@sm": { minHeight: "50vh" },
});

const HeroBgWrapper = styled("div", {
  position: "absolute",
  inset: 0,
});

const HeroBgImage = styled("div", {
  position: "absolute",
  inset: 0,
  backgroundSize: "cover",
  backgroundPosition: "right center",
  transition: "opacity 1s ease-in-out",
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 35%, rgba(255,255,255,0) 80%)",
  },
  "@sm": {
    backgroundPosition: "70% center",
    "&::after": {
      background: "linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 60%, rgba(255,255,255,0.4) 100%)",
    }
  }
});

const HeroContent = styled("div", {
  position: "relative",
  zIndex: 1,
  maxWidth: "700px",
  paddingLeft: "10%",
  paddingRight: "$200",
  textAlign: "left",
  "@sm": { px: "$100", paddingLeft: "$100" },
});

const Eyebrow = styled("div", {
  fontFamily: "$meta",
  fontWeight: "$bold",
  fontSize: "$100",
  backgroundColor: "#333333",
  color: "#ffffff",
  display: "inline-block",
  padding: "$050 $100",
  marginBottom: "$150",
  animation: `${fadeIn} 0.8s ease 0.2s both`,
});

const HeroH1 = styled("h1", {
  fontFamily: "$headline",
  fontWeight: "$bold",
  fontSize: "$400",
  lineHeight: "1.2",
  color: "#333333",
  marginBottom: "$100",
  animation: `${fadeUp} 0.9s ease 0.3s both`,
  "@sm": { fontSize: "$225", lineHeight: "1.1" },
  "@md": { fontSize: "$300" },
});

const AccentSpan = styled("span", {
  color: "#f97316",
  display: "block",
});

const HeroSub = styled("p", {
  fontFamily: "$subhead",
  fontWeight: "$regular",
  fontSize: "$125",
  lineHeight: "$body",
  color: "#555555",
  marginBottom: "$200",
  animation: `${fadeUp} 0.9s ease 0.5s both`,
  "@sm": { fontSize: "$100" },
});

const SliderDots = styled("div", {
  position: "absolute",
  bottom: "$150",
  left: "0",
  right: "0",
  display: "flex",
  justifyContent: "center",
  gap: "10px",
  zIndex: 2,
  animation: `${fadeIn} 1s ease 1.5s both`,
});

const Dot = styled("div", {
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  backgroundColor: "rgba(200,200,200,0.6)",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": { backgroundColor: "rgba(200,200,200,0.9)" },
  variants: {
    active: {
      true: {
        backgroundColor: "#ffffff",
        boxShadow: "0 0 0 2px #f97316",
      }
    }
  }
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
  "@sm": { 
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "$075", 
    px: "$100" 
  },
});

const TrustItem = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$075",
  color: "rgba(255,255,255,0.75)",
  fontFamily: "$meta",
  fontSize: "$075",
  fontWeight: "$bold",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  "@sm": {
    fontSize: "10px",
  }
});

const Pip = styled("span", {
  display: "inline-block",
  width: "6px",
  height: "6px",
  borderRadius: "$round",
  backgroundColor: "#f97316",
  flexShrink: 0,
});

// ── Booking Form ────────────────────────────────────────────────────────

const BookingSection = styled("section", {
  backgroundColor: "$surface",
  py: "$400",
  px: "$200",
  display: "flex",
  justifyContent: "center",
  "@sm": { px: "$100" },
});

const BookingFormWrap = styled("div", {
  width: "100%",
  maxWidth: "600px",
  backgroundColor: "#ffffff",
  borderRadius: "$150",
  padding: "$200 $400 $400",
  boxShadow: "$400",
  border: "1px solid $outline",
  transition: "box-shadow 0.3s ease",
  "&:hover": {
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
  }
});

const FormGroup = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$050",
  marginBottom: "$075",
});

const FormLabel = styled("label", {
  fontFamily: "$meta",
  fontSize: "$075",
  fontWeight: "$bold",
  color: "$primary",
});

const FormInput = styled("input", {
  fontFamily: "system-ui, -apple-system, sans-serif",
  fontSize: "$087",
  padding: "$075",
  borderRadius: "$050",
  border: "1px solid #e2e8f0",
  backgroundColor: "#f8fafc",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  outline: "none",
  "&:hover": {
    borderColor: "#cbd5e1",
  },
  "&:focus": {
    borderColor: "$cta",
    backgroundColor: "#ffffff",
    boxShadow: "0 0 0 3px rgba(249, 115, 22, 0.15)",
  },
});

const FormTextarea = styled("textarea", {
  fontFamily: "system-ui, -apple-system, sans-serif",
  fontSize: "$087",
  padding: "$075",
  borderRadius: "$050",
  border: "1px solid #e2e8f0",
  backgroundColor: "#f8fafc",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  outline: "none",
  resize: "vertical",
  minHeight: "100px",
  "&:hover": {
    borderColor: "#cbd5e1",
  },
  "&:focus": {
    borderColor: "$cta",
    backgroundColor: "#ffffff",
    boxShadow: "0 0 0 3px rgba(249, 115, 22, 0.15)",
  },
});

const PopupOverlay = styled("div", {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.6)",
  backdropFilter: "blur(6px)",
  zIndex: 9999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  animation: `${fadeIn} 0.3s ease`,
});

const SuccessText = styled("h3", {
  fontFamily: "$meta",
  fontSize: "$150",
  fontWeight: "$bold",
  color: "$onBackground",
  marginBottom: "$050",
});

const SuccessWrap = styled("div", {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "$400 $200",
  textAlign: "center",
  animation: `${scaleIn} 0.5s cubic-bezier(0.16, 1, 0.3, 1)`,
  width: "100%",
  height: "100%",
});

const SuccessIconWrap = styled("div", {
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  backgroundColor: "#dcfce7",
  color: "#16a34a",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "$200",
});

const SuccessSub = styled("p", {
  fontFamily: "$body",
  fontSize: "$100",
  color: "$onBackground-subtle",
});

const PopupContent = styled("div", {
  position: "relative",
  width: "90%",
  maxWidth: "500px",
  maxHeight: "90vh",
  overflowY: "auto",
  backgroundColor: "#ffffff",
  borderRadius: "$150",
  padding: "$200 $400 $400",
  boxShadow: "$400",
  animation: `${scaleIn} 0.5s cubic-bezier(0.16, 1, 0.3, 1)`,
  "@sm": {
    padding: "$150 $150 $300",
  }
});

const FloatingCallButton = styled("a", {
  position: "fixed",
  bottom: "24px",
  right: "24px",
  zIndex: 9999,
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  backgroundColor: "$cta",
  color: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 10px 25px rgba(249, 115, 22, 0.4)",
  animation: `${pulse} 2.5s infinite ease-in-out`,
  transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s",
  "&:hover": {
    transform: "translateY(-4px) scale(1.05)",
    backgroundColor: "$ctaHover",
  },
  "@sm": {
    width: "50px",
    height: "50px",
    bottom: "20px",
    right: "20px",
  }
});

const ClosePopupButton = styled("button", {
  position: "absolute",
  top: "$150",
  right: "$150",
  zIndex: 10,
  background: "#f1f5f9",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  cursor: "pointer",
  color: "$onBackground",
  "&:hover": { backgroundColor: "#e2e8f0", color: "$primary" },
  "@sm": {
    top: "$100",
    right: "$100",
    width: "36px",
    height: "36px",
  }
});

function BookingFormContent({ onClose }: { onClose?: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <SuccessWrap>
        {!onClose && (
          <ClosePopupButton 
            type="button" 
            onClick={() => setSubmitted(false)}
            css={{ top: "$050", right: "$050", "@sm": { top: "$050", right: "$050" } }}
            title="Go Back"
            aria-label="Back to form"
          >
            <Icon size="150" label="Back"><Close /></Icon>
          </ClosePopupButton>
        )}
        <SuccessIconWrap>
          <Icon size="200" label="Success"><Check /></Icon>
        </SuccessIconWrap>
        <SuccessText>Booking Confirmed!</SuccessText>
        <SuccessSub>Your complaint is booked. Our team will contact you shortly.</SuccessSub>
      </SuccessWrap>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
      <FormGroup>
        <FormLabel htmlFor="name">Name</FormLabel>
        <FormInput id="name" type="text" placeholder="Your Name" required />
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="phone">Mobile No.</FormLabel>
        <FormInput id="phone" type="tel" placeholder="Your Mobile No." required />
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="address">Address</FormLabel>
        <FormInput id="address" type="text" placeholder="Your Address" required />
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="issue">Issue you are facing</FormLabel>
        <FormTextarea id="issue" placeholder="Describe the issue..." required />
      </FormGroup>
      <Button variant="cta" style={{ width: "100%", marginTop: "1rem" }}>
        Confirm Booking
      </Button>
    </form>
  );
}

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
  backgroundImage: "url('/cozy-kitchen-interior-design.jpg')",
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
  gridTemplateColumns: "1.5fr 1fr 1fr 1.5fr",
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
    tag: "Hob",
    title: "Hob Repair and services",
    desc: "Fast, reliable hob repairs by certified engineers. No ignition, uneven flames, or gas smell? We diagnose and fix it right.",
    image: "/hob-repair.webp",
    features: ["Same-day diagnosis", "Expert technicians", "All brands covered", "Parts supplied & fitted"],
  },
  {
    tag: "Gas Stove",
    title: "Gas stove repair and service",
    desc: "Comprehensive gas stove servicing including burner cleaning, ignition testing, and safety checks to keep your cooker performing like new.",
    image: "/gas stove.jpg",
    features: ["Full burner clean", "Gas pressure check", "Ignition system test", "Safety check"],
  },
  {
    tag: "Chimney",
    title: "Chimney repair and service",
    desc: "Professional chimney repairing and servicing to keep your kitchen clear, safe, and efficient. We handle motors, filters, and blockages.",
    image: "/chimeny.png",
    features: ["Motor repair", "Filter replacement", "Suction check", "Deep cleaning"],
  },
  {
    tag: "Cooking Range",
    title: "Cooking range repair and services",
    desc: "Complete repair and maintenance for freestanding and built-in cooking ranges. We ensure your burners and ovens are perfectly calibrated.",
    image: "/cooking range.webp",
    features: ["Burner tuning", "Oven calibration", "Safety check", "Door seal inspection"],
  },
  {
    tag: "Microwave",
    title: "Microwave oven repair and service",
    desc: "Expert repair and servicing for built-in microwaves and ovens. We ensure your appliance heats evenly, operates safely, and performs at its best.",
    image: "/hero-oven.webp",
    features: ["Complete diagnostics", "Heating element checks", "Magnetron testing", "Safe, reliable repairs"],
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
  { text: "Booked KAFF for a chimney sweep and couldn't be happier. Arrived on time, covered everything with dust sheets, left immaculate. Highly recommend.", author: "James T., Homeowner" },
  { text: "Had my gas hob repaired in under two hours. The engineer was professional, explained everything clearly, and the price was exactly as quoted. Brilliant.", author: "Sarah M., Customer" },
  { text: "Used KAFF for an annual chimney service two years running. Consistent quality and great peace of mind knowing it's done properly.", author: "Robert H., Customer" },
];

const faqs = [
  { q: "How often should I have my chimney swept?", a: "For regular wood-burning fires, at least once a year — ideally before the winter season. For gas fires, every two years is recommended." },
  { q: "Are your engineers Gas Safe registered?", a: "Yes. Every one of our engineers holds a current Gas Safe registration card, which they'll show you on arrival. All gas work is legally required to be carried out by a registered engineer." },
  { q: "How long does a chimney sweep take?", a: "A standard chimney sweep takes between 45 minutes and 1.5 hours. We use specialist dust-control equipment so there's virtually no mess left behind." },
  { q: "My gas hob burner isn't lighting — repair or replacement?", a: "In most cases this is a simple repair — igniter electrode or spark module. We diagnose on the first visit and give you an honest recommendation." },
  { q: "Do you provide a certificate after the service?", a: "Yes. All chimney sweeps and gas hob services come with a printed certificate you can use for insurance purposes." },
];

// ── App ───────────────────────────────────────────────────────────────

const heroSlides = [
  {
    image: "/cozy-kitchen-interior-design.webp",
    eyebrow: "Expert Chimney Repair",
    h1: "Keep your kitchen smoke-free,",
    accent: "with our expert service.",
    sub: "Fast and reliable chimney sweep & repair.",
  },
  {
    image: "/gas-hob-service.webp",
    eyebrow: "Professional Gas Hob Service",
    h1: "Cooking made safe and easy,",
    accent: "with perfectly tuned hobs.",
    sub: "Complete servicing and reliable repair.",
  },
  {
    image: "/hero-oven.webp",
    eyebrow: "Complete Kitchen Care",
    h1: "Expert microwave and oven repair,",
    accent: "we fix it all.",
    sub: "Guaranteed satisfaction every time.",
  }
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const popupTimer = setTimeout(() => {
      setShowPopup(true);
    }, 2000);
    return () => clearTimeout(popupTimer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
      <HeaderWrap>
        {/* ─ Top Announcement Bar ─ */}
        <TopBar>
          <MarqueeTrack>
            <MarqueeText>
              Please beware of fraudulent persons asking for advance UPI or other online payments on behalf of KAFF. We do not request any advance payments online to attend complaints, installations, demos, or site visits. KAFF will not be responsible for any loss due to such fraudulent activities. For genuine support, kindly contact only on KAFF official Customer Care Number.
            </MarqueeText>
            <MarqueeText>
              Please beware of fraudulent persons asking for advance UPI or other online payments on behalf of KAFF. We do not request any advance payments online to attend complaints, installations, demos, or site visits. KAFF will not be responsible for any loss due to such fraudulent activities. For genuine support, kindly contact only on KAFF official Customer Care Number.
            </MarqueeText>
          </MarqueeTrack>
        </TopBar>

        {/* ─ Navbar ─ */}
        <NavBar scrolled={scrolled ? "true" : "false"}>
          <LogoText href="#">
            <LogoImg src="/logo-removebg-preview.webp" alt="KAFF Logo" />
          </LogoText>
          <DesktopNav>
            {navItems.map((n) => (
              <NavLink
                key={n.id}
                href={`#${n.id}`}
                onClick={(e: React.MouseEvent) => { e.preventDefault(); goto(n.id); }}
              >
                {n.label}
              </NavLink>
            ))}
          </DesktopNav>
          <IconGroup>
            <IconButton aria-label="Location">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </IconButton>
            <IconButton aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </IconButton>
            <IconButton aria-label="Profile">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </IconButton>
            <IconButton aria-label="Cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            </IconButton>
            <HamburgerBtn onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
              <Icon size="150" label={menuOpen ? "Close" : "Menu"}>
                {menuOpen ? <Close /> : <Menu />}
              </Icon>
            </HamburgerBtn>
          </IconGroup>
        </NavBar>
      </HeaderWrap>

      {/* ─ Mobile menu ─ */}
      <MobileOverlay open={menuOpen ? "true" : undefined} aria-hidden={!menuOpen}>
        <ClosePopupButton onClick={() => setMenuOpen(false)} aria-label="Close menu">
          <Icon size="150" label="Close Menu"><Close /></Icon>
        </ClosePopupButton>
        {navItems.map((n) => (
          <MobileLink key={n.id} href={`#${n.id}`} onClick={(e: React.MouseEvent) => { e.preventDefault(); goto(n.id); }}>
            {n.label}
          </MobileLink>
        ))}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
          <Button variant="cta" onClick={() => goto("booking")}>
            Book Now
          </Button>
          <Button as="a" href="tel:18001038620" variant="primary" css={{ backgroundColor: "#f97316", color: "white", textDecoration: "none" }}>
            Call Now
          </Button>
        </div>
      </MobileOverlay>

      {/* ─ Hero ─ */}
      <HeroSection id="home" aria-label="Welcome to KAFF">
        <HeroBgWrapper aria-hidden>
          {heroSlides.map((slide, i) => (
            <HeroBgImage key={slide.image} style={{ backgroundImage: `url(${slide.image})`, opacity: i === currentSlide ? 1 : 0 }} />
          ))}
        </HeroBgWrapper>
        <HeroContent key={currentSlide}>
          <Eyebrow>{heroSlides[currentSlide].eyebrow}</Eyebrow>
          <HeroH1>
            {heroSlides[currentSlide].h1}
            <AccentSpan>{heroSlides[currentSlide].accent}</AccentSpan>
          </HeroH1>
          <HeroSub>
            {heroSlides[currentSlide].sub}
          </HeroSub>
        </HeroContent>
        <SliderDots>
          {heroSlides.map((_, i) => (
            <Dot key={i} active={i === currentSlide ? "true" : undefined} onClick={() => setCurrentSlide(i)} />
          ))}
        </SliderDots>
      </HeroSection>

      {/* ─ Trust bar ─ */}
      <TrustBar role="list" aria-label="Trust signals">
        {["Hob Repair and services", "Gas stove repair and service", "Chimney repair and service", "Cooking range repair and services", "Microwave oven repair and service"].map(
          (t) => (
            <TrustItem key={t} role="listitem">
              <Pip aria-hidden />
              {t}
            </TrustItem>
          )
        )}
      </TrustBar>

      {/* ─ Booking Form ─ */}
      <BookingSection id="booking">
        <BookingFormWrap>
          <SectionH2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Book a Service</SectionH2>
          <BookingFormContent />
        </BookingFormWrap>
      </BookingSection>

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
                  <SvcImg className="svc-img" style={{ backgroundImage: `url('${s.image}')` }} role="img" aria-label={s.title} />
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
            <WhyPhoto role="img" aria-label="KAFF professional engineers" />
          </Animate>
          <WhyItems>
            <Animate anim="slideLeft">
              <SectionLabel>Why KAFF</SectionLabel>
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
              as="a"
              href="tel:18001038620"
              variant="primary"
              css={{
                backgroundColor: "#ffffff",
                color: "#f97316",
                fontFamily: "$meta",
                fontWeight: "$bold",
                fontSize: "$100",
                px: "$200",
                py: "$100",
                textDecoration: "none",
                "&:hover": { backgroundColor: "#f1f5f9" },
              }}
            >
              <Icon size="100" label=""><Phone /></Icon>
              Call Now
            </Button>
            <Button
              variant="primary"
              isOutline
              onClick={() => goto("booking")}
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
            <FooterLogo>KAFF</FooterLogo>
            <p style={{ fontFamily: "var(--wpds-fonts-headline)", fontSize: "1.2rem", color: "#ffffff", marginBottom: "0.5rem", lineHeight: "1.4" }}>Your trusted partner for expert kitchen appliance repair and maintenance.</p>
            <FooterBlurb>
              Certified technicians, genuine parts, and guaranteed satisfaction.
            </FooterBlurb>
          </div>
          <div>
            <FooterColHead>Our Services</FooterColHead>
            <FooterList>
              {["Hob Repair and services", "Gas stove repair and service", "Chimney repair and service", "Cooking range repair and services", "Microwave oven repair and service"].map((s) => (
                <li key={s}><FooterA href="#">{s}</FooterA></li>
              ))}
            </FooterList>
          </div>
          <div>
            <FooterColHead>Our Service Locations</FooterColHead>
            <FooterList>
              {["Delhi", "Noida", "Greater Noida", "Ghaziabad", "Gurugram (Gurgaon)", "Faridabad", "Hyderabad", "Bangalore"].map((s) => (
                <li key={s}><FooterA href="#">{s}</FooterA></li>
              ))}
            </FooterList>
          </div>
          <div>
            <FooterColHead>Contact Us</FooterColHead>
            <FooterList>
              <li><FooterA href="#">Prof NS Phadke Marg, Opp, Rajashree Sahu Marg, Vijay Nagar, shop no 118, Andheri East, Mumbai, Maharashtra 400069</FooterA></li>
              <li><FooterA href="tel:18001038620">18001038620</FooterA></li>
              <li><FooterA href="mailto:info@servicecenteres.co.in">info@servicecenteres.co.in</FooterA></li>
              <li><FooterA href="#">Mon–Sat: 8:00 AM – 8:00 PM</FooterA></li>
              <li><FooterA href="#">Sunday: 9:00 AM – 6:00 PM</FooterA></li>
            </FooterList>
          </div>
        </FooterGrid>
        
        <div style={{ maxWidth: "1200px", margin: "0 auto", paddingTop: "2rem", display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center", borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: "2rem" }}>
           {[
             { name: "Privacy Policy", link: "/privacy.html" },
             { name: "Terms & Conditions", link: "/terms.html" },
             { name: "Refund Policy", link: "/refund.html" },
             { name: "Cancellation Policy", link: "/cancellation.html" },
             { name: "Disclaimer", link: "/disclaimer.html" }
           ].map((s) => (
                <FooterA key={s.name} href={s.link}>{s.name}</FooterA>
           ))}
        </div>

        <FooterBottom style={{ flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1rem", marginTop: "1.5rem", paddingTop: "0", borderTop: "none" }}>
          <FooterSmall style={{ lineHeight: "1.5", maxWidth: "800px" }}>
            © Disclaimer: servicecenteres.co.in is an independent appliance repair and service provider and is not affiliated with or authorized by any brand. But we repair and service all major brands of all home appliances and we are very expert in it, All trademarks, logos, and brand names belong to their respective owners and are used for identification purposes only. We provide out-of-warranty repair and support services.
          </FooterSmall>
          <FooterSmall style={{ color: "#f97316", fontWeight: "bold" }}>
            Designed and Developer By Ravindra Singh - 8448420308
          </FooterSmall>
        </FooterBottom>
      </FooterWrap>

      {/* ─ Floating Call Button ─ */}
      <FloatingCallButton href="tel:18001038620" aria-label="Call Us Now">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      </FloatingCallButton>

      {/* ─ Popup Overlay ─ */}
      {showPopup && (
        <PopupOverlay onClick={() => setShowPopup(false)}>
          <PopupContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <ClosePopupButton onClick={() => setShowPopup(false)}>
              <Icon size="150" label="Close Popup"><Close /></Icon>
            </ClosePopupButton>
            <SectionH2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Book a Service</SectionH2>
            <BookingFormContent onClose={() => setShowPopup(false)} />
          </PopupContent>
        </PopupOverlay>
      )}
    </SiteWrapper>
  );
}
