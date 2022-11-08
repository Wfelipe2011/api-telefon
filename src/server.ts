import express from 'express';
import ExpressAdapter from './infra/adapter/ExpressAdapter';
import { ConfigEnv } from './infra/config/configuration';

const PORT = ConfigEnv.server.port || 3000;

const app = express();
const expressAdapter = new ExpressAdapter(app);



expressAdapter.listen(+PORT);