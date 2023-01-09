import fetch from 'node-fetch';
import getNextPage from './getNextPage';
//import { z } from 'zod';

async function getData<T>(url: string): Promise<[string[], T[]]> {
  // getData(url: string): Promise<any[][]>
  // getData<T>(url: string): Promise<[string[],T[]]>
  const res = await fetch(url);
  const headers = res.headers;
  const nextPageUrl = getNextPage(res.headers.get('link') || '');

  const data = (await res.json()) as T[];

  // console.log('zod',ContributorSchema.safeParse(data).success)

  // conditionally return based on validation check ?

  return [[nextPageUrl], [...data]];
}

export default getData;

/*
  async function getData(url:string):Promise<any[]> {
    const array: string[] = [];
    const res = await fetch(url);
    const data = (await res.json()) as any[];

    for(let i = 0; i < data.length; i++){
        if(data[i].type === 'User'){
            array.concat(data[i])
        }
    }
  
    return array
  }
*/

/*  before generic conversion

  import fetch from 'node-fetch';
  import getNextPage from './getNextPage';

  async function getData(url: string): Promise<any[]> {
  //const array: string[] = [];
  const res = await fetch(url);
  const headers = res.headers;
  const nextPageUrl = getNextPage(res.headers.get('link') || '');

  //console.log('nextPageUrl', nextPageUrl)

  const data = (await res.json()) as any[];
  return [[nextPageUrl], [...data]];
  }

  export default getData;
*/
