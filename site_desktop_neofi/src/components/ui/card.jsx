import { forwardRef } from 'react';

const mergeStyles = (baseStyle, style) => ({ ...baseStyle, ...(style || {}) });

export const Card = forwardRef(function Card({ style, ...props }, ref) {
  return (
    <div
      ref={ref}
      style={mergeStyles(
        {
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(255,255,255,0.12)',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))',
          boxShadow: 'var(--shadow-card)',
          backdropFilter: 'blur(var(--blur-md))',
        },
        style
      )}
      {...props}
    />
  );
});

export const CardHeader = forwardRef(function CardHeader({ style, ...props }, ref) {
  return (
    <div
      ref={ref}
      style={mergeStyles(
        {
          padding: '1.25rem 1.35rem 0.75rem',
        },
        style
      )}
      {...props}
    />
  );
});

export const CardTitle = forwardRef(function CardTitle({ style, ...props }, ref) {
  return (
    <div
      ref={ref}
      style={mergeStyles(
        {
          margin: 0,
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: '-0.02em',
        },
        style
      )}
      {...props}
    />
  );
});

export const CardDescription = forwardRef(function CardDescription({ style, ...props }, ref) {
  return (
    <div
      ref={ref}
      style={mergeStyles(
        {
          marginTop: '0.5rem',
          color: 'rgba(255,255,255,0.85)',
          fontSize: '1.05rem',
          lineHeight: 1.55,
        },
        style
      )}
      {...props}
    />
  );
});

export const CardContent = forwardRef(function CardContent({ style, ...props }, ref) {
  return (
    <div
      ref={ref}
      style={mergeStyles(
        {
          padding: '0 1.35rem 1.35rem',
        },
        style
      )}
      {...props}
    />
  );
});

export const CardFooter = forwardRef(function CardFooter({ style, ...props }, ref) {
  return (
    <div
      ref={ref}
      style={mergeStyles(
        {
          padding: '0 1.35rem 1.35rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        },
        style
      )}
      {...props}
    />
  );
});
