import { processURL } from '../pages/ShortenURL';

describe('Process URL function', () => {
  test('function should return URL in processed state', () => {
    const input = 'https://www.google.com';
    const output = 'https://www.google.com';

    expect(processURL(input)).toEqual(output);
  });
});
