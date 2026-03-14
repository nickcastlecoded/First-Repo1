import { useState, useEffect, useRef } from "react";

const TEAL = "#1a7a6d";
const TEAL_DARK = "#145f55";
const TEAL_LIGHT = "#e6f5f2";
const CREAM = "#faf6ef";
const CREAM_DARK = "#f0e9dc";
const CORAL = "#e85d4a";
const TEXT_DARK = "#1a2e2a";
const TEXT_MED = "#4a6560";
const TEXT_LIGHT = "#7a9590";

const products = [
  {
    id: 1,
    name: "12-in-1 Multivitamin Bites",
    price: 29.99,
    description:
      "The ultimate daily supplement for your pup. Packed with 12 essential nutrients to support digestion, immunity, heart health, energy, joints, and overall wellness — all in one tasty bite.",
    benefits: ["Digestion", "Immune Support", "Heart Health", "Energy", "Joint Support", "Skin & Coat"],
    color: TEAL,
    icon: "✦",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Allergy & Itch Relief",
    price: 27.99,
    description:
      "Soothe seasonal allergies and stop the scratch. Our advanced formula targets itchy skin, hot spots, and environmental sensitivities with natural anti-inflammatory ingredients.",
    benefits: ["Itch Relief", "Skin Health", "Immune Balance", "Anti-Inflammatory", "Seasonal Support", "Coat Shine"],
    color: "#d4883a",
    icon: "❋",
    badge: "New",
  },
  {
    id: 3,
    name: "Joint & Hip Support",
    price: 32.99,
    description:
      "Keep your dog moving freely at every age. Our veterinarian-formulated blend supports joint flexibility, reduces stiffness, and helps rebuild cartilage for long-lasting mobility.",
    benefits: ["Joint Flexibility", "Hip Support", "Cartilage Repair", "Mobility", "Pain Relief", "Bone Strength"],
    color: "#5b7fb5",
    icon: "◆",
    badge: "Premium",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    dog: "Golden Retriever, 7 yrs",
    text: "My boy Max has been on the Multivitamin Bites for 3 months now and the difference is incredible. More energy, shinier coat, and he actually gets excited for his 'treat' every morning!",
    rating: 5,
    product: "12-in-1 Multivitamin",
  },
  {
    name: "James T.",
    dog: "French Bulldog, 4 yrs",
    text: "We tried everything for Bella's allergies — prescription meds, special shampoos, you name it. The Allergy & Itch Relief chews finally gave her (and us) some peace. No more constant scratching!",
    rating: 5,
    product: "Allergy & Itch Relief",
  },
  {
    name: "Linda K.",
    dog: "Labrador, 10 yrs",
    text: "Duke was struggling to get up the stairs and I was heartbroken watching him slow down. After 6 weeks on the Joint & Hip Support, he's like a puppy again. Truly life-changing.",
    rating: 5,
    product: "Joint & Hip Support",
  },
  {
    name: "Mike R.",
    dog: "Beagle Mix, 5 yrs",
    text: "I love that Pawza uses real, quality ingredients. My vet even commented on how good Cooper's bloodwork looked at his last checkup. The Subscribe & Save makes it so easy too.",
    rating: 5,
    product: "12-in-1 Multivitamin",
  },
];

const faqs = [
  {
    q: "How many bites should I give my dog per day?",
    a: "For dogs under 25 lbs, give 1 bite daily. For dogs 25-75 lbs, give 2 bites daily. For dogs over 75 lbs, give 3 bites daily. Always start with half the recommended amount for the first week to let your pup adjust.",
  },
  {
    q: "Are Pawza supplements safe for puppies?",
    a: "Our supplements are formulated for dogs 12 weeks and older. For puppies under 1 year, we recommend starting with half the normal dose. Always consult your veterinarian before starting any new supplement.",
  },
  {
    q: "What if my dog doesn't like the taste?",
    a: "We're confident your pup will love them — our bites are naturally flavored with real chicken and peanut butter. But if your dog isn't a fan, we offer a full 30-day money-back guarantee, no questions asked.",
  },
  {
    q: "How does Subscribe & Save work?",
    a: "Choose your products and frequency (every 30, 60, or 90 days), and save 20% on every order. You can pause, skip, or cancel anytime — no commitments. We'll send you a reminder email before each shipment.",
  },
  {
    q: "Are your products made in the USA?",
    a: "Yes! All Pawza products are proudly made in the USA in a GMP-certified, FDA-registered facility. We source premium, human-grade ingredients and every batch is third-party tested for purity and potency.",
  },
  {
    q: "Can I give my dog multiple Pawza products at the same time?",
    a: "Absolutely. Our products are designed to complement each other. Many pet parents combine the Multivitamin Bites with either the Allergy & Itch Relief or Joint & Hip Support for comprehensive coverage.",
  },
];

