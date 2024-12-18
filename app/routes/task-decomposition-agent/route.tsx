import { Article, ArticleHeader } from '~/lib/components/Article'
import Content from './content'

export default function Index() {
  return (
    <Article title="Task Decomposition Agent">
      <ArticleHeader items={[
        { title: 'Goal', content: 'The goal of this solution is to analyze user needs, select and combine feasible actions from the predefined options to develop a solution that meets the user\'s requirements, and deliver it to the user.' },
      ]}
      >
      </ArticleHeader>
      <Content></Content>
    </Article>
  )
}
