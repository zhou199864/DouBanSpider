import puppeteer from 'puppeteer'
import { Browser } from 'puppeteer';

let browser: Browser;

export async function getInstance() {
    if (!browser) {
        browser = await puppeteer.launch({
            headless: false
        });
    }

    return browser;
}

export function close() {
    browser.close()
}