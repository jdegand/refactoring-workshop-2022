//import fetch from 'node-fetch';
//import getNextPage from './getNextPage';
//import { port } from '../config';
import getData from './getData';
import isUser from './isUser';

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

async function getMembers(data: [string[], Member[]]): Promise<string[]> {
  const members: string[][] = [];

  members.push(
    data[1]
      .filter((contributor) => isUser(contributor.type))
      .map((contributor: { type: string; login: string }) => contributor.login)
  );

  let nextPageUrl = data[0][0];

  while (nextPageUrl !== '') {
    const data = await getData(nextPageUrl);

    members.push(
      data[1]
        //@ts-ignore
        .filter((contributor) => isUser(contributor.type))
        .map(
          //@ts-ignore
          (contributor: { type: string; login: string }) => contributor.login
        )
    );

    nextPageUrl = data[0][0];
  }

  return members.flat();
}

export default getMembers;

/*
async function getMembers() {
  const members: string[] = [];
  const res = await fetch(`http://localhost:${port}/api/orgs/facebook/members`);
  const data = (await res.json()) as any[];
  data.forEach((contributor) => {
    if (contributor.type === 'User') {
      members.push(contributor.login);
    }
  });

  let nextPageUrl = getNextPage(res.headers.get('link') || '');
  while (nextPageUrl !== '') {
    const res = await fetch(nextPageUrl);
    const data = (await res.json()) as any[];
    data.forEach((contributor) => {
      if (contributor.type === 'User') {
        members.push(contributor.login);
      }
    });
    nextPageUrl = getNextPage(res.headers.get('link') || '');
  }
  return members;
}
*/

/*

// second revision

import getData from './getData';
import isUser from './isUser';

async function getMembers(data: any[][]) {
  const members: string[] = [];
  //const data = await getData(`http://localhost:${port}/api/orgs/facebook/members`);

  data[1].forEach((contributor: { type: string; login: string }) => {
    if (isUser(contributor.type)) {
      members.push(contributor.login);
    }
  });

  let nextPageUrl = data[0][0];

  //console.log('nextPageUrl', nextPageUrl);

  while (nextPageUrl !== '') {
    const data = await getData(nextPageUrl);

    data[1].forEach((contributor: { type: string; login: string }) => {
      if (isUser(contributor.type)) {
        members.push(contributor.login);
      }
    });

    nextPageUrl = data[0][0];
  }

  //console.log('members', members);
  return members;
}

export default getMembers;
*/

/*

// third revision

import getData from './getData';
import isUser from './isUser';

async function getMembers(data: any[][]) {
  const members: string[] = [];

  data[1]
    .filter((contributor) => isUser(contributor.type))
    .map((contributor: { type: string; login: string }) => {
      members.push(contributor.login);
    });

  let nextPageUrl = data[0][0];

  //console.log('nextPageUrl', nextPageUrl);

  while (nextPageUrl !== '') {
    const data = await getData(nextPageUrl);

    data[1]
      .filter((contributor) => isUser(contributor.type))
      .map((contributor: { type: string; login: string }) => {
        members.push(contributor.login);
      });

    nextPageUrl = data[0][0];
  }
  //console.log('members', members);
  return members;
}

export default getMembers;
*/
