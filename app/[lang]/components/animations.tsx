"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, type JSX } from "react";
import { animate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React from "react";

/**
 * `AnimatedCard` is a React component that animates a card into view as the user scrolls.
 * The animation direction can be configured to horizontal (x-axis) or vertical (y-axis) based on props.
 *
 * @param {object} props - The properties for the `AnimatedCard` component.
 * @param {React.ReactNode} props.children - The content to display inside the card.
 * @param {string} [props.className] - Optional CSS class for additional styling.
 * @param {"x" | "y"} [props.XorY="y"] - Determines the direction of the animation. Use "x" for horizontal, "y" for vertical. Defaults to "y".
 * @param {number} [props.initialX=20] - The initial horizontal offset for the animation. Defaults to 20.
 * @param {number} [props.initialY=20] - The initial vertical offset for the animation. Defaults to 20.
 * @param {number} [props.duration=1] - The initial duration for the animation. Defaults to 1s.
 *
 * @returns {JSX.Element} - The `AnimatedCard` component with applied animations.
 */
const AnimatedCard = React.memo(
  ({
    children,
    className,
    XorY = "y",
    initialX = 20,
    initialY = 20,
    duration = 1,
  }: {
    children: React.ReactNode;
    className?: string;
    XorY?: "x" | "y";
    initialX?: number;
    initialY?: number;
    duration?: number;
  }): JSX.Element => {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
    return (
      <motion.div
        ref={ref}
        className={className}
        initial={
          XorY === "x"
            ? { x: initialX, opacity: 0 }
            : { y: initialY, opacity: 0 }
        }
        animate={
          inView
            ? XorY === "x"
              ? { x: 0, opacity: 1 }
              : { y: 0, opacity: 1 }
            : XorY === "x"
            ? { x: initialX, opacity: 0 }
            : { y: initialY, opacity: 0 }
        }
        transition={{ ease: "easeInOut", duration }}
      >
        {children}
      </motion.div>
    );
  }
);

AnimatedCard.displayName = "AnimatedCard";

/**
 * `AnimatedCounter` is a React component that animates a numeric counter from a starting value to an ending value.
 * The counter animation triggers when the component becomes visible in the viewport.
 *
 * @param {object} props - The properties for the `AnimatedCounter` component.
 * @param {number} [props.from=0] - The starting value of the counter. Defaults to 0.
 * @param {number} props.to - The ending value of the counter, which the animation will count up to.
 * @param {number} [props.duration=0.4] - The duratino for the count to end the animation with seconds.
 *
 * @returns {JSX.Element} - The `AnimatedCounter` component displaying the animated numeric counter.
 */
const AnimatedCounter = ({
  from = 0,
  to,
  duration,
}: {
  from?: number;
  to: number;
  duration?: number;
}): JSX.Element => {
  const nodeRef = useRef<HTMLParagraphElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    /**
     * Sets up an IntersectionObserver to monitor when the component becomes visible in the viewport.
     * Updates the `isInView` state when the component is in view.
     */
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(node);

    // Clean up the observer when the component unmounts
    return () => {
      observer.unobserve(node);
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const node = nodeRef.current;
    if (!node) return;

    /**
     * Animates the counter from the `from` value to the `to` value when the component is in view.
     * Updates the text content of the element with the rounded value.
     */
    const controls = animate(from, to, {
      duration: 1,
      onUpdate(value) {
        node.textContent = Math.round(value).toString();
      },
    });

    // Clean up animation controls on component unmount or when `from`/`to` change
    return () => controls.stop();
  }, [from, to, isInView]);

  return (
    <motion.p
      ref={nodeRef}
      initial={{ opacity: 0, scale: 0.1 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: duration }}
    />
  );
};

export { AnimatedCard, AnimatedCounter };
