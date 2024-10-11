import type { FC } from 'react'
import Article from '~/lib/components/Article'
import TectStack from '~/lib/components/TectStack'

export default function Index() {
  const tectStackList = [
    { title: 'OpenAI', href: 'https://openai.com/', img: 'https://openai.com/favicon.ico?v=2' },
    { title: 'LangChain', href: 'https://www.langchain.com/', img: 'https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/65c50ca4352352dd6a747e69_favicon.png' },
    { title: 'NodeJS', href: 'https://nodejs.org/', img: 'https://nodejs.org/static/images/favicons/favicon.png' },
    { title: 'Remix', href: 'https://remix.run/', img: 'https://remix.run/favicon-32.png' },
    { title: 'shadcn/ui', href: 'https://ui.shadcn.com/', img: 'https://ui.shadcn.com/favicon.ico' },
    { title: 'tailwindcss', href: 'https://tailwindcss.com/', img: 'https://tailwindcss.com/favicons/favicon.ico?v=3' },
  ] satisfies ((typeof TectStack) extends FC<infer P> ? P : never)[]

  return (
    <Article title="Write Something... ✍️">
      <p>Integrates various solutions attempted using AI.</p>
      <p className="flex gap-4">
        <span>Tech Stack:</span>
        {tectStackList.map(props => (<TectStack {...props} key={props.title}></TectStack>))}
      </p>
    </Article>
  )
}
