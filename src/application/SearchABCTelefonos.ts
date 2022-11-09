import puppeteer from 'puppeteer';
import { NotFound } from '../infra/helpers/ErrorHandlers';
import { Address } from '../interfaces/interface';


export class SearchABCTelefonos {

    constructor(readonly fullPath: string) { }

    async execute(address: Address) {
        const browser = await puppeteer.launch({
            headless: true, ignoreHTTPSErrors: true,
            defaultViewport: null,
            args: ['--no-sandbox', '--start-maximized', '--disable-setuid-sandbox', '--enable-features=NetworkService'],
        });
        try {
            const page = await browser.newPage();
            await page.goto(this.fullPath);
            await page.click('[name="tab-direccion"]')
            await page.type('[name="q"]', address.street + ' , ' + address.number);
            await page.keyboard.press('Tab');
            await page.type('[placeholder="Cidade ou Província"]', address.city + ' , ' + address.state + ' , ' + address.country);
            await page.keyboard.press('Enter');
            await page.waitForSelector('.resultItem');

            const listPhone = await page.evaluate(() => {
                const listPhone = []

                let bloco = document.querySelector('.resultItem')
                while (bloco !== null) {
                    const phone = (document.querySelector('.phone_item') as HTMLElement)?.innerText
                    const address = (document.querySelector('[itemprop="streetAddress"]') as HTMLElement).innerText
                    listPhone.push({ address, phone: phone, })
                    bloco?.remove()
                    bloco = document.querySelector('.resultItem')
                }
                return listPhone
            });

            await browser.close();
            return listPhone
        } catch (error) {
            await browser.close();
            throw NotFound("Nada encontrado")
        }
    }
}