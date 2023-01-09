import getContributorsByOrganization from '../utils/getContributorsByOrganization';

const expectedResult = {
  facebook: [
    { majorContributor: true, login: 'acdlite', contributions: 1205 },
    { login: 'bgw', contributions: 24 },
  ],
  other: [
    { majorContributor: true, login: 'zpao', contributions: 1778 },
    { majorContributor: true, login: 'gaearon', contributions: 1664 },
    { majorContributor: true, login: 'sophiebits', contributions: 1268 },
    { login: 'chicoxyzzy', contributions: 29 },
    { login: 'keyz', contributions: 28 },
    { login: 'mcsheffrey', contributions: 26 },
  ],
};

const mockContributors = [
  { majorContributor: true, login: 'acdlite', contributions: 1205 },
  { majorContributor: true, login: 'zpao', contributions: 1778 },
  { majorContributor: true, login: 'gaearon', contributions: 1664 },
  { majorContributor: true, login: 'sophiebits', contributions: 1268 },
  { login: 'chicoxyzzy', contributions: 29 },
  { login: 'keyz', contributions: 28 },
  { login: 'mcsheffrey', contributions: 26 },
  { login: 'bgw', contributions: 24 },
];

const mockMembers = [
  'aaronabramov',
  'acdlite',
  'adamgross42',
  'assafgelber',
  'bgolub',
  'bgw',
];

test('getGroupedMemberData works', async () => {
  expect(
    await getContributorsByOrganization(mockContributors, mockMembers)
  ).toStrictEqual(expectedResult);
});
