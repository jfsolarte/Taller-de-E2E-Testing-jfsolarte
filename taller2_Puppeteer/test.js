const faker = require('faker');
const puppeteer = require('puppeteer');

const person = {
  name: faker.name.firstName(),
  lastname: faker.name.lastName(),
  user: 'user',
  pass: '123456789'
};

describe('H1 Text', () => {
  test('h1 loads correctly', async () => {
	let browser = await puppeteer.launch({
	  headless: true
	});
	let page = await browser.newPage();


	await page.goto('https://angular-6-registration-login-example.stackblitz.io/register');
	await page.waitForSelector('.container');

	/*const html = await page.$eval('.App-title', e => e.innerHTML);
    expect(html).toBe('Welcome to React');*/
    await page.click("input[formcontrolname=firstName]");
    await page.type("input[formcontrolname=firstName]", person.name);
    await page.click("input[formcontrolname=lastName]");
    await page.type("input[formcontrolname=lastName]", person.lastname);
    await page.click("input[formcontrolname=username]");
    await page.type("input[formcontrolname=username]", person.user);
    await page.click("input[formcontrolname=password]");
    await page.type("input[formcontrolname=password]", person.pass);
    await page.click(".btn-primary");
    


	browser.close();
  }, 16000);
});