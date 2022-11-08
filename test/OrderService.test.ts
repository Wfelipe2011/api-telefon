import { OrderService } from '../src/application/OrderService';
import { ClientOrder } from '../src/domain/ClientOrder';
import { ClientMemoryRepository } from '../src/infra/repository/memory/ClientMemoryRepository';
import { AddressMemoryRepository } from '../src/infra/repository/memory/AddressMemoryRepository';
import { OrderCreateDto } from '../src/dto/OrderCreateDto';
import { GeoLocation } from '../src/application/GeoLocation';
import { AxiosAdapter } from './../src/infra/adapter/AxiosAdapter';

const orderMock: OrderCreateDto = {
	name: 'John Doe',
	productWeight: 10,
	latitude: 10,
	longitude: 10,
};

describe('Client', () => {
	test('Deve gerar um novo cliente', () => {
		const clientOrder = new ClientOrder({
			name: 'João',
			productWeight: 10,
		});

		expect(clientOrder).toHaveProperty('id');
		expect(clientOrder).toHaveProperty('name');
		expect(clientOrder).toHaveProperty('productWeight');
	});

	test('Deve salvar um novo cliente', async () => {
		const clientService = new OrderService(
			new ClientMemoryRepository(),
			new AddressMemoryRepository(),
			new GeoLocation(new AxiosAdapter())
		);
		const clientEntity = await clientService.save(orderMock);
		expect(clientEntity).toHaveProperty('id');
		expect(clientEntity).toHaveProperty('address');
		expect(clientEntity.address.clientOrderId).toBe(
			clientEntity.id
		);
		await clientService.delete(clientEntity.id);
	});

	test('Deve deletar um cliente', async () => {
		const clientService = new OrderService(
			new ClientMemoryRepository(),
			new AddressMemoryRepository(),
			new GeoLocation(new AxiosAdapter())
		);
		const clientEntity = await clientService.save(orderMock);
		await clientService.delete(clientEntity.id);
		try {
			await clientService.findById(clientEntity.id);
		} catch (error: any) {
			expect(error.message).toBe('Cliente não encontrado');
		}
	});

	test('Deve deletar todos os clientes', async () => {
		const clientService = new OrderService(
			new ClientMemoryRepository(),
			new AddressMemoryRepository(),
			new GeoLocation(new AxiosAdapter())
		);
		await clientService.save(orderMock);
		await clientService.save(orderMock);
		await clientService.save(orderMock);
		let client = await clientService.findAll(1);
		expect(client.data).toHaveLength(3);
		await clientService.deleteAll();
		client = await clientService.findAll(1);
		expect(client.data).toHaveLength(0);
	});
});