const PawzaLogo = ({ height = 36, color = TEAL }) => (
  <svg height={height} viewBox="0 0 520 100" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M0 95V5h18v0h30c22 0 36 12 36 30s-14 30-36 30H18v30H0zM18 49h28c12 0 20-5 20-14s-8-14-20-14H18v28z" />
    <path d="M92 95L128 5h22l36 90h-19l-8-22h-40l-8 22H92zm34-38h28l-14-38-14 38z" />
    <ellipse cx="139" cy="42" rx="3.2" ry="3.8" fill={color} opacity="0.9" />
    <ellipse cx="131" cy="38" rx="2.2" ry="2.8" fill={color} opacity="0.9" />
    <ellipse cx="147" cy="38" rx="2.2" ry="2.8" fill={color} opacity="0.9" />
    <ellipse cx="134" cy="32" rx="2" ry="2.5" fill={color} opacity="0.9" />
    <ellipse cx="144" cy="32" rx="2" ry="2.5" fill={color} opacity="0.9" />
    <path d="M196 5h19l16 60 18-60h16l18 60 16-60h19L292 95h-20l-18-58-18 58h-20L196 5z" />
    <path d="M306 5h72v16l-50 58h52v16h-76V79l50-58h-48V5z" />
    <path d="M392 95L428 5h22l36 90h-19l-8-22h-40l-8 22H392zm34-38h28l-14-38-14 38z" />
  </svg>
);

const Stars = ({ count = 5 }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} style={{ color: "#f5b942", fontSize: 16 }}>★</span>
    ))}
  </div>
);

