import getMembers from '../utils/getMembers';

interface Member {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

const mockData: [string[], Member[]] = [
  ['http://localhost:5000/api/orgs/facebook/members?page=2'],
  [],
];

// need server running - have to mock getData
// 82 entries if you add data to second array in mockData need to add 82 for length total
// mocking function answer would match whatever you put into mockData

test('getMembers has correct length', async () => {
  expect((await getMembers(mockData)).length).toBe(82);
});
