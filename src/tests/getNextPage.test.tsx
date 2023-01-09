import getNextPage from '../utils/getNextPage';

const mockData =
  '<http://localhost:5000/api/repos/facebook/react/contributors?page=11>; rel="prev", <http://localhost:5000/api/repos/facebook/react/contributors?page=1>; rel="first", <http://localhost:5000/api/repos/facebook/react/contributors?page=13>; rel="next", <http://localhost:5000/api/repos/facebook/react/contributors?page=15>; rel="last"';

test('getNextPage works', async () => {
  expect(getNextPage(mockData)).toBe(
    'http://localhost:5000/api/repos/facebook/react/contributors?page=13'
  );
});
