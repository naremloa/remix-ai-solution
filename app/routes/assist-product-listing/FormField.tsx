import type { ComponentProps, MouseEvent } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'
import type { Promisable } from 'type-fest'
import { Sparkles } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { AutoResizeTextarea } from '~/lib/components/AutoResizeTextarea'
import { Button } from '~/lib/components/Button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/shadcn/components/ui/form'
import { Input } from '~/shadcn/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/shadcn/components/ui/select'

export function FormInput<TFieldValues extends FieldValues>({ label, name, required, disabled, sparkle }: {
  label: string
  name: FieldPath<TFieldValues>
  required?: boolean
  disabled?: boolean
  sparkle?: () => Promisable<void>
}) {
  const { control } = useFormContext<TFieldValues>()
  const onClickSparkle = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    await sparkle?.()
  }
  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field: { value, ...rest } }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required ? <span className="ml-1 text-red-500">*</span> : null}
          </FormLabel>
          <div className="flex space-x-4">
            <FormControl>
              <Input className="flex-1" value={value ?? undefined} {...rest} />
            </FormControl>
            {sparkle
              ? (
                  <Button variant="secondary" onClick={onClickSparkle}>
                    <Sparkles />
                    AI
                  </Button>
                )
              : null}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export function FormTextarea<TFieldValues extends FieldValues>({ label, name, required, disabled, sparkle, ...restProps }: {
  label: string
  name: FieldPath<TFieldValues>
  required?: boolean
  disabled?: boolean
  sparkle?: () => Promisable<void>
} & Omit<ComponentProps<'textarea'>, 'disabled'>) {
  const { control } = useFormContext<TFieldValues>()
  const onClickSparkle = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    await sparkle?.()
  }
  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required ? <span className="ml-1 text-red-500">*</span> : null}
          </FormLabel>
          <div className="flex space-x-4">
            <FormControl>
              <AutoResizeTextarea className="flex-1" {...restProps} {...field}></AutoResizeTextarea>
            </FormControl>
            {sparkle
              ? (
                  <Button variant="secondary" onClick={onClickSparkle}>
                    <Sparkles />
                    AI
                  </Button>
                )
              : null}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export function FormSelect<TFieldValues extends FieldValues>({ label, name, required, disabled, options }: {
  label: string
  name: FieldPath<TFieldValues>
  required?: boolean
  disabled?: boolean
  options: { value: string, label: string }[]
}) {
  const { control } = useFormContext<TFieldValues>()
  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required ? <span className="ml-1 text-red-500">*</span> : null}
          </FormLabel>
          <Select onValueChange={field.onChange} value={field.value ?? undefined}>
            <FormControl>
              <SelectTrigger className="w-[280px]">
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map(({ value, label }) => (<SelectItem key={value} value={value}>{label}</SelectItem>))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
