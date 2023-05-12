const JSON_PLACEHOLDER_URL = "https://jsonplaceholder.typicode.com";

export async function getList<T>(path: string): Promise<T[]> {
  return fetch(`${JSON_PLACEHOLDER_URL}/${path}`)
    .then((res) => res.json())
    .then((data) => data as unknown as T[]);
}

export async function getOne<T>(fullPath: string): Promise<T> {
  return fetch(`${JSON_PLACEHOLDER_URL}/${fullPath}`)
    .then((res) => res.json())
    .then((data) => data as unknown as T);
}