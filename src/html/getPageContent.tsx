import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { renderFile } from 'ejs';
import { format } from 'prettier';
//import fetch from 'node-fetch';
import { Stats } from '../components/Stats';
import { port } from '../config';
//import getGroupedMemberData from '../utils/getGroupedMemberData';
import getContributors from '../utils/getContributors';
import getMembers from '../utils/getMembers';
import getData from '../utils/getData';
import getContributorsByOrganization from '../utils/getContributorsByOrganization';
import getTotalContribututionsByOrganization from '../utils/getTotalContribututionsByOrganization';
import getContributorsToDisplay from '../utils/getContributorsToDisplay';
import { z } from 'zod';

export async function getPageContent() {
  /*
  const { contributors, totals } = await getGroupedMemberData(
    await getContributors(
      await getData(
        `http://localhost:${port}/api/repos/facebook/react/contributors`
      )
    ),
    await getMembers(
      await getData(`http://localhost:${port}/api/orgs/facebook/members`)
    )
  );
  */

  /*
  interface Contributor {
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
    //contributions: number;
  }

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
    contributions: number;
  }
  */

  const ContributorSchema = z.array(
    z.object({
      login: z.string(),
      id: z.number(),
      node_id: z.string(),
      avatar_url: z.string(),
      gravatar_id: z.string(),
      url: z.string(),
      html_url: z.string(),
      followers_url: z.string(),
      following_url: z.string(),
      gists_url: z.string(),
      starred_url: z.string(),
      subscriptions_url: z.string(),
      organizations_url: z.string(),
      repos_url: z.string(),
      events_url: z.string(),
      received_events_url: z.string(),
      type: z.string(),
      site_admin: z.boolean(),
    })
  );

  const MemberSchema = z.object({
    login: z.string(),
    id: z.number(),
    node_id: z.string(),
    avatar_url: z.string(),
    gravatar_id: z.string(),
    url: z.string(),
    html_url: z.string(),
    followers_url: z.string(),
    following_url: z.string(),
    gists_url: z.string(),
    starred_url: z.string(),
    subscriptions_url: z.string(),
    organizations_url: z.string(),
    repos_url: z.string(),
    events_url: z.string(),
    received_events_url: z.string(),
    type: z.string(),
    site_admin: z.boolean(),
    contributions: z.number(),
  });

  const ContributorsSchema = z.array(
    z.object({
      majorContributor: z.boolean().optional(),
      login: z.string(),
      contributions: z.number(),
    })
  );

  type Contributor = z.infer<typeof ContributorSchema>;
  type Member = z.infer<typeof MemberSchema>;
  type Contributors = z.infer<typeof ContributorsSchema>;

  const [con, mem] = await Promise.all([
    getData<Contributor>(
      `http://localhost:${port}/api/repos/facebook/react/contributors`
    ),
    getData<Member>(`http://localhost:${port}/api/orgs/facebook/members`),
  ]);

  /*
  const groupedContributors = await getContributorsByOrganization(
    await getContributors(
      await getData(
        `http://localhost:${port}/api/repos/facebook/react/contributors`
      )
    ),
    await getMembers(
      await getData(`http://localhost:${port}/api/orgs/facebook/members`)
    )
  );
  */

  const groupedContributors = await getContributorsByOrganization(
    await getContributors<Contributors>(con),
    await getMembers(mem)
  );

  const totals = getTotalContribututionsByOrganization(groupedContributors);

  const contributors = getContributorsToDisplay(groupedContributors);

  return format(
    await renderFile(__dirname + '/../views/template.ejs', {
      content: ReactDOMServer.renderToString(
        <Stats groupedContributors={contributors} totals={totals} />
      ),
    }),
    {
      parser: 'html',
    }
  );
}

/*
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { renderFile } from 'ejs';
import { format } from 'prettier';
//import fetch from 'node-fetch';
import { Stats } from '../components/Stats';
import { port } from '../config';
import getGroupedMemberData from '../utils/getGroupedMemberData';
import getContributors from '../utils/getContributors';
import getMembers from '../utils/getMembers';
import getData from '../utils/getData';

export async function getPageContent() {
  const { contributors, totals } = await getGroupedMemberData(
    await getContributors(
      await getData(
        `http://localhost:${port}/api/repos/facebook/react/contributors`
      )
    ),
    await getMembers(
      await getData(`http://localhost:${port}/api/orgs/facebook/members`)
    )
  );

  //console.log(contributors, totals);

  return format(
    await renderFile(__dirname + '/../views/template.ejs', {
      content: ReactDOMServer.renderToString(
        <Stats groupedContributors={contributors} totals={totals} />
      ),
    }),
    {
      parser: 'html',
    }
  );
}
*/
