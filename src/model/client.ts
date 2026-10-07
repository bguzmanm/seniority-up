import { Email } from "../vo/email.js";

export class Client {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: Email,
  ) {}

  static of(id: string, name: string, email: string): Client {
    return new Client(id, name, Email.of(email));
  }
}
