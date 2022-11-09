import express from 'express';
import ExpressAdapter from './infra/adapter/ExpressAdapter';
import { SearchController } from './infra/controller/SearchController';

const PORT = process.env.PORT || 3000;

const app = express();
const expressAdapter = new ExpressAdapter(app);

new SearchController(expressAdapter)

expressAdapter.listen(+PORT);