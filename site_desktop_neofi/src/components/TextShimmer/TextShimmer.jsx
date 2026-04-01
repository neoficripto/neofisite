'use client';
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import styles from './TextShimmer.module.css'; // Import the CSS file

export function TextShimmer({
  children,
  as: Component = 'p',
  className = '', // Default to empty string
  duration = 2,
  spread = 2,
}) {
  const MotionComponent = motion(Component);

  const dynamicSpread = useMemo(() => {
    return children.length * spread;
  }, [children, spread]);

  return (
    <MotionComponent
      // We apply our CSS class here, plus any extra classes passed in via props
      className={[styles.textShimmer, className].filter(Boolean).join(' ')}
      
      initial={{ backgroundPosition: '100% center' }}
      animate={{ backgroundPosition: '0% center' }}
      transition={{
        repeat: Infinity,
        duration,
        ease: 'linear',
      }}
      style={{
        // We still need these dynamic styles in JS because they calculate 
        // values based on the prop 'spread' and 'children.length'
        '--spread': `${dynamicSpread}px`,
        backgroundImage: `var(--bg), linear-gradient(var(--base-color), var(--base-color))`,
      }}
    >
      {children}
    </MotionComponent>
  );
}
