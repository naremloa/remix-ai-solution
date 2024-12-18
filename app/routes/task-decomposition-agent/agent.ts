import type { ChatOpenAI } from '@langchain/openai'
import { HumanMessage } from '@langchain/core/messages'
import { createReactAgent } from '@langchain/langgraph/prebuilt'

export async function createAgent(llm: ChatOpenAI) {
  const agentExecutor = createReactAgent({
    llm,
    tools: [],
  })

  await agentExecutor.invoke({
    messages: [new HumanMessage('who is the winner of the us open')],
  })
}
