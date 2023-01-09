async function getContributorsByOrganization(
  contributors: any[],
  members: any[]
) {
  /*
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
  */
  const [facebook, other] = contributors.reduce(
    (result, contributor) => {
      result[members.includes(contributor.login) ? 0 : 1].push(contributor);
      return result;
    },
    [[], []]
  );

  return { facebook: facebook, other: other };
}

export default getContributorsByOrganization;
