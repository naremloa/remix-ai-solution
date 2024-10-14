import type { FC } from 'react'

export default (function TechStack({ title, href, img, imgBgWhite }) {
  return (
    <a href={href} className="flex gap-1 items-center">
      {img && <img className={`object-fit h-[24px] ${imgBgWhite ? 'bg-white' : ''}`} src={img} />}
      <span>{title}</span>
    </a>
  )
}) satisfies FC<{
  title: string
  href: string
  img?: string
  imgBgWhite?: boolean
}>
