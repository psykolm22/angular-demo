import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as compression from 'compression';
import * as awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';

import { join } from 'path';
import { enableProdMode } from '@angular/core';

import { ngExpressEngine } from '@nguniversal/express-engine';

// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../dist/server/main.bundle');

enableProdMode();
export const app = express();

// app.use(compression());
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(awsServerlessExpressMiddleware.eventContext());

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [provideModuleMap(LAZY_MODULE_MAP)],
}));

app.set('view engine', 'html');
app.set('views', join(process.cwd(), 'dist', 'browser'));

// Server static files from /browser
app.get('*.*', express.static(join(process.cwd(), 'dist', 'browser')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render(join(process.cwd(), 'dist', 'browser', 'index.html'), { req });
});
