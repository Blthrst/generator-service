import { PageData } from 'src/dtos';

export async function getPage(
  url: string,
  p: number,
): Promise<PageData<any[]>> {
  const data = await fetch(`${url}?p=${p}`);

  const result = await data.json();
  return result as any[];
}
