/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { describe, expect, it } from 'vitest';
import { normalizeInviteCode } from '@/misc/generate-invite-code.js';

describe(normalizeInviteCode, () => {
	it('passes a raw code through unchanged', () => {
		expect(normalizeInviteCode('L2Z36NHKWAZW2')).toBe('L2Z36NHKWAZW2');
	});
	it('strips hyphens (4-4-5 display form)', () => {
		expect(normalizeInviteCode('L2Z3-6NHK-WAZW2')).toBe('L2Z36NHKWAZW2');
	});
	it('strips spaces and surrounding whitespace', () => {
		expect(normalizeInviteCode('  l2z3 6nhk wazw2  ')).toBe('L2Z36NHKWAZW2');
	});
	it('uppercases lowercase input', () => {
		expect(normalizeInviteCode('l2z36nhkwazw2')).toBe('L2Z36NHKWAZW2');
	});
	it('converts full-width (NFKC) input typed with a Japanese IME', () => {
		expect(normalizeInviteCode('Ｌ２Ｚ３－６ＮＨＫ－ＷＡＺＷ２')).toBe('L2Z36NHKWAZW2');
	});
});
