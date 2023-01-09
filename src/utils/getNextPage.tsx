function getNextPage(linkHeader: string): string {
  const links = linkHeader.split(/\s*,\s*/);
  return links
    .filter((item) => item.includes('rel="next"'))
    .map((item) => {
      return item.split(/\s*;\s*/)[0];
    })
    .toString()
    .replace(/(^<|>$)/g, '');
}

export default getNextPage;

//function getNextPage(linkHeader: string): string {
//  let nextLink = '';
//  const links = linkHeader.split(/\s*,\s*/); // add /
//  links.forEach((link) => {
//    const parts = link.split(/\s*;\s*/); // add /
//    if (parts[1] === 'rel="next"') {
//      nextLink = parts[0].replace(/(^<|>$)/g, ''); //replaceAll errors
//    }
//  });
//
//  return nextLink;
// }

//function getNext(linkHeader){
//  const l = linkHeader.split(/\s*,\s*/);
//  return l.filter(item => item.includes('rel="next"')).map(item => {
//    return item.split(/\s*;\s*/)[0]
//  }).toString().replace(/(^<|>$)/g, '')
// }
