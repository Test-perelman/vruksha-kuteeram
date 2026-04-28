'use client';

import { AnimatePresence, motion, type PanInfo, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUp } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

export type VerticalImageStackItem = {
  name: string;
  type: string;
  image: string;
  detail?: string;
};

type VerticalImageStackProps = {
  items: VerticalImageStackItem[];
  initialIndex?: number;
  className?: string;
  onActiveChange?: (item: VerticalImageStackItem, index: number) => void;
  onOpen?: (item: VerticalImageStackItem, index: number) => void;
};

const navigationCooldown = 360;

export function VerticalImageStack({
  items,
  initialIndex = 0,
  className = '',
  onActiveChange,
  onOpen
}: VerticalImageStackProps) {
  const [currentIndex, setCurrentIndex] = useState(() => Math.min(Math.max(initialIndex, 0), Math.max(items.length - 1, 0)));
  const safeCurrentIndex = Math.min(currentIndex, Math.max(items.length - 1, 0));
  const lastNavigationTime = useRef(0);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const activeItem = items[safeCurrentIndex];
    if (activeItem) {
      onActiveChange?.(activeItem, safeCurrentIndex);
    }
  }, [safeCurrentIndex, items, onActiveChange]);

  const navigate = useCallback(
    (direction: number) => {
      if (items.length < 2) return;

      const now = Date.now();
      if (now - lastNavigationTime.current < navigationCooldown) return;
      lastNavigationTime.current = now;

      setCurrentIndex((previous) => {
        const safePrevious = Math.min(previous, items.length - 1);
        if (direction > 0) {
          return safePrevious === items.length - 1 ? 0 : safePrevious + 1;
        }

        return safePrevious === 0 ? items.length - 1 : safePrevious - 1;
      });
    },
    [items.length]
  );

  const jumpTo = useCallback(
    (index: number) => {
      if (index === safeCurrentIndex) return;
      lastNavigationTime.current = Date.now();
      setCurrentIndex(index);
    },
    [safeCurrentIndex]
  );

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 52;
    if (info.offset.y < -threshold) {
      navigate(1);
    } else if (info.offset.y > threshold) {
      navigate(-1);
    }
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const handleWheel = (event: globalThis.WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (Math.abs(event.deltaY) < 8) return;
      navigate(event.deltaY > 0 ? 1 : -1);
    };

    root.addEventListener('wheel', handleWheel, { passive: false });

    return () => root.removeEventListener('wheel', handleWheel);
  }, [navigate]);

  const getCardStyle = useCallback(
    (index: number) => {
      const total = items.length;
      let diff = index - safeCurrentIndex;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;

      if (diff === 0) {
        return { y: 0, scale: 1, opacity: 1, zIndex: 5, rotateX: 0 };
      }

      if (diff === -1) {
        return { y: -158, scale: 0.84, opacity: 0.62, zIndex: 4, rotateX: 8 };
      }

      if (diff === -2) {
        return { y: -282, scale: 0.7, opacity: 0.28, zIndex: 3, rotateX: 15 };
      }

      if (diff === 1) {
        return { y: 158, scale: 0.84, opacity: 0.62, zIndex: 4, rotateX: -8 };
      }

      if (diff === 2) {
        return { y: 282, scale: 0.7, opacity: 0.28, zIndex: 3, rotateX: -15 };
      }

      return {
        y: diff > 0 ? 410 : -410,
        scale: 0.62,
        opacity: 0,
        zIndex: 0,
        rotateX: diff > 0 ? -20 : 20
      };
    },
    [safeCurrentIndex, items.length]
  );

  const isVisible = useCallback(
    (index: number) => {
      const total = items.length;
      let diff = index - safeCurrentIndex;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;
      return Math.abs(diff) <= 2;
    },
    [safeCurrentIndex, items.length]
  );

  if (!items.length) {
    return null;
  }

  const currentItem = items[safeCurrentIndex];

  return (
    <div
      ref={rootRef}
      className={`relative flex min-h-[600px] w-full touch-none items-center justify-center overflow-hidden overscroll-contain ${className}`}
      aria-roledescription="carousel"
      aria-label="Project image carousel"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(215,194,154,.18),transparent_32rem)]" />

      <div className="absolute left-0 top-1/2 hidden -translate-y-1/2 flex-col items-center md:flex">
        <span className="font-serif text-5xl font-light leading-none text-earth-300 tabular-nums">
          {String(safeCurrentIndex + 1).padStart(2, '0')}
        </span>
        <div className="my-3 h-px w-10 bg-earth-300/30" />
        <span className="text-xs font-bold uppercase tracking-[0.26em] text-cream-100/65 tabular-nums">
          {String(items.length).padStart(2, '0')}
        </span>
      </div>

      <div className="relative flex h-[540px] w-full max-w-[380px] items-center justify-center sm:h-[620px] sm:max-w-[460px]" style={{ perspective: '1200px' }}>
        <AnimatePresence initial={false}>
          {items.map((item, index) => {
            if (!isVisible(index)) return null;

            const style = getCardStyle(index);
            const isCurrent = index === safeCurrentIndex;

            return (
              <motion.button
                key={item.name}
                type="button"
                aria-label={isCurrent ? `Open ${item.name}` : `Go to ${item.name}`}
                tabIndex={isCurrent ? 0 : -1}
                className="focus-ring absolute cursor-grab touch-pan-y text-left active:cursor-grabbing"
                animate={{
                  y: style.y,
                  scale: style.scale,
                  opacity: style.opacity,
                  rotateX: style.rotateX
                }}
                initial={false}
                exit={{ opacity: 0, scale: 0.72 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0.01 }
                    : {
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                        mass: 1
                      }
                }
                drag={isCurrent ? 'y' : false}
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.18}
                onDragEnd={handleDragEnd}
                onClick={() => {
                  if (isCurrent) {
                    onOpen?.(item, index);
                  } else {
                    jumpTo(index);
                  }
                }}
                style={{
                  transformStyle: 'preserve-3d',
                  zIndex: style.zIndex
                }}
              >
                <div
                  className="relative h-[400px] w-[280px] overflow-hidden rounded-[1.65rem] border border-earth-300/35 bg-cream-50/10 shadow-botanical sm:h-[500px] sm:w-[340px] lg:h-[540px] lg:w-[370px]"
                  style={{
                    boxShadow: isCurrent ? '0 32px 90px rgba(7, 19, 13, .38), 0 0 0 1px rgba(215, 194, 154, .18)' : '0 18px 52px rgba(7, 19, 13, .24)'
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(min-width: 1024px) 370px, (min-width: 640px) 340px, 280px"
                    className="object-cover"
                    draggable={false}
                    priority={isCurrent}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/18 to-transparent opacity-95" />
                  <div className="absolute inset-0 bg-gradient-to-b from-cream-50/10 via-transparent to-transparent" />

                  <motion.div
                    className="absolute inset-x-0 bottom-0 p-5 sm:p-6"
                    animate={{ opacity: isCurrent ? 1 : 0, y: isCurrent ? 0 : 12 }}
                    transition={{ duration: shouldReduceMotion ? 0.01 : 0.24 }}
                  >
                    <p className="mb-3 text-[0.58rem] font-bold uppercase tracking-[0.2em] text-earth-300 sm:text-[0.62rem]">
                      {item.type}
                    </p>
                    <h3 className="max-w-[15rem] font-serif text-3xl font-semibold leading-none tracking-[-0.035em] text-cream-50 sm:max-w-[18rem] sm:text-4xl">
                      {item.name}
                    </h3>
                  </motion.div>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 flex-col gap-3 sm:flex">
        <button
          type="button"
          aria-label="Previous project"
          onClick={() => navigate(-1)}
          className="focus-ring grid size-11 place-items-center rounded-full border border-earth-300/45 bg-forest-950/45 text-earth-300 backdrop-blur-md transition-all duration-300 hover:bg-earth-300 hover:text-forest-950"
        >
          <ArrowUp className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Next project"
          onClick={() => navigate(1)}
          className="focus-ring grid size-11 place-items-center rounded-full border border-earth-300/45 bg-forest-950/45 text-earth-300 backdrop-blur-md transition-all duration-300 hover:bg-earth-300 hover:text-forest-950"
        >
          <ArrowDown className="size-4" />
        </button>
      </div>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-6">
        {items.map((item, index) => (
          <button
            key={item.name}
            type="button"
            aria-label={`Go to ${item.name}`}
            onClick={() => jumpTo(index)}
            className={`focus-ring rounded-full transition-all duration-300 ${
              index === safeCurrentIndex ? 'h-2.5 w-8 bg-earth-300' : 'size-2.5 bg-cream-100/25 hover:bg-cream-100/55'
            }`}
          />
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Current project: {currentItem.name}
      </p>
    </div>
  );
}
