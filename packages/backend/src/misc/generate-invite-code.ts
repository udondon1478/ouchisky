/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { secureRndstr } from './secure-rndstr.js';

const CHARS = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // [0-9A-Z] w/o [01IO] (32 patterns)

export function generateInviteCode(): string {
	const code = secureRndstr(8, {
		chars: CHARS,
	});

	const uniqueId = [];
	let n = Math.floor(Date.now() / 1000 / 60);
	while (true) {
		uniqueId.push(CHARS[n % CHARS.length]);
		const t = Math.floor(n / CHARS.length);
		if (!t) break;
		n = t;
	}

	return code + uniqueId.reverse().join('');
}

/**
 * 入力された招待コードを照合用に正規化する。
 * 全角→半角(NFKC)変換・大文字化したうえで、英数字以外（ハイフン・空白等）を除去する。
 * 表示用にハイフン区切りで提示したコード（例 `XXXX-XXXX-XXXXX`）を
 * ユーザーがそのまま手入力しても、また全角IMEで打ってしまっても照合が通るようにするためのもの。
 * 生成されるコードは {@link CHARS}（大文字英数字のみ）で構成されるため、この正規化は安全。
 */
export function normalizeInviteCode(input: string): string {
	return input.normalize('NFKC').toUpperCase().replace(/[^0-9A-Z]/g, '');
}
