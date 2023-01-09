import React from 'react';

interface Contributor {
  majorContributor?: boolean;
  login: string;
  contributions: number;
}

function Row(contributor: Contributor) {
  return (
    <tr
      key={contributor.login}
      className={contributor?.majorContributor ? 'major' : ''}
    >
      <td>
        <a href={`https://github.com/${contributor.login}`}>
          {contributor.login}
        </a>
      </td>
      <td>{contributor.contributions.toLocaleString()}</td>
    </tr>
  );
}

export default Row;
