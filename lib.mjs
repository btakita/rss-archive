import fetch from 'node-fetch'
import jsdom from 'jsdom'
const { JSDOM } = jsdom
export async function _ARR__item() {
	const { FEED_URL } = process.env
	const response = await fetch(FEED_URL)
	const feed__xml = await response.text()
	const dom = new JSDOM(feed__xml, {
		contentType: 'text/xml'
	})
	const ARR__item = Array.from(dom.window.document.querySelectorAll('item', null, {
		features: {
			QuerySelector: true
		}
	})).map(item => {
		return {
			title: item.querySelector('title').innerHTML,
			href: item.querySelector('link').innerHTML,
		}
	})
	return ARR__item
}