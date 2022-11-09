export interface Address {
    street: string;
    number: string;
    city: string;
    state: string;
    country: string;
}

export interface Telefone {
    numero: string,
    type: 'telenumeros' | 'abctelefonos',
    endereco: string
}
