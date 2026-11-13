"use client";

import { Component, useEffect, useState, type ReactNode, type RefObject } from "react";

// The 3D scenes are decoration. If one throws (lost WebGL context, missing API on an
// in-app browser), it should disappear, not take the whole resume down with it.
export class Safe extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

// True while the element is within one viewport of the screen. WebGL contexts are created
// only then and released after: phones allow just a few live contexts, and the page has five scenes.
export function useNear(ref: RefObject<Element>) {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setNear(e.isIntersecting), { rootMargin: "100% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return near;
}
