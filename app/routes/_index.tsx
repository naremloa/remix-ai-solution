import type { FC } from 'react'
import { Article } from '~/lib/components/Article'
import { Link } from '~/lib/components/Link'
import TechStack from '~/lib/components/TechStack'
import { routes } from '~/routes'

export default function Index() {
  const techStackList = [
    { title: 'OpenAI', href: 'https://openai.com/', img: 'https://openai.com/favicon.ico?v=2' },
    { title: 'LangChain', href: 'https://www.langchain.com/', img: 'https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/65c50ca4352352dd6a747e69_favicon.png' },
    { title: 'NodeJS', href: 'https://nodejs.org/', img: 'https://nodejs.org/static/images/favicons/favicon.png' },
    { title: 'Remix', href: 'https://remix.run/', img: 'https://remix.run/favicon-32.png' },
    { title: 'shadcn/ui', href: 'https://ui.shadcn.com/', img: 'https://ui.shadcn.com/favicon.ico', imgBgWhite: true },
    { title: 'tailwindcss', href: 'https://tailwindcss.com/', img: 'https://tailwindcss.com/favicons/favicon.ico?v=3' },
  ] satisfies ((typeof TechStack) extends FC<infer P> ? P : never)[]

  return (
    <Article title="Write Something... ✍️">
      <p>Integrates various solutions attempted using AI.</p>
      <p className="flex gap-4 flex-col sm:flex-row">
        <span className="flex-shrink-0">Tech Stack:</span>
        <span className="inline-flex gap-4 flex-wrap">
          {techStackList.map(props => (<TechStack {...props} key={props.title}></TechStack>))}
        </span>
      </p>
      <h2 className="text-xl mt-8">DEMO</h2>
      <p className="flex flex-col gap-4 my-4">
        {routes.map(route => (
          <span className="select-none" key={route.path}>
            <span className="mx-2">-</span>
            <Link to={route.path}>{route.label}</Link>
            {route.description ? <span>{` - ${route.description}`}</span> : null}
          </span>
        ))}
      </p>
    </Article>
  )
}
