import { env } from 'node:process'
import { AzureChatOpenAI } from '@langchain/openai'
import { config } from './config'

// eslint-disable-next-line import/no-mutable-exports
let langchainInstance: AzureChatOpenAI

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var __langchain: AzureChatOpenAI | undefined
}

function createLangchainSingleton() {
  const chat = new AzureChatOpenAI(config.azure)
  return chat
}

if (env.NODE_ENV === 'production') {
  langchainInstance = createLangchainSingleton()
}
else {
  if (!globalThis.__langchain) {
    globalThis.__langchain = createLangchainSingleton()
  }
  langchainInstance = globalThis.__langchain
}

export { langchainInstance as langchain }
