import React, { useEffect, useRef } from 'react';

const BouncingLogos = ({ 
  logos = [], 
  containerHeight = '400px', 
  circleSize = 80,
  speed = 2,
  interactionRadius = 200, // Increased slightly for better "sucking" feel
  pushStrength = 1.7         // Increased slightly for snappier reaction
}) => {
  const containerRef = useRef(null);
  const requestRef = useRef();
  const atomsRef = useRef([]);
  const dimensionsRef = useRef({ width: 0, height: 0, left: 0, top: 0 });
  
  // Track mouse position and click state
  const mouseRef = useRef({ x: null, y: null });
  const isMouseDownRef = useRef(false);
  const pointerIdRef = useRef(null);

  const setPointerPosition = (clientX, clientY) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const handlePointerMove = (e) => {
    setPointerPosition(e.clientX, e.clientY);
  };

  const handlePointerDown = (e) => {
    pointerIdRef.current = e.pointerId;
    containerRef.current?.setPointerCapture?.(e.pointerId);
    isMouseDownRef.current = true;
    if(containerRef.current) containerRef.current.style.cursor = 'grabbing';
    setPointerPosition(e.clientX, e.clientY);
  };

  const handlePointerUp = (e) => {
    if (pointerIdRef.current === e.pointerId) {
      containerRef.current?.releasePointerCapture?.(e.pointerId);
      pointerIdRef.current = null;
    }
    isMouseDownRef.current = false;
    if(containerRef.current) containerRef.current.style.cursor = 'grab';
  };

  const handlePointerCancel = (e) => {
    if (pointerIdRef.current === e.pointerId) {
      containerRef.current?.releasePointerCapture?.(e.pointerId);
      pointerIdRef.current = null;
    }
    mouseRef.current = { x: null, y: null };
    isMouseDownRef.current = false;
    if (containerRef.current) containerRef.current.style.cursor = 'grab';
  };

  const handlePointerLeave = () => {
    if (pointerIdRef.current !== null) return;
    mouseRef.current = { x: null, y: null };
    isMouseDownRef.current = false;
    if (containerRef.current) containerRef.current.style.cursor = 'grab';
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || logos.length === 0) return;

    const updateDimensions = () => {
      const { width, height, left, top } = container.getBoundingClientRect();
      dimensionsRef.current = { width, height, left, top };
    };
    updateDimensions();

    let resizeObserver = null;
    const hasResizeObserver = typeof ResizeObserver !== 'undefined';
    if (hasResizeObserver) {
      resizeObserver = new ResizeObserver((entries) => {
        if (!entries || entries.length === 0) return;
        updateDimensions();
      });
      resizeObserver.observe(container);
    } else {
      window.addEventListener('resize', updateDimensions);
      window.addEventListener('orientationchange', updateDimensions);
    }

    const resolveCollision = (atomA, atomB) => {
      const dx = atomA.x - atomB.x;
      const dy = atomA.y - atomB.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < circleSize) {
        const overlap = circleSize - distance;
        const angle = Math.atan2(dy, dx);
        const moveX = (overlap / 2) * Math.cos(angle);
        const moveY = (overlap / 2) * Math.sin(angle);
        
        atomA.x += moveX;
        atomA.y += moveY;
        atomB.x -= moveX;
        atomB.y -= moveY;

        const rotate = (velocity, angle) => ({
          x: velocity.x * Math.cos(angle) + velocity.y * Math.sin(angle),
          y: -velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
        });

        const u1 = rotate({ x: atomA.vx, y: atomA.vy }, angle);
        const u2 = rotate({ x: atomB.vx, y: atomB.vy }, angle);

        const v1 = { x: u2.x, y: u1.y };
        const v2 = { x: u1.x, y: u2.y };

        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        atomA.vx = vFinal1.x;
        atomA.vy = vFinal1.y;
        atomB.vx = vFinal2.x;
        atomB.vy = vFinal2.y;
      }
    };

