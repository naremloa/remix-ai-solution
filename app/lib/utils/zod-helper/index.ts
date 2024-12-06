import type { SafeParseReturnType, TypeOf, ZodSchema } from 'zod';
import { pipe } from 'ramda';
import { z, ZodError } from 'zod';

export function zSerializeError(error: ZodError, opts?: { short?: boolean }): string {
  const { short = false } = opts || {};
  return `ZodError: ${error.errors
    .map((error) => {
      const message = short ? error.code : `[${error.code}] ${error.message}`;
      return `${error.path.join('.')}: ${message}`;
    })
    .join(', ')}`;
}

export function zSafeParser<Schema extends ZodSchema<unknown>>(schema: Schema) {
  return async function (
    data: unknown,
  ): Promise<
    | { error: null, errorMessage: '', data: TypeOf<Schema> }
    | { error: ZodError, errorMessage: string, data: null }
    > {
    const parseResult = await schema.safeParseAsync(data) as SafeParseReturnType<unknown, TypeOf<Schema>>;
    if (parseResult.success) {
      return {
        error: null,
        errorMessage: '',
        data: parseResult.data,
      };
    }
    return {
      error: parseResult.error,
      errorMessage: zSerializeError(parseResult.error),
      data: null,
    };
  };
}

export function zParser<Schema extends ZodSchema<unknown>>(schema: Schema) {
  return async function (data: unknown): Promise<TypeOf<Schema>> {
    try {
      const parseResult = (await schema.parseAsync(data)) as TypeOf<Schema>;
      return parseResult;
    }
    catch (error: unknown) {
      if (error instanceof ZodError) {
        throw new TypeError(zSerializeError(error));
      }
      throw error;
    }
  };
}

export function zParserSync<Schema extends ZodSchema<unknown>>(schema: Schema) {
  return function (data: unknown): TypeOf<Schema> {
    try {
      const parseResult = (schema.parse(data)) as TypeOf<Schema>;
      return parseResult;
    }
    catch (error: unknown) {
      if (error instanceof ZodError) {
        throw new TypeError(zSerializeError(error));
      }
      throw error;
    }
  };
}

type ErrMessage = string | { message?: string };

function applySchemaConstraint<
  Value extends string | number,
  Schema extends ZodSchema,
>(
  apply: (value: Value, message?: ErrMessage) => Schema,
  constraint?: Value | { value: Value, message?: ErrMessage },
): Schema | undefined {
  if (constraint === undefined)
    return undefined;
  return typeof constraint === 'object'
    ? apply(constraint.value, constraint.message)
    : apply(constraint);
}

export const zHelper = {
  tstring: (options?: {
    min?: number | { value: number, message?: ErrMessage }
    max?: number | { value: number, message?: ErrMessage }
    length?: number | { value: number, message?: ErrMessage }
  }) =>
    pipe(
      () => z.string().trim(),
      s => applySchemaConstraint(s.min.bind(s), options?.min) ?? s,
      s => applySchemaConstraint(s.max.bind(s), options?.max) ?? s,
      s => applySchemaConstraint(s.length.bind(s), options?.length) ?? s,
    )(),
  nanoid: (options?: {
    len?: number
  }) =>
    z
      .string()
      .regex(/^[\w-]+$/)
      .length(options?.len ?? 21),
  nonEmptyString: () => z.string().min(1),
  boolString: () => z.enum(['true', 'false']),
  numeric: () => zHelper.tstring().regex(/^\d+$/),
};
