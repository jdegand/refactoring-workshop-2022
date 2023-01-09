function getContributorsToDisplay(groupedContributors: {
  [key: string]: any[];
}) {

  const facebook = groupedContributors['facebook']
    .slice(0, 10)
    .sort((a, b) => a.login.localeCompare(b.login));

  const other = groupedContributors['other']
    .slice(0, 10)
    .sort((a, b) => a.login.localeCompare(b.login));

  return { facebook: facebook, other: other };
}

export default getContributorsToDisplay;