const Counter = ({ end, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = Math.max(1, Math.floor(end / 60));
          const timer = setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 20);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

const Cart = ({ cart, setCart, isOpen, setIsOpen }) => {
  const total = cart.reduce((s, item) => s + item.price * item.qty * (item.subscription ? 0.8 : 1), 0);

  if (!isOpen) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", justifyContent: "flex-end" }}>
      <div
        onClick={() => setIsOpen(false)}
        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 420,
          background: CREAM,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-8px 0 30px rgba(0,0,0,0.15)",
          animation: "slideIn 0.3s ease",
        }}
      >
        <div
          style={{
            padding: "24px 24px 16px",
            borderBottom: `1px solid ${CREAM_DARK}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: TEXT_DARK, margin: 0 }}>Your Cart</h2>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close cart"
            style={{ background: "none", border: "none", fontSize: 28, cursor: "pointer", color: TEXT_MED, lineHeight: 1 }}
          >
            ×
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: TEXT_LIGHT }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🐾</div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16 }}>Your cart is empty</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>Add some goodies for your pup!</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {cart.map((item, i) => (
                <div
                  key={`${item.id}-${item.subscription}`}
                  style={{
                    background: "white",
                    borderRadius: 12,
                    padding: 16,
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 10,
                      background: `linear-gradient(135deg, ${item.color}22, ${item.color}44)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: 14,
                        color: TEXT_DARK,
                        margin: 0,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.name}
                    </p>
                    {item.subscription && (
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 11,
                          color: TEAL,
                          background: TEAL_LIGHT,
                          padding: "2px 8px",
                          borderRadius: 20,
                          fontWeight: 600,
                        }}
                      >
                        Subscribe & Save 20%
                      </span>
                    )}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                      <button
                        onClick={() => {
                          if (item.qty <= 1) {
                            setCart(cart.filter((_, j) => j !== i));
                          } else {
                            const c = [...cart];
                            c[i] = { ...c[i], qty: c[i].qty - 1 };
                            setCart(c);
                          }
                        }}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 8,
                          border: `1px solid ${CREAM_DARK}`,
                          background: "white",
                          cursor: "pointer",
                          fontSize: 16,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        −
                      </button>
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 600,
                          fontSize: 14,
                          minWidth: 20,
                          textAlign: "center",
                        }}
                      >
                        {item.qty}
                      </span>
                      <button
                        onClick={() => {
                          const c = [...cart];
                          c[i] = { ...c[i], qty: c[i].qty + 1 };
                          setCart(c);
                        }}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 8,
                          border: `1px solid ${CREAM_DARK}`,
                          background: "white",
                          cursor: "pointer",
                          fontSize: 16,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16, color: TEXT_DARK, margin: 0 }}>
                      ${(item.price * item.qty * (item.subscription ? 0.8 : 1)).toFixed(2)}
                    </p>
                    {item.subscription && (
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: TEXT_LIGHT, textDecoration: "line-through", margin: 0 }}>
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div style={{ padding: 24, borderTop: `1px solid ${CREAM_DARK}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: TEXT_MED }}>Subtotal</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: TEXT_DARK }}>
                ${total.toFixed(2)}
              </span>
            </div>
            <button
              style={{
                width: "100%",
                padding: "16px 24px",
                background: TEAL,
                color: "white",
                border: "none",
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 700,
                fontFamily: "'DM Sans', sans-serif",
                cursor: "pointer",
                letterSpacing: 0.5,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = TEAL_DARK)}
              onMouseLeave={(e) => (e.currentTarget.style.background = TEAL)}
            >
              Checkout — ${total.toFixed(2)}
            </button>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: TEXT_LIGHT, textAlign: "center", marginTop: 10 }}>
              Free shipping on orders over $50 🚚
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const ProductCard = ({ product, addToCart }) => {
  const [subscription, setSubscription] = useState(false);
  const discountedPrice = (product.price * 0.8).toFixed(2);

  return (
    <div
      style={{
        background: "white",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        transition: "transform 0.3s, box-shadow 0.3s",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.06)";
      }}
    >
      <div
        style={{
          height: 240,
          background: `linear-gradient(160deg, ${product.color}15, ${product.color}30)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", background: `${product.color}10`, top: -40, right: -40 }} />
        <div style={{ position: "absolute", width: 120, height: 120, borderRadius: "50%", background: `${product.color}08`, bottom: -20, left: -20 }} />

        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 20,
              background: `linear-gradient(135deg, ${CREAM}, white)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
              boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              margin: "0 auto 8px",
            }}
          >
            {product.icon}
          </div>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: product.color, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>
            PAWZA
          </span>
        </div>

        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            background: product.badge === "Best Seller" ? CORAL : product.color,
            color: "white",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: 11,
            padding: "5px 14px",
            borderRadius: 20,
            letterSpacing: 0.5,
            textTransform: "uppercase",
          }}
        >
          {product.badge}
        </div>
      </div>

      <div style={{ padding: "24px 24px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: TEXT_DARK, marginBottom: 8, lineHeight: 1.3 }}>
          {product.name}
        </h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: TEXT_MED, lineHeight: 1.6, marginBottom: 16, flex: 1 }}>
          {product.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
          {product.benefits.slice(0, 4).map((b, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                fontWeight: 600,
                color: product.color,
                background: `${product.color}12`,
                padding: "4px 10px",
                borderRadius: 20,
                letterSpacing: 0.3,
              }}
            >
              {b}
            </span>
          ))}
        </div>

        <div
          style={{
            background: subscription ? `${TEAL}08` : CREAM,
            borderRadius: 12,
            padding: 12,
            marginBottom: 16,
            border: subscription ? `2px solid ${TEAL}40` : "2px solid transparent",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onClick={() => setSubscription(!subscription)}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 6,
                border: `2px solid ${subscription ? TEAL : "#ccc"}`,
                background: subscription ? TEAL : "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
                flexShrink: 0,
              }}
            >
              {subscription && <span style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>✓</span>}
            </div>
            <div>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: TEXT_DARK }}>
                Subscribe & Save 20%
              </span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: TEXT_LIGHT, display: "block" }}>
                Free shipping · Cancel anytime
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: TEXT_DARK }}>
              ${subscription ? discountedPrice : product.price.toFixed(2)}
            </span>
            {subscription && (
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: TEXT_LIGHT, textDecoration: "line-through", marginLeft: 8 }}>
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={() => addToCart(product, subscription)}
            style={{
              background: TEAL,
              color: "white",
              border: "none",
              borderRadius: 12,
              padding: "12px 24px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              transition: "all 0.2s",
              letterSpacing: 0.3,
            }}
            onMouseEnter={(e) => { e.target.style.background = TEAL_DARK; e.target.style.transform = "scale(1.03)"; }}
            onMouseLeave={(e) => { e.target.style.background = TEAL; e.target.style.transform = "scale(1)"; }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const FaqItem = ({ faq }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${CREAM_DARK}`, overflow: "hidden" }}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{
          width: "100%",
          padding: "20px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, color: TEXT_DARK, paddingRight: 16 }}>
          {faq.q}
        </span>
        <span
          style={{
            fontSize: 22,
            color: TEAL,
            transition: "transform 0.3s",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            flexShrink: 0,
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? 300 : 0,
          overflow: "hidden",
          transition: "max-height 0.3s ease, padding 0.3s ease",
          paddingBottom: open ? 20 : 0,
        }}
      >
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: TEXT_MED, lineHeight: 1.7, margin: 0 }}>
          {faq.a}
        </p>
      </div>
    </div>
  );
};

