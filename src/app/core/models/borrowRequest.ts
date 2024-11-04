export class BorrowRequest{
    constructor(
        public id?:number,
        public book_id? :number,
        public user_id? :number,
        public status?:boolean,
        public approved_id?:string,
        public created_at?:Date,
        public updated_at?:Date,
        public due_date?:Date,
        public notes?:string
    ){}
}