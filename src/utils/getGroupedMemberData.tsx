//import getContributors from './getContributors';
//import getMembers from './getMembers';
//import getData from './getData';
//import { port } from '../config';
//import getContributorsByOrganization from './getContributorsByOrganization';
//import getTotalContribututionsByOrganization from "./getTotalContribututionsByOrganization";
//import getContributorsToDisplay from './getContributorsToDisplay';

async function getGroupedMemberData(contributors: any[], members: any[]) {
  //const contributors = await getContributors(await getData(`http://localhost:${port}/api/repos/facebook/react/contributors`));
  //const members = await getMembers(await getData(`http://localhost:${port}/api/orgs/facebook/members`));

  const groupedMembers: { [key: string]: any[] } = { facebook: [], other: [] };

  //const groupedMembers: { [key: string]: any[] } = await getContributorsByOrganization(contributors, members);

  //console.log(getTotalContribututionsByOrganization(groupedMembers))

  //console.log(getContributorsToDisplay(groupedMembers))

  const totals: { [key: string]: number } = { facebook: 0, other: 0 };

  contributors.forEach((contributor) => {
    if (members.includes(contributor.login)) {
      groupedMembers.facebook.push(contributor); // need to comment out if testing this function when groupedMembers is result of a call to getContributorsByOrganization
      totals.facebook += contributor.contributions;
    } else {
      groupedMembers.other.push(contributor); // also need to comment out (see above)
      totals.other += contributor.contributions;
    }
  });

  //groupedMembers.facebook.splice(10);
  //groupedMembers.other.splice(10);

  const facebookCopy = groupedMembers.facebook.slice(0, 10);
  const otherCopy = groupedMembers.other.slice(0, 10);

  groupedMembers.facebook = facebookCopy;
  groupedMembers.other = otherCopy;

  groupedMembers.facebook.sort((a, b) => a.login.localeCompare(b.login));
  groupedMembers.other.sort((a, b) => a.login.localeCompare(b.login));

  return {
    contributors: groupedMembers,
    totals,
  };
}

export default getGroupedMemberData;

/*
async function getGroupedMemberData() {
  const contributors = await getContributors(await getData(`http://localhost:${port}/api/repos/facebook/react/contributors`));
  const members = await getMembers(await getData(`http://localhost:${port}/api/orgs/facebook/members`));

  const groupedMembers: { [key: string]: any[] } = { facebook: [], other: [] };
  const totals: { [key: string]: number } = { facebook: 0, other: 0 };

  contributors.forEach((contributor) => {
    if (members.includes(contributor.login)) {
      groupedMembers.facebook.push(contributor);
      totals.facebook += contributor.contributions;
    } else {
      groupedMembers.other.push(contributor);
      totals.other += contributor.contributions;
    }
  });

  groupedMembers.facebook.splice(10);
  groupedMembers.other.splice(10);

  groupedMembers.facebook.sort((a, b) => a.login.localeCompare(b.login));
  groupedMembers.other.sort((a, b) => a.login.localeCompare(b.login));

  return {
    contributors: groupedMembers,
    totals,
  };
}
*/
