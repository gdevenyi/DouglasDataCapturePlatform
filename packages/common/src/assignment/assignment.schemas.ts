import { z } from 'zod';

import { validObjectIdSchema } from '../core/core.schemas';
import { formInstrumentSchema, instrumentSummarySchema } from '../instrument/instrument.schemas';

import type * as Types from './assignment.types';

export const assignmentStatusSchema = z.enum([
  'CANCELED',
  'COMPLETE',
  'EXPIRED',
  'OUTSTANDING'
]) satisfies Zod.ZodType<Types.AssignmentStatus>;

export const assignmentSchema = z.object({
  assignedAt: z.coerce.date(),
  expiresAt: z.coerce.date(),
  id: z.coerce.number().optional(),
  instrument: formInstrumentSchema,
  status: assignmentStatusSchema,
  url: z.string().url()
}) satisfies Zod.ZodType<Types.Assignment>;

export const assignmentSummarySchema = assignmentSchema.extend({
  instrument: instrumentSummarySchema
}) satisfies Zod.ZodType<Types.AssignmentSummary>;

export const createAssignmentDataSchema = z.object({
  expiresAt: z.coerce.date().min(new Date()),
  instrumentId: validObjectIdSchema,
  subjectIdentifier: z.string()
}) satisfies Zod.ZodType<Types.CreateAssignmentData>;

export const updateAssignmentDataSchema = z
  .object({
    assignedAt: z.coerce.date(),
    expiresAt: z.coerce.date(),
    status: assignmentStatusSchema
  })
  .partial() satisfies Zod.ZodType<Types.UpdateAssignmentData>;

export const assignmentBundleSchema = assignmentSchema.omit({ instrument: true }).extend({
  instrumentBundle: z.string(),
  instrumentId: z.string(),
  subjectIdentifier: z.string()
});

export type AssignmentBundle = z.infer<typeof assignmentBundleSchema>;

export const createAssignmentBundleDataSchema = assignmentBundleSchema.omit({
  assignedAt: true,
  id: true,
  status: true,
  url: true
});

export type CreateAssignmentBundleData = z.infer<typeof createAssignmentBundleDataSchema>;
