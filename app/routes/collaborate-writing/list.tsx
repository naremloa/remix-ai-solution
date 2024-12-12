import type { PropsWithoutRef } from 'react'
import { Plus } from 'lucide-react'
import { Card, CardContent, CardHeader } from '~/shadcn/components/ui/card'

export default function WritingList({ list }: PropsWithoutRef<{ list: unknown[] }>) {
  if (list.length === 0) {
    return (
      <Card className="max-w-[300px] min-h-[150px] flex justify-center items-center hover:bg-accent hover:text-accent-foreground cursor-pointer">
        <Plus />
      </Card>
    )
  }
}
