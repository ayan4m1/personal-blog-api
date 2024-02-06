import { start } from './modules/apollo.js';
import { getLogger } from './modules/log.js';

const log = getLogger('api');
const url = await start();

log.info(`Server ready at ${url}`);
