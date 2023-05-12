export type DataObjectType = Partial<{
  id: string;
}>;

export default class DataObject {
  protected _id?: string;

  constructor({ id }: DataObjectType) {
    this._id = id;
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

  public fromUnknowObject(obj: unknown): void {
    const objTyped = obj as DataObjectType;
    this._id = objTyped.id;
  }
}
