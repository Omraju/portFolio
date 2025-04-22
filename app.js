import express, { json, urlencoded, static as expressStatic } from 'express';
import { join } from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
// import httpRequestLogger from './logging/httpRequestLogger.js';
import { createRequire } from 'module';
// import { connectPromise } from "./daos/MongodDbUtil.js";


// import portfolio from './routes/portfolio.js';

// const require = createRequire(import.meta.url);
// const __dirname = fileURLToPath(new URL('.', import.meta.url));
// const config = require(`./config/config.${process.env.NODE_ENV}.json`);
// const serverConfig = config.serverConfig;
var serverConfig;

const app = express();

if (serverConfig.maintenanceMode) {
  app.get('/', function (req, res) {
    res.sendFile('maintenance.html', { root: __dirname + "/public" });
  });
}

if (serverConfig.behindHttps) {
  app.use(function (req, res, next) {
    if ((!req.secure) && (req.get('X-Forwarded-Proto') !== 'https')) {
      res.redirect('https://' + req.get('Host') + req.url);
    } else
      next();
  });
}

connectPromise();

// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'hbs');

// const compression = require('compression'); //comment these 2 lines in case you use nginx or other reverse proxy
// app.use(compression());

// app.use(httpRequestLogger);
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressStatic(join(__dirname, 'public')));

app.use('/portfolio', portfolio);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
