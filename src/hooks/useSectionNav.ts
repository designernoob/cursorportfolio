import { useNavigate, useLocation } from "react-router-dom";
import { scrollToId } from "../lib/scroll";

/**
 * Returns a handler that navigates to a home-page section from
 * anywhere. If already on the home page it scrolls; otherwise it
 * routes home first and scrolls once the page has mounted.
 */
export function useSectionNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (id: string) => {
    if (pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      scrollToId(id);
    }
  };
}
