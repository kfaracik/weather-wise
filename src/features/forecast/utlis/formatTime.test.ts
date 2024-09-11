import {formatTime} from './formatTime';

describe('formatTime', () => {
  it('should return HH:MM date format', () => {
    const inputTime = 1726022272;
    const result = formatTime(inputTime);
    expect(result).toBe('4:37');
  });
});
