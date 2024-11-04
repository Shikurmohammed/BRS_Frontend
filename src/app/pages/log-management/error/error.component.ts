import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ErrorLog } from '../../../core/models/ErrorLog';
import { ErrorLogService } from '../../../core/services/errorLog.service';
@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
  errorList:ErrorLog[];
  constructor(public errorLogService:ErrorLogService){}
  ngOnInit(){
     this.errorLogService.getErrorLogs().subscribe(
      {
      next:(res)=>{
      
        this.errorList=res;
        console.log( this.errorList); 
      },
      error:(err)=>{console.log(err)}
      }
     
    )
  }
}
