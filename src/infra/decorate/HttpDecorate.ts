/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import ServerHttp from '../../interfaces/ServerHttp';

export interface IController extends PropertyDescriptor {
	baseUrl?: string;
	http?: ServerHttp
}

function Controller(path = '') {
	return function (target: any) {
		target.prototype.baseUrl = path;
	};
}

function Get(path = '') {
	return function (target: any, propertyKey: string, descriptor: IController) {
		const methodOriginal = descriptor.value;
		descriptor.value = async function (...args: any[]) {
			let result;
			this.http?.on('get', this.baseUrl + path, async (req, res) => {
				result = await methodOriginal.apply(this, [req, res]);
			});
			return result;
		};
	};
}

function Post(path = '') {
	return function (target: any, propertyKey: string, descriptor: IController) {
		const methodOriginal = descriptor.value;
		descriptor.value = async function (...args: any[]) {
			let result;
			this.http?.on('post', this.baseUrl + path, async (req, res) => {
				result = await methodOriginal.apply(this, [req, res]);
			});
			return result;
		};
	};
}

function Put(path = '') {
	return function (target: any, propertyKey: string, descriptor: IController) {
		const methodOriginal = descriptor.value;
		descriptor.value = async function (...args: any[]) {
			let result;
			this.http?.on('put', this.baseUrl + path, async (req, res) => {
				result = await methodOriginal.apply(this, [req, res]);
			});
			return result;
		};
	};
}

function Delete(path = '') {
	return function (target: any, propertyKey: string, descriptor: IController) {
		const methodOriginal = descriptor.value;
		descriptor.value = async function (...args: any[]) {
			let result;
			this.http?.on('delete', this.baseUrl + path, async (req, res) => {
				result = await methodOriginal.apply(this, [req, res]);
			});
			return result;
		};
	};
}

export { Controller, Get, Post, Put, Delete };

