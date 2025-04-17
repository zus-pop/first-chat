// hooks/useAutoScroll.ts
import { useCallback, useEffect, useRef, useState } from "react";

interface UseAutoScrollOptions {
  threshold?: number; // how far from bottom before disabling auto-scroll
}

export function useScroll({ threshold = 100 }: UseAutoScrollOptions = {}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showScrollToBottomButton, setShowScrollToBottomButton] = useState(false);

  const scrollToBottom = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    el.scrollTop = el.scrollHeight;
    setIsAtBottom(true);
    setShowScrollToBottomButton(false);
  }, []);

  // Handle scroll position tracking
  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    const atBottom = distanceToBottom < threshold;

    setIsAtBottom(atBottom);
    setShowScrollToBottomButton(!atBottom);
  }, [threshold]);

  // Scroll event listener
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("scroll", handleScroll);
    handleScroll(); // initialize state

    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // When new messages arrive (children update), scroll if at bottom
  const maybeScrollToBottom = useCallback(() => {
    if (isAtBottom) scrollToBottom();
  }, [isAtBottom, scrollToBottom]);

  return {
    containerRef,
    isAtBottom,
    showScrollToBottomButton,
    scrollToBottom,
    maybeScrollToBottom,
  };
}
