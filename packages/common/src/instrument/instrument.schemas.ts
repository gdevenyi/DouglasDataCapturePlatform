import type { FormDataType, FormFieldKind } from '@douglasneuroinformatics/form-types';
import { z } from 'zod';

import { languageSchema } from '../core/core.schemas';
import { evaluateInstrument } from './instrument.utils';

import type * as Types from './instrument.types';

const instrumentKindSchema = z.enum(['form']) satisfies Zod.ZodType<Types.InstrumentKind>;

const uiOptionSchema = <T extends Zod.ZodType>(schema: T) =>
  z.union([
    schema,
    z.object({
      en: schema,
      fr: schema
    })
  ]);

const baseInstrumentDetailsSchema = z.object({
  description: uiOptionSchema(z.string().min(1)),
  title: uiOptionSchema(z.string().min(1))
}) satisfies Zod.ZodType<Types.BaseInstrumentDetails>;

export const baseInstrumentSchema = z.object({
  content: z.unknown(),
  details: baseInstrumentDetailsSchema,
  id: z.string().optional(),
  kind: instrumentKindSchema,
  language: z.union([languageSchema, z.array(languageSchema)]),
  name: z.string().min(1),
  tags: uiOptionSchema(z.array(z.string().min(1))),
  validationSchema: z.instanceof(z.ZodType),
  version: z.number()
}) satisfies Zod.ZodType<Types.BaseInstrument>;

export const instrumentSummarySchema = baseInstrumentSchema.omit({
  content: true,
  validationSchema: true
}) satisfies Zod.ZodType<Types.InstrumentSummary>;

const fieldKindSchema: Zod.ZodType<FormFieldKind> = z.enum(['options', 'date', 'array', 'binary', 'numeric', 'text']);

const baseFieldSchema = z.object({
  description: uiOptionSchema(z.string().min(1)).optional(),
  isRequired: z.boolean().optional(),
  kind: fieldKindSchema,
  label: uiOptionSchema(z.string().min(1))
});

const textFieldSchema = baseFieldSchema.extend({
  kind: z.literal('text'),
  variant: z.enum(['long', 'password', 'short'])
}) satisfies Zod.ZodType<Types.FormInstrumentTextField>;

const optionsFieldSchema = baseFieldSchema.extend({
  kind: z.literal('options'),
  options: uiOptionSchema(z.record(z.string().min(1)))
}) satisfies Zod.ZodType<Types.FormInstrumentOptionsField>;

const dateFieldSchema = baseFieldSchema.extend({
  kind: z.literal('date')
}) satisfies Zod.ZodType<Types.FormInstrumentDateField>;

const numericFieldSchema = baseFieldSchema.extend({
  kind: z.literal('numeric'),
  max: z.number(),
  min: z.number(),
  variant: z.enum(['default', 'slider'])
}) satisfies Zod.ZodType<Types.FormInstrumentNumericField>;

const binaryFieldSchema = baseFieldSchema.extend({
  kind: z.literal('binary'),
  options: uiOptionSchema(
    z.object({
      f: z.string().min(1),
      t: z.string().min(1)
    })
  ).optional(),
  variant: z.enum(['checkbox', 'radio'])
}) satisfies Zod.ZodType<Types.FormInstrumentBinaryField>;

const primitiveFieldSchema = z.union([
  textFieldSchema,
  optionsFieldSchema,
  dateFieldSchema,
  numericFieldSchema,
  binaryFieldSchema
]) satisfies Zod.ZodType<Types.FormInstrumentPrimitiveField>;

// This schema excludes dynamic fieldset
const arrayFieldSchema = baseFieldSchema.extend({
  fieldset: z.record(primitiveFieldSchema),
  kind: z.literal('array')
}) satisfies Zod.ZodType<Types.FormInstrumentArrayField>;

const staticFieldsSchema = z.record(
  z.union([primitiveFieldSchema, arrayFieldSchema])
) satisfies Zod.ZodType<Types.FormInstrumentStaticFields>;

const fieldsGroupSchema = z.object({
  description: uiOptionSchema(z.string().min(1)).optional(),
  fields: staticFieldsSchema,
  title: uiOptionSchema(z.string().min(1))
}) satisfies Zod.ZodType<Types.FormInstrumentFieldsGroup>;

const contentSchema = z.union([
  staticFieldsSchema,
  fieldsGroupSchema.array()
]) satisfies Zod.ZodType<Types.FormInstrumentContent>;

const formInstrumentDetailsSchema = baseInstrumentDetailsSchema.extend({
  estimatedDuration: z.number().positive(),
  instructions: uiOptionSchema(z.union([z.string().min(1), z.array(z.string().min(1))]))
}) satisfies Zod.ZodType<Types.BaseInstrumentDetails>;

export const formInstrumentSchema = baseInstrumentSchema.extend({
  content: contentSchema,
  details: formInstrumentDetailsSchema,
  kind: z.literal('form'),
  validationSchema: z.instanceof(z.ZodType<FormDataType>)
}) satisfies Zod.ZodType<Types.FormInstrument>;

export const instrumentSourceSchema = z.object({
  source: z.string()
}) satisfies Zod.ZodType<Types.InstrumentSource>;

export const instrumentBundleSchema = z
  .object({
    bundle: z.string()
  })
  .transform(({ bundle }) => evaluateInstrument(bundle))
  .pipe(baseInstrumentSchema);

// z.ZodType<Types.FormInstrument, z.ZodTypeDef, Types.InstrumentBundle>
export const formInstrumentBundleSchema = instrumentBundleSchema.pipe(formInstrumentSchema);

export const instrumentSourceContainerSchema = z.object({
  id: z.string(),
  name: z.string(),
  source: z.string(),
  version: z.number()
});

export type InstrumentSourceContainer = z.infer<typeof instrumentSourceContainerSchema>;
