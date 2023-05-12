import { getList } from "../loders/mainLoader/getLoader";
import Album from "./Album";
import DataObject, { DataObjectType } from "./DataObject";
import Todo from "./Todo";

type Address = Partial<{
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}>;

type Geo = Partial<{
  lat: string;
  lng: string;
}>;

type Company = Partial<{
  name: string;
  catchPhrase: string;
  bs: string;
}>;

export type UserObjectType = Partial<
  DataObjectType & {
    name: string;
    username: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
  }
>;

export default class User extends DataObject {
  protected _name?: string;
  protected _username?: string;
  protected _address?: Address;
  protected _phone?: string;
  protected _website?: string;
  protected _company?: Company;

  constructor({
    id,
    name,
    username,
    address,
    phone,
    website,
    company,
  }: UserObjectType) {
    super({ id });
    this._name = name;
    this._username = username;
    this._address = address;
    this._phone = phone;
    this._website = website;
    this._company = company;
  }

  public static PATH = "users";

  override get path(): string {
    return "users";
  }

  get name(): string | undefined {
    return this._name;
  }

  set name(name: string | undefined) {
    this._name = name;
  }

  get username(): string | undefined {
    return this._username;
  }

  set username(username: string | undefined) {
    this._username = username;
  }

  get address(): Address | undefined {
    return this._address;
  }

  set address(address: Address | undefined) {
    this._address = address;
  }

  get phone(): string | undefined {
    return this._phone;
  }

  set phone(phone: string | undefined) {
    this._phone = phone;
  }

  get website(): string | undefined {
    return this._website;
  }

  set website(website: string | undefined) {
    this._website = website;
  }

  get company(): Company | undefined {
    return this._company;
  }

  set company(company: Company | undefined) {
    this._company = company;
  }

  public override toUnknowObject(): unknown {
    return {
      ...(super.toUnknowObject() as Object),
      name: this._name,
      username: this._username,
      address: this._address,
      phone: this._phone,
      website: this._website,
      company: this._company,
    };
  }

  public override fromUnknowObject(obj: unknown): void {
    super.fromUnknowObject(obj);
    const objTyped = obj as UserObjectType;
    this._name = objTyped.name;
    this._username = objTyped.username;
    this._address = objTyped.address;
    this._phone = objTyped.phone;
    this._website = objTyped.website;
    this._company = objTyped.company;
  }

  public get albums(): Promise<Album[]> {
    return getList<Album>(`${this.fullPath}/${Album.PATH}`);
  }

  public get todos(): Promise<Todo[]> {
    return getList<Todo>(`${this.fullPath}/${Todo.PATH}`);
  }

  public get posts(): Promise<Todo[]> {
    return getList<Todo>(`${this.fullPath}/${Todo.PATH}`);
  }
}
