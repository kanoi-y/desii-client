import { setupWorker } from 'msw';
import { handlers } from './handlers';

export const worker =
  typeof global.process === 'undefined' && setupWorker(...handlers)
