#!/usr/bin/env node
const { _ARR__item } = require('../lib.js')
const archive_is = require('archive.is')
const webdriver = require('selenium-webdriver')
const proxy = require('selenium-webdriver/proxy')
const sleep = require('es6-sleep').promise
main()
async function main() {
	const ARR__item = await _ARR__item()
	const ARR__promise = []
	for (let i = 0; i < ARR__item.length; i++) {
		const item = ARR__item[i]
		const { href } = item
		ARR__promise.push(save__archive_is(href))
	}
	for (let i = 0; i < ARR__item.length; i++) {
		const item = ARR__item[i]
		const { href } = item
		await sleep(500)
		ARR__promise.push(save__wayback(href))
	}
	const responses = await Promise.all(ARR__promise)
	console.debug(responses)
}
async function save__wayback(href) {
	const chromeCapabilities = webdriver.Capabilities.chrome()
	chromeCapabilities.set('chromeOptions', { args: ['--headless'] })
	const builder = new webdriver.Builder()
		.forBrowser('chrome')
		.withCapabilities(chromeCapabilities)
	const { PROXY_HTTP } = process.env
	if (PROXY_HTTP) {
		// proxy using polipo proxy which uses tor
		builder.setProxy(proxy.manual({ http: PROXY_HTTP }))
	}
	const driver = builder.build()
	await driver.get(`https://web.archive.org/save/${href}`)
	return
}
async function save__archive_is(href) {
  return archive_is.save(href)
}