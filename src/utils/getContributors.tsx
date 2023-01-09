//import fetch from 'node-fetch';
//import getNextPage from './getNextPage';
//import { port } from '../config';
import getData from './getData';
import isUser from './isUser';

async function getContributors<T>(data: any[][]): Promise<T[]> {
  const contributors: any[] = [];

  contributors.push(
    data[1]
      .filter((contributor: { type: string }) => isUser(contributor.type))
      .map((contributor: { contributions: number; login: any }) => {
        const majorContributor = contributor.contributions > 500 ? true : false;
        return {
          majorContributor,
          login: contributor.login,
          contributions: contributor.contributions,
        };
      })
  );

  let nextPageUrl = data[0][0];

  while (nextPageUrl !== '') {
    const data: any[] = await getData(nextPageUrl);

    const otherData = data[1]
      .filter((contributor: { type: string }) => isUser(contributor.type))
      .map((contributor: { type: string; login: any; contributions: any }) => {
        return {
          login: contributor.login,
          contributions: contributor.contributions,
        };
      });
    contributors.push(otherData);
    nextPageUrl = data[0][0];
  }

  return contributors.flat();
}

export default getContributors;

/*
async function getContributors(): Promise<any[]> {
  const contributors: any[] = [];

  const res = await fetch(
    `http://localhost:${port}/api/repos/facebook/react/contributors`
  );

  const data = (await res.json()) as any[];
  data.forEach((contributor) => {
    if (contributor.type === 'User') {
      const majorContributor = contributor.contributions > 500 ? true : false;
      contributors.push({
        majorContributor,
        login: contributor.login,
        contributions: contributor.contributions,
      });
    }
  });

  let nextPageUrl = getNextPage(res.headers.get('link') || '');
  while (nextPageUrl !== '') {
    const res = await fetch(nextPageUrl);
    const data = (await res.json()) as any[];
    data.forEach((contributor) => {
      if (contributor.type === 'User') {
        contributors.push({
          login: contributor.login,
          contributions: contributor.contributions,
        });
      }
    });
    nextPageUrl = getNextPage(res.headers.get('link') || '');
  }

  return contributors;
}
*/

/* working 
import getData from './getData';
import isUser from './isUser';

async function getContributors(data: any[][]): Promise<any[]> {
  const contributors: any[] = [];

  //const data = await getData(`http://localhost:${port}/api/repos/facebook/react/contributors`);

  data[1].forEach((contributor) => {
    if (isUser(contributor.type)) {
      const majorContributor = contributor.contributions > 500 ? true : false;
      contributors.push({
        majorContributor,
        login: contributor.login,
        contributions: contributor.contributions,
      });
    }
  });

  let nextPageUrl = data[0][0];
  //console.log('nextPageUrl', nextPageUrl);

  while (nextPageUrl !== '') {
    const data = await getData(nextPageUrl);

    data[1].forEach(
      (contributor: { type: string; login: any; contributions: any }) => {
        if (isUser(contributor.type)) {
          contributors.push({
            login: contributor.login,
            contributions: contributor.contributions,
          });
        }
      }
    );
    nextPageUrl = data[0][0];
  }

  return contributors;
}

export default getContributors;
*/

/*
import getData from './getData';
import isUser from './isUser';

interface ContributorData {
  type: string,
  login: any, 
  contributions: number
}

async function getContributors(data: any[][]): Promise<any[]> {
  const contributors: any[] = [];

  //const data = await getData(`http://localhost:${port}/api/repos/facebook/react/contributors`);

  data[1].forEach((contributor) => {
    if (isUser(contributor.type)) {
      const majorContributor = contributor.contributions > 500 ? true : false;
      contributors.push({
        majorContributor,
        login: contributor.login,
        contributions: contributor.contributions,
      });
    }
  });

  let nextPageUrl = data[0][0];
  //console.log('nextPageUrl', nextPageUrl);

  while (nextPageUrl !== '') {
    const data = await getData(nextPageUrl);

    data[1].forEach( // forEach here mutates the data and causes problems for typing when you change getContributors signatures
      (contributor: { type: string; login: any; contributions: any }) => { 
        // change to ConData ?
        if (isUser(contributor.type)) {
          contributors.push({
            login: contributor.login,
            contributions: contributor.contributions,
          });
        }
      }
    );
    nextPageUrl = data[0][0];
  }

  return contributors;
}

export default getContributors;

*/

/*
import getData from './getData';
import isUser from './isUser';

async function getContributors(data: any[][]): Promise<any[]> {
  const contributors: any[] = [];

  // map is being used just like forEach - not really good implementation

  data[1].filter(contributor => isUser(contributor.type)).map((contributor) => {
      const majorContributor = contributor.contributions > 500 ? true : false;
      return contributors.push({
        majorContributor,
        login: contributor.login,
        contributions: contributor.contributions,
      });
  })

  let nextPageUrl = data[0][0];
  //console.log('nextPageUrl', nextPageUrl);

  while (nextPageUrl !== '') {
    const data = await getData(nextPageUrl);

    data[1].filter(contributor => isUser(contributor.type)).map(
      (contributor: { type: string; login: any; contributions: any }) => { 
        return contributors.push({
          login: contributor.login,
          contributions: contributor.contributions,
        });
      }
    )

    nextPageUrl = data[0][0];
  }

  //console.log(contributors)

  return contributors;
}

export default getContributors;
*/
