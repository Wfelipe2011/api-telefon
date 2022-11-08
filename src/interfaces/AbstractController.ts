/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

export abstract class AbstractController {
	protected req!: IRequest;
	protected res!: IResponse;
	next?: () => void;
	protected abstract start(): void;
}

export interface IRequest<Params = any, Body = any, Query = any> extends Request<Params, Body, any, Query> {
	params: Params;
	body: Body;
	query: Query;
}

export type IResponse = Response;