import * as React from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const cache = createCache({
  key: "css",
  prepend: true,
});

export default function CssModulesPriority({ children }) {
  return (
    <CacheProvider value={cache}>
      {/* Your component tree. Now you can override MUI's styles. */}
      {children}
    </CacheProvider>
  );
}
