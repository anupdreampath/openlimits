"use client";

import { useEffect, useState } from "react";
import { Mark } from "@/app/components/BrandPrimitives";

export function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => setLeaving(true), 1450);
    const removeTimer = window.setTimeout(() => setVisible(false), 2050);
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={leaving ? "site-splash site-splash--leaving" : "site-splash"} aria-label="Open Limits loading">
      <div className="site-splash__mark">
        <Mark />
      </div>
      <div className="site-splash__wordmark">
        <span>OPEN</span>
        <span>LIMITS</span>
      </div>
      <p>Websites that refuse to blend in.</p>
    </div>
  );
}
