function getTotalContribututionsByOrganization(groupedContributors: {
  [key: string]: any[];
}) {
  const facebookTotal = groupedContributors['facebook'].reduce(
    (result, contributor) => {
      result += contributor.contributions;
      return result;
    },
    0
  );

  const otherTotal = groupedContributors['other'].reduce(
    (result, contributor) => {
      result += contributor.contributions;
      return result;
    },
    0
  );

  return { facebook: facebookTotal, other: otherTotal };
}

export default getTotalContribututionsByOrganization;
