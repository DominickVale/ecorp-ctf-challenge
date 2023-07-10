import puppeteer from 'puppeteer';
import net from 'net';
import dotenv from 'dotenv'

dotenv.config();

async function loadPage(html: string, browser: puppeteer.Browser): Promise<void> {
    const context: puppeteer.BrowserContext = await browser.createIncognitoBrowserContext();
    const page: puppeteer.Page = await context.newPage();

    try {
        page
            .on('console', message =>
                console.log(`${message.type().substr(0, 3).toUpperCase()} ${message.text()}`))
            .on('pageerror', ({message}) => console.log(message))
            .on('response', response =>
                console.log(`${response.status()} ${response.url()}`))
            .on('requestfailed', request =>
                console.log(`${request.failure().errorText} ${request.url()}`))
        await page.setUserAgent(process.env.ALLOWED_USER_AGENT || '');
        await page.setExtraHTTPHeaders({
            'N': process.env.N_HASH_ID || "undefined",
            "X-Forwarded-For": ""
        })
        await page.setJavaScriptEnabled(false)
        page.setContent(html, {waitUntil: 'domcontentloaded', timeout: 2000})
        await page.setJavaScriptEnabled(true);
        await page.evaluate(() => {
            return new Promise(resolve => setTimeout(resolve, 5000));
        });
    } catch (err) {
        console.log(`err in loadPage: ${err}`);
    }
    await page.close();
    await context.close();
}

(async function () {
    let browser: puppeteer.Browser | null = null;
    const jobsQueue: string[] = [];

    try {
        browser = await puppeteer.launch({
            headless: true,
            args: [
                '--disable-gpu',
                '--no-sandbox',
                '--no-gpu',
                '--disable-default-apps',
                '--disable-translate',
                '--disable-device-discovery-notifications',
                '--disable-software-rasterizer',]
        });

        const server: net.Server = net.createServer();
        server.listen(Number(process.env.XSSBOT_PORT || '1337'), process.env.XSSBOT_HOST || '0.0.0.0')
        console.log(`Listening on port ${process.env.XSSBOT_PORT}`)

        server.on('connection', socket => {
            socket.on('data', data => {
                try {
                    if (browser) {
                        jobsQueue.push(data.toString())
                    } else {
                        console.error("Invalid state / no puppeteer browser")
                    }
                } catch (err) {
                    console.log(`err calling loadPage: ${err}`);
                }
            });
        });
    } catch (err) {
        console.log(`err during startup: ${err}`);
        if (browser) {
            await browser.close();
        }
        return 1;
    }

    while (true) {
        try {
            if (jobsQueue.length > 0 && browser) {
                const html: string = jobsQueue.shift() as string;
                await loadPage(html, browser);
                console.log("Pending jobs: ", jobsQueue.length)
            } else {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        } catch (e) {
            console.error(e)
            break;
        }
    }
})();
