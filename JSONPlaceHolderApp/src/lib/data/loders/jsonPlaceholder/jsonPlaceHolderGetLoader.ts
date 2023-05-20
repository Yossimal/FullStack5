import Indexable from "../interfaces/Indexable";
import { registerGetters } from "../mainLoader/getLoader";

const JSON_PLACEHOLDER_URL = "https://jsonplaceholder.typicode.com";

async function getList<T extends Indexable>(path: string): Promise<T[]> {
  return fetch(`${JSON_PLACEHOLDER_URL}/${path}`)
    .then((res) => res.json())
    .then((data) => data as unknown as T[]);
}

async function getOne<T extends Indexable>(
  fullPath: string
): Promise<T | null> {
  return fetch(`${JSON_PLACEHOLDER_URL}/${fullPath}`)
    .then((res) => res.json())
    .then((data) => (data as unknown as T) ?? null);
}

async function find(path: string, query: any): Promise<any[]> {
  const queryStr = Object.keys(query).map((key) => `${key}=${query[key]}`);

  return fetch(`${JSON_PLACEHOLDER_URL}/${path}?${queryStr.join("&")}`)
    .then((res) => res.json())
    .then((data) => data as any[]);
}

export default function initJPHGetLoader() {
  registerGetters({
    getList,
    getOne,
    find,
    priority: 0,
  });
}
