import React, { createContext, useContext, useState, useEffect } from "react";

type RouterContextType = {
  path: string;
  navigate: (to: string) => void;
};

const RouterContext = createContext<RouterContextType>({
  path: window.location.pathname,
  navigate: () => {},
});

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const navigate = (to: string) => {
    window.history.pushState({}, "", to);
    setPath(window.location.pathname);
    
    // Smooth scroll to top when changing actual paths, unless it's a hash anchor
    if (!to.includes("#")) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const hash = to.split("#")[1];
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}

export function Link({
  href,
  className,
  children,
  onClick,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const { path, navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }

    if (e.defaultPrevented) return;

    // Handle internal absolute links or hash links
    if (href.startsWith("/") || href.startsWith("#")) {
      e.preventDefault();
      
      // If we are clicking a hash link
      if (href.startsWith("#")) {
        if (path === "/") {
          // If on homepage, just scroll to element smoothly
          const element = document.getElementById(href.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
          window.history.pushState({}, "", href);
        } else {
          // If on a subpage, navigate back to homepage with hash
          navigate("/" + href);
        }
      } else {
        // Normal subpage navigation
        navigate(href);
      }
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}

export function Route({
  path: routePath,
  element,
}: {
  path: string;
  element: React.ReactNode;
}) {
  const { path } = useRouter();
  
  // Handle matching exactly, ignoring hashes/queries for component matching
  const currentCleanPath = path.split("#")[0].split("?")[0];
  
  if (currentCleanPath === routePath) {
    return <>{element}</>;
  }
  return null;
}
