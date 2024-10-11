import type { LinksFunction } from '@remix-run/node'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

import { Link } from './lib/components/Link'
import './tailwind.css'

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html className="dark size-full" lang="en" style={{ colorScheme: 'dark' }}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="size-full grid grid-cols-12 grid-rows-[64px_1fr]">
        <header className="col-span-full flex items-center px-4">
          <div className="py-3">
            <Link to="/">AI PLAYGROUND___</Link>
          </div>
        </header>
        <nav className="col-span-2 overflow-hidden px-5 pt-5">
          <Link to="/auto-desc">Product Auto Desc</Link>
        </nav>
        <main className="col-start-3 col-span-full">
          {children}
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
