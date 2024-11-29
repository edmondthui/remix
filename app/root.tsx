import type { LinksFunction } from "@remix-run/node";
import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import MainNavigation from "./components/MainNavigation";

import "./styles/main.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error))
    return (
      <main className="error">
        <h1>An error occurred!</h1>
        <p>{error.data.message}</p>
        <p>
          Back to <Link to="/">safety</Link>!
        </p>
      </main>
    );
  if (error instanceof Error) {
    return (
      <main className="error">
        <h1>An error occurred!</h1>
        <p>{error.message}</p>
        <p>
          Back to <Link to="/">safety</Link>!
        </p>
      </main>
    );
  }
  return (
    <main className="error">
      <h1>An unknown error occurred!</h1>
      <p>Unknown Error</p>
      <p>
        Back to <Link to="/">safety</Link>!
      </p>
    </main>
  );
}
