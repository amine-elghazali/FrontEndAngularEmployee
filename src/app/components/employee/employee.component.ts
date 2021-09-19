import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Optional } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public employees!: Employee[];

  public editEmployee!:Employee;

  public deleteEmployee!:Employee;


  constructor(private employeService:EmployeeService) { }

  public getEmployees() : void {
    this.employeService.getEmployes().subscribe(    // we call subscribe so we get notifed whenever some data comes back from the server
      (response:Employee[]) => {
        this.employees = response;
        console.log(response);

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  ngOnInit(): void {
    this.getEmployees();
  }


  public onAddEmployee( addForm:NgForm ) :void {
      console.log(addForm.value);
      this.employeService.addEmploye(addForm.value).subscribe(
        (Response:Employee)=>{
          console.log(Response);
          this.getEmployees();
        },
        (error:HttpErrorResponse)=>{
          alert(error.message);
        }
      );
      addForm.reset();
      document.getElementById('add-employee-form')?.click();

  }

  public onUpdateEmployee( employee:Employee ) :void {
    console.log(employee);
    this.employeService.updateEmploye(employee).subscribe(
      (Response:Employee)=>{
        console.log(Response);
        this.getEmployees();
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    );
    document.getElementById('edit-employee-form')?.click();

  }

  public onDeleteEmployee( employeeId:number ) :void {
    console.log(employeeId);
    this.employeService.deleteEmploye(employeeId).subscribe(
      (Response:void)=>{
        console.log(Response);
        this.getEmployees();
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }

  public searchEmployees(key:string) : void {
    console.log(key);

    const result:Employee[] = [];

    for(const employee of this.employees){
      if(
        employee.jobTitle.toLocaleLowerCase().indexOf(key.toLocaleLowerCase())!==-1
       /* employee.email.toLocaleLowerCase().indexOf(key.toLocaleLowerCase())!==-1 ||
        employee.phone.toLocaleLowerCase().indexOf(key.toLocaleLowerCase())!==-1 ||   We Can search by...
        employee.name.toLocaleLowerCase().indexOf(key.toLocaleLowerCase())!==-1 ||
        */
        )
          result.push(employee);

    }
    this.employees = result;
    if(result.length ===0 && key.length===0 ){
      this.getEmployees();
    }
    console.log("result : "+result);
    console.log("employees array : "+this.employees)

  }



  public onOpenModal(employee:Employee, mode:string) : void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');

    if(mode === 'add'){
      console.log(employee);

      button.setAttribute('data-target','#addEmployeeModal');
    }

    if(mode === 'edit'){
      console.log(employee);
      this.editEmployee = employee;
      button.setAttribute('data-target','#updateEmployeeModal');
    }

    if(mode === 'delete'){
      console.log(employee);
      this.deleteEmployee = employee;
      button.setAttribute('data-target','#deleteEmployeeModal');
    }

    container?.appendChild(button);
    button.click();
  }

}
