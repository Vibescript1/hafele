const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// The file is completely broken between SuccessIconWrap and SectionLead.
// Let's find the exact string indices.

const successIconWrapEnd = content.indexOf('const SuccessSub = styled("p", {');
const sectionLeadStart = content.indexOf('const SectionLead = styled("p", {');

if (successIconWrapEnd === -1 || sectionLeadStart === -1) {
  console.log("Could not find anchors");
  process.exit(1);
}

const before = content.substring(0, successIconWrapEnd);
const after = content.substring(sectionLeadStart);

const replacement = `const SuccessSub = styled("p", {
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
  padding: "$400",
  boxShadow: "$400",
  animation: \`\${scaleIn} 0.5s cubic-bezier(0.16, 1, 0.3, 1)\`,
  "@sm": {
    padding: "$300 $150",
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

function BookingFormContent() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <SuccessWrap>
        <ClosePopupButton 
          type="button" 
          onClick={() => setSubmitted(false)}
          css={{ top: "$050", right: "$050", "@sm": { top: "$050", right: "$050" } }}
          title="Go Back"
          aria-label="Back to form"
        >
          <Icon size="150" label="Back"><Close /></Icon>
        </ClosePopupButton>
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

`;

const finalContent = before + replacement + after;
fs.writeFileSync('src/App.tsx', finalContent);
console.log("Fixed src/App.tsx successfully.");
