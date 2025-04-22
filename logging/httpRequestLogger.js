import morgan from 'morgan';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { createStream } from 'rotating-file-stream';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const config = require(`../config/config.${process.env.NODE_ENV}.json`);
const logConfig = config.logConfig.httpRequestLog;
const logDirectory = join(__dirname + "/..", 'log');
existsSync(logDirectory) || mkdirSync(logDirectory);

// create a rotating write stream
const options = logConfig.rfsOptions;
options.path = logDirectory;
const logStream = createStream(logConfig.fname, options);

const logger = morgan(logConfig.format, { stream: logStream });

export default logger;