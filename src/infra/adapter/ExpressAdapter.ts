import express, { Request, Response, Express } from 'express';
import cors from 'cors';

import Logger from '../config/Logger';
import { ConfigEnv } from '../config/configuration';
import Http from '../../interfaces/Http';

export default class ExpressAdapter implements Http {
	constructor(readonly app: Express) {
		this.app = express();
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(cors());

		this.on('get', '/', (req, res) => {
			res.status(200).send({
				message: 'Welcome to the API Telefon',
				version: ConfigEnv.version,
			});
		});
	}

	on(method: string, url: string, callback: (req: Request, res: Response) => void): void {
		Logger.info(`[ ${method.toUpperCase()} ] - ${url}`);
		this.app[method as keyof Express](url, callback);
	}

	listen(port: number): void {
		this.app.listen(port, () => {
			Logger.info(`Server running on port ${port}`);
		});
	}
}
