import { z } from 'zod'

const collaborateWritingSchema = z.object({})

const assistListingSchema = z.object({})

const storeSchema = z.object({
  collaborateWriting: collaborateWritingSchema,
  assistListing: assistListingSchema,
})

export type StoreSchema = z.infer<typeof storeSchema>
