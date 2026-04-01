import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';

import neoCommunityImage from '../../assets/Home/NeoCommunityLogo2D.png';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import neoResearchImage from '../../assets/Home/NeoFiResearchProLogo2D.png';
import neoToolsImage from '../../assets/Home/NeoFiToolsLogo2D.png';
import { buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from '../../lib/whatsapp';


// 1. The Product Data
const products = [
  {
    id: 1,
    name: "NeoBoost",
    description: "Uma estratégia estruturada sobre infraestrutura financeira em blockchain.",
    image: neoCommunityImage,
    color: "#3c52ed"
  },
  {
    id: 2,
    name: "NeoLine",
    description: "Crédito com Bitcoin como garantia, com regras claras e gestão da operação.",
    image: neoResearchImage,
    color: "#3c52ed"
  },
  {
    id: 3,
    name: "NeoYield",
    description: "Uma estrutura em blockchain que transforma dólar em renda com mais eficiência.",
    image: neoToolsImage,
    color: "#3c52ed"
  }
];

// 2. Animation Variants (Config)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const cardVariants = {
  hidden: { y: 50, opacity: 0 }, // Start slightly down and transparent
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const InteractiveCard = ({ children, accentColor }) => {
  const shouldReduceMotion = useReducedMotion();

  const toRgb = (hex) => {
    const normalized = String(hex || '').replace('#', '');
    const full = normalized.length === 3
      ? normalized.split('').map((ch) => ch + ch).join('')
      : normalized;
    const value = Number.parseInt(full, 16);
    if (Number.isNaN(value)) return '60, 82, 237';
    const r = (value >> 16) & 255;
    const g = (value >> 8) & 255;
    const b = value & 255;
    return `${r}, ${g}, ${b}`;
  };

  const glowRgb = toRgb(accentColor);

  const dx = useMotionValue(0);
  const dy = useMotionValue(0);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(dy, [-0.5, 0.5], [8, -8]), { stiffness: 220, damping: 18 });
  const rotateY = useSpring(useTransform(dx, [-0.5, 0.5], [-10, 10]), { stiffness: 220, damping: 18 });
  const lift = useSpring(0, { stiffness: 220, damping: 18 });

  const shadowY = useTransform(lift, [0, 1], [10, 18]);
  const shadowBlur = useTransform(lift, [0, 1], [26, 46]);
  const shadowAlpha = useTransform(lift, [0, 1], [0.22, 0.36]);
  const boxShadow = useMotionTemplate`0px ${shadowY}px ${shadowBlur}px rgba(0,0,0,${shadowAlpha})`;

  const glowOutlineAlpha = useTransform(lift, [0, 1], [0.08, 0.25]);
  const glowAlpha = useTransform(lift, [0, 1], [0.0, 0.22]);
  const glowShadow = useMotionTemplate`0 0 0 1px rgba(${glowRgb}, ${glowOutlineAlpha}), 0 0 40px rgba(${glowRgb}, ${glowAlpha})`;

  const shine = useMotionTemplate`radial-gradient(520px circle at ${mx}px ${my}px, rgba(255,255,255,0.16), transparent 55%)`;

  const onMove = (e) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mx.set(x);
    my.set(y);
    dx.set((x / rect.width - 0.5) * 1.0);
    dy.set((y / rect.height - 0.5) * 1.0);
    lift.set(1);
  };

  const onLeave = () => {
    dx.set(0);
    dy.set(0);
    lift.set(0);
  };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onFocus={onLeave}
      style={{
        ...styles.motionCardWrap,
        perspective: '1100px',
      }}
      whileHover={!shouldReduceMotion ? { scale: 1.03 } : undefined}
      whileTap={!shouldReduceMotion ? { scale: 0.99 } : undefined}
    >
      <motion.div
        style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          boxShadow: shouldReduceMotion ? "0px 10px 26px rgba(0,0,0,0.22)" : boxShadow,
          borderRadius: '18px',
        }}
      >
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: -1,
            borderRadius: '18px',
            pointerEvents: 'none',
            backgroundImage: shine,
            opacity: shouldReduceMotion ? 0 : 1,
          }}
        />
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: -1,
            borderRadius: '18px',
            pointerEvents: 'none',
            boxShadow: glowShadow,
            opacity: shouldReduceMotion ? 0 : 1,
          }}
        />
        {children}
      </motion.div>
    </motion.div>
  );
};

const ProductSection = () => {
  const MotionDiv = motion.div;
  const MotionA = motion.a;
  const shouldReduceMotion = useReducedMotion();
  return (
    <div style={styles.section}>
      <h2 style={styles.header}>Conheça nossos produtos</h2>
      
      {/* Container */}
      <MotionDiv 
        style={styles.grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }} // Animates only once when scrolled into view
      >
        {products.map((product) => (
          <MotionDiv key={product.id} variants={cardVariants}>
            <InteractiveCard accentColor={product.color}>
              <Card
                style={{
                  ...styles.card,
                  borderColor: 'rgba(var(--color-brand-rgb), 0.35)',
                }}
              >
                <div style={styles.imageWrap}>
                  <img src={product.image} alt={product.name} style={styles.image} />
                </div>
                <CardHeader style={styles.cardHeader}>
                  <div style={styles.titleRow}>
                    <CardTitle style={styles.title}>{product.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent style={styles.cardContent}>
                  <CardDescription style={styles.desc}>{product.description}</CardDescription>
                </CardContent>
                <CardFooter style={styles.cardFooter}>
                  <MotionA
                    href={buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.button}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : { scale: 1.05, backgroundColor: 'var(--color-accent-hover)', borderColor: 'rgba(255,255,255,0.22)' }
                    }
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  >
                    Fale com um especialista
                  </MotionA>
                </CardFooter>
              </Card>
            </InteractiveCard>
          </MotionDiv>
        ))}
      </MotionDiv>
    </div>
  );
};

// 3. Simple Inline Styles (You can replace this with CSS Modules or Tailwind)
const styles = {
  section: {
    position: 'relative',
    padding: '4rem clamp(1rem, 4vw, 3rem)',
    textAlign: 'center',
    background: 'transparent',
    width: '100%',
    boxSizing: 'border-box',
    zIndex: '99'
  },
  header: {
    marginBottom: '3rem',
    fontSize: 'clamp(1.75rem, 4.5vw, 2.5rem)',
    color: '#ffffff',
  },
  grid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    flexWrap: 'wrap',
  },
  motionCardWrap: {
    borderRadius: '18px',
  },
  card: {
    width: 'min(350px, 92vw)',
    borderRadius: '18px',
    overflow: 'hidden',
    cursor: 'pointer',
    textAlign: 'left',
    height: '430px',
    display: 'flex',
    flexDirection: 'column',
  },
  imageWrap: {
    position: 'relative',
    width: '100%',
    height: '220px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '14px',
    background: 'rgba(1, 0, 20, 0.12)',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    display: 'block',
  },
  cardHeader: {
    padding: '1.1rem 1.35rem 0.65rem',
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    margin: 0,
  },
  cardContent: {
    padding: '0 1.35rem 1.1rem',
    flex: 1,
    display: 'flex',
  },
  desc: {
    margin: 0,
  },
  cardFooter: {
    padding: '0 1.35rem 1.35rem',
  },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '100px',
    height: '32px',
    padding: '0 1rem',
    background: 'var(--color-accent)',
    color: '#ffffff',
    border: '1px solid rgba(255,255,255,0.14)',
    borderRadius: 'var(--radius-pill)',
    fontSize: '0.9rem',
    fontWeight: 500,
    letterSpacing: '0.01em',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
  },
};

export default ProductSection;
