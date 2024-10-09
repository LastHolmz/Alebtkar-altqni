import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const updateMatches = () => {
      setMatches(mediaQuery.matches);
    };

    // Initial check
    updateMatches();

    // Add listener for changes
    const listener = (event: MediaQueryListEvent) => {
      updateMatches();
    };
    mediaQuery.addEventListener("change", listener);

    // Clean up
    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
}
