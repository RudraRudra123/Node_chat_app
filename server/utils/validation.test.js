//declarations
const { isRealString } = require('./validation');
const expect = require('expect');

describe('validation', () => {
    it('should reject non-string values', () => {
        expect(isRealString('')).toBeFalsy();
        expect(isRealString('')).toBeFalsy();
    });
    it('should accept string values', () => {
        expect(isRealString('suhas')).toBeTruthy();
        expect(isRealString('1234')).toBeTruthy();
    });
    it('should trim spaces in string values', () => {
        expect(isRealString(' suhas')).toBeTruthy();
        expect(isRealString('  1234')).toBeTruthy();
    });
});
