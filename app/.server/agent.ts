import type { AIMessage } from '@langchain/core/messages'
import type { RunnableConfig } from '@langchain/core/runnables'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { tool } from '@langchain/core/tools'
import { Annotation, END, START, StateGraph } from '@langchain/langgraph'
import { ToolNode } from '@langchain/langgraph/prebuilt'
import { z } from 'zod'
import { langchain } from './langchain'

const GraphState = Annotation.Root({
  messages: Annotation<{ role: string, content: string }[]>(),
})

export const searchTool = tool(async ({ query: _ }: { query: string }) => {
  // This is a placeholder for the actual implementation
  return 'Cold, with a low of 13 ℃'
}, {
  name: 'search',
  description:
    'Use to surf the web, fetch current information, check the weather, and retrieve other information.',
  schema: z.object({
    query: z.string().describe('The query to use in your search.'),
  }),
})

const tools = [searchTool]

const toolNode = new ToolNode(tools)

function routeMessage(state: typeof GraphState.State) {
  console.log('routeMessage', state)
  const { messages } = state
  const lastMessage = messages.at(-1) as unknown as AIMessage
  // If no tools are called, we can finish (respond to the user)
  if (!lastMessage.tool_calls?.length) {
    return END
  }
  // Otherwise if there is, we continue and call the tools
  return 'tools'
}

async function callModel(state: typeof GraphState.State, config?: RunnableConfig) {
  console.log('callModel', state)
  // const { messages } = state
  // const response = await boundModel.invoke(messages, config)
  // return { messages: [response] }

  const template = ChatPromptTemplate.fromMessages([
    // ['system', '你現在是商品上架助手。你需要根據用戶提出的問題或需求進行分析，了解用戶的意圖，並重新調整語序和說詞。你不需要回答或提供更詳細詢問的過程，你只需要理解用戶的意圖，並根據意圖重新調整用戶的問題或需求，用簡單，直接，簡潔的方式表達出來即可。'],
    ['system', '你是一個商品上架助手，你需要根據用戶提出的問題或需求，對其進行分析，若是問題無法得出解法的，請再對用戶進行提問來獲取更多資訊。若是問題和需求可以得出解法的，請將解法列出。列出的解法需要每一個步驟都詳細的列出來，每一個步驟都應該要足夠簡單。'],
    ...state.messages.map(i => [i.role, i.content]) as any,
  ])
  const response = await template.pipe(langchain).invoke({}, config)
  console.log('response', response, state.messages)
  return { messages: [response] }
}

const workflow = new StateGraph(GraphState)
  .addNode('agent', callModel)
  .addNode('tools', toolNode)
  .addEdge(START, 'agent')
  .addConditionalEdges('agent', routeMessage)
  .addEdge('tools', 'agent')

export const graph = workflow.compile()

export async function start() {
  const inputs = { messages: [{ role: 'user', content: '我有一個樂高想要上架進行販售，但後台的商品上架太複雜了，我不太知道該如何進行下一步，請提供給我協助。' }] }
  for await (
    const { messages } of await graph.stream(inputs as any, {
      streamMode: 'values',
    })
  ) {
    const msg = messages.at(-1)
    if (msg?.content) {
      console.log(msg.content)
    }
    else if (msg?.tool_calls?.length > 0) {
      console.log(msg.tool_calls)
    }
    else {
      console.log(msg)
    }
    console.log('-----\n')
  }
}

// await searchTool.invoke({ query: 'What\'s the weather like?' })

// const tools = [searchTool]
