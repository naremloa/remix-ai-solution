import { createConsola as create } from 'consola'

export function createConsola(...params: Parameters<typeof create>) {
  return create(...params)
}
