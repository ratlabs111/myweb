﻿import {oset} from "./oset.js";

//const trimSlashRe = new RegExp("(^/|/$)", "g");

export function getLoc(url) {//, defPageName = "") {
	url = new URL(url);

//	const loc = parsePath(url.href, url.pathname, defPageName);
//	loc.hash = parsePath(url.hash, url.hash.substr(1), defPageName);

	const query = new Map();
	for (const [n, v] of url.searchParams) {
		query.set(n, v);
	}
	return type_loc(url.href, url.pathname, query, url.hash);
}
export function setLoc(url) {
	oset(self, "loc", getLoc(url));
}
//function parsePath(href, path, defPageName) {
//	const args = path.replace(trimSlashRe, "").split("/"),
//		loc = type_loc(href, path, args[0] || defPageName, args);
//	for (let i = args.length - 1; i > 0; i -= 2) {
//		loc.param[args[i - 1]] = decodeURIComponent(args[i]);
//	}
//	return loc;
//}
function type_loc(href, path, query, hash) {//, name, args) {
	return {
		href,
		path,
//		name,
//		args,
//		param: {},
		query,
		hash: {
			href: hash,
			path: hash.substr(1)
		}
	};
}
