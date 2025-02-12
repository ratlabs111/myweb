﻿import {type_animation} from "../render/render.js";
import {srcBy$src} from "../descr.js";
import {eval2, q_eval2} from "../eval2.js";

export default {
	isCustomHtml: true,
	render(req) {
		return eval2(req, req.$src, true)
			.then(val => {
				html_render(req, req.$src, val);
				return null;
			});
	},
	q_render(req, arr, isLast) {
		return q_eval2(req, arr, isLast)
			.then(vals => {
				const arrLen = arr.length;
				for (let i = 0; i < arrLen; i++) {
					if (!isLast.has(i)) {
						html_render(req, arr[i].$src, vals[i]);
					}
				}
				return null;
			});
	}
};
function html_render(req, $src, val) {
//	const c = getCacheBySrcId($src[p_srcId]),
	const c = srcBy$src.get($src).cache;
	if (req.sync.renderParam.isLinking) {
		c.current.set(req.str, val);
		return;
	}
	if (val === c.current.get(req.str)) {
		return;
	}
	req.sync.animations.add(type_animation(() => {
		c.current.set(req.str, val);
		const m = req.reqCmd.args[0];
		if (m !== undefined && m !== "") {
			$src.textContent = val;
			return;
		}
		$src.innerHTML = val;
	}, req.sync.local, srcBy$src.get($src).id));
}
