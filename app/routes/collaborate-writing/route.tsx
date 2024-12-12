import { type ClientLoaderFunctionArgs, useLoaderData } from '@remix-run/react'
import { Article, ArticleHeader } from '~/lib/components/Article'
import { createStore } from '~/lib/utils/localforage'
import WritingList from './list'

export async function clientLoader({
  request,
  params,
}: ClientLoaderFunctionArgs) {
  const store = createStore('collaborateWriting')
  // const data = await store.getItem('hello')
  // console.log('data')
  return {}
}

export default function Index() {
  const data = useLoaderData()
  const store = createStore('collaborateWriting')
  return (
    <Article title="Collaborate on article writing">
      <ArticleHeader items={[
        { title: 'Goal', content: 'The goal of this solution is to generate initial content through an initial prompt, and then continuously make adjustments to the initial content based on new prompts.' },
        {
          title: 'Solution',
          content: (
            <ul>
              <p>STEP:</p>
              <li>1. Initialize a description through a prompt.</li>
              <li>2. Propose a new prompt to modify the description.</li>
              <li>3. Analyze whether the prompt should be applied to the entire description or just specific paragraphs or sentences.</li>
              <li>4. Generate a new description and repeat step 2 and 3 until satisfied.</li>
            </ul>
          ),
        },
      ]}
      >
      </ArticleHeader>
      <WritingList list={[]}></WritingList>
    </Article>
  )
}
