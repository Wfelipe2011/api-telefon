/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractController, IRequest, IResponse } from '../../interfaces/AbstractController';
import ServerHttp from '../../interfaces/ServerHttp';
import { Controller, Delete, Get, Post } from '../decorate/HttpDecorate';
import { OrderService } from '../../application/OrderService';
import { OrderCreateDto } from '../../dto/OrderCreateDto';
import { GeoLocation } from './../../application/GeoLocation';

@Controller('/api/v1')
export class OrderController extends AbstractController {

	constructor(readonly http: ServerHttp, readonly geolocation: GeoLocation, readonly orderService: OrderService) {
		super();
		this.start();
	}

	@Get('/orders/:id')
	async getOrdersById(req: IRequest, res: IResponse): Promise<void> {
		const { id } = req.params;
		try {
			const order = await this.orderService.findById(id);
			res.status(200).send(order);
		} catch (error: any) {
			res.status(error.code || 500).send(error.message || 'Internal Server Error');
		}
	}

	@Get('/orders')
	async getOrders(req: IRequest<any, any, OrdersQuery>, res: IResponse): Promise<void> {
		const { page, per_page } = req.query;
		try {
			const orders = await this.orderService.findAll(page, per_page);
			res.status(200).send(orders);
		}
		catch (error: any) {
			res.status(error.code || 500).send(error.message || 'Internal Server Error');
		}
	}

	@Post('/orders')
	async postOrders(req: IRequest<any, OrderCreateDto>, res: IResponse): Promise<void> {
		try {
			const order = await this.orderService.save(req.body);
			res.status(201).send(order);
		}
		catch (error: any) {
			res.status(error.code || 500).send(error.message || 'Internal Server Error');
		}
	}

	@Delete('/orders-all')
	async deleteOrders(req: IRequest, res: IResponse): Promise<void> {
		try {
			await this.orderService.deleteAll();
			res.status(200).send();
		}
		catch (error: any) {
			res.status(error.code || 500).send(error.message || 'Internal Server Error');
		}
	}


	public start(): void {
		this.getOrders(this.req, this.res);
		this.postOrders(this.req, this.res);
		this.deleteOrders(this.req, this.res);
		this.getOrdersById(this.req, this.res);
	}
}

type OrdersQuery = {
	page: number,
	per_page: number,
};