import React from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@mui/material/styles";

import { RouteTabStore } from "../contexts/RouteTabContext";
import MainLayout from "../components/layouts/MainLayout/MainLayout";
import "../styles/globals.css";
import theme from "../ui/theme";
import GlobalCssPriority from "../util/GlobalCssPriority";
import EchoErrorBoundary from "../components/organisms/ErrorBoundary/EchoErrorBoundary";
// import { ErrorBoundary } from "react-error-boundary";

export default function Echo({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <EchoErrorBoundary>
      {/* <GlobalCssPriority> */}
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <RouteTabStore>
            <ThemeProvider theme={theme}>
              <MainLayout>
                <Component {...pageProps} />
                <ReactQueryDevtools />
              </MainLayout>
            </ThemeProvider>
          </RouteTabStore>
        </Hydrate>
      </QueryClientProvider>
      {/* </GlobalCssPriority> */}
    </EchoErrorBoundary>
  );
}
