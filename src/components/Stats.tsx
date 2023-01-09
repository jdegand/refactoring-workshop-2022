import React from 'react';
import Row from './Row';

interface StatsProps {
  groupedContributors: { [key: string]: any[] };
  totals: { [key: string]: number };
}

interface Contributor {
  majorContributor?: boolean;
  login: string;
  contributions: number;
}

export function Stats({ groupedContributors, totals }: StatsProps) {
  const content = Object.keys(groupedContributors).map(
    (groupedContributor, index) => {
      return (
        <div className="table" key={index}>
          <h2>{groupedContributor}</h2>
          <table>
            <thead>
              <tr>
                <th>contributor</th>
                <th>contributions</th>
              </tr>
            </thead>
            <tbody>
              {groupedContributors[groupedContributor].map(
                (contributor: Contributor, index) => (
                  <Row key={index} {...contributor} />
                )
              )}
            </tbody>
            <tfoot>
              <tr>
                <th>total</th>
                <th>{totals[groupedContributor].toLocaleString()}</th>
              </tr>
            </tfoot>
          </table>
        </div>
      );
    }
  );

  return <>{content}</>;
}

/*

// original

import React from 'react';

function getTable(title: string, total: number, contributors: any[]) {
  const rows: any[] = [];

  // key problem 
  contributors.forEach(contributor => {
    rows.push(
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
  });

  return (
    <div className="table">
      <h2>{title}</h2>
      <table>
        <thead>
          <tr>
            <th>contributor</th>
            <th>contributions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
        <tfoot>
          <tr>
            <th>total</th>
            <th>{total.toLocaleString()}</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

interface StatsProps {
  groupedContributors: { [key: string]: any[] };
  totals: { [key: string]: number };
}

export function Stats({ groupedContributors, totals }: StatsProps) {
  const tables: any[] = [];

  Object.entries(groupedContributors).forEach(([key, value]) => {
    tables.push(getTable(key, totals[key], value));
  });
  
  return <>{tables}</>;
}

*/

/*

// first revision

import React from 'react';

interface StatsProps {
  groupedContributors: { [key: string]: any[] };
  totals: { [key: string]: number };
}

interface Contributor {
  majorContributor?: boolean,
  login: string,
  contributions: number
}

// breaking further into other components - redundant ?  
// Stats would exist just to pass props
// Could make rows component and pass 

export function Stats({ groupedContributors, totals }: StatsProps) {
  const content = Object.keys(groupedContributors).map((groupedContributor) => {
    return (
      <div className="table">
        <h2>{groupedContributor}</h2>
        <table>
          <thead>
            <tr>
              <th>contributor</th>
              <th>contributions</th>
            </tr>
          </thead>
          <tbody>
            {groupedContributors[groupedContributor].map((contributor : Contributor) => (
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
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>total</th>
              <th>{totals[groupedContributor].toLocaleString()}</th>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  });

  return <>{content}</>;
}
*/
