import { getFullYear, getFooterCopy, getLatestNotification } from './utils';
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('utils', () => {
  it('getFullYear returns the current year', () => {
    expect(getFullYear()).toBe(new Date().getFullYear());
  });

  it('getFooterCopy returns the correct string when isIndex is true', () => {
    expect(getFooterCopy(true)).toBe('Holberton School');
  });

  it('getFooterCopy returns the correct string when isIndex is false', () => {
    expect(getFooterCopy(false)).toBe('Holberton School main dashboard');
  });

  it('getLatestNotification returns the correct string', () => {
    expect(getLatestNotification()).toBe(
      '<strong>Urgent requirement</strong> - complete by EOD'
    );
  });
});