export default function PawzaWebsite() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [selectedFreq, setSelectedFreq] = useState("Every 30 Days");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const addToCart = (product, subscription) => {
    const existing = cart.findIndex((c) => c.id === product.id && c.subscription === subscription);
    if (existing >= 0) {
      const c = [...cart];
      c[existing].qty += 1;
      setCart(c);
    } else {
      setCart([...cart, { ...product, qty: 1, subscription }]);
    }
    setCartOpen(true);
  };

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: CREAM, minHeight: "100vh", overflowX: "hidden" }}>
      {/* NAVIGATION */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? "12px 24px" : "18px 24px",
          background: scrolled ? "rgba(250,246,239,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? `1px solid ${CREAM_DARK}` : "none",
          transition: "all 0.3s",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <PawzaLogo height={30} color={TEAL} />
        </div>

        <div className="nav-links" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Products", "Benefits", "Reviews", "FAQ"].map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase())}
              style={{
                background: "none",
                border: "none",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: TEXT_MED,
                cursor: "pointer",
                letterSpacing: 0.5,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = TEAL)}
              onMouseLeave={(e) => (e.target.style.color = TEXT_MED)}
            >
              {link}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button
            onClick={() => setCartOpen(true)}
            style={{
              background: TEAL,
              color: "white",
              border: "none",
              borderRadius: 12,
              padding: "10px 20px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: "all 0.2s",
              position: "relative",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = TEAL_DARK)}
            onMouseLeave={(e) => (e.currentTarget.style.background = TEAL)}
          >
            🛒 Cart
            {cartCount > 0 && (
              <span
                style={{
                  background: CORAL,
                  color: "white",
                  borderRadius: "50%",
                  width: 20,
                  height: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 700,
                  position: "absolute",
                  top: -6,
                  right: -6,
                }}
              >
                {cartCount}
              </span>
            )}
          </button>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenu}
            style={{
              display: "none",
              background: "none",
              border: "none",
              fontSize: 24,
              cursor: "pointer",
              color: TEXT_DARK,
              padding: 8,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenu && (
        <div
          style={{
            position: "fixed",
            top: 60,
            left: 0,
            right: 0,
            zIndex: 99,
            background: CREAM,
            padding: 24,
            borderBottom: `1px solid ${CREAM_DARK}`,
            boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
          }}
        >
          {["Products", "Benefits", "Reviews", "FAQ"].map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase())}
              style={{
                display: "block",
                width: "100%",
                padding: "14px 0",
                background: "none",
                border: "none",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16,
                fontWeight: 600,
                color: TEXT_DARK,
                cursor: "pointer",
                textAlign: "left",
                borderBottom: `1px solid ${CREAM_DARK}`,
              }}
            >
              {link}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section style={{ padding: "140px 24px 80px", maxWidth: 1200, margin: "0 auto" }}>
        <div className="hero-grid" style={{ display: "flex", alignItems: "center", gap: 60 }}>
          <div className="hero-text" style={{ flex: 1, animation: "fadeUp 0.8s ease" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: `${TEAL}10`,
                padding: "8px 16px",
                borderRadius: 30,
                marginBottom: 24,
              }}
            >
              <span style={{ fontSize: 14 }}>🇺🇸</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: TEAL, letterSpacing: 0.5 }}>
                Proudly Made in the USA
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 56,
                fontWeight: 800,
                color: TEXT_DARK,
                lineHeight: 1.1,
                marginBottom: 20,
              }}
            >
              Premium Nutrition
              <br />
              for{" "}
              <span style={{ color: TEAL, position: "relative" }}>
                Happier Pups
                <svg style={{ position: "absolute", bottom: -6, left: 0, width: "100%" }} viewBox="0 0 200 12" fill="none">
                  <path d="M2 8c40-6 80-6 120-2s50 4 76-2" stroke={CORAL} strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 18,
                color: TEXT_MED,
                lineHeight: 1.7,
                marginBottom: 32,
                maxWidth: 500,
              }}
            >
              Vet-formulated supplements made with premium, human-grade ingredients your dog will love. Because they deserve the best.
            </p>

            <div className="cta-flex" style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <button
                onClick={() => scrollTo("products")}
                style={{
                  background: TEAL,
                  color: "white",
                  border: "none",
                  borderRadius: 14,
                  padding: "16px 36px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: `0 4px 20px ${TEAL}40`,
                  letterSpacing: 0.3,
                }}
                onMouseEnter={(e) => { e.target.style.background = TEAL_DARK; e.target.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.target.style.background = TEAL; e.target.style.transform = "translateY(0)"; }}
              >
                Shop Now
              </button>
              <button
                onClick={() => scrollTo("benefits")}
                style={{
                  background: "none",
                  color: TEAL,
                  border: `2px solid ${TEAL}`,
                  borderRadius: 14,
                  padding: "14px 28px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.background = `${TEAL}10`)}
                onMouseLeave={(e) => (e.target.style.background = "none")}
              >
                Learn More
              </button>
            </div>

            <div style={{ display: "flex", gap: 24, marginTop: 40, flexWrap: "wrap" }}>
              {["30-Day Guarantee", "Free Shipping $50+", "Vet Approved"].map((badge, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: TEAL, fontSize: 16 }}>✓</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: TEXT_MED }}>{badge}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: 1, display: "flex", justifyContent: "center", animation: "fadeUp 0.8s ease 0.2s both" }}>
            <div
              style={{
                width: 380,
                height: 380,
                borderRadius: "50%",
                background: `radial-gradient(circle at 30% 30%, ${TEAL_LIGHT}, ${TEAL}15)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                animation: "float 4s ease-in-out infinite",
              }}
            >
              {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    width: 12 + (i % 3) * 4,
                    height: 12 + (i % 3) * 4,
                    borderRadius: "50%",
                    background: i % 2 === 0 ? `${TEAL}30` : `${CORAL}30`,
                    top: `${50 + 45 * Math.sin((deg * Math.PI) / 180)}%`,
                    left: `${50 + 45 * Math.cos((deg * Math.PI) / 180)}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}
              <div style={{ fontSize: 140, lineHeight: 1, filter: "drop-shadow(0 8px 30px rgba(0,0,0,0.1))" }}>🐕</div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ background: TEAL, padding: "48px 24px" }}>
        <div
          className="stats-grid"
          style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, textAlign: "center" }}
        >
          {[
            { value: 50000, suffix: "+", label: "Happy Dogs" },
            { value: 4, suffix: ".9 ★", label: "Average Rating" },
            { value: 100, suffix: "%", label: "USA Made" },
            { value: 30, suffix: "-Day", label: "Money Back" },
          ].map((stat, i) => (
            <div key={i}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 800, color: "white" }}>
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.75)", marginTop: 4, fontWeight: 500 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" style={{ padding: "80px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, color: TEAL, letterSpacing: 3, textTransform: "uppercase" }}>
            Our Products
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 800, color: TEXT_DARK, marginTop: 12, lineHeight: 1.2 }}>
            Everything Your Pup Needs
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: TEXT_MED, marginTop: 12, maxWidth: 500, margin: "12px auto 0" }}>
            Premium, vet-formulated supplements crafted with human-grade ingredients and backed by science.
          </p>
        </div>
        <div className="products-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </section>

      {/* BENEFITS / INGREDIENTS */}
      <section id="benefits" style={{ padding: "80px 24px", background: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, color: TEAL, letterSpacing: 3, textTransform: "uppercase" }}>
              Why Pawza
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 800, color: TEXT_DARK, marginTop: 12 }}>
              The Pawza Difference
            </h2>
          </div>

          <div className="ingredients-inner" style={{ display: "flex", gap: 48, alignItems: "stretch" }}>
            <div style={{ flex: 1 }}>
              {[
                { icon: "🔬", title: "Vet-Formulated", desc: "Every formula is developed with veterinary nutritionists to ensure optimal dosing and ingredient synergy." },
                { icon: "🌿", title: "Premium Ingredients", desc: "We use only human-grade, non-GMO ingredients. No fillers, artificial colors, or unnecessary additives." },
                { icon: "🏭", title: "GMP-Certified Facility", desc: "Made in the USA in an FDA-registered, GMP-certified facility. Every batch is third-party tested." },
                { icon: "🐕", title: "Dogs Love the Taste", desc: "Naturally flavored with real chicken and peanut butter. No more hiding pills in cheese!" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 16, padding: "20px 0", borderBottom: i < 3 ? `1px solid ${CREAM_DARK}` : "none" }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: TEAL_LIGHT,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: TEXT_DARK, marginBottom: 4 }}>{item.title}</h4>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: TEXT_MED, lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ flex: 1, background: `linear-gradient(135deg, ${TEAL}08, ${TEAL}15)`, borderRadius: 24, padding: 36 }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: TEXT_DARK, marginBottom: 24 }}>
                Key Ingredients We Trust
              </h3>
              {[
                { name: "Glucosamine HCl", benefit: "Supports joint health and cartilage repair", amount: "500mg" },
                { name: "Omega-3 Fish Oil", benefit: "Promotes heart health and a shiny coat", amount: "300mg" },
                { name: "Probiotics", benefit: "Aids digestion and gut health", amount: "5B CFU" },
                { name: "Organic Turmeric", benefit: "Natural anti-inflammatory support", amount: "200mg" },
                { name: "CoQ10", benefit: "Cellular energy and heart function", amount: "30mg" },
                { name: "Biotin", benefit: "Supports skin health and coat quality", amount: "100mcg" },
              ].map((ing, i) => (
                <div
                  key={i}
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: i < 5 ? `1px solid ${TEAL}15` : "none" }}
                >
                  <div>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: TEXT_DARK }}>{ing.name}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: TEXT_LIGHT, display: "block" }}>{ing.benefit}</span>
                  </div>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      fontWeight: 700,
                      color: TEAL,
                      background: `${TEAL}10`,
                      padding: "4px 12px",
                      borderRadius: 20,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {ing.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="reviews" style={{ padding: "80px 24px", background: CREAM }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, color: TEAL, letterSpacing: 3, textTransform: "uppercase" }}>
              Reviews
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 800, color: TEXT_DARK, marginTop: 12 }}>
              Loved by Dogs & Their Humans
            </h2>
          </div>

          <div className="testimonials-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
            {testimonials.map((t, i) => (
              <div
                key={i}
                style={{ background: "white", borderRadius: 20, padding: 28, boxShadow: "0 2px 16px rgba(0,0,0,0.04)", transition: "transform 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <Stars count={t.rating} />
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: TEXT_DARK, lineHeight: 1.7, margin: "14px 0 18px", fontStyle: "italic" }}>
                  "{t.text}"
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, color: TEXT_DARK }}>{t.name}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: TEXT_LIGHT, display: "block" }}>{t.dog}</span>
                  </div>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: TEAL, background: TEAL_LIGHT, padding: "4px 12px", borderRadius: 20 }}>
                    {t.product}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUBSCRIBE & SAVE CTA */}
      <section style={{ padding: "80px 24px", background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.05)", top: -100, right: -100 }} />
        <div style={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.03)", bottom: -50, left: 50 }} />

        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 800, color: "white", marginBottom: 16 }}>
            Subscribe & Save 20%
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, marginBottom: 32 }}>
            Never run out of your pup's favorite supplements. Choose your delivery frequency, save 20% on every order, and enjoy free shipping — always. Cancel or pause anytime.
          </p>
          <div className="cta-flex" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            {["Every 30 Days", "Every 60 Days", "Every 90 Days"].map((freq) => {
              const isSelected = freq === selectedFreq;
              return (
                <button
                  key={freq}
                  onClick={() => setSelectedFreq(freq)}
                  style={{
                    background: isSelected ? "white" : "rgba(255,255,255,0.15)",
                    color: isSelected ? TEAL : "white",
                    padding: "14px 28px",
                    borderRadius: 12,
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: 15,
                    cursor: "pointer",
                    border: isSelected ? "2px solid white" : "2px solid rgba(255,255,255,0.3)",
                    transition: "all 0.2s",
                  }}
                >
                  {freq}
                  {freq === "Every 30 Days" && (
                    <span style={{ display: "block", fontSize: 12, fontWeight: 500, marginTop: 2, color: isSelected ? TEXT_MED : "rgba(255,255,255,0.7)" }}>
                      Most Popular
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => scrollTo("products")}
            style={{
              marginTop: 32,
              background: "white",
              color: TEAL,
              border: "none",
              borderRadius: 14,
              padding: "16px 40px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: 16,
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
          >
            Start Saving Today
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "80px 24px", background: "white" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, color: TEAL, letterSpacing: 3, textTransform: "uppercase" }}>
              FAQ
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 800, color: TEXT_DARK, marginTop: 12 }}>
              Common Questions
            </h2>
          </div>
          {faqs.map((faq, i) => (
            <FaqItem key={i} faq={faq} />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: TEXT_DARK, padding: "60px 24px 32px" }}>
        <div className="footer-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <PawzaLogo height={26} color={"#a8d8d0"} />
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 300 }}>
              Premium supplements for happier, healthier pups. Made with love in the USA.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              <a
                href="https://instagram.com/pawzapets"
                target="_blank"
                rel="noopener noreferrer"
                style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, textDecoration: "none", transition: "background 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
              >
                📷
              </a>
              <a
                href="https://tiktok.com/@pawzapets"
                target="_blank"
                rel="noopener noreferrer"
                style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, textDecoration: "none", transition: "background 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
              >
                🎵
              </a>
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: "white", letterSpacing: 1, marginBottom: 18, textTransform: "uppercase" }}>Shop</h4>
            {products.map((p) => (
              <button
                key={p.id}
                onClick={() => scrollTo("products")}
                style={{ display: "block", background: "none", border: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.6)", cursor: "pointer", padding: "6px 0", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.target.style.color = "white")}
                onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.6)")}
              >
                {p.name}
              </button>
            ))}
          </div>

          <div>
            <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: "white", letterSpacing: 1, marginBottom: 18, textTransform: "uppercase" }}>Company</h4>
            {["About Us", "Our Story", "Quality Promise", "Contact"].map((link) => (
              <button
                key={link}
                style={{ display: "block", background: "none", border: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.6)", cursor: "pointer", padding: "6px 0", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.target.style.color = "white")}
                onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.6)")}
              >
                {link}
              </button>
            ))}
          </div>

          <div>
            <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: "white", letterSpacing: 1, marginBottom: 18, textTransform: "uppercase" }}>Support</h4>
            {["FAQ", "Shipping Policy", "Returns", "Privacy Policy"].map((link) => (
              <button
                key={link}
                onClick={link === "FAQ" ? () => scrollTo("faq") : undefined}
                style={{ display: "block", background: "none", border: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.6)", cursor: "pointer", padding: "6px 0", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.target.style.color = "white")}
                onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.6)")}
              >
                {link}
              </button>
            ))}
            <a
              href="mailto:support@pawzapets.com"
              style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: TEAL_LIGHT, padding: "6px 0", textDecoration: "none", marginTop: 8 }}
            >
              support@pawzapets.com
            </a>
          </div>
        </div>

        <div
          style={{
            maxWidth: 1200,
            margin: "40px auto 0",
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
            © 2026 Pawza Pets. All rights reserved.
          </span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
            pawzapets.com
          </span>
        </div>
      </footer>

      <Cart cart={cart} setCart={setCart} isOpen={cartOpen} setIsOpen={setCartOpen} />
    </div>
  );
}
