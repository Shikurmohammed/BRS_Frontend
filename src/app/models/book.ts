export class Book {
  constructor(
    public id: string,
    public iSBN: string,
    public author: string,
    public title: string,
    public genre: string,
    public type: string,
    public numberOfCopies: number,
    public edition: string,
    public registrationDate: string,
    public publicationDate: string,
  ) {}
}
