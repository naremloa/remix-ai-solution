import type { LinksFunction } from '@remix-run/node'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from '@remix-run/react'
import { AnimatePresence, motion } from 'framer-motion'

import { useState } from 'react'
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
  const [menu, setMenu] = useState(true)
  return (
    <html className="dark size-full" lang="en" style={{ colorScheme: 'dark' }}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="size-full flex flex-col">
        <header className="col-span-full flex items-center px-4">
          <div className="py-3 flex items-center gap-4">
            <div
              className="p-2 cursor-pointer text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
              onClick={() => setMenu(v => !v)}
            >
              <HamburgerMenuIcon></HamburgerMenuIcon>
            </div>
            <Link className="select-none" to="/">AI PLAYGROUND___</Link>
          </div>
        </header>
        <div className="flex">
          <motion.nav
            className={`overflow-hidden px-5 pt-5 flex flex-col gap-4 ${menu ? 'visible' : 'invisible'}`}
            variants={{
              open: { maxWidth: '240px', minWidth: '240px', opacity: 1 },
              closed: { width: '0px', minWidth: 0, padding: '0px', opacity: 0 },
            }}
            initial="open"
            animate={menu ? 'open' : 'closed'}
          >
            <Link to="/collaborate-writing">Collaborate on writing</Link>
            <Link to="/assist-product-listing">Assist product listing</Link>
          </motion.nav>
          <main className="flex-1">
            {children}
          </main>
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={useLocation().pathname}
        variants={{
          initial: { opacity: 0, x: 100 },
          animate: { opacity: 1, x: 0 },
        }}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.2 }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  )
}
