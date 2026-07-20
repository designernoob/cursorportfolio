import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToTop } from "../lib/scroll";

/** Reset scroll position to the top whenever the route changes. */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    scrollToTop(true);
  }, [pathname]);
  return null;
}
