import { createServer, proxy } from 'aws-serverless-express';
import { app } from '../server/server';

const awsServerlessExpress = require('aws-serverless-express');

const binaryMimeTypes = [
    'application/javascript',
    'application/json',
    'application/octet-stream',
    'application/xml',
    'image/jpeg',
    'image/png',
    'image/gif',
    'text/comma-separated-values',
    'text/css',
    'text/html',
    'text/javascript',
    'text/plain',
    'text/text',
    'text/xml',
    'image/x-icon',
    'image/svg+xml',
    'application/x-font-ttf'
];

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
