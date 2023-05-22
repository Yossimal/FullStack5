import Indexable from "../loders/interfaces/Indexable";
import { find } from "../loders/mainLoader/getLoader";
import { getOne } from "../loders/mainLoader/getLoader";

export type DataObjectType = Partial<{
  id: string;
}>;

export default class DataObject implements Indexable {
  protected _id?: string;

  constructor({ id }: DataObjectType) {
    this._id = id;
  }

  get path(): string {
    throw new Error("Method not implemented.");
  }

  get fullPath(): string {
    if (!this.id) {
      throw new Error("The full path can't be generated without an id");
    }
    return `${this.path}/${this.id}`;
  }

  get id(): string | undefined {
    return this._id;
  }

  set id(id: string | undefined) {
    this._id = id;
  }

  public toUnknowObject(): unknown {
    return {
      id: this._id,
    };
  }

  public toJSON(): string {
    return JSON.stringify(this.toUnknowObject());
  }

  public fromJSON(json: string): void {
    const obj = JSON.parse(json);
    this.fromUnknowObject(obj);
  }

  public async load(): Promise<void> {
    const data = await getOne(this.fullPath);
    this.fromUnknowObject(data);
  }

  public fromUnknowObject(obj: unknown): void {
    const objTyped = obj as DataObjectType;
    this._id = objTyped.id;
  }

  public async first(query: any): Promise<void> {
    const results = await find(this.path, query);
    if (results.length === 0) {
      return;
    }
    this.fromUnknowObject(results[0]);
  }

  public async save(): Promise<DataObject> {
    throw new Error("Method not implemented.");
  }
}
