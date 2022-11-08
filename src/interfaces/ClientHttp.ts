/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line import/named
import { AxiosRequestHeaders, AxiosResponse, } from 'axios';

export interface ClientHttp {
	get<T>(config: AxiosAdapterProps<T>): Promise<ClientHttpResponse<T>>
	post<T>(config: AxiosAdapterProps<T>): Promise<ClientHttpResponse<T>>
	put<T>(config: AxiosAdapterProps<T>): Promise<ClientHttpResponse<T>>
	delete<T>(config: AxiosAdapterProps<T>): Promise<ClientHttpResponse<T>>
}

export type AxiosAdapterProps<T = any> = {
	url: string;
	headers?: AxiosRequestHeaders;
	method?: IMethod;
	data?: T;
};

export type ClientHttpResponse<T> = AxiosResponse<T>;

export type IMethod = 'get' | 'post' | 'put' | 'delete';