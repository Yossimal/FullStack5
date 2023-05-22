import { db } from "../../../firebase/setup";
import {
  ref,
  get,
  query as firebaseQuery,
  orderByChild,
  equalTo,
  QueryConstraint,
} from "firebase/database";
import { registerGetters } from "../mainLoader/getLoader";
import Indexable from "../interfaces/Indexable";

async function getList<T extends Indexable>(path: string): Promise<T[]> {
  const snapshot = await get(ref(db, path));
  const data = snapshot.val();
  if(!data) return [];
  return Object.keys(data).map((key) => data[key]);
}

async function getOne<T extends Indexable>(
  fullPath: string
): Promise<T | null> {
  const snapshot = await get(ref(db, fullPath));
  return snapshot.val();
}

async function find(path: string, query: any): Promise<any[]> {
  const dbRef = ref(db, path);
  const quesryConstraints: QueryConstraint[] = [];
  Object.keys(query).forEach((key) => {
    quesryConstraints.push(orderByChild(key));
    quesryConstraints.push(equalTo(query[key]));
  });
  const q = firebaseQuery(dbRef, ...quesryConstraints);
  const snapshot = await get(q);
  const data: any[] = snapshot.val();

  if(!data) return [];

  return data.filter((item) => item?.id !== undefined);
}

export default function initFirebaseGetLoader(): void {
  registerGetters({
    getList,
    getOne,
    find,
    priority: 0,
  });
}
