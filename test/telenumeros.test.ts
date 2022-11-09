import { Telenumeros } from "../src/application/Telenumeros";


const mock = [
    { address: 'Rua Eulália Silva, 223', phone: '1532342248', type: "telenumeros" },
    { address: 'Rua Eulália Silva, 223', phone: '1532315231', type: "telenumeros" },
    { address: 'Rua Eulália Silva, 223', phone: '1532113703', type: "telenumeros" },
    { address: 'Rua Luiz Gabriotti, 223', phone: '1532173600', type: "telenumeros" },
]

test("Deve buscar numeros de um site", async () => {
    const telenumero = new Telenumeros(`file://${__dirname}/telenumeros.html`)
    const numeros = await telenumero.execute({ city: "São Paulo", country: "Brasil", number: "223", state: "SP", street: "Rua Eulália Silva" })
    expect(numeros).toEqual(mock)
});



