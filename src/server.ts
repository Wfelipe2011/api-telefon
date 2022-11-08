import express from 'express';
import ExpressAdapter from './infra/adapter/ExpressAdapter';

const PORT = process.env.PORT || 3000;

const app = express();
const expressAdapter = new ExpressAdapter(app);

expressAdapter.listen(+PORT);