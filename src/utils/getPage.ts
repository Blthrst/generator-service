import { PageData, User } from 'src/types';

/**
 * Gets raw data from resource with speciified page
 * @param url URL of resource
 * @param p Page number (zero-based)
 * @returns raw data from page
 */
export async function getPage(
  url: string,
  p: number,
): Promise<PageData<User>> {
  const data = await fetch(`${url}?page=${p}`);

  const result = await data.json();
  return result as User[];
}
