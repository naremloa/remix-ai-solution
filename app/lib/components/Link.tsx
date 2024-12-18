import {
  Link as RemixLink,
  useLocation,
} from '@remix-run/react'
import { forwardRef, useEffect, useState } from 'react'

export const Link = forwardRef(({ className, to, children, ...props }, ref) => {
  const { pathname } = useLocation()
  const [active, setActive] = useState(false)
  useEffect(() => {
    if (typeof to === 'string') {
      setActive(pathname === to)
    }
    else {
      setActive(pathname === to?.pathname)
    }
  }, [pathname, to])
  return ((
    <RemixLink
      {...props}
      className={`hover:underline underline-offset-4 ${active ? 'text-foreground' : 'text-muted-foreground'} ${className}`}
      to={to}
      ref={ref}
    >
      {children}
    </RemixLink>
  ))
}) satisfies typeof RemixLink
