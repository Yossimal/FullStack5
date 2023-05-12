import {
  getOne as JPHGetOne,
  getList as JPHGetList,
} from "../jsonPlaceholder/jsonPlaceHolderGetLoader";

export async function getList<T>(path: string): Promise<T[]> {
  return JPHGetList<T>(path);
}

export async function getOne<T>(fullPath: string): Promise<T> {
  return JPHGetOne<T>(fullPath);
}
