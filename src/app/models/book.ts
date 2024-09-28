export class Book {
  constructor(
    public id: number=0,
    public iSBN: string='',
    public author: string ='',
    public title: string ='',
    public genre: string ='',
    public type: string ='',
    public numberOfCopies: number =0,
    public edition: string ='',
    public registrationDate: string ='',
    public publicationDate: string ='',
  ) {

    
  }
}
