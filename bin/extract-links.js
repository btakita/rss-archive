#!/usr/bin/env node
const { _ARR__item } = require('../lib.js')
main()
async function main() {
	const ARR__item = await _ARR__item(process.env.FEED_URL)
	for (let i = 0; i < ARR__item.length; i++) {
		const item = ARR__item[i]
		const { href } = item
		console.debug(href)
	}
}
