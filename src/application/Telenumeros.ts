import { launch } from "puppeteer";
import { Address } from "../interfaces/interface";



export class Telenumeros {
    private address!: Address;

    constructor(readonly fullPath: string) { }

    async execute(address: Address) {
        this.address = address
        const browser = await launch({
            headless: false, ignoreHTTPSErrors: true,
            defaultViewport: null,
            args: ['--no-sandbox', '--start-maximized', '--disable-setuid-sandbox', '--enable-features=NetworkService'],
        });
        const page = await browser.newPage();
        await page.goto(this.fullPath);

        const numeros = await page.evaluate(() => {
            const divContent = document.querySelector("#content")
            const table = divContent?.querySelector("table")
            // tbody
            const tbody = table?.querySelector("tbody")
            // tr
            const trs = tbody?.querySelectorAll("tr")
            if (!trs) return

            // remove element que não são números e endereço
            const trsFiltrados = Array.from(trs).filter(tr => tr.innerText.includes("Rua") || tr.innerText.includes("Telefone"))
            console.log(trsFiltrados);
            const numeros: string[] = []
            for (let tr of trsFiltrados) {
                const tds = tr.innerText
                if (tds) numeros.push(tds);
            }

            return numeros

        });
        await browser.close();
        return this.formatAddress(numeros)
    }

    formatAddress(numeros?: string[]) {
        if (!numeros) return []
        return numeros.map((item, index) => {
            if (item.includes("Telefone") && numeros[index + 1].includes(this.address.number)) {
                const phone = item.replace("Telefone ", "")
                const address = numeros[index + 1]
                return { address, type: 'telenumeros', phone }
            }
            return null
        }
        ).filter(item => item)
    }

}