/**
 * POST Request to action returns page HTML instead of the response returned by the action #8547
 * answer: https://github.com/remix-run/remix/discussions/8547
 * NOTE: This is an implementation detail and is subject to change.
 */

import { useFormAction, useMatches } from '@remix-run/react'
import { ofetch } from 'ofetch'
import { useCallback } from 'react'

export function useImperativeSubmit<Input extends BodyInit | Record<string, any> | null | undefined, Return extends Record<string, any> = any>(
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  body: (data: Input) => BodyInit | Record<string, any> | null | undefined,
) {
  const action = useFormAction()
  const matches = useMatches()

  const actionNoQuery = action.substring(0, action.indexOf('?'))
  const url = `${actionNoQuery}?_data=${encodeURIComponent(matches.at(-1)?.id ?? '')}`

  return useCallback(
    async (data: Input) => {
      const response = await ofetch<Return>(url, {
        method,
        body: body(data),
      })
      return response
    },
    [url],
  )
}
