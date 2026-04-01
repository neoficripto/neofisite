import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

const toRgb = (hex) => {
  const normalized = String(hex || '').replace('#', '');
  const full = normalized.length === 3 ? normalized.split('').map((ch) => ch + ch).join('') : normalized;
  const value = Number.parseInt(full, 16);
  if (Number.isNaN(value)) return '60, 82, 237';
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `${r}, ${g}, ${b}`;
};

const styles = {
  card: {
    width: '350px',
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
    textDecoration: 'none',
    transition: 'background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
  },
};

export default function ProductTeaserCard({
  name,
  description,
  image,
  accentColor = '#3c52ed',
  buttonLabel = 'Fale com um especialista',
  buttonHref,
  enableShine = true,
  enableShadow = true,
  style,
}) {
  const MotionDiv = motion.div;
  const MotionA = motion.a;
  const shouldReduceMotion = useReducedMotion();

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
    <MotionDiv
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onFocus={onLeave}
      style={{
        perspective: '1100px',
        borderRadius: '18px',
      }}
      whileHover={!shouldReduceMotion ? { scale: 1.03 } : undefined}
      whileTap={!shouldReduceMotion ? { scale: 0.99 } : undefined}
    >
      <MotionDiv
        style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          boxShadow: enableShadow
            ? (shouldReduceMotion ? '0px 10px 26px rgba(0,0,0,0.22)' : boxShadow)
            : 'none',
          borderRadius: '18px',
        }}
      >
        <MotionDiv
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

        <div style={{ position: 'relative', borderRadius: '18px', overflow: 'hidden' }}>
          {enableShine ? (
            <MotionDiv
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '18px',
                pointerEvents: 'none',
                backgroundImage: shine,
                opacity: shouldReduceMotion ? 0 : 1,
              }}
            />
          ) : null}

          <Card
            style={{
              ...styles.card,
              borderColor: 'rgba(var(--color-brand-rgb), 0.35)',
              ...(style || {}),
            }}
          >
            <div style={styles.imageWrap}>
              <img src={image} alt={name} style={styles.image} />
            </div>
            <CardHeader style={styles.cardHeader}>
              <CardTitle style={styles.title}>{name}</CardTitle>
            </CardHeader>
            <CardContent style={styles.cardContent}>
              <CardDescription style={styles.desc}>{description}</CardDescription>
            </CardContent>
            <CardFooter style={styles.cardFooter}>
              {buttonHref ? (
                <MotionA
                  href={buttonHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.button}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: 1.05,
                          backgroundColor: 'var(--color-accent-hover)',
                          borderColor: 'rgba(255,255,255,0.22)',
                        }
                  }
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                >
                  {buttonLabel}
                </MotionA>
              ) : null}
            </CardFooter>
          </Card>
        </div>
      </MotionDiv>
    </MotionDiv>
  );
}
