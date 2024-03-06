/**
 * @type { import('typescript') }
 */
var ts;
importScripts('./game/typescript.js');
// @ts-ignore
if (typeof ts != 'undefined') {
	console.log(`ts loaded`);
} else {
	console.log(`ts undefined`);
}

console.log('serviceWorker version 2.2');

self.addEventListener("install", (event) => {
	// The promise that skipWaiting() returns can be safely ignored.
	// @ts-ignore
	self.skipWaiting();
});

self.addEventListener("activate", (event) => {
	// 当一个 service worker 被初始注册时，页面在下次加载之前不会使用它。 claim() 方法会立即控制这些页面
	// @ts-ignore
	event.waitUntil(clients.claim());
});

self.addEventListener('message', event => {
	console.log(event.data);
});

self.addEventListener('fetch', event => {
	// @ts-ignore
	const request = event.request;
	if (typeof request.url != 'string') return console.log(request);
	if (!['.ts', '.json', 'mold'].some(ext => request.url.endsWith(ext))) return;
	if (request.url.endsWith('.d.ts')) return;
	if (request.url.endsWith('.json')) {
		// @ts-ignore
		if (!event.request.headers.get('origin')) return;
	}
	// 请求ts文件
	const res = fetch(request.url, {
		method: request.method,
		mode: "no-cors",
		headers: new Headers({
			"Content-Type": "text/plain"
		}),
	});
	// @ts-ignore
	event.respondWith(
		res.then(res => {
			if (res.status != 200) return res;
			console.log('正在编译', request.url);
			return res.text().then(text => {
				let js;
				if (request.url.endsWith('.json')) {
					js = `export default ${text}`;
				} else if (request.url.endsWith('.ts')) {
					js = ts.transpile(text, {
						module: ts.ModuleKind.ES2015,
						target: ts.ScriptTarget.ES2019,
						inlineSourceMap: true,
						resolveJsonModule: true,
						esModuleInterop: true,
					}, request.url);
				} else if (request.url.endsWith('.mold')) {
					// 使用例子: import('./index.mold').then(({ default: { render } }) => {
					// render(ui.window)
					// })
					js = `
						// mold字符串
						const text = ${JSON.stringify(text)};
						// mold文件绝对路径（因为和这个js同目录所以这么写）
						const url = '${request.url}';

						// 字符串转dom
						const doc = document.implementation.createHTMLDocument('${request.url.slice(request.url.lastIndexOf('/') + 1)}');
						doc.body.innerHTML = '<base href="' + url + '">' + text;

						// 获取dom的template，script，style标签
						const templates = [...doc.querySelectorAll('template')];
						const scripts = [...doc.querySelectorAll('script')];
						const styles = [...doc.querySelectorAll('style')];

						const render = (parent, ...props) => {
							// 暂时每种标签只解析第一个
							const template = templates[0].cloneNode(true);
							if (!window.mold.templateMap.get(url)) {
								window.mold.templateMap.set(url, {
									template
								});
							} else {
								window.mold.templateMap.get(url).template = template;
							}
							const script = document.createElement('script');
							script.setAttribute('type', 'module');
							let scriptText = '';
							const insertEnd = '\\nwindow.mold.registerEvaluate(import.meta.url, str => eval(str));';
							if (scripts[0]) {
								if (typeof ts != 'undefined' && scripts[0].setAttribute('lang') === 'ts') {
									scriptText = ts.transpile(scripts[0].innerText + insertEnd, {
										module: ts.ModuleKind.ES2015,
										target: ts.ScriptTarget.ES2019,
										inlineSourceMap: true,
										resolveJsonModule: true,
										esModuleInterop: true,
									}, url);
								} else {
									scriptText = scripts[0].cloneNode(true).innerText + insertEnd;
								}
							}
							script.innerHTML = scriptText;

							const style = styles[0].cloneNode(true);
							
							const tmpBaseElt = document.createElement('base');
							tmpBaseElt.href = url;
							document.head.appendChild(tmpBaseElt);
							document.head.appendChild(style);
							document.head.appendChild(script);
							parent.appendChild(template);
							document.head.removeChild(tmpBaseElt);
						}
						export default { 
							render
						}`.replaceAll(`						`, '');
				}
				const rep = new Response(new Blob([js], { type: "text/javascript" }), {
					status: 200,
					statusText: "OK",
					headers: new Headers({
						"Content-Type": "text/javascript"
					}),
				});
				return rep;
			})
		})
		.catch(e => {
			console.log(e);
			throw e;
		})
	);
});