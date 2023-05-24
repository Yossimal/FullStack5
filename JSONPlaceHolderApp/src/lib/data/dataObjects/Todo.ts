import DataObject, { DataObjectType } from "./DataObject";

export type TodoObjectType = Partial<
  DataObjectType & {
    userId: string;
    title: string;
    completed: boolean;
  }
>;

export default class Todo extends DataObject {
  protected _userId?: string;
  protected _title?: string;
  protected _completed?: boolean;

  constructor({ id, userId, title, completed }: TodoObjectType) {
    super({ id });
    this._userId = userId;
    this._title = title;
    this._completed = completed;
  }

  public static PATH = "todos";

  get userId(): string | undefined {
    return this._userId;
  }

  set userId(userId: string | undefined) {
    this._userId = userId;
  }

  get title(): string | undefined {
    return this._title;
  }

  set title(title: string | undefined) {
    this._title = title;
  }

  get completed(): boolean | undefined {
    return this._completed;
  }

  set completed(completed: boolean | undefined) {
    this._completed = completed;
  }

  public toUnknowObject(): unknown {
    return {
      ...(super.toUnknowObject() as object),
      userId: this._userId,
      title: this._title,
      completed: this._completed,
    };
  }

  override get path(): string {
    if(!this.userId){
      throw new Error("The path can't be generated without an userId");
    }
    return `users/${this.userId}/todos`;
  }


  public fromUnknowObject(obj: unknown): void {
    super.fromUnknowObject(obj);
    const objTyped = obj as TodoObjectType;
    this._userId = objTyped.userId;
    this._title = objTyped.title;
    this._completed = objTyped.completed;
  }
}
