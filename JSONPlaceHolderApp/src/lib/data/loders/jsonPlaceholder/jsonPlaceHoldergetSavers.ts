import { registerSavers } from "../mainLoader/saveLoder";
import Indexable from "../interfaces/Indexable";
import { JSON_PLACEHOLDER_URL } from "./env";

async function save<T extends Indexable>(path: string, item: T) {}

async function push<T extends Indexable>(
  path: string,
  item: T
): Promise<string> {
  const response = await fetch(`${JSON_PLACEHOLDER_URL}/${path}`, {
    method: "POST",
    body: JSON.stringify(item),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const pushedItem = await response.json();
  return pushedItem.id.toString();
}