const update = () => {
      updateDimensions();
      const { width, height } = dimensionsRef.current;
      const mouse = mouseRef.current;
      const isMouseDown = isMouseDownRef.current;
      
      if (width === 0 || height === 0) {
        requestRef.current = requestAnimationFrame(update);
        return;
      }

      if (atomsRef.current.length !== logos.length) {
        atomsRef.current = logos.map((_, index) => {
          const existing = atomsRef.current[index];
          if (existing) return existing;
          return {
            x: Math.random() * Math.max(1, width - circleSize),
            y: Math.random() * Math.max(1, height - circleSize),
            vx: (Math.random() - 0.5) * speed,
            vy: (Math.random() - 0.5) * speed,
            element: null,
          };
        });
      }

      atomsRef.current.forEach((atom, i) => {
        // --- INTERACTION LOGIC ---
        if (mouse.x !== null && mouse.y !== null) {
          const atomCenterX = atom.x + circleSize / 2;
          const atomCenterY = atom.y + circleSize / 2;
          const dx = atomCenterX - mouse.x;
          const dy = atomCenterY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const effectiveRadius = isMouseDown ? Math.max(width, height) : interactionRadius;

          if (dist < effectiveRadius) {
            const rawForce = (effectiveRadius - dist) / effectiveRadius;
            const direction = isMouseDown ? -1 : 1;
            const strengthMultiplier = isMouseDown ? 0.05 : 1; 

            const angle = Math.atan2(dy, dx);
            const pushX = Math.cos(angle) * rawForce * pushStrength * direction * strengthMultiplier;
            const pushY = Math.sin(angle) * rawForce * pushStrength * direction * strengthMultiplier;

            atom.vx += pushX;
            atom.vy += pushY;
          }
        }

        // --- PHYSICS UPDATE ---
        
        // 1. Apply Friction (stabilizes the movement)
        const friction = isMouseDown ? 0.96 : 0.99;
        atom.vx *= friction; 
        atom.vy *= friction;

        // 2. Calculate Current Speed
        const currentSpeed = Math.sqrt(atom.vx * atom.vx + atom.vy * atom.vy);

        // 3. Speed Limiter (Cap Max Speed)
        const maxSpeed = 1; 
        if (currentSpeed > maxSpeed) {
          atom.vx = (atom.vx / currentSpeed) * maxSpeed;
          atom.vy = (atom.vy / currentSpeed) * maxSpeed;
        }

        // 4. CRUISE CONTROL (The Fix)
        // If the ball is moving slower than the default 'speed' prop, 
        // gently accelerate it back up.
        if (currentSpeed < speed) {
            // Accelerate by 2% per frame until we reach cruising speed
            const recoveryRate = 1.02; 
            
            // Safety check: if completely stopped, give a tiny random nudge
            if (currentSpeed < 0.1) {
                 atom.vx += (Math.random() - 0.5) * 0.5;
                 atom.vy += (Math.random() - 0.5) * 0.5;
            } else {
                 atom.vx *= recoveryRate;
                 atom.vy *= recoveryRate;
            }
        }

        atom.x += atom.vx;
        atom.y += atom.vy;

        // Bounds
        if (atom.x <= 0) { atom.x = 0; atom.vx *= -1; }
        else if (atom.x + circleSize >= width) { atom.x = width - circleSize; atom.vx *= -1; }
        
        if (atom.y <= 0) { atom.y = 0; atom.vy *= -1; }
        else if (atom.y + circleSize >= height) { atom.y = height - circleSize; atom.vy *= -1; }

        // Collision
        for (let j = i + 1; j < atomsRef.current.length; j++) {
          resolveCollision(atom, atomsRef.current[j]);
        }

        const el = atom.element;
        if (el) {
          el.style.transform = `translate(${atom.x}px, ${atom.y}px)`;
        }
      });

      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(requestRef.current);
      if (resizeObserver) resizeObserver.disconnect();
      if (!hasResizeObserver) {
        window.removeEventListener('resize', updateDimensions);
        window.removeEventListener('orientationchange', updateDimensions);
      }
    };
  }, [logos, speed, circleSize, interactionRadius, pushStrength]);

  return (
    <div 
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      style={{
        position: 'relative',
        width: '100%',
        height: containerHeight,
        overflow: 'hidden',
        backgroundColor: 'transparent', 
        border: 'none',
        borderRadius: '15px',
        cursor: 'grab', // Default cursor
        touchAction: 'none' // Prevents scrolling on mobile while dragging in the box
      }}
    >
      {logos.map((item, index) => {
        const isObject = typeof item === 'object';
        const src = isObject ? item.src : item;
        const color = isObject ? item.color : 'white';

        return (
          <div
            key={index}
            ref={(el) => {
              if (!el) {
                if (atomsRef.current[index]) atomsRef.current[index].element = null;
                return;
              }

              const { width, height } = dimensionsRef.current;

              if (!atomsRef.current[index]) {
                atomsRef.current[index] = {
                  x: Math.random() * Math.max(1, width - circleSize),
                  y: Math.random() * Math.max(1, height - circleSize),
                  vx: (Math.random() - 0.5) * speed,
                  vy: (Math.random() - 0.5) * speed,
                  element: el,
                };
              } else {
                atomsRef.current[index].element = el;
              }
            }}
            style={{
              position: 'absolute',
              width: `${circleSize}px`,
              height: `${circleSize}px`,
              borderRadius: '50%',
              backgroundColor: color,
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', 
              top: 0,
              left: 0,
              willChange: 'transform',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px',
              pointerEvents: 'none' 
            }}
          >
            <img 
              src={src} 
              alt="token" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                pointerEvents: 'none',
                userSelect: 'none'
              }} 
            />
          </div>
        );
      })}
    </div>
  );
};

export default BouncingLogos;
