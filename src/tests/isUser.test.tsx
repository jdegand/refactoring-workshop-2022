import isUser from '../utils/isUser';

test('isUser success', async () => {
  expect(isUser('none')).toBe(false);
});

test('isUser error', async () => {
  expect(isUser('User')).toBe(true);
});
