import { captureException as Base } from '@sentry/nestjs';
export const captureException: typeof Base = (e, h) => {
  console.error(e);
  return Base(e, h);
};
