import getContributorsToDisplay from '../utils/getContributorsToDisplay';

const groupedContributors = {
  facebook: [
    { majorContributor: true, login: 'zpao', contributions: 1778 },
    { majorContributor: true, login: 'gaearon', contributions: 1664 },
    { majorContributor: true, login: 'acdlite', contributions: 1205 },
    { majorContributor: false, login: 'trueadm', contributions: 436 },
  ],
  other: [
    { majorContributor: false, login: 'jimfb', contributions: 456 },
    { majorContributor: false, login: 'bvaughn', contributions: 366 },
    { majorContributor: false, login: 'petehunt', contributions: 332 },
    { majorContributor: false, login: 'chenglou', contributions: 222 },
  ],
};

const expectedResult = {
  facebook: [
    { majorContributor: true, login: 'acdlite', contributions: 1205 },
    { majorContributor: true, login: 'gaearon', contributions: 1664 },
    { majorContributor: false, login: 'trueadm', contributions: 436 },
    { majorContributor: true, login: 'zpao', contributions: 1778 },
  ],
  other: [
    { majorContributor: false, login: 'bvaughn', contributions: 366 },
    { majorContributor: false, login: 'chenglou', contributions: 222 },
    { majorContributor: false, login: 'jimfb', contributions: 456 },
    { majorContributor: false, login: 'petehunt', contributions: 332 },
  ],
};

test('getContributorsToDisplay works', async () => {
  expect(await getContributorsToDisplay(groupedContributors)).toStrictEqual(
    expectedResult
  );
});
