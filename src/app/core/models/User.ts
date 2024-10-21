export class User {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public username: string,
    public password: string,
    public email: string,
    public phoneNumber: string,
    public registrationDate: Date,
    public address: string,
    public kebeleId: string,
    public role: string,
  ) {}
}
