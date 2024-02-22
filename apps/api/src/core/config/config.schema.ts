import { $BooleanString } from '@open-data-capture/common/core';
import { z } from 'zod';

export const $EnvironmentConfig = z.object({
  API_DEV_SERVER_PORT: z.coerce.number().positive().int().optional(),
  GATEWAY_BASE_URL: z.string().url(),
  GATEWAY_ENABLED: $BooleanString,
  GATEWAY_REFRESH_INTERVAL: z.coerce.number().positive().int(),
  MONGO_URI: z.string().url(),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  SECRET_KEY: z.string().min(32)
});

export type EnvironmentConfig = z.infer<typeof $EnvironmentConfig>;
