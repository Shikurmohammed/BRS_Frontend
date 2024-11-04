export class Book {
  constructor(
    public id?: number,
    public isbn?: string,
    public author?: string ,
    public title?: string ,
    public genre?: string ,
    public type?: string ,
    public total_copies?: number ,
    public available_copies?: number ,
    public edition?: string ,
    public created_at?:string,
    public publication_date?: Date,
    public status?:string,
    public image?:string,
    public pdfName?:string
  ) {

    
  }
}
