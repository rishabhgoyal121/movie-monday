// Scroll to top when navigating to a new page
"use client"; // Important: This must be a Client Component

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top when pathname changes
    window.scrollTo(0, 0);
  }, [pathname]); // Depend on pathname changes

  return null; // This component doesn't render anything
}

export default ScrollToTop;
