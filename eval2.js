import {type_req} from "./render/render.js";
import {getCacheSrcId} from "./cache.js";
import {cmdPref} from "./config.js";
import {srcById, srcBy$src} from "./descr.js";
import {getErr} from "./err.js";
import {setCur$src, proxyStat} from "./proxy.js";

const func = Object.getPrototypeOf(async function(){}).constructor,
	_func = self.mw_func || {};

export function eval2(req, $src, isReactive) {
	//1) isReactive ложь только в _getVal(): _fetch data-_ok, _on
	//2) $src не равно req.$src только в случаи с loading - сейчас там это исправленено - но только там есть смысл
	const cacheSrcId = getCacheSrcId(req.$src, req.str),
		c = srcById.get(cacheSrcId).cache;
//todo c !== null - почему может быть так что кэша нет?
if (c === null) {
	console.warn(111);
	alert(1);
}

//	if (c !== null && req.str in c.value) {
	if (c.value.has(req.str)) {
//console.log(7777, req.str, req.expr, req.$src, c.value);
		return c.value.get(req.str);
	}
	const func = getEval2Func(req, req.expr);
	proxyStat.value = 0;
	if (isReactive) {
		setCur$src($src);
		const val = func
			.apply($src, [req, req.scope])
			.catch(err => {
				throw getErr(err, req.$src, req);
			});
		if (proxyStat.value !== 0) {
//--			setCacheValue(cacheSrcId, req.str, val);
			c.value.set(req.str, val);
//			proxyStat.value = 0;
		}
		setCur$src();
		return val;
	}
	const val = func
		.apply($src, [req, req.scope])
		.catch(err => {
			throw getErr(err, req.$src, req);
		});
	if (proxyStat.value !== 0) {
//--		setCacheValue(cacheSrcId, req.str, val);
		c.value.set(req.str, val);
//		proxyStat.value = 0;
	}
	return val;
}
export function q_eval2(req, arr, isLast) {
	return q_getEval2Func(req, req.expr)
		.apply(null, [req, arr, isLast, req.str, setCur$src, proxyStat, srcBy$src])
		.then(vals => Promise.all(vals))
		.catch(err => {
			throw getErr(err, req.$src, req);
		});
}
//const commentRe = /\/\/.+?(\n|$)/g;
export function getEval2Func(req, expr) {
	expr = expr.trim();
	const cacheKey = expr,
		_f = _func[cacheKey];
	if (_f) {
		return _f;
	}
	if (expr === "") {
		return _func[cacheKey] = new func();
	}
//todo
//	expr = expr.replace(commentRe, "");
	if (isNeedRet(expr)) {
		expr = "const _tpl_res = " + expr + ";\nreturn _tpl_res;";
	}
/*
//todo if need change with
	const fBody = `const _tpl_scopeNames = [];
for (const i in _tpl_scope) {
	_tpl_scopeNames.push(i);
}
const _tpl_scopeNamesLen = _tpl_scopeNames.length;
_tpl_scopeValues = new Array(_tpl_scopeNamesLen);
for (let i = 0; i < _tpl_scopeNamesLen; i++) {
	_tpl_scopeValues[i] = _tpl_scope[_tpl_scopeNames[i]];
}
return (function(Object.keys(_tpl_scope)) {${expr}
}).apply(this, Object.values(_tpl_scope));`;

or

	const fBody = "return (function(Object.keys(_tpl_scope)) {" + expr + "\n}).apply(this, Object.values(_tpl_scope))";
*/

	const fBody = "with (_tpl_scope) {" + expr + "\n}";
//console.log(fBody);
	try {
//console.log(fBody)
		return _func[cacheKey] = new func("req", "_tpl_scope", fBody);
	} catch (err) {
		throw getErr(err, req.$src, req);
	}
}
export function q_getEval2Func(req, expr) {
	expr = expr.trim();
	const cacheKey = "=q" + expr,
		_f = _func[cacheKey];
	if (_f) {
		return _f;
	}
	if (expr === "") {
		return _func[cacheKey] = new func();
	}
	if (isNeedRet(expr)) {
		expr = "const _tpl_res = " + expr + ";\nreturn _tpl_res;";
	}
	const fBody = `const _tpl_len = _tpl_arr.length,
	_tpl_val = new Array(_tpl_len);
for (let i = 0; i < _tpl_len; i++) {
	if (_tpl_isLast.has(i)) {
		continue;
	}
	const $i = _tpl_arr[i].$src,
		src = _tpl_srcBy$src.get($i),
		c = src.cache;
	if (c.value.has(_tpl_str)) {
		_tpl_val[i] = c.value.get(_tpl_str);
//console.log(7777, "q", _tpl_val[i]);
		continue;
	}
	_tpl_proxyStat.value = 0;
	_tpl_setCur$src($i);
	const v = _tpl_val[i] = (function() {
//todebug 
		if (self.mw_debugLevel !== 0) {
			req.scope = _tpl_arr[i].scope;
		}
		with (_tpl_arr[i].scope) {${expr}
		}
	}).apply($i);
	if (_tpl_proxyStat.value !== 0) {
//--		_tpl_setCacheValue(cacheSrcId, _tpl_str, v);
		c.value.set(_tpl_str, v);
	}
}
_tpl_setCur$src();
//_tpl_proxyStat.value = 0;
return _tpl_val;`;
//console.log(fBody);
	try {
		return _func[cacheKey] = new func("req", "_tpl_arr", "_tpl_isLast", "_tpl_str", "_tpl_setCur$src", "_tpl_proxyStat", "_tpl_srcBy$src", fBody);//, "_tpl_isReactive"
	} catch (err) {
		throw getErr(err, req.$src, req);
	}
}
const _e = ["with", "var", "try", "catch", "switch" , "do", "while", "let", "const", "for", "if", "return"];
function isNeedRet(expr) {
	if (expr === "") {
		return false;
	}
	expr = clearBlock(clearBlock(clearBlock(clearBlock(clearBlock(expr, "'", "'"), "`", "`"), "\"", "\""), "{", "}"), "(", ")");
//console.log(expr)
	for (let i = _e.length - 1; i > -1; i--) {
		const j = expr.indexOf(_e[i]);
		if (j === -1) {
			continue;
		}
//		switch (expr.substr(j + _e[i].length, 1)) {
		switch (expr[j + _e[i].length]) {
			case " ":
			case "(":
			case "\n":
			case "\t":
			case "\r":
//console.log(1, _e[i]);
				return false;
		}
//console.log(2, _e[i]);
//		return true;
	}
//console.log(3);
	return true;
}
function clearBlock(str, begin, end) {
	for (let i = str.indexOf(begin); i !== -1; i = str.indexOf(begin, i + 1)) {
		const strLen = str.length;
		for (let j = i + 1, count = 0; j < strLen; j++) {
			if (str[j] === "\\") {
				j++;
			}
			if (str[j] === end) {
				if (count === 0) {
					str = str.substr(0, i + 1) + str.substr(j);
					i = j;
					break;
				}
				count--;
				continue;
			}
			if (str[j] === begin) {
				count++;
			}
		}
	}
	return str;
}
//self.clearBlock = clearBlock;
//self.isNeedRet = isNeedRet;
/*--
//todo-- attr and get$props
export function getVal($src, scope, name, isReactive) {
//	const val = $src.dataset[name];
//	if (val !== undefined) {
//		return val;
//	}
////inline	return _getVal($src, scope, name, isReactive);
	const str = cmdPref + name,
		expr = $src.dataset[str];
	if (expr) {
		return eval2(type_req($src, str, expr, scope || srcBt$src.get($src).scopeCache, null), $src, isReactive);
	}
}
export function _getVal($src, scope, name, isReactive) {
	const str = cmdPref + name,
		expr = $src.dataset[str];
	if (expr) {
		return eval2(type_req($src, str, expr, scope || srcBy$src.get($src).scopeCache, null), $src, isReactive);
	}
}*/
