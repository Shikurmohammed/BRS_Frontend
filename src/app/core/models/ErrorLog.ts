export class ErrorLog{
    constructor(
      public  userId?:number,// The responsible user
      public  errorMessage?:string,// Actual error message
      public  stackTrace?:string,// Details of the error
      public  fileName?:string,// The File in which the error happens
      public  className?:string,// The class in which the error happens
      public  functionName?:string,// The function where the error occur
      public  statusCode?:number,// Status code of the error: like 404,500,...
      public  lineNumber?:number,
      public  severityLevel?:string,// Level of the error, INFO, WARN, DANGER
      public  occurredAt?:Date,// the Date at which the error happens
    ){}
}