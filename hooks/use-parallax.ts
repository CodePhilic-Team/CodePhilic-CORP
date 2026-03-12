import { useScroll, useTransform, type MotionValue } from "framer-motion";

/**
 * Returns a MotionValue<string> that translates an element at `speed`
 * times the window scroll distance.
 * Negative speed → element lifts upward as user scrolls down (parallax).
 */
export function useParallax(speed: number = -0.15): MotionValue<string> {
  const { scrollY } = useScroll();
  return useTransform(scrollY, (v) => `${v * speed}px`);
}
