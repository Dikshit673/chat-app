import http from 'http';
import expressApp from './expressApp.js';

const httpServer = http.createServer(expressApp);

export default httpServer;
