

import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/redux/store";
import { ToastContainer } from 'react-toastify';
import { useGetProfileQuery } from "@/redux/api/authApiSlice";
import { useEffect } from "react";
import { updateUser } from "@/redux/slice/authSlice";

function AppWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const token = typeof window !== 'undefined' ? localStorage.getItem('call_accessToken') : null;
  
  const { data: response } = useGetProfileQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (response?.userData) {
      dispatch(updateUser(response.userData));
    }
  }, [response, dispatch]);

  return <>{children}</>;
}

function RootShell({ children }: { children: React.ReactNode }) {
  
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Provider store={store}>
          <AppWrapper>
            {children}
            <ToastContainer />
          </AppWrapper>
        </Provider>
        <Scripts />
      </body>
    </html>
  );
}

// --- Baaki code (Route/NotFound) same rahega ---
function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-extrabold text-gradient-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <Link to="/" className="inline-flex mt-6 items-center justify-center rounded-full gradient-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-glow">
          Go home
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "LuxeCompanions — Premium Companion Directory" },
      { name: "description", content: "Discover verified, elite companions for any occasion." },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: () => <Outlet />,
  notFoundComponent: NotFoundComponent,
});