import { PageData, User } from 'src/types';

export async function getPage(
  url: string,
  p: number,
): Promise<PageData<User>> {
  const data = await fetch(`${url}?page=${p}`);

  const result = await data.json();
  return result as User[];
}
